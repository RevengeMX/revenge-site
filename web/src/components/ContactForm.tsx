'use client';

import React, { useState } from 'react';
import { Sparkles, Mail, Phone, Lock } from 'lucide-react';
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
  xnQsjsdp?: string;
  xmIwtLD?: string;
  submitButtonText?: string;
  gtmEventName?: string;
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

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
  xnQsjsdp,
  xmIwtLD,
  submitButtonText,
  theme = 'dark',
  onTrackEvent
}: ContactFormProps) {
  const isLight = theme === 'light';
  const [submitted, setSubmitted] = useState(false);

  // If Sanity supplies empty string or null, fallback or conditionally hide
  const displayBadge = badgeText !== undefined ? badgeText : 'Hablemos de tu Proyecto';
  const displayTitle = title !== undefined ? title : 'Transformemos tu Presencia Digital';
  const displaySubtitle = subtitle !== undefined ? subtitle : 'Completa la información y nos pondremos en contacto contigo en menos de 24 horas hábiles para programar una llamada de diagnóstico técnico sin costo.';
  
  const displayEmailLabel = emailLabel !== undefined ? emailLabel : 'Email Corporativo';
  const displayEmailValue = emailValue !== undefined ? emailValue : 'hola@revenge.agency';
  
  const displayPhoneLabel = phoneLabel !== undefined ? phoneLabel : '';
  const displayPhoneValue = phoneValue !== undefined ? phoneValue : '';
  const displayPhoneLink = phoneLink !== undefined ? phoneLink : '';
  
  const displaySecurityTitle = securityTitle !== undefined ? securityTitle : 'Integración Segura CRM (Bigin by Zoho)';
  const displaySecurityDesc = securityDescription !== undefined ? securityDescription : 'Tus datos viajan cifrados directamente a nuestro sistema CRM Bigin bajo estrictas políticas de confidencialidad.';
  const displaySubmitText = submitButtonText || 'Contactar';

  const biginXnQsjsdp = xnQsjsdp || 'c89333e5b18dc916843eb758f9590d84049a3d9220e08001403831ea2244de2f';
  const biginXmIwtLD = xmIwtLD || '8c98928c34fe969c348950b0d09c4a5abd3902ea77f3e8f9da905dd432677fc41c267a089f9f2e4f61eb2ffb711116cc';

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

          {/* Right Column: Bigin Official Web-to-Lead Form Styled */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl p-6 sm:p-8 border transition-all relative overflow-hidden ${
              isLight ? 'bg-white border-neutral-200 shadow-xl' : 'bg-neutral-900/60 border-neutral-800/90 shadow-2xl backdrop-blur-xl'
            }`}>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mb-2">
                    <Sparkles className="w-8 h-8 text-brand-orange" />
                  </div>
                  <h3 className={`text-xl font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                    ¡Solicitud enviada con éxito!
                  </h3>
                  <p className={`text-sm max-w-sm ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Nos pondremos en contacto contigo a la brevedad para programar la llamada de diagnóstico.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="mt-6 text-sm font-semibold text-brand-orange hover:text-brand-orange/80 underline underline-offset-4"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    
                    try {
                      // Usar fetch con 'no-cors' simula el envío del formulario HTML nativo
                      // sin recargar la página y evita el error "form is not connected".
                      // Bigin procesará los datos, aunque no podamos leer la respuesta por la política CORS.
                      await fetch('https://bigin.zoho.com/crm/WebToContactForm', {
                        method: 'POST',
                        body: formData,
                        mode: 'no-cors'
                      });
                    } catch (error) {
                      console.error('Error enviando formulario a Bigin:', error);
                    }

                    setSubmitted(true);
                    onTrackEvent({
                      platform: 'Both',
                      eventName: 'Lead',
                      data: {
                        form_name: 'bigin_contact_form',
                        lead_source: 'sitio_oficial_revenge'
                      }
                    });
                  }}
                  className="space-y-5"
                >
                  {/* Hidden Fields for Bigin CRM */}
                  <input type="hidden" name="xnQsjsdp" value={biginXnQsjsdp} />
                  <input type="hidden" name="zc_gad" id="zc_gad" value="" />
                  <input type="hidden" name="xmIwtLD" value={biginXmIwtLD} />
                  <input type="hidden" name="actionType" value="Q29udGFjdHM=" />
                  <input type="hidden" name="rmsg" id="rmsg" value="true" />
                  <input type="hidden" name="returnURL" value="null" />

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Nombre */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold block ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        Nombre
                      </label>
                      <input
                        name="First Name"
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

                    {/* Apellidos (Mandatorio en Bigin) */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold block ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        Apellidos <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        name="Last Name"
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
                        Correo electrónico <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        name="Email"
                        maxLength={100}
                        type="email"
                        required
                        placeholder="contacto@empresa.com"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
                          isLight
                            ? 'bg-neutral-50 text-neutral-900 border-neutral-300 focus:border-brand-orange focus:ring-brand-orange/20'
                            : 'bg-neutral-950 text-white border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                        }`}
                      />
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold block ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        Teléfono
                      </label>
                      <input
                        name="Phone"
                        maxLength={50}
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
                      id="formsubmit"
                      type="submit"
                      className="w-full bg-gradient-to-r from-brand-orange to-brand-red hover:shadow-[0_0_30px_rgba(255,94,58,0.4)] text-white text-xs font-extrabold uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer shadow-lg border-none flex items-center justify-center gap-2"
                    >
                      <span>{displaySubmitText}</span>
                    </button>
                  </div>

                  {/* Powered By Zoho Bigin footer */}
                  <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>Con tecnología de <strong className={isLight ? 'text-neutral-800' : 'text-neutral-300'}>Bigin by Zoho</strong></span>
                    <a
                      href="https://www.zoho.com/report-abuse"
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-500 hover:text-brand-orange underline text-[10px]"
                    >
                      Notificar abuso
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
