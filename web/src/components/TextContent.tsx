import React from 'react';
import { PortableText } from '@portabletext/react';

interface TextContentProps {
  title?: string;
  subtitle?: string;
  content?: any[];
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 font-sans">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-10 mb-6 font-sans">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-8 mb-4 font-sans border-b border-neutral-900 pb-2">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl sm:text-2xl font-bold text-neutral-200 tracking-tight mt-6 mb-3 font-sans">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-brand-orange pl-4 italic text-neutral-300 my-6 bg-neutral-900/40 py-3 pr-4 rounded-r-lg font-sans">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside text-neutral-400 text-sm sm:text-base space-y-2 mb-6 font-sans pl-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside text-neutral-400 text-sm sm:text-base space-y-2 mb-6 font-sans pl-4">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-neutral-300">{children}</em>,
    code: ({ children }: any) => <code className="bg-neutral-900 text-brand-orange px-1.5 py-0.5 rounded font-mono text-xs">{children}</code>,
  },
};

export default function TextContent({ title, subtitle, content }: TextContentProps) {
  return (
    <section className="relative py-20 bg-neutral-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-12 border-b border-neutral-900 pb-8 text-center sm:text-left">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 font-sans">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-mono uppercase tracking-wider text-brand-orange">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {content && content.length > 0 ? (
          <div className="prose prose-invert max-w-none">
            <PortableText value={content} components={portableTextComponents} />
          </div>
        ) : (
          <div className="text-center py-10 text-neutral-600 text-sm italic border border-dashed border-neutral-900 rounded-xl">
            Este bloque de texto está listo para llenarse desde Sanity Studio.
          </div>
        )}
      </div>
    </section>
  );
}
