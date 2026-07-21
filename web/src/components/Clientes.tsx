import React from 'react';
import { Award, Quote, ShoppingBag, Globe, Smartphone } from 'lucide-react';
import { ClientCase, MarketingEvent } from '../types';

interface ClientesProps {
  clientCases: ClientCase[];
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Clientes({ clientCases, theme = 'dark', onTrackEvent }: ClientesProps) {
  const isLight = theme === 'light';

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
    <section id="clientes-section" className={`py-24 border-t relative overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-white border-neutral-200 text-neutral-800' : 'bg-neutral-900 border-neutral-800 text-white'
    }`}>
      {/* Absolute decorative background layout */}
      <div className={`absolute top-0 right-1/4 w-[500px] h-[500px] bg-radial-at-t pointer-events-none filter blur-3xl ${
        isLight ? 'from-brand-orange/10 via-transparent to-transparent' : 'from-brand-orange/5 via-transparent to-transparent'
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>Casos de Éxito • Revenge</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              Resultados Reales con Clientes Satisfechos
            </h2>
            <p className={`text-sm sm:text-base ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Colaboramos mano a mano con empresas en crecimiento y corporativos para construir canales digitales sólidos. No se trata solo de líneas de código, sino de métricas tangibles de negocio.
            </p>
          </div>

          {/* Quick Metrics Pillar */}
          <div className={`flex items-center gap-6 border p-5 rounded-2xl shrink-0 font-mono text-xs ${
            isLight ? 'bg-neutral-100/70 border-neutral-200' : 'bg-neutral-950/60 border-neutral-800'
          }`}>
            <div className="text-center">
              <span className={`block text-xl font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>20+</span>
              <span className={`text-[10px] uppercase tracking-wider mt-1 ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>Proyectos Live</span>
            </div>
            <div className={`h-8 w-px ${isLight ? 'bg-neutral-300' : 'bg-neutral-800'}`}></div>
            <div className="text-center">
              <span className="block text-xl font-bold text-green-500">+45%</span>
              <span className={`text-[10px] uppercase tracking-wider mt-1 ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>Avg ROI Boost</span>
            </div>
            <div className={`h-8 w-px ${isLight ? 'bg-neutral-300' : 'bg-neutral-800'}`}></div>
            <div className="text-center">
              <span className={`block text-xl font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>NPS 9.8</span>
              <span className={`text-[10px] uppercase tracking-wider mt-1 ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>Calificación</span>
            </div>
          </div>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(clientCases || []).filter(Boolean).map((client, idx) => {
            const clientKey = client._id || client._key || client.name || `client-${idx}`;
            return (
              <div
                id={`client-card-${clientKey}`}
                key={clientKey}
                onClick={() => handleClientEngagement(client.name || `client_${idx}`, client.name || `client_${idx}`)}
              className={`rounded-3xl p-6 sm:p-8 transition-all group cursor-pointer flex flex-col justify-between space-y-6 border ${
                isLight 
                  ? 'bg-neutral-50/80 border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300' 
                  : 'bg-neutral-950 border-neutral-800/80 hover:border-neutral-700/80 hover:bg-neutral-950/90'
              }`}
            >
              <div className="space-y-5">
                {/* Header: Tag and Client Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {client.tag === 'eCommerce' && <ShoppingBag className="w-4 h-4 text-green-500" />}
                    {client.tag === 'Headless' && <Globe className="w-4 h-4 text-brand-orange" />}
                    {client.tag === 'Mobile' && <Smartphone className="w-4 h-4 text-blue-500" />}
                    <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${
                      isLight ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {client.tag || 'Case Study'}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono transition-colors ${
                    isLight ? 'text-neutral-500 group-hover:text-neutral-800' : 'text-neutral-600 group-hover:text-neutral-400'
                  }`}>
                    {client.industry}
                  </span>
                </div>

                {/* Big Metric Callout */}
                <div className="py-2">
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
                    {client.metric}
                  </div>
                  <div className={`text-xs font-mono mt-1 uppercase tracking-wider ${
                    isLight ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    {client.metricLabel}
                  </div>
                </div>

                {/* Case description */}
                <div className="space-y-3">
                  <h3 className={`text-lg font-bold group-hover:text-brand-orange transition-colors ${
                    isLight ? 'text-neutral-900' : 'text-white'
                  }`}>
                    {client.name}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    {client.summary}
                  </p>
                </div>

                {/* Testimonial Quote */}
                {client.quote && (
                  <div className={`border rounded-2xl p-4 relative space-y-2.5 ${
                    isLight ? 'bg-white border-neutral-200' : 'bg-neutral-900/40 border-neutral-800/60'
                  }`}>
                    <Quote className={`w-8 h-8 absolute -top-3 -left-1 stroke-[1.5] ${
                      isLight ? 'text-neutral-200' : 'text-neutral-800'
                    }`} />
                    <p className={`text-xs italic relative z-10 leading-relaxed font-sans ${
                      isLight ? 'text-neutral-700' : 'text-neutral-300'
                    }`}>
                      "{client.quote}"
                    </p>
                    <div className={`pt-2 border-t flex items-center justify-between text-[10px] font-mono ${
                      isLight ? 'border-neutral-200' : 'border-neutral-800/40'
                    }`}>
                      <span className={`font-bold ${isLight ? 'text-neutral-900' : 'text-neutral-200'}`}>{client.author}</span>
                      <span className={isLight ? 'text-neutral-500' : 'text-neutral-500'}>{client.role}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Log Verification Footer */}
              <div className={`pt-4 border-t flex items-center justify-between text-[9px] font-mono ${
                isLight ? 'border-neutral-200 text-neutral-500' : 'border-neutral-900 text-neutral-500'
              }`}>
                <span>EVENT: GTM & Meta Pixel Lead Verification</span>
                <span className="text-brand-orange group-hover:text-brand-red transition-colors">Tracked</span>
              </div>
            </div>
          );
        })}
        </div>

      </div>
    </section>
  );
}
