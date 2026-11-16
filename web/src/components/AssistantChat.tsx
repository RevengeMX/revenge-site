'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

// Chat del sitio: habla con el Asistente Revenge de la plataforma (POST {URL}/api/v1/chat/web).
// Sin NEXT_PUBLIC_ASSISTANT_URL no se muestra. NEXT_PUBLIC_MESSENGER_URL es opcional.
const API = (process.env.NEXT_PUBLIC_ASSISTANT_URL ?? '').replace(/\/$/, '');
const MESSENGER_URL = process.env.NEXT_PUBLIC_MESSENGER_URL ?? '';
const TELEGRAM_URL = 'https://t.me/RevengeAssistantBot';

type Button = { label: string; data: string };
type Msg = { from: 'bot' | 'me'; text: string; buttons?: Button[][] };

const GREETING: Msg = {
  from: 'bot',
  text: 'Buen día. Soy el Asistente Revenge. Puedo contarle sobre nuestros servicios y registrar su solicitud.',
  buttons: [
    [{ label: 'Ver servicios', data: 'services' }],
    [{ label: 'Quiero información', data: 'prospect' }],
    [{ label: 'Que me contacte una persona', data: 'human' }]
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

function visitorId() {
  const store = storage('local');
  let id = store?.getItem('rv-chat-visitor') ?? '';
  if (!id) {
    id = crypto.randomUUID();
    store?.setItem('rv-chat-visitor', id);
  }
  return id;
}

function savedMessages(): Msg[] {
  try {
    const saved = JSON.parse(storage('session')?.getItem('rv-chat-msgs') ?? 'null');
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {
    /* historial corrupto: se empieza de nuevo */
  }
  return [GREETING];
}

// false en el servidor y en la hidratación, true después: evita diferencias con el HTML del servidor.
const noopSubscribe = () => () => {};

export default function AssistantChat() {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>(savedMessages);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!mounted) return;
    storage('session')?.setItem('rv-chat-msgs', JSON.stringify(msgs.slice(-50)));
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [msgs, mounted]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!API || !mounted) return null;

  async function send(value: string, callback = false, label = value) {
    const message = value.trim();
    if (!message || busy) return;
    setMsgs((m) => [...m.map((x) => ({ ...x, buttons: undefined })), { from: 'me', text: label.trim() }]);
    setText('');
    setBusy(true);
    try {
      const res = await fetch(`${API}/api/v1/chat/web`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor: visitorId(), text: message, callback })
      });
      if (res.status === 429) return setMsgs((m) => [...m, TOO_MANY]);
      if (!res.ok) return setMsgs((m) => [...m, UNAVAILABLE]);
      const data = (await res.json()) as { messages?: { text: string; buttons?: Button[][] }[] };
      const replies = (data.messages ?? []).map<Msg>((r) => ({ from: 'bot', text: r.text, buttons: r.buttons }));
      setMsgs((m) => [...m, ...(replies.length ? replies : [UNAVAILABLE])]);
    } catch {
      setMsgs((m) => [...m, UNAVAILABLE]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
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
                {m.buttons?.flat().map((b) => (
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
