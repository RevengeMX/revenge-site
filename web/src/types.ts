export interface MarketingEvent {
  id: string;
  timestamp: string;
  platform: 'GTM' | 'Meta Pixel' | 'Both';
  eventName: string;
  data: Record<string, any>;
}

export interface Service {
  _id?: string;
  _key?: string;
  id?: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Partner {
  _id?: string;
  _key?: string;
  id?: string;
  name: string;
  role: string;
  description: string;
  logoType?: 'shopify' | 'tiendanube' | 'contentful' | 'contento' | 'generic' | string;
  logoImage?: { asset?: { _id?: string; url?: string } };
  accentColor?: string;
}

export interface CurrentClient {
  _id?: string;
  _key?: string;
  name: string;
  logo?: { asset?: { _id?: string; url?: string; metadata?: { dimensions?: { width?: number; height?: number } } } };
  website?: string;
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
      badgeText?: string;
      title: string;
      subtitle?: string;
      partners: Partner[];
      integrationCalloutTitle?: string;
      integrationCalloutDescription?: string;
      integrationCalloutButtonLabel?: string;
      integrationCalloutButtonLink?: string;
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
      _type: 'currentClientsBlock';
      _key: string;
      title?: string;
      subtitle?: string;
      clients: CurrentClient[];
    }
  | {
      _type: 'contactBlock';
      _key: string;
      badgeText?: string;
      title?: string;
      subtitle?: string;
      emailLabel?: string;
      emailValue?: string;
      phoneLabel?: string;
      phoneValue?: string;
      phoneLink?: string;
      securityTitle?: string;
      securityDescription?: string;
      xnQsjsdp?: string;
      xmIwtLD?: string;
      submitButtonText?: string;
      gtmEventName?: string;
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

