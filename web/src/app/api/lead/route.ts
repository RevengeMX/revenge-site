import { NextResponse } from 'next/server';

// Proxy hacia el CRM de Revenge (POST /api/v1/leads). La llave vive solo en el servidor.
// CRM_LEADS_URL: URL completa del endpoint · CRM_LEADS_API_KEY: company_settings.leads_api_key.
// Endpoint público: todo lo que llega se trata como no confiable (tipos, largos y tasa).

// Largos máximos del CRM (Applications/src/lib/crm/schemas.ts, leadIngestSchema).
const MAX = { name: 120, email: 200, phone: 30, company: 120, message: 2000, utm: 80 };
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Texto recortado por caracteres completos (no parte un emoji a la mitad); no-texto = vacío.
const text = (value: unknown, max: number) =>
  typeof value === 'string' ? Array.from(value.trim()).slice(0, max).join('') : '';

const SOURCE_LABELS: Record<string, string> = {
  main: 'Sitio principal (revengemx.com)',
  checkapp: 'Landing CheckApp'
};

const GENERIC_ERROR = 'No pudimos registrar tu solicitud. Intenta de nuevo en unos minutos.';

// shortcut: contador en memoria por instancia (no se comparte entre instancias de Vercel);
// subir a una regla de rate limit del Firewall de Vercel sobre /api/lead si hay abuso.
const hits = new Map<string, { count: number; reset: number }>();
const LIMIT_PER_MINUTE = 8;
function throttled(ip: string) {
  const now = Date.now();
  const hit = hits.get(ip);
  if (!hit || hit.reset < now) {
    if (hits.size > 5000) hits.clear();
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  return ++hit.count > LIMIT_PER_MINUTE;
}

const fail = (message: string, status: number) => NextResponse.json({ ok: false, message }, { status });

export async function POST(req: Request) {
  // Desde un navegador, solo el propio sitio. (Un script puede falsificar el origen: no es una barrera.)
  const origin = req.headers.get('origin');
  if (origin) {
    let host = '';
    try {
      host = new URL(origin).host;
    } catch {
      /* origen ilegible: se rechaza abajo */
    }
    if (!host || host !== req.headers.get('host')) return fail('Solicitud inválida.', 403);
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '?';
  if (throttled(ip)) return fail('Demasiadas solicitudes. Intenta de nuevo en un minuto.', 429);

  const raw = await req.text();
  if (raw.length > 10_000) return fail('Solicitud inválida.', 413);
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error('no es un objeto');
    body = parsed as Record<string, unknown>;
  } catch {
    return fail('Solicitud inválida.', 400);
  }

  const lastName = text(body.Last_Name, 60);
  if (!lastName) return fail('Los apellidos son obligatorios.', 400);
  const name = [text(body.First_Name, 60), lastName].filter(Boolean).join(' ');
  if (name.length < 2) return fail('El nombre debe tener al menos 2 caracteres.', 400);
  const email = text(body.Email, MAX.email);
  if (!email) return fail('El correo electrónico es obligatorio.', 400);
  if (!EMAIL.test(email)) return fail('El correo electrónico no es válido.', 400);

  const url = process.env.CRM_LEADS_URL;
  const apiKey = process.env.CRM_LEADS_API_KEY;
  if (!url || !apiKey) {
    console.error('CRM leads: faltan CRM_LEADS_URL o CRM_LEADS_API_KEY');
    return fail(GENERIC_ERROR, 500);
  }

  // El CRM solo acepta source "web"; el origen real va al inicio del mensaje.
  const source = typeof body.source === 'string' && Object.hasOwn(SOURCE_LABELS, body.source) ? body.source : '';
  const message = [source ? `[Origen: ${SOURCE_LABELS[source]}]` : '', text(body.Description, MAX.message)]
    .filter(Boolean)
    .join('\n\n')
    .slice(0, MAX.message);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        name: name.slice(0, MAX.name),
        email,
        phone: text(body.Mobile, MAX.phone),
        company_name: text(body.Company, MAX.company),
        message,
        source: 'web',
        utm_source: text(body.utm_source, MAX.utm) || undefined,
        utm_medium: text(body.utm_medium, MAX.utm) || undefined,
        utm_campaign: text(body.utm_campaign, MAX.utm) || undefined
      }),
      cache: 'no-store',
      // Un CRM lento no debe dejar colgadas las funciones del sitio.
      signal: AbortSignal.timeout(10_000)
    });
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      console.error('CRM lead insert failed:', res.status, JSON.stringify(data));
      return fail(GENERIC_ERROR, 502);
    }

    return NextResponse.json({ ok: true, leadId: data.opportunity_id });
  } catch (err) {
    console.error('CRM lead insert error:', err);
    return fail('No pudimos conectar con nuestro servidor. Intenta de nuevo en unos minutos.', 502);
  }
}
