import { NextResponse } from 'next/server';

// Proxy hacia el CRM de Revenge (POST /api/v1/leads). La llave vive solo en el servidor.
// CRM_LEADS_URL: URL completa del endpoint · CRM_LEADS_API_KEY: company_settings.leads_api_key.

interface LeadPayload {
  First_Name?: string;
  Last_Name?: string;
  Email?: string;
  Mobile?: string;
  Company?: string;
  Description?: string;
  source?: string;
}

const SOURCE_LABELS: Record<string, string> = {
  main: 'Sitio principal (revengemx.com)',
  checkapp: 'Landing CheckApp'
};

const GENERIC_ERROR = 'No pudimos registrar tu solicitud. Intenta de nuevo en unos minutos.';

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Solicitud inválida.' }, { status: 400 });
  }

  const lastName = body.Last_Name?.trim();
  if (!lastName) {
    return NextResponse.json({ ok: false, message: 'Los apellidos son obligatorios.' }, { status: 400 });
  }
  const email = body.Email?.trim();
  if (!email) {
    return NextResponse.json({ ok: false, message: 'El correo electrónico es obligatorio.' }, { status: 400 });
  }

  const url = process.env.CRM_LEADS_URL;
  const apiKey = process.env.CRM_LEADS_API_KEY;
  if (!url || !apiKey) {
    console.error('CRM leads: faltan CRM_LEADS_URL o CRM_LEADS_API_KEY');
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 500 });
  }

  // El CRM solo acepta source "web"; el origen real va al inicio del mensaje.
  const sourceLabel = body.source && SOURCE_LABELS[body.source];
  const message = [sourceLabel ? `[Origen: ${sourceLabel}]` : '', body.Description?.trim() || '']
    .filter(Boolean)
    .join('\n\n')
    .slice(0, 2000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        name: [body.First_Name?.trim(), lastName].filter(Boolean).join(' '),
        email,
        phone: body.Mobile?.trim() || '',
        company_name: body.Company?.trim() || '',
        message,
        source: 'web'
      }),
      cache: 'no-store'
    });
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      console.error('CRM lead insert failed:', res.status, JSON.stringify(data));
      return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 502 });
    }

    return NextResponse.json({ ok: true, leadId: data.opportunity_id });
  } catch (err) {
    console.error('CRM lead insert error:', err);
    return NextResponse.json(
      { ok: false, message: 'No pudimos conectar con nuestro servidor. Intenta de nuevo en unos minutos.' },
      { status: 502 }
    );
  }
}
