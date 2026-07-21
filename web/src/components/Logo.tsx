import React from 'react';
import { urlFor } from '../sanity/lib/image';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  theme?: 'dark' | 'light';
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
  theme = 'dark',
  logoLight,
  logoDark,
  logoIcon,
  logoText = 'REVENGE',
  logoHeightDesktop,
  logoHeightMobile,
}: LogoProps) {
  const isLight = theme === 'light';

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

  // Determine active logo asset for Light Mode / Dark Mode
  const activeLogoAsset = isLight ? (logoDark || logoLight) : logoLight;

  return (
    <div className={`relative flex items-center ${className}`}>
      {activeLogoAsset ? (
        <img
          src={urlFor(activeLogoAsset).width(250).url()}
          alt={logoText}
          style={styles}
          className={`h-[var(--height-mobile)] md:h-[var(--height-desktop)] w-auto object-contain select-none block transition-all ${
            isLight && !logoDark ? 'invert' : ''
          }`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-brand-red to-brand-orange flex items-center justify-center font-bold text-white text-sm">
            R
          </div>
          <span className={`font-extrabold text-lg tracking-wider font-sans ${isLight ? 'text-neutral-900' : 'text-white'}`}>
            {logoText}
          </span>
        </div>
      )}
    </div>
  );
}
