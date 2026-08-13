import React from 'react';
import Image from 'next/image';
import { stegaClean } from 'next-sanity';

interface Feature {
  title?: string;
  description?: string;
  accentColor?: string;
  icon?: { asset?: { url?: string } };
}

interface ProductFeatureGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  theme?: 'dark' | 'light';
}

const DEFAULT_ACCENT = '#fb2c36';

export default function ProductFeatureGrid({ title, subtitle, features, theme = 'dark' }: ProductFeatureGridProps) {
  const isLight = theme === 'light';
  const validFeatures = (features || []).filter((f) => f?.title);

  if (validFeatures.length === 0) return null;

  return (
    <section className={`py-24 border-t transition-colors duration-300 ${
      isLight ? 'bg-white border-neutral-200' : 'bg-[#0a0a0a] border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="max-w-2xl mb-16 space-y-4">
            {title && (
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {validFeatures.map((feature, idx) => {
            // stegaClean: hex colors get interpolated into inline CSS below —
            // stega's invisible chars would make the value an invalid color.
            const accent = stegaClean(feature.accentColor) || DEFAULT_ACCENT;
            return (
              <div
                key={idx}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isLight ? 'bg-neutral-50 border-neutral-200 hover:border-neutral-300 hover:shadow-lg' : 'bg-white/3 border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl"
                    style={{ backgroundColor: `${accent}1a`, border: `1px solid ${accent}33` }}
                  >
                    {feature.icon?.asset?.url ? (
                      <Image src={feature.icon.asset.url} alt="" width={20} height={20} className="w-5 h-5 object-contain" />
                    ) : (
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    )}
                  </div>
                  <span className={`font-mono text-xs font-bold ${isLight ? 'text-neutral-300' : 'text-white/15'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className={`text-base font-bold mb-2 ${isLight ? 'text-neutral-900' : 'text-white'}`}>{feature.title}</h3>
                {feature.description && (
                  <p className={`text-sm leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    {feature.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
