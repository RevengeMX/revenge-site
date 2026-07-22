import { NextResponse } from 'next/server';

const ZOHO_ACCOUNTS_DOMAIN = 'https://accounts.zoho.com';
const ZOHO_API_DOMAIN = 'https://www.zohoapis.com';

interface LeadPayload {
  First_Name?: string;
  Last_Name?: string;
  Email?: string;
  Mobile?: string;
  Company?: string;
  Description?: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  MANDATORY_NOT_FOUND: 'Falta un campo obligatorio.',
  INVALID_DATA: 'Alguno de los datos ingresados no es válido.',
  DUPLICATE_DATA: 'Ya existe un registro con estos datos.',
  OAUTH_SCOPE_MISMATCH: 'Error de configuración interna (permisos). Contacta al equipo técnico.',
  NO_PERMISSION: 'Error de configuración interna (permisos). Contacta al equipo técnico.',
  INVALID_MODULE: 'Error de configuración interna (módulo). Contacta al equipo técnico.'
};

async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!
  });

  const res = await fetch(`${ZOHO_ACCOUNTS_DOMAIN}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    cache: 'no-store'
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`No se pudo renovar el access token de Zoho: ${JSON.stringify(data)}`);
  }
  return data.access_token as string;
}

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

  const record: LeadPayload = { Last_Name: lastName };
  if (body.First_Name?.trim()) record.First_Name = body.First_Name.trim();
  if (body.Email?.trim()) record.Email = body.Email.trim();
  if (body.Mobile?.trim()) record.Mobile = body.Mobile.trim();
  if (body.Company?.trim()) record.Company = body.Company.trim();
  if (body.Description?.trim()) record.Description = body.Description.trim();

  try {
    const accessToken = await getAccessToken();

    const zohoRes = await fetch(`${ZOHO_API_DOMAIN}/crm/v8/Leads`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: [record] }),
      cache: 'no-store'
    });

    const zohoData = await zohoRes.json();
    const result = zohoData?.data?.[0];

    if (!zohoRes.ok || !result || result.status !== 'success') {
      const code = result?.code as string | undefined;
      console.error('Zoho CRM lead insert failed:', JSON.stringify(zohoData));
      return NextResponse.json(
        { ok: false, message: (code && ERROR_MESSAGES[code]) || 'No pudimos registrar tu solicitud. Intenta de nuevo en unos minutos.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, leadId: result.details?.id });
  } catch (err) {
    console.error('Zoho CRM lead insert error:', err);
    return NextResponse.json(
      { ok: false, message: 'No pudimos conectar con nuestro CRM. Intenta de nuevo en unos minutos.' },
      { status: 502 }
    );
  }
}
