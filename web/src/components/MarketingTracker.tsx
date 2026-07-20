/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, Terminal, Shield, Copy, Check, Eye, Trash2, Settings, ExternalLink } from 'lucide-react';
import { MarketingEvent } from '../types';

interface MarketingTrackerProps {
  events: MarketingEvent[];
  clearEvents: () => void;
}

export default function MarketingTracker({ events, clearEvents }: MarketingTrackerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'logs' | 'gtm' | 'pixel'>('logs');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const gtmCodeSnippet = `// 1. Instalar GTM en Next.js (App Router) - src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: \`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            \`,
          }}
        />
      </head>
      <body>
        {/* GTM Noscript Fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}`;

  const pixelCodeSnippet = `// 2. Instalar Meta Pixel en Next.js (App Router) - src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: \`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            \`,
          }}
        />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}`;

  const trackerHelperSnippet = `// 3. Helper de Tracking Unificado - src/lib/analytics.ts
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // 1. Google Tag Manager Data Layer
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // 2. Facebook Pixel Custom Event / Standard Event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const standardEvents = ['PageView', 'Contact', 'Lead', 'Search', 'ViewContent'];
    if (standardEvents.includes(eventName)) {
      (window as any).fbq('track', eventName, params);
    } else {
      (window as any).fbq('trackCustom', eventName, params);
    }
  }

  console.log(\`[Analytics Fired]: \${eventName}\`, params);
};`;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm md:max-w-md lg:max-w-xl w-full">
      {/* Tracker Status Indicator Mini-pill */}
      {!isOpen && (
        <button
          id="open-tracker-btn"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-neutral-900/95 backdrop-blur border border-red-500/30 text-white px-4 py-3 rounded-2xl shadow-2xl hover:border-red-500/80 transition-all cursor-pointer group float-right"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </div>
          <Terminal className="w-4 h-4 text-brand-orange group-hover:rotate-6 transition-transform" />
          <span className="text-xs font-semibold tracking-wider uppercase font-mono">
            Marketing Pixel Helper ({events.length})
          </span>
        </button>
      )}

      {/* Main Console Modal */}
      {isOpen && (
        <div className="bg-neutral-900/98 backdrop-blur border border-neutral-800 rounded-3xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[85vh] transition-all">
          {/* Header */}
          <div className="px-5 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                <Shield className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight font-mono">REVENGE Marketing Console</h3>
                <p className="text-[10px] text-neutral-400 font-mono">GTM & Pixel Verification Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {events.length > 0 && (
                <button
                  id="clear-logs-btn"
                  onClick={clearEvents}
                  title="Clear Logs"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                id="close-tracker-btn"
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white text-xs font-mono px-2.5 py-1 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-neutral-700 transition-colors cursor-pointer"
              >
                Hide
              </button>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex border-b border-neutral-800 bg-neutral-950 px-2 pt-1">
            <button
              id="tab-logs"
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-2 text-xs font-mono transition-all border-b-2 cursor-pointer ${
                activeTab === 'logs'
                  ? 'border-red-500 text-white font-medium'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Live Event Logs ({events.length})
            </button>
            <button
              id="tab-gtm"
              onClick={() => setActiveTab('gtm')}
              className={`px-4 py-2 text-xs font-mono transition-all border-b-2 cursor-pointer ${
                activeTab === 'gtm'
                  ? 'border-brand-orange text-white font-medium'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Next.js GTM Setup
            </button>
            <button
              id="tab-pixel"
              onClick={() => setActiveTab('pixel')}
              className={`px-4 py-2 text-xs font-mono transition-all border-b-2 cursor-pointer ${
                activeTab === 'pixel'
                  ? 'border-pink-500 text-white font-medium'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Meta Pixel Setup
            </button>
          </div>

          {/* Content Pane */}
          <div className="flex-1 overflow-y-auto p-4 min-h-[250px] max-h-[450px] font-mono text-xs">
            {activeTab === 'logs' ? (
              <div className="space-y-3">
                <div className="bg-neutral-950 p-2.5 rounded-lg text-neutral-400 text-[11px] border border-neutral-800 flex items-start gap-2">
                  <Play className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5 animate-pulse" />
                  <span>
                    El despachador de tracking unificado está escuchando clicks, scroll y conversiones. Interactúa con el sitio para ver los eventos dispararse.
                  </span>
                </div>

                {events.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 space-y-2">
                    <Terminal className="w-8 h-8 mx-auto text-neutral-700 stroke-[1.5]" />
                    <p className="text-[11px]">No events dispatched yet.</p>
                    <p className="text-[10px] text-neutral-600 max-w-xs mx-auto">
                      Click partners, scroll through sections, or submit the contact form to trigger marketing conversions.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {[...events].reverse().map((event) => (
                      <div
                        key={event.id}
                        id={`event-${event.id}`}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 hover:border-neutral-700 transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-neutral-500">
                              {event.timestamp}
                            </span>
                            <span className="text-[11px] font-bold text-red-400">
                              {event.eventName}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {event.platform === 'Both' || event.platform === 'GTM' ? (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-500">
                                GTM
                              </span>
                            ) : null}
                            {event.platform === 'Both' || event.platform === 'Meta Pixel' ? (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-pink-500/10 border border-pink-500/20 text-pink-400">
                                Pixel
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <pre className="text-[10px] text-neutral-300 overflow-x-auto bg-neutral-900/50 p-2 rounded border border-neutral-900 max-h-[120px] scrollbar-thin">
                          {JSON.stringify(event.data, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === 'gtm' ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-neutral-950 p-2 rounded border border-neutral-800">
                  <span className="text-neutral-400 text-[11px]">Setup unificado de Google Tag Manager</span>
                  <button
                    id="copy-gtm-snippet-btn"
                    onClick={() => copyToClipboard(gtmCodeSnippet, 'gtm')}
                    className="flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-[10px] px-2 py-1 rounded transition-colors text-white cursor-pointer"
                  >
                    {copied === 'gtm' ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar código</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <pre className="text-[10px] text-neutral-300 overflow-x-auto bg-neutral-950 p-3 rounded-lg border border-neutral-800 max-h-[300px] scrollbar-thin leading-relaxed">
                    {gtmCodeSnippet}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-neutral-950 p-2 rounded border border-neutral-800">
                  <span className="text-neutral-400 text-[11px]">Setup unificado de Meta (Facebook) Pixel</span>
                  <button
                    id="copy-pixel-snippet-btn"
                    onClick={() => copyToClipboard(pixelCodeSnippet, 'pixel')}
                    className="flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-[10px] px-2 py-1 rounded transition-colors text-white cursor-pointer"
                  >
                    {copied === 'pixel' ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar código</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] text-neutral-300 overflow-x-auto bg-neutral-950 p-3 rounded-lg border border-neutral-800 max-h-[180px] scrollbar-thin leading-relaxed">
                  {pixelCodeSnippet}
                </pre>

                <div className="border-t border-neutral-800 pt-3 space-y-2">
                  <div className="flex justify-between items-center bg-neutral-950 p-2 rounded border border-neutral-800">
                    <span className="text-neutral-400 text-[11px]">Analytics Utility (GTM + Pixel unified SDK)</span>
                    <button
                      id="copy-helper-snippet-btn"
                      onClick={() => copyToClipboard(trackerHelperSnippet, 'helper')}
                      className="flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-[10px] px-2 py-1 rounded transition-colors text-white cursor-pointer"
                    >
                      {copied === 'helper' ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[10px] text-neutral-300 overflow-x-auto bg-neutral-950 p-3 rounded-lg border border-neutral-800 max-h-[160px] scrollbar-thin leading-relaxed">
                    {trackerHelperSnippet}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer console */}
          <div className="px-4 py-2 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
            <span>Status: Ready to deploy</span>
            <span>GTM-XXXXXXX</span>
          </div>
        </div>
      )}
    </div>
  );
}
