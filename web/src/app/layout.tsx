import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { defineQuery } from "next-sanity";
import { GTM_ID, GA4_ID } from "@/lib/gtm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const LAYOUT_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    favicon{ asset->{ url } }
  }
`);

export async function generateMetadata(): Promise<Metadata> {
  const response = await sanityFetch({ query: LAYOUT_QUERY });
  const data = response.data as any;
  const faviconUrl = data?.favicon?.asset?.url;

  return {
    title: "Revenge Agency",
    description: "Consultoría de desarrollo, diseño UX/UI y arquitecturas Headless.",
    icons: faviconUrl ? {
      icon: faviconUrl,
    } : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || "";

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {isDraftMode && (
          <>
            <SanityLive />
            <VisualEditing />
          </>
        )}
      </body>
      <GoogleTagManager gtmId={GTM_ID} />
      <GoogleAnalytics gaId={GA4_ID} />
      {clarityId && (
        <Script
          id="microsoft-clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}
    </html>
  );
}
