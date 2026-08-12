import React from 'react';

interface Step {
  title?: string;
  description?: string;
}

interface ProductHowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
  theme?: 'dark' | 'light';
}

export default function ProductHowItWorks({ title, subtitle, steps, theme = 'dark' }: ProductHowItWorksProps) {
  const isLight = theme === 'light';
  const validSteps = (steps || []).filter((s) => s?.title);

  if (validSteps.length === 0) return null;

  return (
    <section className={`py-24 border-t transition-colors duration-300 ${
      isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0a0a0a] border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            {title && (
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {validSteps.map((step, idx) => (
            <div key={idx} className="relative space-y-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-2xl font-mono text-sm font-bold border ${
                isLight ? 'bg-white border-neutral-200 text-neutral-900' : 'bg-white/5 border-white/15 text-white'
              }`}>
                <span className="text-[#fb2c36]">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <h3 className={`text-lg font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>{step.title}</h3>
              {step.description && (
                <p className={`text-sm leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  {step.description}
                </p>
              )}
              {idx < validSteps.length - 1 && (
                <div className={`hidden lg:block absolute top-6 left-full w-8 h-px -translate-x-4 ${
                  isLight ? 'bg-neutral-300' : 'bg-white/15'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
