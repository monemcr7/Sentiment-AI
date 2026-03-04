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

/** Fallback when header_footer API is unreachable (e.g. 403 during Vercel build). */
const HEADER_FOOTER_FALLBACK: HeaderFooterResponse = {
  header: {
    logo: { url: '/assets/logo.png', alt: 'Sentiment AI' },
    navigation: [],
    bookACall: { url: '/contact', title: 'Book a call' },
    getInTouch: { url: '/contact', title: 'Get in touch' },
  },
  footer: {
    logo: { url: '/assets/logo.png', alt: 'Sentiment AI' },
    tagline: '',
    columns: [],
    copyright: `© ${new Date().getFullYear()} Sentiment AI. All rights reserved.`,
    bottomLinks: [],
  },
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

/** Fetches header/footer; on 403 or other failure returns fallback so build (e.g. Vercel) can succeed. */
export async function getHeaderFooter(): Promise<HeaderFooterResponse> {
  try {
    return await fetchAPI<HeaderFooterResponse>('header_footer_settings');
  } catch {
    return HEADER_FOOTER_FALLBACK;
  }
}

export function getHomePage() {
  return fetchAPI<HomePageData>('home');
}

export function getProductPage() {
  return fetchAPI<ProductPageData>('product');
}

export function getProductDetail(
  slug: 'call-analysis' | 'sentiment-trust-scoring' | 'behavioral-benchmarking' | 'security-overview'
) {
  return fetchAPI<ProductDetailData>(`product-detail/${slug}`);
}

export function getHowItWorksPage() {
  return fetchAPI<HowItWorksPageData>('how-it-works');
}

export function getIndustriesPage() {
  return fetchAPI<IndustriesPageData>('industries');
}

export function getPricingPage() {
  return fetchAPI<PricingPageData>('pricing');
}

export function getCaseStudiesPage() {
  return fetchAPI<CaseStudiesPageData>('case-studies');
}

export function getAboutPage() {
  return fetchAPI<AboutPageData>('about');
}

export function getContactPage() {
  return fetchAPI<ContactPageData>('contact');
}

export function getResourcesPage() {
  return fetchAPI<ResourcesPageData>('resources');
}

export function getLegalPage(slug: 'privacy-policy' | 'terms-of-service') {
  return fetchAPI<LegalPageData>(`legal/${slug}`);
}
