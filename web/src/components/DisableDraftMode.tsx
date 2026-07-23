'use client';

export function DisableDraftMode() {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages -- full page nav needed to actually clear the draft-mode cookie
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 bg-neutral-900 text-white text-xs font-mono px-4 py-2 rounded-full shadow-lg border border-neutral-700 hover:bg-neutral-800 transition-colors"
    >
      Salir de vista previa
    </a>
  );
}
