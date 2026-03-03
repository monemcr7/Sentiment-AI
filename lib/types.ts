// ===== Shared / Reusable Types =====

export interface WPImage {
  id?: number;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: Record<string, string>;
}

export interface WPButton {
  url: string;
  title: string;
  target?: string;
}

export interface CTABlock {
  title: string;
  button: WPButton;
}

export interface HeroBlock {
  backgroundImage?: WPImage | null;
  label: string;
  title: string;
  description: string;
}

// ===== Header / Footer =====

export interface NavChild {
  label: string;
  link: string;
}

export interface NavItem {
  label: string;
  link: string;
  isParent: boolean;
  children: NavChild[];
}

export interface HeaderData {
  logo: WPImage;
  navigation: NavItem[];
  bookACall: WPButton;
  getInTouch: WPButton;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  logo: WPImage;
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
  bottomLinks: FooterLink[];
}

export interface HeaderFooterResponse {
  header: HeaderData;
  footer: FooterData;
}

// ===== Home Page =====

export interface HomeHero extends HeroBlock {
  primaryCTA: WPButton;
  secondaryCTA: WPButton;
  trustedByText: string;
  trustedByAvatars: WPImage[];
  cardImage: WPImage;
  dashboardImage: WPImage;
  gradientBarImage: WPImage;
}

export interface HomeStat {
  value: string;
  suffix: string;
  label: string;
}

export interface HomeWhoWeAreCard {
  title: string;
  description: string;
}

export interface HomeWhoWeAre {
  label: string;
  title: string;
  description: string;
  cards: HomeWhoWeAreCard[];
}

export interface HomeMethodCard {
  title: string;
  subtitle: string;
  description: string;
}

export interface HomeMethods {
  label: string;
  title: string;
  cards: HomeMethodCard[];
}

export interface HomeHowItWorksStep {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface HomeHowItWorks {
  label: string;
  title: string;
  steps: HomeHowItWorksStep[];
}

export interface HomeIntegrationItem {
  logo: WPImage;
  name: string;
  isActive: boolean;
}

export interface HomeIntegrations {
  label: string;
  title: string;
  items: HomeIntegrationItem[];
}

export interface HomeIndustryCard {
  icon: string;
  name: string;
  link: string;
}

export interface HomeIndustries {
  label: string;
  title: string;
  cards: HomeIndustryCard[];
}

export interface HomeCaseStudy {
  label: string;
  title: string;
  description: string;
  cta: WPButton;
}

export interface HomePageData {
  hero: HomeHero;
  stats: HomeStat[];
  whoWeAre: HomeWhoWeAre;
  methods: HomeMethods;
  howItWorks: HomeHowItWorks;
  integrations: HomeIntegrations;
  industries: HomeIndustries;
  caseStudy: HomeCaseStudy;
  cta: CTABlock;
}

// ===== Product Page =====

export interface ProductFeatureCard {
  number: string;
  title: string;
  description: string;
  listItems: string[];
  tags: string[];
  isExpanded: boolean;
}

export interface ProductPageData {
  hero: HeroBlock;
  features: {
    label: string;
    title: string;
    cards: ProductFeatureCard[];
  };
  cta: CTABlock;
}

// ===== Product Detail Pages =====

export interface CapabilityCard {
  icon: string;
  title: string;
  description: string;
}

export interface ProductDetailStep {
  number: string;
  title: string;
  description: string;
}

export interface ProductDetailHero extends HeroBlock {
  breadcrumb: WPButton;
}

export interface ProductDetailData {
  hero: ProductDetailHero;
  capabilities: {
    label: string;
    title: string;
    cards: CapabilityCard[];
  };
  howItWorks?: {
    label: string;
    title: string;
    steps: ProductDetailStep[];
  };
  cta: CTABlock;
}

// ===== How It Works Page =====

export interface TimelineStep {
  badge: string;
  title: string;
  description: string;
}

export interface HowItWorksPageData {
  hero: HeroBlock;
  timeline: {
    title: string;
    steps: TimelineStep[];
  };
  cta: CTABlock;
}

// ===== Industries Page =====

export interface IndustryCard {
  number: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface IndustriesPageData {
  hero: HeroBlock;
  industryCards: IndustryCard[];
  cta: CTABlock;
}

// ===== Pricing Page =====

export interface PricingPlan {
  name: string;
  description: string;
  features: string[];
  button: WPButton;
  isFeatured: boolean;
  badge: string;
}

export interface PricingPageData {
  hero: HeroBlock;
  plans: PricingPlan[];
  pricingInfo: {
    title: string;
    text: string;
  };
  cta: CTABlock;
}

// ===== Case Studies Page =====

export interface CaseStudyArticle {
  companyName: string;
  clientBackground: string;
  performanceChallenge: string;
  implementation: string;
  measurableResults: string[];
  footerCta: WPButton;
}

export interface CaseStudiesPageData {
  hero: HeroBlock;
  caseStudies: CaseStudyArticle[];
  cta: CTABlock;
}

// ===== About Page =====

export interface AboutHero extends HeroBlock {
  poweredByText: string;
}

export interface AboutStat {
  value: string;
  suffix: string;
  label: string;
}

export interface CoreValueCard {
  icon: string;
  title: string;
  description: string;
}

export interface JourneyStep {
  number: string;
  year: string;
  title: string;
  description: string;
}

export interface TeamCard {
  numberValue: string;
  numberSuffix: string;
  title: string;
  description: string;
}

export interface WhyUsItem {
  icon: string;
  text: string;
}

export interface AboutPageData {
  hero: AboutHero;
  stats: AboutStat[];
  purpose: {
    label: string;
    title: string;
    text: string;
  };
  coreValues: {
    label: string;
    title: string;
    cards: CoreValueCard[];
  };
  journey: {
    label: string;
    title: string;
    steps: JourneyStep[];
  };
  team: {
    label: string;
    title: string;
    description: string;
    cards: TeamCard[];
  };
  whyUs: {
    label: string;
    title: string;
    items: WhyUsItem[];
  };
  cta: CTABlock;
}

// ===== Contact Page =====

export interface ContactStep {
  number: string;
  title: string;
  description: string;
}

export interface ContactPageData {
  hero: HeroBlock;
  form: {
    cf7FormId: number;
    shortcode: string;
    renderedHtml: string;
  };
  nextSteps: {
    title: string;
    steps: ContactStep[];
  };
}

// ===== Resources Page =====

export interface ResourceCard {
  icon: string;
  title: string;
  description: string;
  button: WPButton;
}

export interface ResourcesPageData {
  hero: HeroBlock;
  resourceCards: ResourceCard[];
}

// ===== Legal Pages =====

export interface LegalPageData {
  hero: HeroBlock;
  content: string;
}
