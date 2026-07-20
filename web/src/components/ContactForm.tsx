/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle, RefreshCw, AlertCircle, Sparkles, Building2, User, Phone, Mail, HelpCircle, DollarSign } from 'lucide-react';
import { MarketingEvent } from '../types';

interface ContactFormProps {
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function ContactForm({ onTrackEvent }: ContactFormProps) {
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
    // Trigger step or field focus tracking event
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

    // Trigger Lead form attempt event
    onTrackEvent({
      platform: 'GTM',
      eventName: 'lead_submission_attempt',
      data: {
        service_selected: formData.service,
        company_size: formData.companySize,
        budget_bracket: formData.budget
      }
    });

    // Simulate API Post with timeout
    setTimeout(() => {
      setStatus('success');

      // Trigger GTM Lead Submission Success (Standard GTM Lead event)
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
          hashed_email: 'sha256_' + btoa(formData.email).slice(0, 15) // Simulation of Meta advanced matching
        }
      });
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      companySize: '1-10',
      service: 'ecommerce_shopify',
      budget: '5k-15k',
      message: ''
    });
    setStatus('idle');
    setErrors({});
  };

  return (
    <section id="contact-section" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Abstract Grid and Gradient background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand-red/10 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Trust parameters and contact descriptions */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>¿Iniciamos la transformación?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Diseñemos el futuro de tu negocio digital.
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Tanto si buscas migrar a una arquitectura <span className="text-white font-semibold">Headless con Contento</span>, potenciar tu canal <span className="text-white font-semibold">Shopify</span> o rediseñar la experiencia UX/UI de tu negocio, el equipo técnico de <span className="text-white font-semibold">Revenge</span> está preparado para ejecutarlo.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-800">
              <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">100%</p>
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1">Soporte Headless</p>
              </div>
              <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">&lt; 3 mins</p>
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1">Carga en AWS Amplify</p>
              </div>
            </div>

            {/* Conversion Ready Notification */}
            <div className="p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 mt-0.5">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-neutral-200">Seguimiento de Conversiones Activo</p>
                <p className="mt-0.5 text-neutral-400">Este formulario despacha eventos <code className="text-neutral-300">fbq('track', 'Lead')</code> y push al dataLayer de GTM de manera nativa para medir el ROI de tu inversión en marketing.</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Form */}
          <div className="lg:col-span-7 bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-6">
                <div className="inline-flex p-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">¡Mensaje recibido con éxito!</h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
                    Gracias por ponerte en contacto con Revenge. El equipo de consultoría analizará tu requerimiento y te contactará en menos de 24 horas hábiles.
                  </p>
                </div>

                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl text-left max-w-md mx-auto space-y-2">
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Eventos de conversión simulados:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono font-bold text-amber-500">
                      GTM: Lead
                    </span>
                    <span className="px-2.5 py-1 rounded bg-pink-500/10 border border-pink-500/20 text-[10px] font-mono font-bold text-pink-400">
                      Meta Pixel: Lead
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-neutral-400">Comprueba el <span className="text-brand-orange">Marketing Pixel Helper</span> flotante en la parte inferior derecha para ver los logs y el payload enviado.</p>
                </div>

                <button
                  id="reset-form-btn"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer border border-neutral-700"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Enviar otra solicitud</span>
                </button>
              </div>
            ) : (
              <form id="lead-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Inputs Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Nombre completo *</span>
                    </label>
                    <input
                      id="form-name-input"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${
                        errors.fullName ? 'border-red-500/60 focus:ring-red-500/20' : 'border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                      }`}
                      placeholder="Ej. Baruch Bucay"
                    />
                    {errors.fullName && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Email corporativo *</span>
                    </label>
                    <input
                      id="form-email-input"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${
                        errors.email ? 'border-red-500/60 focus:ring-red-500/20' : 'border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                      }`}
                      placeholder="Ej. contacto@empresa.com"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Inputs Row 2: Phone & Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Teléfono / WhatsApp</span>
                    </label>
                    <input
                      id="form-phone-input"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20 focus:ring-1 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      placeholder="Ej. +52 55 1234 5678"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Nombre de tu Empresa *</span>
                    </label>
                    <input
                      id="form-company-input"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleFieldChange('company', e.target.value)}
                      className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${
                        errors.company ? 'border-red-500/60 focus:ring-red-500/20' : 'border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                      }`}
                      placeholder="Ej. Revenge Corp"
                    />
                    {errors.company && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.company}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Dropdowns Row: Size & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Colaboradores</span>
                    </label>
                    <select
                      id="form-company-size-select"
                      value={formData.companySize}
                      onChange={(e) => handleFieldChange('companySize', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20 focus:ring-1 rounded-xl px-4 py-3 text-sm text-white focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="1-10">1 a 10 personas</option>
                      <option value="11-50">11 a 50 personas</option>
                      <option value="51-200">51 a 200 personas</option>
                      <option value="200+">Más de 200 personas</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Servicio de Interés</span>
                    </label>
                    <select
                      id="form-service-select"
                      value={formData.service}
                      onChange={(e) => handleFieldChange('service', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20 focus:ring-1 rounded-xl px-4 py-3 text-sm text-white focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="ecommerce_shopify">eCommerce Shopify Partner</option>
                      <option value="ecommerce_tiendanube">eCommerce Tienda Nube Partner</option>
                      <option value="headless_contento">Migración CMS Contento (Headless)</option>
                      <option value="headless_contentful">Migración Contentful (Enterprise)</option>
                      <option value="design_research">Diseño UX/UI & Research</option>
                      <option value="integrations_dev">Desarrollo a Medida & Integraciones</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Presupuesto</span>
                    </label>
                    <select
                      id="form-budget-select"
                      value={formData.budget}
                      onChange={(e) => handleFieldChange('budget', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20 focus:ring-1 rounded-xl px-4 py-3 text-sm text-white focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="5k-15k">5K a 15K USD</option>
                      <option value="15k-50k">15K a 50K USD</option>
                      <option value="50k+">Más de 50K USD</option>
                    </select>
                  </div>
                </div>

                {/* Message TextArea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Detalles del Proyecto *</label>
                  <textarea
                    id="form-message-input"
                    value={formData.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    rows={4}
                    className={`w-full bg-neutral-950 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 resize-none ${
                      errors.message ? 'border-red-500/60 focus:ring-red-500/20' : 'border-neutral-800 focus:border-brand-orange/60 focus:ring-brand-orange/20'
                    }`}
                    placeholder="Cuéntanos sobre tus retos actuales, integraciones requeridas y tiempos estimados..."
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  id="submit-contact-form-btn"
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(255,94,58,0.3)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Procesando Lead...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Solicitud a Revenge</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
