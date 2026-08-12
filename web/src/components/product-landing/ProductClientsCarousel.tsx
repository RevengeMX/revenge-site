import React from 'react';
import Image from 'next/image';

interface Client {
  _id?: string;
  name: string;
  logo?: { asset?: { url?: string } };
}

interface ProductClientsCarouselProps {
  title?: string;
  clients?: Client[];
  theme?: 'dark' | 'light';
}

export default function ProductClientsCarousel({ title, clients, theme = 'dark' }: ProductClientsCarouselProps) {
  const isLight = theme === 'light';
  const validClients = (clients || []).filter((c) => c?.logo?.asset?.url);

  if (validClients.length === 0) return null;

  const track = [...validClients, ...validClients];

  return (
    <section className={`py-16 border-t transition-colors duration-300 ${isLight ? 'bg-white border-neutral-200' : 'bg-[#0a0a0a] border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <p className={`text-center text-xs font-mono font-bold uppercase tracking-wider mb-10 ${isLight ? 'text-neutral-500' : 'text-neutral-500'}`}>
            {title}
          </p>
        )}
      </div>
      <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="product-clients-marquee-track flex w-max items-center gap-16">
          {track.map((client, idx) => (
            <div key={`${client._id || client.name}-${idx}`} className="shrink-0">
              <Image
                src={client.logo!.asset!.url!}
                alt={client.name}
                width={140}
                height={48}
                className={`h-10 w-auto object-contain transition-all duration-300 ${
                  isLight ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100' : 'brightness-0 invert opacity-50 hover:brightness-100 hover:invert-0 hover:opacity-100'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
