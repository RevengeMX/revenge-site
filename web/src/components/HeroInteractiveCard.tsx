import React, { useRef, useState } from 'react';
import { BarChart3, Zap, TrendingUp } from 'lucide-react';
import Logo from './Logo';

interface HeroInteractiveCardProps {
  theme?: 'dark' | 'light';
}

const CHANNELS = [
  { name: 'SEO', value: '42%', color: '#fb2c36' },
  { name: 'Google Ads', value: '31%', color: '#3080ff' },
  { name: 'Email / CRM', value: '17%', color: '#00bb7f' },
  { name: 'Social Ads', value: '10%', color: '#f99c00' }
];

const TRAFFIC_BARS = [28, 38, 46, 64, 82, 100];

export default function HeroInteractiveCard({ theme = 'dark' }: HeroInteractiveCardProps) {
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

  return (
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
          <BarChart3 className="w-3.5 h-3.5 text-brand-orange" />
          <span>revenge-growth.report</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
          <span className="hidden sm:inline">Datos en tiempo real</span>
        </div>
      </div>

      {/* Growth Dashboard Area */}
      <div className={`p-6 sm:p-7 text-left relative z-20 ${isLight ? 'bg-neutral-900' : 'bg-neutral-950/70'}`}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="bg-white/3 border border-white/10 rounded-xl px-3.5 py-3">
            <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">Core Web Vitals</div>
            <div className="text-lg font-mono font-extrabold text-brand-orange">98<span className="text-neutral-500 text-xs">/100</span></div>
          </div>
          <div className="bg-white/3 border border-white/10 rounded-xl px-3.5 py-3">
            <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">Conversión</div>
            <div className="text-lg font-mono font-extrabold text-blue-400">4.8%<span className="text-emerald-500 text-[10px] ml-1">▲62%</span></div>
          </div>
          <div className="bg-white/3 border border-white/10 rounded-xl px-3.5 py-3">
            <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">ROAS</div>
            <div className="text-lg font-mono font-extrabold text-amber-400">6.2x<span className="text-emerald-500 text-[10px] ml-1">▲2.1x</span></div>
          </div>
          <div className="bg-white/3 border border-white/10 rounded-xl px-3.5 py-3">
            <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">Costo/Lead</div>
            <div className="text-lg font-mono font-extrabold text-emerald-500">-38%</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-[1.3fr_1fr] gap-3">
          <div className="bg-white/3 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-3">
              <span>Tráfico Orgánico · 6 Meses</span>
              <span className="text-brand-orange font-bold">+184%</span>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {TRAFFIC_BARS.map((h, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: idx < 3
                      ? 'linear-gradient(180deg, rgba(251,44,54,0.35), rgba(255,94,58,0.25))'
                      : 'linear-gradient(180deg, #fb2c36, #ff5e3a)'
                  }}
                />
              ))}
            </div>
          </div>
          <div className="bg-white/3 border border-white/10 rounded-xl p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-3">Canales Activos</div>
            <div className="space-y-2">
              {CHANNELS.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-bold text-white">{c.value}</span>
                </div>
              ))}
            </div>
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
            <span className={isLight ? 'text-neutral-700' : 'text-neutral-300'}>Optimización Activa</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">GA4 + Search Console</span>
        </div>
        <span className="text-brand-orange font-semibold">Revenge Growth Engine</span>
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
          <Zap className="w-4 h-4 animate-pulse" />
        </div>
        <div className="text-left">
          <div className={`text-[9px] font-mono uppercase tracking-wider font-bold ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Performance</div>
          <div className={`text-xs font-bold font-mono ${isLight ? 'text-neutral-900' : 'text-white'}`}>98/100 Lighthouse</div>
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
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className={`text-[9px] font-mono uppercase tracking-wider font-bold ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Marketing ROI</div>
          <div className={`text-xs font-bold font-mono flex items-center gap-1.5 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping"></span>
            <span>6.2x ROAS</span>
          </div>
        </div>
      </div>

      {/* Background Watermark Logo */}
      <div className="absolute inset-0 opacity-5 z-0 pointer-events-none flex items-center justify-center">
        <Logo variant="icon" theme={theme} className="w-72 h-72" />
      </div>
    </div>
  );
}
