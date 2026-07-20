import React from 'react';
import { Award, Quote, ShoppingBag, Globe, Smartphone } from 'lucide-react';
import { ClientCase, MarketingEvent } from '../types';

interface ClientesProps {
  clientCases: ClientCase[];
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Clientes({ clientCases, onTrackEvent }: ClientesProps) {
  const handleClientEngagement = (caseId: string, caseName: string) => {
    onTrackEvent({
      platform: 'Both',
      eventName: 'case_study_click',
      data: {
        case_id: caseId,
        case_name: caseName,
        action: 'expand_case_details'
      }
    });
  };

  return (
    <section id="clientes-section" className="py-24 bg-neutral-900 border-t border-neutral-800 relative overflow-hidden">
      {/* Absolute decorative background layout */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-radial-at-t from-brand-orange/5 via-transparent to-transparent pointer-events-none filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>Casos de Éxito • Revenge</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Resultados Reales con Clientes Satisfechos
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              Colaboramos mano a mano con empresas en crecimiento y corporativos para construir canales digitales sólidos. No se trata solo de líneas de código, sino de métricas tangibles de negocio.
            </p>
          </div>

          {/* Quick Metrics Pillar */}
          <div className="flex items-center gap-6 bg-neutral-950/60 border border-neutral-800 p-5 rounded-2xl shrink-0 font-mono text-xs">
            <div className="text-center">
              <span className="block text-xl font-bold text-white">20+</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Proyectos Live</span>
            </div>
            <div className="h-8 w-px bg-neutral-800"></div>
            <div className="text-center">
              <span className="block text-xl font-bold text-green-400">+45%</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Avg ROI Boost</span>
            </div>
            <div className="h-8 w-px bg-neutral-800"></div>
            <div className="text-center">
              <span className="block text-xl font-bold text-white">NPS 9.8</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Calificación</span>
            </div>
          </div>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(clientCases || []).filter(Boolean).map((client) => (
            <div
              id={`client-card-${client._id}`}
              key={client._id}
              onClick={() => handleClientEngagement(client._id, client.name)}
              className="bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700/80 rounded-3xl p-6 sm:p-8 transition-all hover:bg-neutral-950/90 group cursor-pointer flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                {/* Header: Tag and Client Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {client.tag === 'eCommerce' && <ShoppingBag className="w-4 h-4 text-green-500" />}
                    {client.tag === 'Headless' && <Globe className="w-4 h-4 text-brand-orange" />}
                    {client.tag === 'Mobile' && <Smartphone className="w-4 h-4 text-blue-400" />}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                      {client.tag}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-600 font-mono group-hover:text-neutral-400 transition-colors">
                    {client.industry}
                  </span>
                </div>

                {/* Big Metric Callout */}
                <div className="py-2">
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                    {client.metric}
                  </div>
                  <div className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                    {client.metricLabel}
                  </div>
                </div>

                {/* Case description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {client.summary}
                  </p>
                </div>

                {/* Testimonial Quote */}
                <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-4 relative space-y-2.5">
                  <Quote className="w-8 h-8 text-neutral-800 absolute -top-3 -left-1 stroke-[1.5]" />
                  <p className="text-xs text-neutral-300 italic relative z-10 leading-relaxed font-sans">
                    "{client.quote}"
                  </p>
                  <div className="pt-2 border-t border-neutral-800/40 flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-neutral-200">{client.author}</span>
                    <span className="text-neutral-500">{client.role}</span>
                  </div>
                </div>
              </div>

              {/* Action Log Verification Footer */}
              <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-[9px] font-mono text-neutral-500">
                <span>EVENT: Sanity Lead Verification</span>
                <span className="text-brand-orange group-hover:text-white transition-colors">Tracked</span>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logo Stripe (Minimalist and premium) */}
        <div className="mt-16 pt-12 border-t border-neutral-800/60 text-center space-y-6">
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Empresas e innovadores que confían en nosotros</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 hover:opacity-60 transition-opacity">
            <span className="text-base font-extrabold text-white tracking-widest">NEXU</span>
            <span className="text-base font-bold text-white tracking-wider">STELLAR.co</span>
            <span className="text-base font-mono text-white">GLOBAL_BEVERAGE</span>
            <span className="text-base font-semibold text-white tracking-wide">AVANT_GARDE</span>
          </div>
        </div>

      </div>
    </section>
  );
}
