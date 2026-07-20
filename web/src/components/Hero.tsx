import React from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles, Terminal } from 'lucide-react';
import { LandingPageData, MarketingEvent } from '../types';
import Logo from './Logo';

interface HeroProps {
  previewData: {
    heroTitle: string;
    heroSubtitle: string;
    showPromoBadge: boolean;
    promoBadgeText?: string;
    bullets?: string[];
    buttons?: {
      label?: string;
      href?: string;
      style?: 'primary' | 'secondary' | 'tertiary';
    }[];
    logoIcon?: any;
    logoText?: string;
  };
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}


export default function Hero({ previewData, onTrackEvent }: HeroProps) {
  const handleCtaClick = (buttonType: string) => {
    onTrackEvent({
      platform: 'Both',
      eventName: 'hero_cta_click',
      data: {
        cta_type: buttonType,
        destination: '#contact-section',
        cms_revision: 'sanity_live_v1'
      }
    });
  };

  return (
    <section className="relative pt-12 pb-24 sm:pb-32 bg-neutral-950 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-radial-at-t from-red-500/10 via-transparent to-transparent pointer-events-none filter blur-3xl"></div>
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual copy & actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Promo Badge from CMS */}
            {previewData?.showPromoBadge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700 transition-all text-xs font-mono">
                <span className="flex h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-medium tracking-wide">
                  Sanity CMS API: <span className="text-white font-bold font-mono">{previewData.promoBadgeText || 'promo_badge_text'}</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
              </div>
            )}

            {/* Title from CMS with gradient accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none sm:leading-[1.1]">
              {(previewData?.heroTitle || 'Llevamos tus ideas al siguiente nivel tecnológico con Revenge.').split('Revenge').map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <span className="bg-gradient-to-r from-brand-orange via-brand-red to-orange-500 bg-clip-text text-transparent font-extrabold">
                      Revenge
                    </span>
                  )}
                  {part}
                </React.Fragment>
              ))}
            </h1>

            {/* Subtitle from CMS */}
            <p className="text-neutral-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {previewData?.heroSubtitle}
            </p>

            {/* Trust checkmarks */}
            {previewData?.bullets && previewData.bullets.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-neutral-300 font-mono pt-2">
                {previewData.bullets.map((bullet, idx) => {
                  const colors = ['text-brand-orange', 'text-brand-red', 'text-blue-400'];
                  const iconColor = colors[idx % colors.length];
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-4 h-4 ${iconColor}`} />
                      <span>{bullet}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Action buttons */}
            {previewData?.buttons && previewData.buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full">
                {previewData.buttons.map((btn, idx) => {
                  if (!btn.label) return null;
                  
                  let styleClasses = '';
                  let icon = null;

                  if (btn.style === 'secondary') {
                    styleClasses = 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer';
                    icon = <ChevronRight className="w-4 h-4" />;
                  } else if (btn.style === 'tertiary') {
                    styleClasses = 'bg-transparent hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer';
                  } else { // default 'primary'
                    styleClasses = 'bg-gradient-to-r from-brand-orange to-brand-red hover:shadow-[0_0_25px_rgba(255,94,58,0.35)] text-white text-xs font-extrabold uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer';
                    icon = <ArrowUpRight className="w-4 h-4" />;
                  }

                  return (
                    <a
                      key={idx}
                      id={`hero-cta-btn-${idx}`}
                      href={btn.href || '#'}
                      onClick={() => handleCtaClick(btn.label || 'button')}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 ${styleClasses}`}
                    >
                      <span>{btn.label}</span>
                      {icon}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Visual illustration or Mockup with logo icon */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Outer rings */}
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] border border-neutral-800 rounded-full animate-spin [animation-duration:40s] pointer-events-none"></div>
            <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] border border-dashed border-neutral-800/60 rounded-full animate-spin [animation-duration:20s] [animation-direction:reverse] pointer-events-none"></div>
            
            {/* Center glowing logo sphere */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-brand-red/10 via-brand-orange/5 to-transparent border border-neutral-800 flex items-center justify-center shadow-[0_0_80px_rgba(255,94,58,0.1)] p-8 group">
              <div className="absolute inset-0.5 rounded-full bg-neutral-950/95 -z-10"></div>
              
              <Logo variant="icon" logoIcon={previewData.logoIcon} logoText={previewData.logoText} className="h-32 sm:h-36 w-auto group-hover:scale-105 transition-transform duration-500" />

              {/* Floating tags */}
              <div className="absolute -top-3 -right-3 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-[10px] font-mono text-neutral-400 flex items-center gap-1.5 shadow-lg select-none">
                <Terminal className="w-3.5 h-3.5 text-brand-orange" />
                <span>Next.js SSR</span>
              </div>

              <div className="absolute -bottom-3 -left-3 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-[10px] font-mono text-neutral-400 flex items-center gap-1.5 shadow-lg select-none">
                <Sparkles className="w-3.5 h-3.5 text-brand-red animate-bounce" />
                <span>Headless CMS</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
