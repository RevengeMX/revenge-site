const KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

export type Utm = Partial<Record<(typeof KEYS)[number], string>>;

/**
 * Guarda los utm_* de la URL actual (si trae) y devuelve los guardados en la sesión.
 * Se llama al cargar el sitio y al enviar un formulario: así el origen de la visita
 * sobrevive a la navegación interna. Un anuncio nuevo con utm_* reemplaza al anterior.
 */
export function captureUtm(): Utm {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const key of KEYS) {
      // Por caracteres completos: cortar a la mitad un emoji dejaría texto que el CRM rechaza.
      const value = Array.from(params.get(key)?.trim() ?? '').slice(0, 80).join('');
      if (value) found[key] = value;
    }
    if (Object.keys(found).length > 0) sessionStorage.setItem('utm', JSON.stringify(found));
    return JSON.parse(sessionStorage.getItem('utm') ?? '{}') as Utm;
  } catch {
    // Almacenamiento bloqueado o JSON corrupto: el lead se envía sin campaña.
    return {};
  }
}
