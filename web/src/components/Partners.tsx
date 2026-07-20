import React from 'react';
import { Handshake, ShoppingBag, Globe, Database, ExternalLink, ArrowRight } from 'lucide-react';
import { Partner, MarketingEvent } from '../types';

interface PartnersProps {
  title: string;
  partners: Partner[];
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Partners({ title, partners, onTrackEvent }: PartnersProps) {
  const handlePartnerClick = (partnerName: string) => {
    onTrackEvent({
      platform: 'Both',
      eventName: 'partner_engagement',
      data: {
        partner_id: partnerName.toLowerCase().replace(/\s+/g, '_'),
        partner_full_name: partnerName,
        action: 'click_details',
        timestamp_epoch: Date.now()
      }
    });
  };

  return (
    <section id="partners-section" className="py-20 bg-neutral-900 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-3">
              <Handshake className="w-3.5 h-3.5" />
              <span>Sinergia Tecnológica</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {title || 'Nuestros Partners Oficiales'}
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-mono">
            * Alianzas directas con los líderes de la industria para asegurar soporte de primer nivel e implementaciones robustas.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(partners || []).filter(Boolean).map((partner) => {
            const cardId = `partner-card-${partner.name.toLowerCase().replace(/\s+/g, '-')}`;
            
            // Map accent styling based on logoType or explicit class
            let accentClass = 'border-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]';
            if (partner.logoType === 'shopify') {
              accentClass = 'border-green-500/20 hover:border-green-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]';
            } else if (partner.logoType === 'tiendanube') {
              accentClass = 'border-blue-500/20 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]';
            } else if (partner.logoType === 'contentful') {
              accentClass = 'border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]';
            }

            return (
              <div
                id={cardId}
                key={partner._id}
                onClick={() => handlePartnerClick(partner.name)}
                className={`bg-neutral-950/60 rounded-2xl p-6 border transition-all cursor-pointer group flex flex-col justify-between ${accentClass}`}
              >
                <div className="space-y-4">
                  {/* Logo/Icon Header representation */}
                  <div className="flex items-center justify-between">
                    {partner.logoType === 'contento' && (
                      <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center font-bold font-mono">
                        C
                      </div>
                    )}
                    {partner.logoType === 'shopify' && (
                      <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                    )}
                    {partner.logoType === 'tiendanube' && (
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                    )}
                    {partner.logoType === 'contentful' && (
                      <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 flex items-center justify-center">
                        <Database className="w-5 h-5" />
                      </div>
                    )}

                    <span className="text-[10px] text-neutral-500 font-mono group-hover:text-neutral-300 transition-colors flex items-center gap-1">
                      <span>Partner</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Partner Details */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-brand-orange transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500">
                      {partner.role}
                    </p>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>

                {/* Interaction Indicator */}
                <div className="pt-5 border-t border-neutral-900/40 mt-6 flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono group-hover:text-white transition-colors">
                  <span>Ver track de conversión</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            );
          })}
        </div>

        {/* Integration Callout */}
        <div className="mt-8 bg-neutral-950/40 border border-neutral-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-xs">
            <span className="font-bold text-neutral-300 block">¿Usas otro ecosistema tecnológico?</span>
            <span className="text-neutral-400">Integramos ERPs locales, SAP, pasarelas de pago (Stripe, Mercado Pago) y sistemas CRM de forma segura.</span>
          </div>
          <a
            id="consultancy-direct-btn"
            href="#contact-section"
            className="text-xs font-bold text-brand-orange hover:text-white transition-colors font-mono uppercase tracking-wider flex items-center gap-1 shrink-0"
          >
            <span>Consultar integraciones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
