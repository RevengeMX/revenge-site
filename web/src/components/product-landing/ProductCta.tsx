'use client';

import React, { useRef, useState } from 'react';
import { Sparkles, Mail, Phone, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { MarketingEvent } from '../../types';

interface ProductCtaProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
  emailValue?: string;
  phoneValue?: string;
  phoneLink?: string;
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ProductCta({
  badgeText,
  title,
  subtitle,
  submitButtonText,
  emailValue,
  phoneValue,
  phoneLink,
  theme = 'dark',
  onTrackEvent
}: ProductCtaProps) {
  const isLight = theme === 'light';
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const displaySubmitText = submitButtonText || 'Solicitar demo';

  const validate = (form: HTMLFormElement): string | null => {
    const lastName = (form.elements.namedItem('Last_Name') as HTMLInputElement | null)?.value.trim();
    if (!lastName) return 'Los apellidos son obligatorios.';
    const email = (form.elements.namedItem('Email') as HTMLInputElement | null)?.value.trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return 'Introduce una dirección de correo electrónico válida.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const validationError = validate(form);
    if (validationError) {
      setStatus('error');
      setErrorMessage(validationError);
      onTrackEvent({ platform: 'Both', eventName: 'lead_form_error', data: { form_name: 'checkapp_cta_form', error: validationError } });
      return;
    }

    setStatus('submitting');
    onTrackEvent({ platform: 'GTM', eventName: 'lead_submission_attempt', data: { form_name: 'checkapp_cta_form' } });

    const fd = new FormData(form);
    const payload = {
      First_Name: (fd.get('First_Name') as string) || '',
      Last_Name: (fd.get('Last_Name') as string) || '',
      Email: (fd.get('Email') as string) || '',
      Mobile: (fd.get('Mobile') as string) || '',
      Company: (fd.get('Company') as string) || '',
      Description: (fd.get('Description') as string) || ''
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMessage(data.message || 'No pudimos registrar tu solicitud. Intenta de nuevo en unos minutos.');
        onTrackEvent({ platform: 'Both', eventName: 'lead_form_error', data: { form_name: 'checkapp_cta_form', error: data.message } });
        return;
      }

      setStatus('success');
      form.reset();
      onTrackEvent({
        platform: 'Both',
        eventName: 'Lead',
        data: { form_name: 'checkapp_cta_form', lead_source: 'checkapp_landing', lead_id: data.leadId, currency: 'USD' }
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage('No pudimos conectar con nuestro servidor. Revisa tu conexión o escríbenos directamente.');
      onTrackEvent({ platform: 'Both', eventName: 'lead_form_error', data: { form_name: 'checkapp_cta_form', error: String(err) } });
    }
  };

  return (
    <section id="cta-final" className={`py-24 border-t transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0a0a0a] border-white/10'
    }`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl border p-8 sm:p-12 text-center space-y-6 ${
          isLight ? 'bg-white border-neutral-200 shadow-xl' : 'bg-white/3 border-white/10'
        }`}>
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fb2c36]/10 border border-[#fb2c36]/30 text-[#fb2c36] text-xs font-mono font-bold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              {badgeText}
            </div>
          )}
          {title && (
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`text-base leading-relaxed max-w-xl mx-auto ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              {subtitle}
            </p>
          )}

          {(emailValue || phoneValue) && (
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm font-mono">
              {emailValue && (
                <a href={`mailto:${emailValue}`} className={`inline-flex items-center gap-2 ${isLight ? 'text-neutral-700' : 'text-neutral-300'} hover:text-[#fb2c36] transition-colors`}>
                  <Mail className="w-4 h-4" /> {emailValue}
                </a>
              )}
              {phoneValue && (
                <a href={phoneLink || `tel:${phoneValue}`} className={`inline-flex items-center gap-2 ${isLight ? 'text-neutral-700' : 'text-neutral-300'} hover:text-[#fb2c36] transition-colors`}>
                  <Phone className="w-4 h-4" /> {phoneValue}
                </a>
              )}
            </div>
          )}

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-mono pt-4">
              <CheckCircle className="w-5 h-5" />
              <span>¡Solicitud enviada! Te contactaremos a la brevedad.</span>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="pt-4 space-y-4 text-left">
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="First_Name"
                  type="text"
                  placeholder="Nombre"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#fb2c36]/30 focus:border-[#fb2c36]/60 ${
                    isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900' : 'bg-white/5 border-white/15 text-white'
                  }`}
                />
                <input
                  name="Last_Name"
                  type="text"
                  required
                  placeholder="Apellidos *"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#fb2c36]/30 focus:border-[#fb2c36]/60 ${
                    isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900' : 'bg-white/5 border-white/15 text-white'
                  }`}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="Email"
                  type="email"
                  placeholder="Correo electrónico"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#fb2c36]/30 focus:border-[#fb2c36]/60 ${
                    isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900' : 'bg-white/5 border-white/15 text-white'
                  }`}
                />
                <input
                  name="Mobile"
                  type="tel"
                  placeholder="Teléfono"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#fb2c36]/30 focus:border-[#fb2c36]/60 ${
                    isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900' : 'bg-white/5 border-white/15 text-white'
                  }`}
                />
              </div>
              <input
                name="Company"
                type="text"
                placeholder="Empresa"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#fb2c36]/30 focus:border-[#fb2c36]/60 ${
                  isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900' : 'bg-white/5 border-white/15 text-white'
                }`}
              />
              <textarea
                name="Description"
                rows={3}
                placeholder="Cuéntanos sobre tu equipo y lo que buscas controlar (opcional)"
                className={`w-full border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#fb2c36]/30 focus:border-[#fb2c36]/60 ${
                  isLight ? 'bg-neutral-50 border-neutral-300 text-neutral-900' : 'bg-white/5 border-white/15 text-white'
                }`}
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide px-7 py-4 rounded-xl bg-[#fb2c36] text-white hover:shadow-[0_8px_30px_rgba(251,44,54,0.45)] transition-all disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>{displaySubmitText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
