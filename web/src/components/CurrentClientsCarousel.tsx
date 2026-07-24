import React from 'react';
import Image from 'next/image';
import { CurrentClient, MarketingEvent } from '../types';

interface CurrentClientsCarouselProps {
  title?: string;
  subtitle?: string;
  clients: CurrentClient[];
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function CurrentClientsCarousel({
  title,
  subtitle,
  clients,
  theme = 'dark',
  onTrackEvent
}: CurrentClientsCarouselProps) {
  const isLight = theme === 'light';
  const validClients = (clients || []).filter((client) => client?.logo?.asset?.url);

  if (validClients.length === 0) return null;

  // Duplicated once so the CSS animation can loop seamlessly from -0% to -50%.
  const track = [...validClients, ...validClients];

  const handleClientClick = (name: string, website?: string) => {
    onTrackEvent({
      platform: 'GTM',
      eventName: 'current_client_logo_click',
      data: { client_name: name, has_website: Boolean(website) }
    });
  };

  return (
    <section className={`py-16 border-t relative overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-950 border-neutral-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-10 space-y-2">
            {title && (
              <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-sm ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Edge fade masks so logos don't hard-clip against the section bounds */}
      <div
        className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="clients-marquee-track flex w-max items-center gap-16">
          {track.map((client, idx) => {
            const key = `${client._id || client.name}-${idx}`;
            const logoUrl = client.logo!.asset!.url!;
            const dimensions = client.logo?.asset?.metadata?.dimensions;
            const aspectRatio = dimensions?.width && dimensions?.height ? dimensions.width / dimensions.height : 3;
            const content = (
              <Image
                src={logoUrl}
                alt={client.name}
                width={Math.round(48 * aspectRatio)}
                height={48}
                className={`h-12 w-auto object-contain transition-all duration-300 ${
                  isLight
                    ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                    : 'brightness-0 invert opacity-50 hover:brightness-100 hover:invert-0 hover:opacity-100'
                }`}
                loading={idx < validClients.length ? 'eager' : 'lazy'}
              />
            );

            return (
              <div key={key} className="shrink-0" onClick={() => handleClientClick(client.name, client.website)}>
                {client.website ? (
                  <a href={client.website} target="_blank" rel="noreferrer" aria-label={client.name}>
                    {content}
                  </a>
                ) : (
                  <div aria-label={client.name}>{content}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
