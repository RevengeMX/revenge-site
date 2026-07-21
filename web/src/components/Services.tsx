'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Palette, 
  Search, 
  ShoppingBag, 
  Code2, 
  Cpu, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Zap, 
  Rocket, 
  ShieldCheck, 
  Database, 
  Smartphone, 
  Globe, 
  Workflow, 
  BarChart3,
  ChevronDown
} from 'lucide-react';
import { Service, MarketingEvent } from '../types';

interface ServicesProps {
  badgeText?: string;
  title?: string;
  description?: string;
  services?: Service[];
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Services({
  badgeText,
  title,
  description,
  services,
  theme = 'dark',
  onTrackEvent
}: ServicesProps) {
  const isLight = theme === 'light';
  const resolvedServices = (services || []).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const fallbackServices: Service[] = [
    {
      _id: 'srv_ecommerce',
      title: 'eCommerce de Alto Rendimiento',
      description: 'Soluciones transaccionales escalables y veloces que maximizan la conversión. Shopify, Tienda Nube e integraciones headless personalizadas.',
      icon: 'ShoppingBag',
      details: [
        'Desarrollo Storefront Headless (Shopify Storefront API)',
        'Migración sin fricción desde Magento, WooCommerce o VTEX',
        'Configuración avanzada de checkout y pasarelas locales',
        'Optimización de tasa de conversión (CRO) integrada'
      ]
    },
    {
      _id: 'srv_headless',
      title: 'CMS Headless & Arquitectura Modular',
      description: 'Sistemas de contenido modernos con Sanity y Contentful. Separa la capa de datos de la visualización para lograr velocidad e independencia editorial.',
      icon: 'Layers',
      details: [
        'Implementación del SDK oficial de Sanity CMS',
        'Mapeo estructurado de bloques visuales y ContentTypes',
        'Generación de contenido estático incremental (ISR) en Next.js',
        'Auditorías de SEO técnico y Core Web Vitals en AWS'
      ]
    },
    {
      _id: 'srv_design',
      title: 'Diseño de Experiencia & Producto',
      description: 'Interfaces estéticas, intuitivas y alineadas con la psicología de consumo de tu audiencia. Figma de alta fidelidad y sistemas de diseño reutilizables.',
      icon: 'Palette',
      details: [
        'Diseño UX/UI responsivo con enfoque Mobile-First',
        'Prototipos interactivos de alta definición para validación',
        'Sistemas de diseño (Design Tokens, Componentes UI)',
        'Micro-animaciones CSS3/Tailwind y transiciones fluidas'
      ]
    },
    {
      _id: 'srv_seo',
      title: 'SEO Técnico & Analítica Avanzada',
      description: 'Estrategias de posicionamiento basadas en velocidad y arquitectura de datos. Configuración de GTM, GA4, Meta Pixel y atribución precisa.',
      icon: 'Search',
      details: [
        'Auditoría y optimización de métricas Core Web Vitals',
        'Configuración de Google Tag Manager & GA4 E-commerce',
        'Implementación de Server-Side Tracking (CAPI Meta/TikTok)',
        'Estructuración de datos Schema.org (JSON-LD)'
      ]
    }
  ];

  const displayServices = resolvedServices.length > 0 ? resolvedServices : fallbackServices;
  const currentActiveService = displayServices[activeIndex] || displayServices[0];

  const handleServiceClick = (index: number, serviceId: string, serviceTitle: string) => {
    setActiveIndex(index === activeIndex ? -1 : index);
    onTrackEvent({
      platform: 'Both',
      eventName: 'service_explore',
      data: {
        service_index: index,
        service_id: serviceId,
        service_name: serviceTitle,
        category: 'consultoría_tecnológica_revenge'
      }
    });
  };

  const getIcon = (iconName?: string, isActive?: boolean) => {
    const activeColor = 'text-brand-orange';
    const inactiveColor = isLight ? 'text-neutral-600' : 'text-neutral-400';
    const cls = `w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${isActive ? activeColor : inactiveColor}`;

    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className={cls} />;
      case 'Layers': return <Layers className={cls} />;
      case 'Palette': return <Palette className={cls} />;
      case 'Search': return <Search className={cls} />;
      case 'Code2': return <Code2 className={cls} />;
      case 'Zap': return <Zap className={cls} />;
      case 'Rocket': return <Rocket className={cls} />;
      case 'ShieldCheck': return <ShieldCheck className={cls} />;
      case 'Database': return <Database className={cls} />;
      case 'Smartphone': return <Smartphone className={cls} />;
      case 'Globe': return <Globe className={cls} />;
      case 'Workflow': return <Workflow className={cls} />;
      case 'BarChart3': return <BarChart3 className={cls} />;
      default: return <Cpu className={cls} />;
    }
  };

