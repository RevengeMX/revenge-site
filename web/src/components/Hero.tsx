import React from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { stegaClean } from 'next-sanity';
import { MarketingEvent } from '../types';
import HeroVisual from './HeroVisual';

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
    visualType?: 'none' | 'image' | 'video' | 'interactive';
    visualImage?: { asset?: { url?: string; metadata?: { dimensions?: { width?: number; height?: number } } } };
    visualVideoFile?: { asset?: { url?: string } };
    visualVideoUrl?: string;
    visualPosition?: 'background' | 'right' | 'left' | 'below';
    logoIcon?: any;
    logoText?: string;
  };
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Hero({ previewData, theme = 'dark', onTrackEvent }: HeroProps) {
  const isLight = theme === 'light';
  // Stega injects invisible content-source-map characters into string
  // fields in draft mode — must clean before using them in comparisons,
  // only rendering them as text is safe to leave encoded.
  const visualType = stegaClean(previewData.visualType);
  const hasVisual = Boolean(visualType && visualType !== 'none');
  const position = stegaClean(previewData.visualPosition) || 'below';
  const isBackground = hasVisual && position === 'background';
  const isSplit = hasVisual && (position === 'right' || position === 'left');

  const handleCtaClick = (buttonType: string) => {
    onTrackEvent({
      platform: 'Both',
      eventName: 'hero_cta_click',
      data: {
        cta_type: buttonType,
        destination: '#contact-section',
        cms_revision: 'contento_live_v2'
      }
    });
  };

  const textContent = (
    <div className={`space-y-6 flex flex-col ${isSplit ? 'items-start text-left' : 'items-center text-center max-w-4xl mx-auto'}`}>
      {previewData.showPromoBadge && (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono shadow-md backdrop-blur-md transition-all ${
          isLight
            ? 'bg-white border border-neutral-300 text-neutral-800 hover:border-neutral-400'
            : 'bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
        }`}>
          <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-pulse"></span>
          <span className="text-xs font-medium tracking-wide">
            {previewData.promoBadgeText || 'Nueva era digital • Revenge v2'}
          </span>
          <ChevronRight className={`w-3.5 h-3.5 ${isLight ? 'text-neutral-400' : 'text-neutral-500'}`} />
        </div>
      )}

      <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none sm:leading-[1.08] ${isSplit ? '' : 'max-w-3xl'} ${
        isLight ? 'text-neutral-900' : 'text-white'
      }`}>
        {previewData.heroTitle ? (
          previewData.heroTitle.split('Revenge').map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <span className="bg-gradient-to-r from-brand-orange via-brand-red to-orange-500 bg-clip-text text-transparent font-extrabold">
                  Revenge
                </span>
              )}
              {part}
            </React.Fragment>
          ))
        ) : (
          <>Transformación Digital con <span className="bg-gradient-to-r from-brand-orange via-brand-red to-orange-500 bg-clip-text text-transparent font-extrabold">Revenge</span></>
        )}
      </h1>

      <p className={`text-base sm:text-lg lg:text-xl leading-relaxed font-sans ${isSplit ? '' : 'max-w-2xl mx-auto'} ${
        isLight ? 'text-neutral-600' : 'text-neutral-400'
      }`}>
        {previewData.heroSubtitle || 'Diseñamos e implementamos ecosistemas web ultra-rápidos y plataformas transaccionales de alto rendimiento para marcas líderes.'}
      </p>

      <div className={`flex flex-col sm:flex-row items-center gap-4 pt-2 w-full ${isSplit ? '' : 'justify-center max-w-md mx-auto'}`}>
        {previewData.buttons && previewData.buttons.length > 0 ? (
          previewData.buttons.map((btn, idx) => (
            <a
              key={idx}
              id={`hero-cta-${idx}`}
              href={btn.href || '#contact-section'}
              onClick={() => handleCtaClick(btn.style || 'primary')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer border ${
                btn.style === 'secondary'
                  ? isLight
                    ? 'bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 shadow-sm'
                    : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300'
                  : isLight
                    ? 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 hover:shadow-[0_6px_25px_rgba(255,94,58,0.45)]'
                    : 'bg-white text-neutral-950 border-white hover:bg-neutral-100 hover:shadow-[0_6px_25px_rgba(255,94,58,0.45)]'
              }`}
            >
              <span>{btn.label || 'Iniciar Proyecto'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ))
        ) : (
          <>
            <a
              id="hero-primary-cta"
              href="#contact-section"
              onClick={() => handleCtaClick('primary')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer border shadow-sm ${
                isLight
                  ? 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 hover:shadow-[0_6px_25px_rgba(255,94,58,0.45)]'
                  : 'bg-white text-neutral-950 border-white hover:bg-neutral-100 hover:shadow-[0_6px_25px_rgba(255,94,58,0.45)]'
              }`}
            >
              <span>Comenzar Proyecto</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              id="hero-secondary-cta"
              href="#services-section"
              onClick={() => handleCtaClick('secondary')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer border ${
                isLight
                  ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800 shadow-sm'
                  : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300'
              }`}
            >
              <span>Ver Servicios</span>
            </a>
          </>
        )}
      </div>

      <div className={`flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono pt-4 border-t w-full ${isSplit ? '' : 'justify-center max-w-2xl mx-auto'} ${
        isLight ? 'border-neutral-200 text-neutral-600' : 'border-neutral-900/80 text-neutral-400'
      }`}>
        {(previewData.bullets && previewData.bullets.length > 0
          ? previewData.bullets
          : ['Shopify & Tienda Nube Partners', 'Estructura Headless CMS', 'Despliegue AWS Amplify CI/CD']
        ).map((bullet, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-orange" />
            <span>{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={`relative pt-16 pb-24 sm:pb-32 overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 text-neutral-800' : 'bg-neutral-950 text-neutral-200'
    }`}>
      {/* Background radial glows */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-radial-at-t pointer-events-none filter blur-3xl ${
        isLight ? 'from-red-500/5 via-brand-orange/5 to-transparent' : 'from-red-500/10 via-brand-orange/5 to-transparent'
      }`}></div>

      {isBackground && (
        <>
          <HeroVisual
            visualType={visualType}
            visualImage={previewData.visualImage}
            visualVideoFile={previewData.visualVideoFile}
            visualVideoUrl={previewData.visualVideoUrl}
            theme={theme}
            isBackground
          />
          <div className={`absolute inset-0 ${isLight ? 'bg-white/70' : 'bg-neutral-950/70'}`}></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {isSplit ? (
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={position === 'left' ? 'lg:order-2' : 'lg:order-1'}>{textContent}</div>
            <div className={position === 'left' ? 'lg:order-1' : 'lg:order-2'}>
              <HeroVisual
                visualType={visualType}
                visualImage={previewData.visualImage}
                visualVideoFile={previewData.visualVideoFile}
                visualVideoUrl={previewData.visualVideoUrl}
                theme={theme}
              />
            </div>
          </div>
        ) : (
          <>
            {textContent}
            {hasVisual && !isBackground && (
              <div className="pt-12 max-w-4xl mx-auto relative">
                <HeroVisual
                  visualType={visualType}
                  visualImage={previewData.visualImage}
                  visualVideoFile={previewData.visualVideoFile}
                  visualVideoUrl={previewData.visualVideoUrl}
                  theme={theme}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
