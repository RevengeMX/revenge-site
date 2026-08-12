import React from 'react';
import Image from 'next/image';
import { stegaClean } from 'next-sanity';
import { CheckCircle2 } from 'lucide-react';

interface ProductHighlightProps {
  badgeText?: string;
  title?: string;
  description?: string;
  bullets?: string[];
  accentColor?: string;
  badgeImage?: { asset?: { url?: string } };
  theme?: 'dark' | 'light';
}

const DEFAULT_ACCENT = '#fb2c36';

export default function ProductHighlight({
  badgeText,
  title,
  description,
  bullets,
  accentColor,
  badgeImage,
  theme = 'dark'
}: ProductHighlightProps) {
  const isLight = theme === 'light';
  if (!title) return null;
  const accent = stegaClean(accentColor) || DEFAULT_ACCENT;
  const hasImage = Boolean(badgeImage?.asset?.url);
  const validBullets = (bullets || []).filter(Boolean);

  return (
    <section className={`py-24 border-t transition-colors duration-300 ${isLight ? 'border-neutral-200' : 'border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-3xl border p-8 sm:p-12 overflow-hidden ${isLight ? 'bg-neutral-50' : 'bg-white/3'}`}
          style={{ borderColor: `${accent}40` }}
        >
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accent}22, transparent 70%)` }}
          />

          <div className={`grid ${hasImage ? 'lg:grid-cols-[1fr_auto]' : ''} gap-10 items-center relative z-10`}>
            <div className="space-y-5">
              {badgeText && (
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wide"
                  style={{ backgroundColor: `${accent}1a`, color: accent, border: `1px solid ${accent}40` }}
                >
                  {badgeText}
                </div>
              )}
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                {title}
              </h2>
              {description && (
                <p className={`text-base leading-relaxed max-w-2xl ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  {description}
                </p>
              )}
              {validBullets.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-3 pt-2">
                  {validBullets.map((bullet, idx) => (
                    <li key={idx} className={`flex items-start gap-2.5 text-sm ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {hasImage && (
              <Image
                src={badgeImage!.asset!.url!}
                alt=""
                width={160}
                height={160}
                className="w-32 h-32 lg:w-40 lg:h-40 object-contain mx-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
