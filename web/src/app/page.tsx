import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import RevengeSiteClient from "@/components/RevengeSiteClient";
import { SiteSettings, PageBlock } from "@/types";

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
    footerDescription,
    complianceText
  },
  "landingPage": *[_type == "landingPage"][0]{
    title,
    metaTitle,
    metaDescription,
    shareImage{ asset->{ _id, url } },
    pageBuilder[]{
      ...,
      _type == "partnersBlock" => {
        ...,
        partners[]->
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

export async function generateMetadata() {
  const response = await sanityFetch({ query: PAGE_DATA_QUERY });
  const data = response.data as any;
  const lp = data.landingPage;

  return {
    title: lp?.metaTitle || lp?.title || 'Revenge Agency',
    description: lp?.metaDescription || 'Consultoría de desarrollo y diseño moderno.',
    openGraph: lp?.shareImage?.asset?.url ? {
      images: [
        {
          url: lp.shareImage.asset.url,
          width: 1200,
          height: 630,
          alt: lp?.metaTitle || lp?.title || 'Revenge Agency',
        }
      ]
    } : undefined,
  };
}

export default async function Home() {
  const response = await sanityFetch({ query: PAGE_DATA_QUERY });
  const data = response.data as any;

  const siteSettings: SiteSettings = data.siteSettings || {
    logoText: "REVENGE",
    navItems: [],
    footerDescription: "",
    complianceText: ""
  };

  const pageBuilder: PageBlock[] = data.landingPage?.pageBuilder || [];

  return (
    <RevengeSiteClient
      siteSettings={siteSettings}
      pageBuilder={pageBuilder}
    />
  );
}
