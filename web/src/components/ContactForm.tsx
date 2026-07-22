'use client';

import React, { useRef, useState } from 'react';
import { Sparkles, Mail, Phone, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { MarketingEvent } from '../types';

interface ContactFormProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  emailLabel?: string;
  emailValue?: string;
  phoneLabel?: string;
  phoneValue?: string;
  phoneLink?: string;
  securityTitle?: string;
  securityDescription?: string;
  submitButtonText?: string;
  gtmEventName?: string;
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({
  badgeText,
  title,
  subtitle,
  emailLabel,
  emailValue,
  phoneLabel,
  phoneValue,
  phoneLink,
  securityTitle,
  securityDescription,
  submitButtonText,
  theme = 'dark',
  onTrackEvent
}: ContactFormProps) {
  const isLight = theme === 'light';
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const displayBadge = badgeText !== undefined ? badgeText : 'Hablemos de tu Proyecto';
  const displayTitle = title !== undefined ? title : 'Transformemos tu Presencia Digital';
  const displaySubtitle = subtitle !== undefined ? subtitle : 'Completa la información y nos pondremos en contacto contigo en menos de 24 horas hábiles para programar una llamada de diagnóstico técnico sin costo.';

  const displayEmailLabel = emailLabel !== undefined ? emailLabel : 'Email Corporativo';
  const displayEmailValue = emailValue !== undefined ? emailValue : 'hola@revenge.agency';

  const displayPhoneLabel = phoneLabel !== undefined ? phoneLabel : '';
  const displayPhoneValue = phoneValue !== undefined ? phoneValue : '';
  const displayPhoneLink = phoneLink !== undefined ? phoneLink : '';

  const displaySecurityTitle = securityTitle !== undefined ? securityTitle : 'Integración Segura con Zoho CRM';
  const displaySecurityDesc = securityDescription !== undefined ? securityDescription : 'Tus datos viajan cifrados directamente a nuestro sistema Zoho CRM bajo estrictas políticas de confidencialidad.';
  const displaySubmitText = submitButtonText || 'Enviar';

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
      onTrackEvent({
        platform: 'Both',
        eventName: 'lead_form_error',
        data: { form_name: 'zoho_crm_contact_form', error: validationError }
      });
      return;
    }

    setStatus('submitting');
    onTrackEvent({
      platform: 'GTM',
      eventName: 'lead_submission_attempt',
      data: { form_name: 'zoho_crm_contact_form' }
    });

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
        onTrackEvent({
          platform: 'Both',
          eventName: 'lead_form_error',
          data: { form_name: 'zoho_crm_contact_form', error: data.message }
        });
        return;
      }

      setStatus('success');
      form.reset();
      onTrackEvent({
        platform: 'Both',
        eventName: 'Lead',
        data: {
          form_name: 'zoho_crm_contact_form',
          lead_source: 'sitio_oficial_revenge',
          lead_id: data.leadId,
          currency: 'USD'
        }
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage('No pudimos conectar con nuestro servidor. Revisa tu conexión o escríbenos directamente.');
      onTrackEvent({
        platform: 'Both',
        eventName: 'lead_form_error',
        data: { form_name: 'zoho_crm_contact_form', error: String(err) }
      });
    }
  };

  return (
    <section id="contact" className={`py-24 border-t relative transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-800' : 'bg-neutral-950 border-neutral-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Context & Direct Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              {Boolean(displayBadge) && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{displayBadge}</span>
                </div>
              )}
              {Boolean(displayTitle) && (
                <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                  {displayTitle}
                </h2>
              )}
              {Boolean(displaySubtitle) && (
                <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  {displaySubtitle}
                </p>
              )}
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 font-mono text-xs">
              {Boolean(displayEmailValue) && (
                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                  isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-900/60 border-neutral-800'
                }`}>
                  <div className="p-2.5 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    {Boolean(displayEmailLabel) && (
                      <span className={`block text-[10px] uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>{displayEmailLabel}</span>
                    )}
                    <a href={`mailto:${displayEmailValue}`} className={`font-bold hover:text-brand-orange transition-colors ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                      {displayEmailValue}
                    </a>
                  </div>
                </div>
              )}

              {Boolean(displayPhoneValue) && (
                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                  isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-900/60 border-neutral-800'
                }`}>
                  <div className="p-2.5 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    {Boolean(displayPhoneLabel) && (
                      <span className={`block text-[10px] uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>{displayPhoneLabel}</span>
                    )}
                    <a href={displayPhoneLink} target="_blank" rel="noreferrer" className={`font-bold hover:text-brand-orange transition-colors ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                      {displayPhoneValue}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Security Notice */}
            {(Boolean(displaySecurityTitle) || Boolean(displaySecurityDesc)) && (
              <div className={`p-4 rounded-2xl border text-[11px] font-mono leading-relaxed flex items-start gap-3 ${
                isLight ? 'bg-neutral-100/80 border-neutral-200 text-neutral-600' : 'bg-neutral-950 border-neutral-900 text-neutral-400'
              }`}>
                <Lock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  {Boolean(displaySecurityTitle) && <span className="text-brand-orange font-bold block mb-0.5">{displaySecurityTitle}</span>}
                  {Boolean(displaySecurityDesc) && <span>{displaySecurityDesc}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Form (posts to our own /api/lead endpoint) */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl p-6 sm:p-8 border transition-all relative overflow-hidden ${
              isLight ? 'bg-white border-neutral-200 shadow-xl' : 'bg-neutral-900/60 border-neutral-800/90 shadow-2xl backdrop-blur-xl'
            }`}>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 shrink-0" /> ¡Solicitud enviada! Nos pondremos en contacto a la brevedad.</span>
                  <button type="button" onClick={() => setStatus('idle')} className="text-xs text-white underline shrink-0">
                    Enviar otro
                  </button>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold block ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                      Nombre
                    </label>
                    <input
                      name="First_Name"
                      maxLength={40}
                      type="text"
                      placeholder="Ej. Fulanito"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
                        isLight
                          ? 'bg-neutral-50 text-neutral-900 border-neutral-300 focus:border-brand-orange focus:ring-brand-orange/20'
                          : 'bg-neutral-950 text-white border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                      }`}
                    />
                  </div>

                  {/* Apellidos (Mandatorio) */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold block ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                      Apellidos <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      name="Last_Name"
                      maxLength={80}
                      type="text"
                      required
                      placeholder="Ej. Rodríguez"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
                        isLight
                          ? 'bg-neutral-50 text-neutral-900 border-neutral-300 focus:border-brand-orange focus:ring-brand-orange/20'
                          : 'bg-neutral-950 text-white border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                      }`}
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Correo Electrónico */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold block ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                      Correo electrónico
                    </label>
                    <input
                      name="Email"
                      maxLength={100}
                      type="email"
                      placeholder="contacto@empresa.com"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
                        isLight
                          ? 'bg-neutral-50 text-neutral-900 border-neutral-300 focus:border-brand-orange focus:ring-brand-orange/20'
                          : 'bg-neutral-950 text-white border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                      }`}
                    />
                  </div>

                  {/* Móvil */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold block ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                      Móvil
                    </label>
                    <input
                      name="Mobile"
                      maxLength={30}
                      type="tel"
                      placeholder="+52 55 1234 5678"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
                        isLight
                          ? 'bg-neutral-50 text-neutral-900 border-neutral-300 focus:border-brand-orange focus:ring-brand-orange/20'
                          : 'bg-neutral-950 text-white border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                      }`}
                    />
                  </div>

                </div>

                {/* Empresa */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold block ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    Empresa
                  </label>
                  <input
                    name="Company"
                    maxLength={200}
                    type="text"
                    placeholder="Ej. Revenge Corp"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
                      isLight
                        ? 'bg-neutral-50 text-neutral-900 border-neutral-300 focus:border-brand-orange focus:ring-brand-orange/20'
                        : 'bg-neutral-950 text-white border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                    }`}
                  />
                </div>

                {/* Descripción / Requerimiento */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold block ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    Descripción de tu Proyecto / Requerimiento
                  </label>
                  <textarea
                    name="Description"
                    maxLength={32000}
                    rows={4}
                    placeholder="Platícanos sobre tus objetivos, ecosistema actual o necesidades tecnológicas..."
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors resize-y ${
                      isLight
                        ? 'bg-neutral-50 text-neutral-900 border-neutral-300 focus:border-brand-orange focus:ring-brand-orange/20'
                        : 'bg-neutral-950 text-white border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-brand-orange to-brand-red hover:shadow-[0_0_30px_rgba(255,94,58,0.4)] text-white text-xs font-extrabold uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer shadow-lg border-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <span>{displaySubmitText}</span>
                    )}
                  </button>
                </div>

                {/* Powered By Zoho footer */}
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>Con tecnología de <strong className={isLight ? 'text-neutral-800' : 'text-neutral-300'}>Zoho CRM</strong></span>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
