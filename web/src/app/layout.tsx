import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { defineQuery } from "next-sanity";

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

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
