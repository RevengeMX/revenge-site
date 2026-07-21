import React, { useState } from 'react';
import { Send, CheckCircle, RefreshCw, AlertCircle, Sparkles, Building2, User, Phone, Mail, HelpCircle, DollarSign } from 'lucide-react';
import { MarketingEvent } from '../types';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  gtmEventName?: string;
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function ContactForm({ title, subtitle, theme = 'dark', onTrackEvent }: ContactFormProps) {
  const isLight = theme === 'light';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '1-10',
    service: 'ecommerce_shopify',
    budget: '5k-15k',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato de correo inválido';
    }
    if (!formData.company.trim()) newErrors.company = 'El nombre de tu empresa es obligatorio';
    if (!formData.message.trim()) newErrors.message = 'Por favor, detalla brevemente tu requerimiento';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    onTrackEvent({
      platform: 'GTM',
      eventName: 'form_field_interaction',
      data: {
        field_id: key,
        char_count: value.length,
        form_name: 'contact_official_revenge'
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onTrackEvent({
        platform: 'Both',
        eventName: 'lead_form_error',
        data: {
          error_fields: Object.keys(errors),
          form_name: 'contact_official_revenge'
        }
      });
      return;
    }

    setStatus('submitting');

    onTrackEvent({
      platform: 'GTM',
      eventName: 'lead_submission_attempt',
      data: {
        service_selected: formData.service,
        company_size: formData.companySize,
        budget_bracket: formData.budget
      }
    });

    setTimeout(() => {
      setStatus('success');
      onTrackEvent({
        platform: 'Both',
        eventName: 'Lead',
        data: {
          form_name: 'contact_official_revenge',
          service_selected: formData.service,
          company_size: formData.companySize,
          budget_bracket: formData.budget,
          currency: 'USD',
          value: formData.budget === '5k-15k' ? 10000 : formData.budget === '15k-50k' ? 30000 : 75000,
          lead_source: 'sitio_oficial_revenge',
        }
      });
    }, 1200);
  };

  const inputClasses = (hasError?: boolean) => `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
    isLight 
      ? `bg-white text-neutral-900 placeholder:text-neutral-400 ${hasError ? 'border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:border-brand-orange focus:ring-brand-orange/20'}`
      : `bg-neutral-950 text-white placeholder:text-neutral-600 ${hasError ? 'border-red-500/60 focus:ring-red-500/20' : 'border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'}`
  }`;

  return (
    <section id="contact-section" className={`py-24 border-t relative transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-800' : 'bg-neutral-950 border-neutral-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Direct Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hablemos de tu Proyecto</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                {title || 'Transformemos tu Presencia Digital'}
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                {subtitle || 'Completa la información y nos pondremos en contacto contigo en menos de 24 horas hábiles para programar una llamada de diagnóstico técnico sin costo.'}
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 font-mono text-xs">
              <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-900/60 border-neutral-800'
              }`}>
                <div className="p-2.5 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className={`block text-[10px] uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>Email Corporativo</span>
                  <a href="mailto:hola@revenge.agency" className={`font-bold hover:text-brand-orange transition-colors ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                    hola@revenge.agency
                  </a>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-neutral-900/60 border-neutral-800'
              }`}>
                <div className="p-2.5 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className={`block text-[10px] uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>Atención Directa / WhatsApp</span>
                  <a href="https://wa.me/525512345678" target="_blank" rel="noreferrer" className={`font-bold hover:text-brand-orange transition-colors ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                    +52 55 1234 5678
                  </a>
                </div>
              </div>
            </div>

            {/* Track Notice */}
            <div className={`p-4 rounded-2xl border text-[11px] font-mono leading-relaxed ${
              isLight ? 'bg-neutral-100/80 border-neutral-200 text-neutral-600' : 'bg-neutral-950 border-neutral-900 text-neutral-400'
            }`}>
              <span className="text-brand-orange font-bold block mb-1">GTM & Meta Conversion API Ready</span>
              Al enviar este formulario se dispara el evento sintético <code className={isLight ? 'text-neutral-800' : 'text-neutral-300'}>Lead</code> para verificar el pipeline de analítica omnicanal.
            </div>
          </div>

          {/* Right Column: Interactive Lead Form */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl p-6 sm:p-10 border transition-all ${
              isLight ? 'bg-white border-neutral-200 shadow-md' : 'bg-neutral-900/40 border-neutral-800/80'
            }`}>
              
              {status === 'success' ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`text-2xl font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>¡Solicitud Recibida con Éxito!</h3>
                    <p className={`text-xs sm:text-sm max-w-md mx-auto ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      Hemos registrado tu requerimiento correctamente en nuestro CRM. Nuestro equipo revisará los detalles y te contactará a la brevedad.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-red text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Enviar otra solicitud</span>
                  </button>
                </div>
              ) : (
                <form id="lead-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        <User className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Nombre completo *</span>
                      </label>
                      <input
                        id="form-name-input"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        className={inputClasses(!!errors.fullName)}
                        placeholder="Ej. Baruch Bucay"
                      />
                      {errors.fullName && (
                        <p className="text-[10px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Email corporativo *</span>
                      </label>
                      <input
                        id="form-email-input"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className={inputClasses(!!errors.email)}
                        placeholder="Ej. contacto@empresa.com"
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Teléfono / WhatsApp</span>
                      </label>
                      <input
                        id="form-phone-input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        className={inputClasses()}
                        placeholder="Ej. +52 55 1234 5678"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Nombre de tu Empresa *</span>
                      </label>
                      <input
                        id="form-company-input"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleFieldChange('company', e.target.value)}
                        className={inputClasses(!!errors.company)}
                        placeholder="Ej. Revenge Corp"
                      />
                      {errors.company && (
                        <p className="text-[10px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.company}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Size, Service, Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Tamaño</span>
                      </label>
                      <select
                        id="form-company-size-select"
                        value={formData.companySize}
                        onChange={(e) => handleFieldChange('companySize', e.target.value)}
                        className={inputClasses()}
                      >
                        <option value="1-10">1-10 Empleados</option>
                        <option value="11-50">11-50 Empleados</option>
                        <option value="51-200">51-200 Empleados</option>
                        <option value="200+">200+ Corporativo</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Servicio</span>
                      </label>
                      <select
                        id="form-service-select"
                        value={formData.service}
                        onChange={(e) => handleFieldChange('service', e.target.value)}
                        className={inputClasses()}
                      >
                        <option value="ecommerce_shopify">Shopify / Tienda Nube</option>
                        <option value="headless_cms">CMS Headless (Sanity)</option>
                        <option value="ui_ux_design">Diseño UX/UI & Research</option>
                        <option value="full_consultancy">Consultoría Integral</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        <DollarSign className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Presupuesto</span>
                      </label>
                      <select
                        id="form-budget-select"
                        value={formData.budget}
                        onChange={(e) => handleFieldChange('budget', e.target.value)}
                        className={inputClasses()}
                      >
                        <option value="5k-15k">$5,000 - $15,000 USD</option>
                        <option value="15k-50k">$15,000 - $50,000 USD</option>
                        <option value="50k+">$50,000+ Enterprise</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                      <span>Requerimiento o Mensaje *</span>
                    </label>
                    <textarea
                      id="form-message-input"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      className={inputClasses(!!errors.message)}
                      placeholder="Platícanos sobre los objetivos de tu empresa, plataforma actual o desafíos principales..."
                    />
                    {errors.message && (
                      <p className="text-[10px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-lead-form-btn"
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-brand-orange to-brand-red hover:shadow-[0_0_30px_rgba(255,94,58,0.4)] text-white text-xs font-extrabold uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Procesando Solicitud...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Solicitud de Diagnóstico</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
