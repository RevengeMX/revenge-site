import React from 'react';
import { Handshake, ShoppingBag, Globe, Database, ExternalLink, ArrowRight } from 'lucide-react';
import { Partner, MarketingEvent } from '../types';

interface PartnersProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  partners: Partner[];
  integrationCalloutTitle?: string;
  integrationCalloutDescription?: string;
  integrationCalloutButtonLabel?: string;
  integrationCalloutButtonLink?: string;
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Partners({
  badgeText,
  title,
  subtitle,
  partners,
  integrationCalloutTitle,
  integrationCalloutDescription,
  integrationCalloutButtonLabel,
  integrationCalloutButtonLink,
  theme = 'dark',
  onTrackEvent
}: PartnersProps) {
  const isLight = theme === 'light';

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
    <section id="partners-section" className={`py-20 border-t transition-colors duration-300 ${
      isLight ? 'bg-white border-neutral-200 text-neutral-800' : 'bg-neutral-900 border-neutral-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-3">
                <Handshake className="w-3.5 h-3.5" />
                <span>{badgeText}</span>
              </div>
            )}
            {title && (
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                {title}
              </h2>
            )}
          </div>
          {subtitle && (
            <p className={`text-xs sm:text-sm max-w-md font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(partners || []).filter(Boolean).map((partner, idx) => {
            const partnerKey = partner._id || partner._key || partner.name || `partner-${idx}`;
            const cardId = `partner-card-${partnerKey}`;
            
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
                key={partnerKey}
                onClick={() => handlePartnerClick(partner.name || `partner_${idx}`)}
                className={`rounded-2xl p-6 border transition-all cursor-pointer group flex flex-col justify-between ${
                  isLight ? 'bg-neutral-50/80 border-neutral-200 shadow-sm hover:shadow-md' : 'bg-neutral-950/60 border-neutral-800'
                } ${accentClass}`}
              >
                <div className="space-y-4">
                  {/* Logo/Icon Header representation */}
                  <div className="flex items-center justify-between">
                    {partner.logoImage?.asset?.url ? (
                      <div className="h-10 px-2.5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-center justify-center overflow-hidden">
                        <img 
                          src={partner.logoImage.asset.url} 
                          alt={partner.name || 'Partner Logo'} 
                          loading="lazy"
                          decoding="async"
                          className="max-h-6 max-w-[80px] object-contain"
                        />
                      </div>
                    ) : partner.logoType === 'contento' ? (
                      <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center font-bold font-mono">
                        C
                      </div>
                    ) : partner.logoType === 'shopify' ? (
                      <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                    ) : partner.logoType === 'tiendanube' ? (
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                    ) : partner.logoType === 'contentful' ? (
                      <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 flex items-center justify-center">
                        <Database className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center font-bold font-mono">
                        {partner.name ? partner.name.charAt(0) : 'P'}
                      </div>
                    )}

                    <span className={`text-[10px] font-mono transition-colors flex items-center gap-1 ${
                      isLight ? 'text-neutral-500 group-hover:text-neutral-900' : 'text-neutral-500 group-hover:text-neutral-300'
                    }`}>
                      <span>Partner</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Partner Details */}
                  <div className="space-y-2">
                    <h3 className={`text-base font-bold group-hover:text-brand-orange transition-colors ${
                      isLight ? 'text-neutral-900' : 'text-white'
                    }`}>
                      {partner.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500">
                      {partner.role}
                    </p>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      {partner.description}
                    </p>
                  </div>
                </div>

                {/* Interaction Indicator */}
                <div className={`pt-5 border-t mt-6 flex items-center gap-1.5 text-[10px] font-mono transition-colors ${
                  isLight ? 'border-neutral-200 text-neutral-500 group-hover:text-neutral-900' : 'border-neutral-900/40 text-neutral-500 group-hover:text-white'
                }`}>
                  <span>Ver track de conversión</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            );
          })}
        </div>

        {/* Integration Callout */}
        {(integrationCalloutTitle || integrationCalloutDescription || integrationCalloutButtonLabel) && (
          <div className={`mt-8 border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
            isLight ? 'bg-neutral-100/70 border-neutral-200' : 'bg-neutral-950/40 border-neutral-800'
          }`}>
            <div className="text-xs space-y-0.5">
              {integrationCalloutTitle && (
                <span className={`font-bold block ${isLight ? 'text-neutral-900' : 'text-neutral-300'}`}>
                  {integrationCalloutTitle}
                </span>
              )}
              {integrationCalloutDescription && (
                <span className={isLight ? 'text-neutral-600' : 'text-neutral-400'}>
                  {integrationCalloutDescription}
                </span>
              )}
            </div>
            {integrationCalloutButtonLabel && (
              <a
                id="consultancy-direct-btn"
                href={integrationCalloutButtonLink || '#contact-section'}
                className="text-xs font-bold text-brand-orange hover:text-white transition-colors font-mono uppercase tracking-wider flex items-center gap-1 shrink-0"
              >
                <span>{integrationCalloutButtonLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
