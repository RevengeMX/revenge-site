import React from 'react';
import { stegaClean } from 'next-sanity';

interface Audience {
  profile?: string;
  benefit?: string;
  accentColor?: string;
}

interface ProductAudienceGridProps {
  title?: string;
  subtitle?: string;
  audiences?: Audience[];
  theme?: 'dark' | 'light';
}

const DEFAULT_ACCENTS = ['#fb2c36', '#3080ff', '#00c758', '#f99c00'];

export default function ProductAudienceGrid({ title, subtitle, audiences, theme = 'dark' }: ProductAudienceGridProps) {
  const isLight = theme === 'light';
  const validAudiences = (audiences || []).filter((a) => a?.profile);

  if (validAudiences.length === 0) return null;

  return (
    <section className={`py-24 border-t transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0a0a0a] border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {validAudiences.map((audience, idx) => {
            const accent = stegaClean(audience.accentColor) || DEFAULT_ACCENTS[idx % DEFAULT_ACCENTS.length];
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border space-y-3 ${isLight ? 'bg-white border-neutral-200' : 'bg-white/3 border-white/10'}`}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                <h3 className={`text-base font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>{audience.profile}</h3>
                {audience.benefit && (
                  <p className={`text-sm leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    {audience.benefit}
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
