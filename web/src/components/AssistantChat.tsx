'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

// Chat del sitio: habla con el Asistente Revenge de la plataforma (POST {URL}/api/v1/chat/web).
// Sin NEXT_PUBLIC_ASSISTANT_URL no se muestra. NEXT_PUBLIC_MESSENGER_URL es opcional.
const API = (process.env.NEXT_PUBLIC_ASSISTANT_URL ?? '').replace(/\/$/, '');
const MESSENGER_URL = process.env.NEXT_PUBLIC_MESSENGER_URL ?? '';
const TELEGRAM_URL = 'https://t.me/RevengeAssistantBot';

type Button = { label: string; data: string };
type Msg = { from: 'bot' | 'me'; text: string; buttons?: Button[] };

const GREETING: Msg = {
  from: 'bot',
  text: 'Buen día. Soy el Asistente Revenge. Puedo contarle sobre nuestros servicios y registrar su solicitud.',
  buttons: [
    { label: 'Ver servicios', data: 'services' },
    { label: 'Quiero información', data: 'prospect' },
    { label: 'Que me contacte una persona', data: 'human' }
  ]
};

const UNAVAILABLE: Msg = {
  from: 'bot',
  text: 'El asistente no está disponible por el momento. Puede escribirnos desde el formulario de contacto.'
};
const TOO_MANY: Msg = {
  from: 'bot',
  text: 'Ha enviado muchos mensajes seguidos. Por favor espere un minuto antes de continuar.'
};

function storage(kind: 'local' | 'session') {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null; // almacenamiento bloqueado: el chat funciona sin recordar nada
  }
}

// Respaldo si el navegador bloquea localStorage: el id dura lo que dure la pestaña, para que
// el diálogo (p. ej. el registro de datos) no se reinicie en cada mensaje.
let fallbackId = '';

function visitorId() {
  const store = storage('local');
  let id = '';
  try {
    id = store?.getItem('rv-chat-visitor') ?? '';
  } catch {
    /* sin acceso al almacenamiento */
  }
  if (!id) id = fallbackId || crypto.randomUUID();
  fallbackId = id;
  try {
    store?.setItem('rv-chat-visitor', id);
  } catch {
    /* sin acceso al almacenamiento */
  }
  return id;
}

// Lo que llega del servidor o del almacenamiento se normaliza: nada ajeno llega al render.
const cleanButtons = (raw: unknown): Button[] | undefined => {
  if (!Array.isArray(raw)) return undefined;
  const list = raw
    .flat()
    .filter((b): b is Button => typeof b?.label === 'string' && typeof b?.data === 'string');
  return list.length ? list : undefined;
};
const cleanMsg = (m: { text?: unknown; buttons?: unknown; from?: unknown }): Msg | null =>
  typeof m?.text === 'string'
    ? { from: m.from === 'me' ? 'me' : 'bot', text: m.text, buttons: cleanButtons(m.buttons) }
    : null;

function savedMessages(): Msg[] {
  try {
    const saved = JSON.parse(storage('session')?.getItem('rv-chat-msgs') ?? 'null');
    const msgs = Array.isArray(saved) ? saved.map(cleanMsg).filter((m): m is Msg => !!m) : [];
    if (msgs.length) return msgs;
  } catch {
    /* historial corrupto: se empieza de nuevo */
  }
  return [GREETING];
}

// false en el servidor y en la hidratación, true después: evita diferencias con el HTML del servidor.
const noopSubscribe = () => () => {};

function Chat() {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>(savedMessages);
  const endRef = useRef<HTMLDivElement>(null);
  const lastSend = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!mounted) return;
    try {
      storage('session')?.setItem('rv-chat-msgs', JSON.stringify(msgs.slice(-50)));
    } catch {
      /* almacenamiento lleno o bloqueado: el chat sigue sin recordar el historial */
    }
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [msgs, mounted]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!API || !mounted) return null;

  async function send(value: string, callback = false, label = value) {
    const message = value.trim();
    // Freno en el cliente: evita ráfagas por doble clic o por un script en la página.
    if (!message || busy || Date.now() - lastSend.current < 1200) return;
    lastSend.current = Date.now();
    setMsgs((m) => [...m.map((x) => ({ ...x, buttons: undefined })), { from: 'me', text: label.trim() }]);
    setText('');
    setBusy(true);
    try {
      const res = await fetch(`${API}/api/v1/chat/web`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor: visitorId(), text: message, callback }),
        signal: AbortSignal.timeout(20000)
      });
      if (res.status === 429) return setMsgs((m) => [...m, TOO_MANY]);
      if (!res.ok) return setMsgs((m) => [...m, UNAVAILABLE]);
      const data = (await res.json()) as { messages?: unknown };
      const replies = (Array.isArray(data.messages) ? data.messages : [])
        .map((r) => cleanMsg({ ...r, from: 'bot' }))
        .filter((m): m is Msg => !!m);
      setMsgs((m) => [...m, ...(replies.length ? replies : [UNAVAILABLE])]);
    } catch {
      setMsgs((m) => [...m, UNAVAILABLE]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div data-clarity-mask="True" className="fixed bottom-4 right-4 z-50 font-sans">
      {open ? (
        <section
          role="dialog"
          aria-label="Chat con el Asistente Revenge"
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          className="flex h-[min(34rem,calc(100vh-2rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">Asistente Revenge</h2>
              <p className="text-xs text-neutral-400">Servicios y solicitudes</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar el chat"
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3" role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'me' ? 'flex justify-end' : 'flex flex-col items-start gap-2'}>
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm ${
                    m.from === 'me' ? 'bg-orange-500 text-white' : 'bg-neutral-800 text-neutral-100'
                  }`}
                >
                  {m.text}
                </p>
                {m.buttons?.map((b) => (
                  <button
                    key={b.data}
                    type="button"
                    disabled={busy}
                    onClick={() => send(b.data, true, b.label)}
                    className="rounded-full border border-neutral-600 px-3 py-1.5 text-xs text-neutral-100 hover:border-orange-500 hover:text-white disabled:opacity-50"
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            ))}
            {busy && <p className="text-xs text-neutral-400">Escribiendo…</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(text);
            }}
            className="flex gap-2 border-t border-neutral-800 p-3"
          >
            <label htmlFor="rv-chat-input" className="sr-only">
              Escriba su mensaje
            </label>
            <input
              id="rv-chat-input"
              ref={inputRef}
              value={text}
              maxLength={1000}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escriba su mensaje"
              className="min-w-0 flex-1 rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-orange-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !text.trim()}
              aria-label="Enviar"
              className="rounded-xl bg-orange-500 p-2 text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-neutral-800 px-4 py-2 text-xs text-neutral-400">
            <span>Continuar en:</span>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              Telegram
            </a>
            {MESSENGER_URL && (
              <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                Messenger
              </a>
            )}
          </footer>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir el chat con el Asistente Revenge"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg hover:brightness-110"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

// Un fallo del chat nunca debe dejar el sitio en blanco: el componente vive en el layout raíz.
class Boundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error('Chat del asistente:', error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function AssistantChat() {
  return (
    <Boundary>
      <Chat />
    </Boundary>
  );
}
