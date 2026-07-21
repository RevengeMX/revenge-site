export interface MarketingEvent {
  id: string;
  timestamp: string;
  platform: 'GTM' | 'Meta Pixel' | 'Both';
  eventName: string;
  data: Record<string, any>;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Partner {
  _id: string;
  name: string;
  role: string;
  description: string;
  logoType: 'shopify' | 'tiendanube' | 'contentful' | 'contento';
  accentColor?: string;
}

export interface ClientCase {
  _id: string;
  name: string;
  industry: string;
  metric: string;
  metricLabel: string;
  summary: string;
  quote: string;
  author: string;
  role: string;
  tag: 'eCommerce' | 'Headless' | 'Mobile';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  logoText: string;
  logoLight?: any;
  logoDark?: any;
  logoIcon?: any;
  favicon?: any;
  logoHeightDesktop?: number;
  logoHeightMobile?: number;
  navItems: NavItem[];
  footerNavItems?: NavItem[];
  headerCta?: {
    label?: string;
    href?: string;
    linkType?: 'internal' | 'external';
  }[];
  showThemeToggleInHeader?: boolean;
  footerDescription: string;
  complianceText: string;
}

export interface LandingPage {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: any;
  pageBuilder?: PageBlock[];
}



export type PageBlock =
  | {
      _type: 'heroBlock';
      _key: string;
      showPromoBadge: boolean;
      promoBadgeText?: string;
      heroTitle: string;
      heroSubtitle: string;
      bullets?: string[];
      buttons?: {
        label?: string;
        href?: string;
        style?: 'primary' | 'secondary' | 'tertiary';
      }[];
    }
  | {
      _type: 'partnersBlock';
      _key: string;
      title: string;
      partners: Partner[];
    }
  | {
      _type: 'servicesBlock';
      _key: string;
      badgeText?: string;
      title: string;
      description: string;
      services: Service[];
    }
  | {
      _type: 'clientesBlock';
      _key: string;
      title: string;
      description: string;
      clientCases: ClientCase[];
    }
  | {
      _type: 'contactBlock';
      _key: string;
      title: string;
      subtitle: string;
    }
  | {
      _type: 'textContentBlock';
      _key: string;
      title?: string;
      subtitle?: string;
      content?: any[];
    };

export interface LandingPageData {
  title: string;
  pageBuilder?: PageBlock[];
}

