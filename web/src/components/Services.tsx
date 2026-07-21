import React from 'react';
import { Layers, Palette, Search, ShoppingBag, Code2, Cpu, ArrowUpRight, Check } from 'lucide-react';
import { Service, MarketingEvent } from '../types';

interface ServicesProps {
  badgeText?: string;
  title?: string;
  description?: string;
  services?: Service[];
  theme?: 'dark' | 'light';
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Services({ badgeText, title, description, services, theme = 'dark', onTrackEvent }: ServicesProps) {
  const isLight = theme === 'light';
  const resolvedServices = (services || []).filter(Boolean);

  const handleServiceClick = (serviceId: string, serviceTitle: string) => {
    onTrackEvent({
      platform: 'Both',
      eventName: 'service_explore',
      data: {
        service_id: serviceId,
        service_name: serviceTitle,
        category: 'consultoría_tecnológica_revenge'
      }
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-brand-orange" />;
      case 'Layers': return <Layers className="w-5 h-5 text-red-500" />;
      case 'Palette': return <Palette className="w-5 h-5 text-pink-500" />;
      case 'Search': return <Search className="w-5 h-5 text-blue-500" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-green-500" />;
      default: return <Cpu className="w-5 h-5 text-neutral-400" />;
    }
  };

  return (
    <section id="services-section" className={`py-24 relative transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 text-neutral-800' : 'bg-neutral-950 text-white'
    }`}>
      <div className={`absolute top-1/2 left-0 w-96 h-96 rounded-full filter blur-[150px] pointer-events-none ${
        isLight ? 'bg-brand-red/10' : 'bg-brand-red/5'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            <span>{badgeText || 'Capacidades de Consultoría Digital'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
            {title || 'Estrategias de Consultoría Tecnológica Modular'}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            {description}
          </p>
        </div>

        {/* Services Bento/List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resolvedServices.map((service, idx) => {
            const serviceKey = service._id || service._key || service.id || `service-${idx}`;
            return (
              <div
                id={`service-card-${serviceKey}`}
                key={serviceKey}
                onClick={() => handleServiceClick(service.title || `srv_${idx}`, service.title)}
              className={`rounded-3xl p-6 sm:p-8 transition-all group cursor-pointer flex flex-col justify-between space-y-6 border ${
                isLight 
                  ? 'bg-white border-neutral-200/80 hover:border-neutral-300 shadow-sm hover:shadow-md' 
                  : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700/80 hover:bg-neutral-900/60'
              }`}
            >
              <div className="space-y-4">
                {/* Header Icon */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl border shrink-0 ${
                    isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-neutral-950 border-neutral-800'
                  }`}>
                    {getIcon(service.icon)}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className={`text-xl font-bold group-hover:text-brand-orange transition-colors ${
                    isLight ? 'text-neutral-900' : 'text-white'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    {service.description}
                  </p>
                </div>

                {/* Sub items */}
                {service.details && service.details.length > 0 && (
                  <ul className="space-y-2.5 pt-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className={`flex items-start gap-2.5 text-xs font-sans ${
                        isLight ? 'text-neutral-700' : 'text-neutral-300'
                      }`}>
                        <div className="p-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange mt-0.5 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] font-mono ${
                isLight ? 'border-neutral-200 text-neutral-500' : 'border-neutral-800/60 text-neutral-500'
              }`}>
                <span className="text-brand-orange font-bold uppercase tracking-wide flex items-center gap-1 group-hover:text-brand-red transition-colors text-[9px]">
                  <span>Saber más del servicio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                </span>
              </div>

            </div>
          );
        })}
        </div>

      </div>
    </section>
  );
}
