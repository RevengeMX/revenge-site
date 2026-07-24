import React from 'react';
import { PortableText } from '@portabletext/react';

interface TextContentProps {
  title?: string;
  subtitle?: string;
  content?: any[];
  theme?: 'dark' | 'light';
}

function getPortableTextComponents(isLight: boolean) {
  return {
    block: {
      normal: ({ children }: any) => (
        <p className={`text-sm sm:text-base leading-relaxed mb-6 font-sans ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>{children}</p>
      ),
      h1: ({ children }: any) => (
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-10 mb-6 font-sans ${isLight ? 'text-neutral-900' : 'text-white'}`}>{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mt-8 mb-4 font-sans border-b pb-2 ${
          isLight ? 'text-neutral-900 border-neutral-200' : 'text-white border-neutral-900'
        }`}>{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mt-6 mb-3 font-sans ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>{children}</h3>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className={`border-l-4 border-brand-orange pl-4 italic my-6 py-3 pr-4 rounded-r-lg font-sans ${
          isLight ? 'text-neutral-700 bg-neutral-100/70' : 'text-neutral-300 bg-neutral-900/40'
        }`}>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className={`list-disc list-inside text-sm sm:text-base space-y-2 mb-6 font-sans pl-4 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className={`list-decimal list-inside text-sm sm:text-base space-y-2 mb-6 font-sans pl-4 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>{children}</ol>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className={`font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>{children}</strong>,
      em: ({ children }: any) => <em className={`italic ${isLight ? 'text-neutral-800' : 'text-neutral-300'}`}>{children}</em>,
      code: ({ children }: any) => (
        <code className={`px-1.5 py-0.5 rounded font-mono text-xs text-brand-orange ${isLight ? 'bg-neutral-100' : 'bg-neutral-900'}`}>{children}</code>
      ),
    },
  };
}

export default function TextContent({ title, subtitle, content, theme = 'dark' }: TextContentProps) {
  const isLight = theme === 'light';

  return (
    <section className={`relative py-20 transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-neutral-950/40'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className={`mb-12 border-b pb-8 text-center sm:text-left ${isLight ? 'border-neutral-200' : 'border-neutral-900'}`}>
            {title && (
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 font-sans ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base leading-relaxed font-mono uppercase tracking-wider text-brand-orange">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {content && content.length > 0 ? (
          <div className={`prose max-w-none ${isLight ? '' : 'prose-invert'}`}>
            <PortableText value={content} components={getPortableTextComponents(isLight)} />
          </div>
        ) : (
          <div className={`text-center py-10 text-sm italic border border-dashed rounded-xl ${
            isLight ? 'text-neutral-400 border-neutral-300' : 'text-neutral-600 border-neutral-900'
          }`}>
            Este bloque de texto está listo para llenarse desde Sanity Studio.
          </div>
        )}
      </div>
    </section>
  );
}
