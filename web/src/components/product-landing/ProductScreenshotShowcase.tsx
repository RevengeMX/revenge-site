import React from 'react';
import Image from 'next/image';
import { stegaClean } from 'next-sanity';
import { Camera } from 'lucide-react';

interface Screenshot {
  group?: 'app' | 'panel';
  image?: { asset?: { url?: string } };
  caption?: string;
}

interface ProductScreenshotShowcaseProps {
  title?: string;
  subtitle?: string;
  screenshots?: Screenshot[];
  theme?: 'dark' | 'light';
}

const GROUP_LABELS: Record<string, string> = {
  app: 'App móvil',
  panel: 'Panel web',
};

export default function ProductScreenshotShowcase({ title, subtitle, screenshots, theme = 'dark' }: ProductScreenshotShowcaseProps) {
  const isLight = theme === 'light';
  const items = (screenshots || []).filter((s) => s?.caption || s?.image?.asset?.url);

  if (items.length === 0) return null;

  const groups = items.reduce<Record<string, Screenshot[]>>((acc, item) => {
    // Stega (draft-mode click-to-edit) appends invisible, per-field-path
    // characters to string values — must clean before using as a grouping
    // key, or visually-identical values ("app") stop matching each other.
    const key = stegaClean(item.group) || 'app';
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <section className={`py-24 border-t transition-colors duration-300 ${isLight ? 'bg-white border-neutral-200' : 'bg-[#0a0a0a] border-white/10'}`}>
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

        <div className="space-y-14">
          {Object.entries(groups).map(([groupKey, groupItems]) => (
            <div key={groupKey} className="space-y-6">
              <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>
                {GROUP_LABELS[groupKey] || groupKey}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {groupItems.map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className={`relative aspect-[9/16] rounded-2xl border overflow-hidden flex items-center justify-center ${
                      isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-white/3 border-white/10'
                    }`}>
                      {item.image?.asset?.url ? (
                        <Image src={item.image.asset.url} alt={item.caption || ''} fill className="object-cover" />
                      ) : (
                        <div className={`flex flex-col items-center gap-2 ${isLight ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          <Camera className="w-6 h-6" />
                          <span className="text-[10px] font-mono uppercase tracking-wide">Captura pendiente</span>
                        </div>
                      )}
                    </div>
                    {item.caption && (
                      <p className={`text-xs text-center font-mono ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
