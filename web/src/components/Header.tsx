'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { MarketingEvent } from '../types';

interface HeaderProps {
  logoLight?: any;
  logoDark?: any;
  logoIcon?: any;
  logoText?: string;
  logoHeightDesktop?: number;
  logoHeightMobile?: number;
  headerCtaText?: string;
  headerCtaLink?: string;
  headerCtaType?: 'internal' | 'external';
  navItems?: { label: string; href: string }[];
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Header({
  logoLight,
  logoDark,
  logoIcon,
  logoText,
  logoHeightDesktop,
  logoHeightMobile,
  headerCtaText,
  headerCtaLink,
  headerCtaType,
  navItems,
  onTrackEvent,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const resolvedNavItems = navItems && navItems.length > 0 ? navItems : [
    { label: 'Servicios', href: '#services-section' },
    { label: 'Partners', href: '#partners-section' },
    { label: 'Clientes', href: '#clientes-section' },
  ];



  const handleNavClick = (label: string, href: string) => {
    setMobileMenuOpen(false);
    onTrackEvent({
      platform: 'GTM',
      eventName: 'navigation_click',
      data: {
        nav_label: label,
        nav_target: href
      }
    });
  };

  const handleCtaClick = () => {
    onTrackEvent({
      platform: 'Both',
      eventName: 'header_cta_click',
      data: {
        button_name: 'header_cotizar_proyecto'
      }
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/85 backdrop-blur border-b border-neutral-900/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            id="brand-logo-link"
            href="/"
            onClick={() => handleNavClick('Home Logo', '/')}
            className="flex items-center gap-2 focus:outline-none"
          >
            <Logo
              variant="full"
              logoLight={logoLight}
              logoDark={logoDark}
              logoText={logoText}
              logoHeightDesktop={logoHeightDesktop}
              logoHeightMobile={logoHeightMobile}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {resolvedNavItems.map((item, idx) => {
              const label = item?.label || '';
              const href = item?.href || '';
              if (!label) return null;
              return (
                <a
                  id={`desktop-nav-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
                  key={idx}
                  href={href}
                  onClick={() => handleNavClick(label, href)}
                  className="text-[13px] font-semibold text-neutral-400 hover:text-white transition-colors tracking-wide"
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {headerCtaText && (
            <div className="hidden md:flex items-center gap-4">
              <a
                id="desktop-header-cta-btn"
                href={headerCtaLink || '#contact-section'}
                target={headerCtaType === 'external' ? '_blank' : undefined}
                rel={headerCtaType === 'external' ? 'noopener noreferrer' : undefined}
                onClick={handleCtaClick}
                className="inline-flex items-center gap-1 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(255,94,58,0.25)] transition-all cursor-pointer"
              >
                <span>{headerCtaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-900 bg-neutral-950 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          {resolvedNavItems.map((item, idx) => {
            const label = item?.label || '';
            const href = item?.href || '';
            if (!label) return null;
            return (
              <a
                id={`mobile-nav-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
                key={idx}
                href={href}
                onClick={() => handleNavClick(label, href)}
                className="block px-4 py-3 text-sm font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-xl transition-all"
              >
                {label}
              </a>
            );
          })}
          {headerCtaText && (
            <div className="pt-2">
              <a
                id="mobile-header-cta-btn"
                href={headerCtaLink || '#contact-section'}
                target={headerCtaType === 'external' ? '_blank' : undefined}
                rel={headerCtaType === 'external' ? 'noopener noreferrer' : undefined}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCtaClick();
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer"
              >
                <span>{headerCtaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