  return (
    <section id="services-section" className={`py-16 sm:py-24 relative overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 text-neutral-800' : 'bg-neutral-950 text-white'
    }`}>
      {/* Background Radial Glow */}
      <div className={`absolute top-1/2 left-0 w-96 h-96 rounded-full filter blur-[150px] pointer-events-none ${
        isLight ? 'bg-brand-orange/10' : 'bg-brand-orange/5'
      }`}></div>
      <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-[160px] pointer-events-none ${
        isLight ? 'bg-brand-red/10' : 'bg-brand-red/5'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{badgeText || 'Capacidades de Consultoría Digital'}</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
            {title || 'Estrategias de Consultoría Tecnológica Modular'}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            {description || 'Abordamos tu ecosistema tecnológico de extremo a extremo. Al implementar arquitecturas modulares logramos velocidad extrema e independencia editorial total.'}
          </p>
        </div>

        {/* DESKTOP VIEW: Lateral Card Deck Layout (hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Vertical Stacked Selector Tabs (5 cols) */}
          <div className="col-span-5 space-y-4">
            {displayServices.map((service, idx) => {
              const isActive = activeIndex === idx;
              const serviceKey = service._id || service._key || service.id || `srv-${idx}`;

              return (
                <div
                  id={`desktop-service-tab-${serviceKey}`}
                  key={serviceKey}
                  onClick={() => handleServiceClick(idx, service._id || service.id || `srv_${idx}`, service.title)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative group flex items-start gap-4 ${
                    isActive
                      ? isLight
                        ? 'bg-white border-neutral-300 shadow-xl scale-[1.02] ring-1 ring-neutral-900/10'
                        : 'bg-neutral-900/90 border-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-[1.02] ring-1 ring-brand-orange/30'
                      : isLight
                        ? 'bg-white/60 border-neutral-200/80 hover:bg-white hover:border-neutral-300 opacity-80 hover:opacity-100'
                        : 'bg-neutral-950/60 border-neutral-850 hover:bg-neutral-900/50 hover:border-neutral-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`p-3 rounded-xl border shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-brand-orange/10 border-brand-orange/30' 
                      : isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-neutral-900 border-neutral-800'
                  }`}>
                    {getIcon(service.icon, isActive)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className={`text-base font-bold truncate ${
                        isActive 
                          ? isLight ? 'text-neutral-900' : 'text-white' 
                          : isLight ? 'text-neutral-700' : 'text-neutral-300'
                      }`}>
                        {service.title}
                      </h3>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isActive ? 'rotate-90 text-brand-orange' : 'text-neutral-500 opacity-0 group-hover:opacity-100'
                      }`} />
                    </div>
                    <p className={`text-xs line-clamp-2 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Hero Active Card Details (7 cols) */}
          <div className="col-span-7 sticky top-28">
            {currentActiveService && (
              <div className={`p-8 sm:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden shadow-2xl ${
                isLight 
                  ? 'bg-white border-neutral-200 text-neutral-900 ring-1 ring-neutral-900/5' 
                  : 'bg-neutral-900/80 border-neutral-800 text-white backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
              }`}>
                {/* Accent Top Line Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-red-500 to-brand-orange"></div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3.5 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange shadow-inner">
                        {getIcon(currentActiveService.icon, true)}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold tracking-widest text-brand-orange uppercase">
                          Módulo de Servicio #{activeIndex + 1}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-0.5">
                          {currentActiveService.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className={`text-base leading-relaxed ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    {currentActiveService.description}
                  </p>

                  <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 font-semibold">
                      Entregables & Alcances Clave:
                    </h4>
                    
                    {currentActiveService.details && currentActiveService.details.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {currentActiveService.details.map((detail, idx) => (
                          <div 
                            key={idx} 
                            className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                              isLight 
                                ? 'bg-neutral-50/80 border-neutral-200/80 text-neutral-800' 
                                : 'bg-neutral-950/60 border-neutral-850 text-neutral-200'
                            }`}
                          >
                            <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-medium leading-snug">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>

        </div>

        {/* MOBILE VIEW: iOS Wallet Accordion Cards (Clean, Non-overlapping Layout) */}
        <div className="lg:hidden space-y-3">
          {displayServices.map((service, idx) => {
            const isActive = activeIndex === idx;
            const serviceKey = service._id || service._key || service.id || `mobile-srv-${idx}`;

            return (
              <div
                id={`mobile-service-card-${serviceKey}`}
                key={serviceKey}
                onClick={() => handleServiceClick(idx, service._id || service.id || `srv_${idx}`, service.title)}
                className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? isLight
                      ? 'bg-white border-neutral-300 ring-2 ring-neutral-900/10 shadow-xl'
                      : 'bg-neutral-900 border-neutral-700 ring-2 ring-brand-orange/40 shadow-2xl'
                    : isLight
                      ? 'bg-white/80 border-neutral-200/90 shadow-sm hover:bg-white'
                      : 'bg-neutral-900/50 border-neutral-800 shadow-md hover:bg-neutral-900/80'
                }`}
              >
                {/* Header Header Bar */}
                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${
                      isActive 
                        ? 'bg-brand-orange/10 border-brand-orange/30' 
                        : isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-neutral-950 border-neutral-800'
                    }`}>
                      {getIcon(service.icon, isActive)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-orange font-bold">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className={`text-base font-bold truncate ${
                        isActive 
                          ? isLight ? 'text-neutral-950' : 'text-white' 
                          : isLight ? 'text-neutral-800' : 'text-neutral-200'
                      }`}>
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                    isActive ? 'bg-brand-orange/10 text-brand-orange rotate-180' : 'text-neutral-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content Collapsible Panel */}
                {isActive && (
                  <div className="px-4 pb-5 pt-1 border-t border-neutral-100 dark:border-neutral-800/80 space-y-4 animate-fadeIn">
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
                      {service.description}
                    </p>

                    {service.details && service.details.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-850">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                          Entregables:
                        </span>
                        {service.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs">
                            <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className={isLight ? 'text-neutral-700' : 'text-neutral-300'}>{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
