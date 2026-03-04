import type {
  HeaderFooterResponse,
  HomePageData,
  ProductPageData,
  ProductDetailData,
  HowItWorksPageData,
  IndustriesPageData,
  PricingPageData,
  CaseStudiesPageData,
  AboutPageData,
  ContactPageData,
  ResourcesPageData,
  LegalPageData,
} from './types';

const API_BASE = 'https://sentimentai.nexatestwp.com/wp-json/custom/v1';

const REVALIDATE = 60;

const LOGO = { url: '/assets/logo.png', alt: 'Sentiment AI' };
const MINIMAL_CTA: { title: string; button: { url: string; title: string } } = {
  title: 'Ready to get started?',
  button: { url: '/contact', title: 'Contact us' },
};

/** Fallback when header_footer API is unreachable (e.g. 403). */
const HEADER_FOOTER_FALLBACK: HeaderFooterResponse = {
  header: {
    logo: LOGO,
    navigation: [],
    bookACall: { url: '/contact', title: 'Book a call' },
    getInTouch: { url: '/contact', title: 'Get in touch' },
  },
  footer: {
    logo: LOGO,
    tagline: '',
    columns: [],
    copyright: `© ${new Date().getFullYear()} Sentiment AI. All rights reserved.`,
    bottomLinks: [],
  },
};

const HERO_FALLBACK = {
  label: 'Revenue Intelligence',
  title: 'Sentiment AI',
  description: 'Capture, analyze, and score every sales conversation.',
};

const HOME_FALLBACK: HomePageData = {
  hero: {
    ...HERO_FALLBACK,
    primaryCTA: { url: '/contact', title: 'Book a demo' },
    secondaryCTA: { url: '/contact', title: 'Get in touch' },
    trustedByText: 'Trusted by revenue teams',
    trustedByAvatars: [],
    cardImage: LOGO,
    dashboardImage: LOGO,
    gradientBarImage: LOGO,
  },
  stats: [],
  whoWeAre: { label: '', title: 'Who we are', description: '', cards: [] },
  methods: { label: '', title: '', cards: [] },
  howItWorks: { label: '', title: '', steps: [] },
  integrations: { label: '', title: '', items: [] },
  industries: { label: '', title: '', cards: [] },
  caseStudy: { label: '', title: '', description: '', cta: { url: '/contact', title: 'Learn more' } },
  cta: MINIMAL_CTA,
};

const PRODUCT_FALLBACK: ProductPageData = {
  hero: HERO_FALLBACK,
  features: { label: '', title: '', cards: [] },
  cta: MINIMAL_CTA,
};

const PRODUCT_DETAIL_FALLBACK: ProductDetailData = {
  hero: { ...HERO_FALLBACK, breadcrumb: { url: '/product', title: 'Product' } },
  capabilities: { label: '', title: '', cards: [] },
  cta: MINIMAL_CTA,
};

const HOW_IT_WORKS_FALLBACK: HowItWorksPageData = {
  hero: HERO_FALLBACK,
  timeline: { title: '', steps: [] },
  cta: MINIMAL_CTA,
};

const INDUSTRIES_FALLBACK: IndustriesPageData = {
  hero: HERO_FALLBACK,
  industryCards: [],
  cta: MINIMAL_CTA,
};

const PRICING_FALLBACK: PricingPageData = {
  hero: HERO_FALLBACK,
  plans: [],
  pricingInfo: { title: '', text: '' },
  cta: MINIMAL_CTA,
};

const CASE_STUDIES_FALLBACK: CaseStudiesPageData = {
  hero: HERO_FALLBACK,
  caseStudies: [],
  cta: MINIMAL_CTA,
};

const ABOUT_FALLBACK: AboutPageData = {
  hero: { ...HERO_FALLBACK, poweredByText: '' },
  stats: [],
  purpose: { label: '', title: '', text: '' },
  coreValues: { label: '', title: '', cards: [] },
  journey: { label: '', title: '', steps: [] },
  team: { label: '', title: '', description: '', cards: [] },
  whyUs: { label: '', title: '', items: [] },
  cta: MINIMAL_CTA,
};

const CONTACT_FALLBACK: ContactPageData = {
  hero: HERO_FALLBACK,
  form: { cf7FormId: 0, shortcode: '', renderedHtml: '<p>Form unavailable. Please email us or try again later.</p>' },
  nextSteps: { title: 'Next steps', steps: [] },
};

const RESOURCES_FALLBACK: ResourcesPageData = {
  hero: HERO_FALLBACK,
  resourceCards: [],
};

const LEGAL_FALLBACK: LegalPageData = {
  hero: HERO_FALLBACK,
  content: '<p>Content is currently unavailable.</p>',
};

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} fetching ${endpoint}`);
  }

  return res.json() as Promise<T>;
}

function withFallback<T>(endpoint: string, fallback: T): () => Promise<T> {
  return async () => {
    try {
      return await fetchAPI<T>(endpoint);
    } catch {
      return fallback;
    }
  };
}

/** Fetches header/footer; on 403 or other failure returns fallback. */
export async function getHeaderFooter(): Promise<HeaderFooterResponse> {
  try {
    return await fetchAPI<HeaderFooterResponse>('header_footer_settings');
  } catch {
    return HEADER_FOOTER_FALLBACK;
  }
}

export const getHomePage = withFallback('home', HOME_FALLBACK);
export const getProductPage = withFallback('product', PRODUCT_FALLBACK);
export const getHowItWorksPage = withFallback('how-it-works', HOW_IT_WORKS_FALLBACK);
export const getIndustriesPage = withFallback('industries', INDUSTRIES_FALLBACK);
export const getPricingPage = withFallback('pricing', PRICING_FALLBACK);
export const getCaseStudiesPage = withFallback('case-studies', CASE_STUDIES_FALLBACK);
export const getAboutPage = withFallback('about', ABOUT_FALLBACK);
export const getContactPage = withFallback('contact', CONTACT_FALLBACK);
export const getResourcesPage = withFallback('resources', RESOURCES_FALLBACK);

export async function getProductDetail(
  slug: 'call-analysis' | 'sentiment-trust-scoring' | 'behavioral-benchmarking' | 'security-overview'
): Promise<ProductDetailData> {
  try {
    return await fetchAPI<ProductDetailData>(`product-detail/${slug}`);
  } catch {
    return PRODUCT_DETAIL_FALLBACK;
  }
}

export async function getLegalPage(slug: 'privacy-policy' | 'terms-of-service'): Promise<LegalPageData> {
  try {
    return await fetchAPI<LegalPageData>(`legal/${slug}`);
  } catch {
    return LEGAL_FALLBACK;
  }
}
