import React, { useState, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles, Terminal, FileCode, Activity } from 'lucide-react';
import { LandingPageData, MarketingEvent } from '../types';
import Logo from './Logo';

interface HeroProps {
  previewData: {
    heroTitle: string;
    heroSubtitle: string;
    showPromoBadge: boolean;
    promoBadgeText?: string;
    bullets?: string[];
    buttons?: {
      label?: string;
      href?: string;
      style?: 'primary' | 'secondary' | 'tertiary';
    }[];
    logoIcon?: any;
    logoText?: string;
  };
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Hero({ previewData, theme = 'dark', onTrackEvent }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const isLight = theme === 'light';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlowPos({ x: glowX, y: glowY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleCtaClick = (buttonType: string) => {
    onTrackEvent({
      platform: 'Both',
      eventName: 'hero_cta_click',
      data: {
        cta_type: buttonType,
        destination: '#contact-section',
        cms_revision: 'contento_live_v2'
      }
    });
  };

  return (
    <section className={`relative pt-16 pb-24 sm:pb-32 overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 text-neutral-800' : 'bg-neutral-950 text-neutral-200'
    }`}>
      {/* Background radial glows */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-radial-at-t pointer-events-none filter blur-3xl ${
        isLight ? 'from-red-500/5 via-brand-orange/5 to-transparent' : 'from-red-500/10 via-brand-orange/5 to-transparent'
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Attio-Style Centered Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center">
          
          {/* Promo Badge from CMS */}
          {previewData.showPromoBadge && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono shadow-md backdrop-blur-md transition-all ${
              isLight 
                ? 'bg-white border border-neutral-300 text-neutral-800 hover:border-neutral-400' 
                : 'bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
            }`}>
              <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-pulse"></span>
              <span className="text-xs font-medium tracking-wide">
                {previewData.promoBadgeText || 'Nueva era digital • Revenge v2'}
              </span>
              <ChevronRight className={`w-3.5 h-3.5 ${isLight ? 'text-neutral-400' : 'text-neutral-500'}`} />
            </div>
          )}

          {/* Large Centered Title */}
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none sm:leading-[1.08] max-w-3xl ${
            isLight ? 'text-neutral-900' : 'text-white'
          }`}>
            {previewData.heroTitle ? (
              previewData.heroTitle.split('Revenge').map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <span className="bg-gradient-to-r from-brand-orange via-brand-red to-orange-500 bg-clip-text text-transparent font-extrabold">
                      Revenge
                    </span>
                  )}
                  {part}
                </React.Fragment>
              ))
            ) : (
              <>Transformación Digital con <span className="bg-gradient-to-r from-brand-orange via-brand-red to-orange-500 bg-clip-text text-transparent font-extrabold">Revenge</span></>
            )}
          </h1>

          {/* Centered Subtitle */}
          <p className={`text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-sans ${
            isLight ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            {previewData.heroSubtitle || 'Diseñamos e implementamos ecosistemas web ultra-rápidos y plataformas transaccionales de alto rendimiento para marcas líderes.'}
          </p>

          {/* Centered Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full max-w-md mx-auto">
            {previewData.buttons && previewData.buttons.length > 0 ? (
              previewData.buttons.map((btn, idx) => (
                <a
                  key={idx}
                  id={`hero-cta-${idx}`}
                  href={btn.href || '#contact-section'}
                  onClick={() => handleCtaClick(btn.style || 'primary')}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer border ${
                    btn.style === 'secondary'
                      ? isLight 
                        ? 'bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300'
                      : isLight 
                        ? 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 hover:shadow-[0_6px_25px_rgba(255,94,58,0.45)]' 
                        : 'bg-white text-neutral-950 border-white hover:bg-neutral-100 hover:shadow-[0_6px_25px_rgba(255,94,58,0.45)]'
                  }`}
                >
                  <span>{btn.label || 'Iniciar Proyecto'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ))
            ) : (
              <>
                <a
                  id="hero-primary-cta"
                  href="#contact-section"
                  onClick={() => handleCtaClick('primary')}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer border shadow-sm ${
                    isLight 
                      ? 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 hover:shadow-[0_6px_25px_rgba(255,94,58,0.45)]' 
                      : 'bg-white text-neutral-950 border-white hover:bg-neutral-100 hover:shadow-[0_6px_25px_rgba(255,94,58,0.45)]'
                  }`}
                >
                  <span>Comenzar Proyecto</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  id="hero-secondary-cta"
                  href="#services-section"
                  onClick={() => handleCtaClick('secondary')}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer border ${
                    isLight 
                      ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-800 shadow-sm' 
                      : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <span>Ver Servicios</span>
                </a>
              </>
            )}
          </div>

          {/* Centered Trust Checkmarks */}
          <div className={`flex flex-wrap justify-center items-center gap-y-2 gap-x-6 text-xs font-mono pt-4 border-t w-full max-w-2xl mx-auto ${
            isLight ? 'border-neutral-200 text-neutral-600' : 'border-neutral-900/80 text-neutral-400'
          }`}>
            {(previewData.bullets && previewData.bullets.length > 0
              ? previewData.bullets
              : ['Shopify & Tienda Nube Partners', 'Estructura Headless CMS', 'Despliegue AWS Amplify CI/CD']
            ).map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Centered Interactive Visual Module with Mouseover 3D Tilt & Glow */}
        <div className="pt-12 max-w-4xl mx-auto relative">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.015 : 1})`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
            }}
            className={`relative w-full border rounded-2xl overflow-hidden group cursor-pointer backdrop-blur-xl transition-all ${
              isLight 
                ? 'bg-white/95 border-neutral-300 shadow-[0_20px_50px_rgba(0,0,0,0.08)]' 
                : 'bg-neutral-900/90 border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
            }`}
          >
            {/* Dynamic Mouse Following Radial Glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 94, 58, 0.15), transparent 60%)`,
              }}
            />

            {/* Window Header */}
            <div className={`flex items-center justify-between px-5 py-3.5 border-b relative z-20 ${
              isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-neutral-950 border-neutral-850'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-md border ${
                isLight ? 'bg-white border-neutral-300 text-neutral-800' : 'bg-neutral-900 border-neutral-800 text-neutral-300'
              }`}>
                <FileCode className="w-3.5 h-3.5 text-brand-orange" />
                <span>revenge.config.ts</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                <span className="hidden sm:inline">Next.js + Sanity CMS</span>
              </div>
            </div>

            {/* Editor Code Area */}
            <div className={`p-6 sm:p-8 font-mono text-xs leading-relaxed text-left overflow-x-auto relative z-20 ${
              isLight ? 'bg-neutral-900 text-neutral-300' : 'bg-neutral-950/70 text-neutral-300'
            }`}>
              <div className="flex gap-6">
                <div className="text-neutral-600 select-none text-right font-mono pr-2 border-r border-neutral-800">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                  <div>7</div>
                  <div>8</div>
                  <div>9</div>
                  <div>10</div>
                </div>
                <div className="flex-1">
                  <div>
                    <span className="text-purple-400 font-semibold">import</span> {'{'} <span className="text-blue-400">createRevengeEngine</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">"@revenge/core"</span>;
                  </div>
                  <div>&nbsp;</div>
                  <div>
                    <span className="text-purple-400 font-semibold">export default</span> <span className="text-blue-400">createRevengeEngine</span>({'{'}
                  </div>
                  <div className="pl-6">
                    <span className="text-amber-300">architecture</span>: <span className="text-emerald-300">"Headless-Modular"</span>,
                  </div>
                  <div className="pl-6">
                    <span className="text-amber-300">cmsProvider</span>: <span className="text-emerald-300">"Sanity-CMS"</span>,
                  </div>
                  <div className="pl-6">
                    <span className="text-amber-300">partners</span>: [<span className="text-emerald-300">"Shopify"</span>, <span className="text-emerald-300">"TiendaNube"</span>],
                  </div>
                  <div className="pl-6">
                    <span className="text-amber-300">performance</span>: {'{'}
                  </div>
                  <div className="pl-10">
                    <span className="text-amber-300">lighthouseScore</span>: <span className="text-orange-400 font-bold">100</span>,
                  </div>
                  <div className="pl-10">
                    <span className="text-amber-300">interactiveAnimation</span>: <span className="text-orange-400 font-bold">true</span>
                  </div>
                  <div className="pl-6">{'}'}</div>
                  <div>{'}'});</div>
                </div>
              </div>
            </div>

            {/* IDE Footer Status Bar */}
            <div className={`flex items-center justify-between px-5 py-2.5 border-t text-xs font-mono relative z-20 ${
              isLight ? 'bg-neutral-100 border-neutral-200 text-neutral-600' : 'bg-neutral-950 border-neutral-850 text-neutral-400'
            }`}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className={isLight ? 'text-neutral-700' : 'text-neutral-300'}>Engine Active</span>
                </div>
                <span>•</span>
                <span>Mouseover Animation Active</span>
              </div>
              <span className="text-brand-orange font-semibold">Revenge-Style Layout</span>
            </div>

            {/* Floating Parallax Badges */}
            <div
              className={`absolute top-4 right-4 border rounded-xl p-3 shadow-xl flex items-center gap-3 z-30 pointer-events-none transition-transform duration-200 backdrop-blur-md ${
                isLight ? 'bg-white/95 border-neutral-200 text-neutral-900 shadow-md' : 'bg-neutral-900/95 border-neutral-700/80 text-white shadow-2xl'
              }`}
              style={{
                transform: `translate(${rotate.y * 1.5}px, ${-rotate.x * 1.5}px)`,
              }}
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <div className="text-left">
                <div className={`text-[9px] font-mono uppercase tracking-wider font-bold ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Performance</div>
                <div className={`text-xs font-bold font-mono ${isLight ? 'text-neutral-900' : 'text-white'}`}>100% Score</div>
              </div>
            </div>

            <div
              className={`absolute bottom-6 left-6 border rounded-xl p-3 shadow-xl flex items-center gap-3 z-30 pointer-events-none transition-transform duration-200 backdrop-blur-md ${
                isLight ? 'bg-white/95 border-neutral-200 text-neutral-900 shadow-md' : 'bg-neutral-900/95 border-neutral-700/80 text-white shadow-2xl'
              }`}
              style={{
                transform: `translate(${-rotate.y * 1.5}px, ${rotate.x * 1.5}px)`,
              }}
            >
              <div className="w-9 h-9 rounded-full bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 text-brand-orange">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className={`text-[9px] font-mono uppercase tracking-wider font-bold ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Mouse Interactive</div>
                <div className={`text-xs font-bold font-mono flex items-center gap-1.5 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping"></span>
                  <span>3D Tilt Active</span>
                </div>
              </div>
            </div>

            {/* Background Watermark Logo */}
            <div className="absolute inset-0 opacity-5 z-0 pointer-events-none flex items-center justify-center">
              <Logo variant="icon" theme={theme} className="w-72 h-72" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
