'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { MarketingEvent } from '../types';
import Link from 'next/link';

interface HeaderProps {
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
  showThemeToggleInHeader?: boolean;
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
  theme = 'dark',
  toggleTheme,
  showThemeToggleInHeader = true,
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

  const ctaLabel = headerCtaText || 'Contáctanos';
  const isDark = theme === 'dark';

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
    setMobileMenuOpen(false);
    onTrackEvent({
      platform: 'Both',
      eventName: 'header_cta_click',
      data: {
        cta_text: ctaLabel,
        cta_target: headerCtaLink || '#contact-section'
      }
    });
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark ? 'bg-neutral-950/80 border-neutral-900 text-neutral-200' : 'bg-white/80 border-neutral-200 text-neutral-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Side Group: Logo + Left Aligned Nav Links */}
          <div className="flex items-center gap-10">
            <Link
              id="brand-logo-link"
              href="/"
              className="flex items-center gap-2 focus:outline-none"
            >
              <Logo
                variant="full"
                theme={theme}
                logoLight={logoLight}
                logoDark={logoDark}
                logoText={logoText}
                logoHeightDesktop={logoHeightDesktop}
                logoHeightMobile={logoHeightMobile}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-7">
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
                    className={`text-[13px] font-semibold transition-colors tracking-wide ${
                      isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Desktop CTA & Theme Toggle Button on Right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button (Sol/Luna) - Configurable from Sanity CMS */}
            {showThemeToggleInHeader && toggleTheme && (
              <button
                id="desktop-header-theme-toggle"
                onClick={toggleTheme}
                title={isDark ? 'Cambiar a Modo Claro (Sol)' : 'Cambiar a Modo Oscuro (Luna)'}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center shadow-sm ${
                  isDark 
                    ? 'bg-neutral-900 border-neutral-800 text-amber-400 hover:bg-neutral-800 hover:border-neutral-700' 
                    : 'bg-neutral-100 border-neutral-300 text-indigo-600 hover:bg-neutral-200'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <a
              id="desktop-header-cta-btn"
              href={headerCtaLink || '#contact-section'}
              target={headerCtaType === 'external' ? '_blank' : undefined}
              rel={headerCtaType === 'external' ? 'noopener noreferrer' : undefined}
              onClick={handleCtaClick}
              className={`inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer border shadow-sm ${
                isDark 
                  ? 'bg-white text-neutral-950 border-white hover:bg-neutral-100 hover:shadow-[0_4px_25px_rgba(255,94,58,0.45)]' 
                  : 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 hover:shadow-[0_4px_25px_rgba(255,94,58,0.45)]'
              }`}
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {showThemeToggleInHeader && toggleTheme && (
              <button
                id="mobile-header-theme-toggle-quick"
                onClick={toggleTheme}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                  isDark 
                    ? 'bg-neutral-900 border-neutral-800 text-amber-400' 
                    : 'bg-neutral-100 border-neutral-300 text-indigo-600'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-3 pb-6 space-y-4 font-mono text-xs transition-colors duration-300 ${
          isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200'
        }`}>
          <div className="flex flex-col space-y-3 pt-2">
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
                  className={`py-2 text-sm font-semibold transition-colors border-b ${
                    isDark ? 'text-neutral-300 hover:text-white border-neutral-900' : 'text-neutral-700 hover:text-neutral-900 border-neutral-100'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Theme switcher option inside mobile drawer if enabled */}
          {showThemeToggleInHeader && toggleTheme && (
            <div className="pt-2 pb-1 border-t border-neutral-800 flex items-center justify-between">
              <span className={`text-xs font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Modo de Pantalla:
              </span>
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:text-white' 
                    : 'bg-neutral-100 border-neutral-300 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                {isDark ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                )}
              </button>
            </div>
          )}

          <div className="pt-2">
            <a
              id="mobile-header-cta-btn"
              href={headerCtaLink || '#contact-section'}
              target={headerCtaType === 'external' ? '_blank' : undefined}
              rel={headerCtaType === 'external' ? 'noopener noreferrer' : undefined}
              onClick={handleCtaClick}
              className={`w-full inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider py-3.5 rounded-xl transition-all border shadow-sm ${
                isDark 
                  ? 'bg-white text-neutral-950 border-white hover:bg-neutral-100 hover:shadow-[0_4px_25px_rgba(255,94,58,0.45)]' 
                  : 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 hover:shadow-[0_4px_25px_rgba(255,94,58,0.45)]'
              }`}
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
