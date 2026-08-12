import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MarketingEvent } from '../../types';

interface ProductHeroProps {
  productLogoLight?: { asset?: { url?: string } };
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  phoneMockupImage?: { asset?: { url?: string; metadata?: { dimensions?: { width?: number; height?: number } } } };
  appStoreBadgeImage?: { asset?: { url?: string } };
  playStoreBadgeImage?: { asset?: { url?: string } };
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function ProductHero({
  productLogoLight,
  eyebrow,
  headline,
  subheadline,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  phoneMockupImage,
  appStoreBadgeImage,
  playStoreBadgeImage,
  theme = 'dark',
  onTrackEvent
}: ProductHeroProps) {
  const isLight = theme === 'light';
  const hasMockup = Boolean(phoneMockupImage?.asset?.url);

  const handleCtaClick = (ctaType: string) => {
    onTrackEvent({
      platform: 'Both',
      eventName: 'product_hero_cta_click',
      data: { cta_type: ctaType }
    });
  };

  return (
    <section className={`relative pt-20 pb-24 overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-white text-neutral-900' : 'bg-[#0a0a0a] text-white'
    }`}>
      <div className={`absolute top-0 right-0 w-[700px] h-[700px] rounded-full filter blur-[140px] pointer-events-none ${
        isLight ? 'bg-[#fb2c36]/5' : 'bg-[#fb2c36]/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid ${hasMockup ? 'lg:grid-cols-2' : ''} gap-12 lg:gap-16 items-center`}>
          <div className="space-y-7">
            {productLogoLight?.asset?.url && (
              <Image src={productLogoLight.asset.url} alt="" width={160} height={40} className="h-8 w-auto object-contain" priority />
            )}

            {eyebrow && (
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold border ${
                isLight ? 'border-neutral-300 text-neutral-700 bg-neutral-50' : 'border-white/15 text-neutral-300 bg-white/5'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#fb2c36]" />
                {eyebrow}
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              {headline}
            </h1>

            {subheadline && (
              <p className={`text-base sm:text-lg leading-relaxed max-w-xl ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                {subheadline}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {primaryCtaLabel && (
                <a
                  href={primaryCtaHref || '#cta-final'}
                  onClick={() => handleCtaClick('primary')}
                  className="inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide px-7 py-4 rounded-xl bg-[#fb2c36] text-white hover:shadow-[0_8px_30px_rgba(251,44,54,0.45)] transition-all"
                >
                  <span>{primaryCtaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
              {secondaryCtaLabel && (
                <a
                  href={secondaryCtaHref || '#'}
                  onClick={() => handleCtaClick('secondary')}
                  className={`inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-4 rounded-xl border transition-all ${
                    isLight ? 'border-neutral-300 hover:bg-neutral-50' : 'border-white/15 hover:bg-white/5'
                  }`}
                >
                  <span>{secondaryCtaLabel}</span>
                </a>
              )}
            </div>

            {(appStoreBadgeImage?.asset?.url || playStoreBadgeImage?.asset?.url) && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {appStoreBadgeImage?.asset?.url && (
                  <a href={primaryCtaHref || '#cta-final'} onClick={() => handleCtaClick('app_store_badge')}>
                    <Image
                      src={appStoreBadgeImage.asset.url}
                      alt="Descargar en App Store"
                      width={135}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                )}
                {playStoreBadgeImage?.asset?.url && (
                  <a href={primaryCtaHref || '#cta-final'} onClick={() => handleCtaClick('play_store_badge')}>
                    <Image
                      src={playStoreBadgeImage.asset.url}
                      alt="Descargar en Google Play"
                      width={135}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                )}
              </div>
            )}
          </div>

          {hasMockup && (
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <Image
                  src={phoneMockupImage!.asset!.url!}
                  alt=""
                  width={phoneMockupImage?.asset?.metadata?.dimensions?.width || 600}
                  height={phoneMockupImage?.asset?.metadata?.dimensions?.height || 1200}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
