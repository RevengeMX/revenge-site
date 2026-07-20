import React from 'react';
import { urlFor } from '../sanity/lib/image';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  logoLight?: any;
  logoDark?: any;
  logoIcon?: any;
  logoText?: string;
  logoHeightDesktop?: number;
  logoHeightMobile?: number;
}

export default function Logo({
  className = '',
  variant = 'full',
  logoLight,
  logoDark,
  logoIcon,
  logoText = 'REVENGE',
  logoHeightDesktop,
  logoHeightMobile,
}: LogoProps) {
  const styles = {
    '--height-desktop': logoHeightDesktop ? `${logoHeightDesktop}px` : (variant === 'icon' ? '32px' : '28px'),
    '--height-mobile': logoHeightMobile ? `${logoHeightMobile}px` : (variant === 'icon' ? '32px' : '24px'),
  } as React.CSSProperties;

  if (variant === 'icon') {
    return (
      <div className={`relative flex items-center ${className}`}>
        {logoIcon ? (
          <img
            src={urlFor(logoIcon).width(120).url()}
            alt="Revenge Icon"
            style={styles}
            className="h-[var(--height-mobile)] md:h-[var(--height-desktop)] w-auto object-contain select-none"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div 
            style={styles}
            className="h-[var(--height-mobile)] md:h-[var(--height-desktop)] aspect-square rounded-xl bg-gradient-to-tr from-brand-red to-brand-orange flex items-center justify-center font-bold text-white font-sans shadow-lg"
          >
            R
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      {logoLight ? (
        <img
          src={urlFor(logoLight).width(250).url()}
          alt={logoText}
          style={styles}
          className="h-[var(--height-mobile)] md:h-[var(--height-desktop)] w-auto object-contain select-none block"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-brand-red to-brand-orange flex items-center justify-center font-bold text-white text-sm">
            R
          </div>
          <span className="font-extrabold text-white text-lg tracking-wider font-sans">
            {logoText}
          </span>
        </div>
      )}
    </div>
  );
}
