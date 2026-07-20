import React from 'react';
import { Layers, Palette, Search, ShoppingBag, Code2, Cpu, ArrowUpRight, Check } from 'lucide-react';
import { Service, MarketingEvent } from '../types';

interface ServicesProps {
  title: string;
  description: string;
  services: Service[];
  onTrackEvent: (event: Omit<MarketingEvent, 'id' | 'timestamp'>) => void;
}

export default function Services({ title, description, services, onTrackEvent }: ServicesProps) {
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
      case 'Search': return <Search className="w-5 h-5 text-blue-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-green-400" />;
      default: return <Cpu className="w-5 h-5 text-neutral-400" />;
    }
  };

  return (
    <section id="services-section" className="py-24 bg-neutral-950 text-white relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            <span>Capacidades de Consultoría Digital</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {title || 'Estrategias de Consultoría Tecnológica Modular'}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Services Bento/List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resolvedServices.map((service) => (
            <div
              id={`service-card-${service._id}`}
              key={service._id}
              onClick={() => handleServiceClick(service._id, service.title)}
              className="bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700/80 rounded-3xl p-6 sm:p-8 transition-all hover:bg-neutral-900/60 group cursor-pointer flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header Icon & Field Map Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 shrink-0">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-[10px] bg-neutral-950 text-neutral-500 hover:text-neutral-300 transition-colors font-mono border border-neutral-800 rounded-lg px-2.5 py-1 flex items-center gap-1.5 select-none">
                    <span>Sanity Type</span>
                    <span className="text-brand-orange">_type: service</span>
                  </span>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Sub items */}
                {Array.isArray(service.details) && (
                  <ul className="space-y-2.5 pt-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
                        <div className="p-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange mt-0.5 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Contento Fields Schema Quick Peek */}
              <div className="pt-4 border-t border-neutral-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] font-mono text-neutral-500">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span>Schema: <code className="text-neutral-400">service</code></span>
                  <span>Fields: <code className="text-neutral-400">array</code></span>
                </div>
                <span className="text-brand-orange font-bold uppercase tracking-wide flex items-center gap-1 group-hover:text-white transition-colors text-[9px]">
                  <span>Ver en CMS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
