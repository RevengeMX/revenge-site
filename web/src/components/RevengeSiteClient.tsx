'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Partners from './Partners';
import Services from './Services';
import Clientes from './Clientes';
import ContactForm from './ContactForm';
import TextContent from './TextContent';
import MarketingTracker from './MarketingTracker';
import Logo from './Logo';
import { MarketingEvent, SiteSettings, PageBlock } from '../types';
import { ArrowUp, Settings } from 'lucide-react';

interface RevengeSiteClientProps {
  siteSettings: SiteSettings;
  pageBuilder: PageBlock[];
}

export default function RevengeSiteClient({
  siteSettings,
  pageBuilder,
}: RevengeSiteClientProps) {
  const [events, setEvents] = useState<MarketingEvent[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const addTrackEvent = (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const newEvent: MarketingEvent = {
      ...event,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: formattedTime
    };

    setEvents(prev => [...prev, newEvent]);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  useEffect(() => {
    addTrackEvent({
      platform: 'Both',
      eventName: 'PageView',
      data: {
        page_title: 'Revenge - Consultoría Empresarial Digital',
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
        screen_resolution: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
        device_mobile_first: true
      }
    });

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200 scroll-smooth selection:bg-brand-orange selection:text-white">
      

      {/* Navigation Header using settings */}
      <Header
        logoLight={siteSettings?.logoLight}
        logoDark={siteSettings?.logoDark}
        logoIcon={siteSettings?.logoIcon}
        logoText={siteSettings?.logoText}
        logoHeightDesktop={siteSettings?.logoHeightDesktop}
        logoHeightMobile={siteSettings?.logoHeightMobile}
        headerCtaText={siteSettings?.headerCta?.[0]?.label}
        headerCtaLink={siteSettings?.headerCta?.[0]?.href}
        headerCtaType={siteSettings?.headerCta?.[0]?.linkType}
        navItems={siteSettings?.navItems}
        onTrackEvent={addTrackEvent}
      />

      {/* Page Builder Sections */}
      {Array.isArray(pageBuilder) && pageBuilder.map((block) => {
        switch (block._type) {
          case 'heroBlock':
            return (
              <Hero
                key={block._key}
                previewData={{
                  heroTitle: block.heroTitle,
                  heroSubtitle: block.heroSubtitle,
                  showPromoBadge: block.showPromoBadge,
                  promoBadgeText: block.promoBadgeText || '',
                  bullets: block.bullets,
                  buttons: block.buttons,
                  logoIcon: siteSettings?.logoIcon,
                  logoText: siteSettings?.logoText,
                }}
                onTrackEvent={addTrackEvent}
              />
            );
          case 'partnersBlock':
            return (
              <Partners
                key={block._key}
                title={block.title}
                partners={block.partners || []}
                onTrackEvent={addTrackEvent}
              />
            );
          case 'servicesBlock':
            return (
              <Services
                key={block._key}
                title={block.title}
                description={block.description}
                services={block.services || []}
                onTrackEvent={addTrackEvent}
              />
            );
          case 'clientesBlock':
            return (
              <Clientes
                key={block._key}
                clientCases={block.clientCases || []}
                onTrackEvent={addTrackEvent}
              />
            );
          case 'contactBlock':
            return (
              <ContactForm
                key={block._key}
                onTrackEvent={addTrackEvent}
              />
            );
          case 'textContentBlock':
            return (
              <TextContent
                key={block._key}
                title={block.title}
                subtitle={block.subtitle}
                content={block.content}
              />
            );
          default:
            return <div key={(block as any)._key}>Unknown block type: {(block as any)._type}</div>;

        }
      })}

      {/* Footer using settings */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-16 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand Logo Info */}
            <div className="space-y-4 md:col-span-2">
              <Logo
                variant="full"
                logoLight={siteSettings?.logoLight}
                logoDark={siteSettings?.logoDark}
                logoText={siteSettings?.logoText}
                logoHeightDesktop={siteSettings?.logoHeightDesktop}
                logoHeightMobile={siteSettings?.logoHeightMobile}
              />
              <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
                {siteSettings?.footerDescription || 'Consultoría empresarial digital especializada en desarrollo moderno, diseño responsivo, investigación de mercados e integraciones omnicanal. CMS Base: Sanity.'}
              </p>
              <p className="text-[10px] font-mono text-neutral-500">
                © {new Date().getFullYear()} Revenge Agency. Todos los derechos reservados.
              </p>
            </div>

            {/* Quick Navigation links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Navegación</h4>
              <ul className="space-y-2 font-mono text-[11px]">
                {(siteSettings?.footerNavItems && siteSettings.footerNavItems.length > 0
                  ? siteSettings.footerNavItems
                  : [
                      { label: 'Aviso de Privacidad', href: '#privacy' },
                      { label: 'Términos y Condiciones', href: '#terms' },
                      { label: 'Contacto', href: '#contact-section' },
                    ]
                ).map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>


      {/* Scroll to Top button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 z-40 p-3 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-400 hover:text-white hover:border-neutral-700 hover:shadow-lg transition-all cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
