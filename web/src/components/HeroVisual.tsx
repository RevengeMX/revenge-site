import React from 'react';
import Image from 'next/image';
import { stegaClean } from 'next-sanity';
import HeroInteractiveCard from './HeroInteractiveCard';

interface HeroVisualProps {
  visualType?: 'none' | 'image' | 'video' | 'interactive';
  visualImage?: { asset?: { url?: string; metadata?: { dimensions?: { width?: number; height?: number } } } };
  visualVideoFile?: { asset?: { url?: string } };
  visualVideoUrl?: string;
  theme?: 'dark' | 'light';
  isBackground?: boolean;
}

function getEmbedUrl(url: string): string | null {
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${youtubeMatch[1]}&controls=0`;

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1`;

  return null;
}

export default function HeroVisual({
  visualType: rawVisualType,
  visualImage,
  visualVideoFile,
  visualVideoUrl: rawVisualVideoUrl,
  theme = 'dark',
  isBackground = false
}: HeroVisualProps) {
  // Clean stega markers: these values are used for branching logic and as
  // real URLs (src/href), not just rendered as text.
  const visualType = stegaClean(rawVisualType);
  const visualVideoUrl = stegaClean(rawVisualVideoUrl);

  if (!visualType || visualType === 'none') return null;

  const wrapperClass = isBackground
    ? 'absolute inset-0 w-full h-full'
    : 'relative w-full rounded-2xl overflow-hidden border shadow-lg ' +
      (theme === 'light' ? 'border-neutral-300 bg-white' : 'border-neutral-800 bg-neutral-900');

  if (visualType === 'image') {
    const imageUrl = visualImage?.asset?.url;
    if (!imageUrl) return null;
    const dimensions = visualImage?.asset?.metadata?.dimensions;

    return (
      <div className={wrapperClass}>
        <Image
          src={imageUrl}
          alt=""
          fill={isBackground}
          width={isBackground ? undefined : dimensions?.width || 1200}
          height={isBackground ? undefined : dimensions?.height || 800}
          priority
          className={isBackground ? 'object-cover' : 'w-full h-auto object-cover'}
        />
      </div>
    );
  }

  if (visualType === 'video') {
    const fileUrl = visualVideoFile?.asset?.url;
    const embedUrl = !fileUrl && visualVideoUrl ? getEmbedUrl(visualVideoUrl) : null;
    const directUrl = !fileUrl && !embedUrl ? visualVideoUrl : undefined;

    if (!fileUrl && !embedUrl && !directUrl) return null;

    return (
      <div className={wrapperClass}>
        {fileUrl || directUrl ? (
          <video
            src={fileUrl || directUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={isBackground ? 'w-full h-full object-cover' : 'w-full h-auto'}
          />
        ) : (
          <iframe
            src={embedUrl!}
            allow="autoplay; fullscreen"
            className={isBackground ? 'w-full h-full object-cover border-0' : 'w-full aspect-video border-0'}
          />
        )}
      </div>
    );
  }

  if (visualType === 'interactive') {
    return <HeroInteractiveCard theme={theme} />;
  }

  return null;
}
