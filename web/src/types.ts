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

// --- Product landing kit (CheckApp and future product landings) ---

export interface ProductImageRef {
  asset?: { _id?: string; url?: string; metadata?: { dimensions?: { width?: number; height?: number } } };
}

export interface ProductFeature {
  title?: string;
  description?: string;
  accentColor?: string;
  icon?: ProductImageRef;
}

export interface ProductStep {
  title?: string;
  description?: string;
}

export interface ProductAudience {
  profile?: string;
  benefit?: string;
  accentColor?: string;
}

export interface ProductScreenshot {
  group?: 'app' | 'panel';
  image?: ProductImageRef;
  caption?: string;
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
      visualType?: 'none' | 'image' | 'video' | 'interactive';
      visualImage?: { asset?: { _id?: string; url?: string; metadata?: { dimensions?: { width?: number; height?: number } } } };
      visualVideoFile?: { asset?: { _id?: string; url?: string; mimeType?: string } };
      visualVideoUrl?: string;
      visualPosition?: 'background' | 'right' | 'left' | 'below';
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
    }
  | {
      _type: 'productHeroBlock';
      _key: string;
      productLogoLight?: ProductImageRef;
      eyebrow?: string;
      headline: string;
      subheadline?: string;
      primaryCtaLabel?: string;
      primaryCtaHref?: string;
      secondaryCtaLabel?: string;
      secondaryCtaHref?: string;
      phoneMockupImage?: ProductImageRef;
      appStoreBadgeImage?: ProductImageRef;
      playStoreBadgeImage?: ProductImageRef;
    }
  | {
      _type: 'productHowItWorksBlock';
      _key: string;
      title?: string;
      subtitle?: string;
      steps?: ProductStep[];
    }
  | {
      _type: 'productFeatureGridBlock';
      _key: string;
      title?: string;
      subtitle?: string;
      features?: ProductFeature[];
    }
  | {
      _type: 'productHighlightBlock';
      _key: string;
      badgeText?: string;
      title?: string;
      description?: string;
      bullets?: string[];
      accentColor?: string;
      badgeImage?: ProductImageRef;
    }
  | {
      _type: 'productAudienceGridBlock';
      _key: string;
      title?: string;
      subtitle?: string;
      audiences?: ProductAudience[];
    }
  | {
      _type: 'productScreenshotShowcaseBlock';
      _key: string;
      title?: string;
      subtitle?: string;
      screenshots?: ProductScreenshot[];
    }
  | {
      _type: 'productClientsBlock';
      _key: string;
      title?: string;
      clients?: CurrentClient[];
    }
  | {
      _type: 'productCtaBlock';
      _key: string;
      badgeText?: string;
      title?: string;
      subtitle?: string;
      submitButtonText?: string;
      emailValue?: string;
      phoneValue?: string;
      phoneLink?: string;
    };

export interface LandingPageData {
  title: string;
  pageBuilder?: PageBlock[];
}

