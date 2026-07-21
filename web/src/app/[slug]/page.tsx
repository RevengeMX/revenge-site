import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import RevengeSiteClient from "@/components/RevengeSiteClient";
import { SiteSettings, PageBlock } from "@/types";
import type { Metadata } from "next";

export const revalidate = 60;

const PAGE_DATA_QUERY = defineQuery(`{
  "siteSettings": *[_type == "siteSettings"][0]{
    logoText,
    logoLight{ asset->{ _id, url } },
    logoDark{ asset->{ _id, url } },
    logoIcon{ asset->{ _id, url } },
    favicon{ asset->{ _id, url } },
    logoHeightDesktop,
    logoHeightMobile,
    navItems,
    footerNavItems,
    headerCta,
    showThemeToggleInHeader,
    footerDescription,
    complianceText
  },
  "page": *[_type == "page" && slug.current == $slug][0]{
    title,
    metaTitle,
    metaDescription,
    shareImage{ asset->{ _id, url } },
    pageBuilder[]{
      ...,
      _type == "partnersBlock" => {
        ...,
        partners[]->{
          ...,
          logoImage{ asset->{ _id, url } }
        }
      },
      _type == "servicesBlock" => {
        ...,
        services[]->
      },
      _type == "clientesBlock" => {
        ...,
        clientCases[]->
      }
    }
  }
}`);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await sanityFetch({
    query: PAGE_DATA_QUERY,
    params: { slug },
  });
  const data = response.data as any;
  const page = data?.page;

  if (!page) return {};

  return {
    title: page.metaTitle || `${page.title} - Revenge Agency`,
    description: page.metaDescription || "Consultoría de desarrollo, diseño UX/UI y arquitecturas Headless.",
    openGraph: page.shareImage?.asset?.url ? {
      images: [
        {
          url: page.shareImage.asset.url,
          width: 1200,
          height: 630,
          alt: page.metaTitle || page.title,
        }
      ]
    } : undefined,
  };
}

export default async function CustomPage({ params }: PageProps) {
  const { slug } = await params;
  const response = await sanityFetch({
    query: PAGE_DATA_QUERY,
    params: { slug },
  });
  const data = response.data as any;
  
  if (!data?.page) {
    notFound();
  }

  const siteSettings: SiteSettings = data.siteSettings || {
    logoText: "REVENGE",
    navItems: [],
    footerDescription: "",
    complianceText: ""
  };

  const pageBuilder: PageBlock[] = data.page.pageBuilder || [];

  return (
    <RevengeSiteClient
      siteSettings={siteSettings}
      pageBuilder={pageBuilder}
    />
  );
}
