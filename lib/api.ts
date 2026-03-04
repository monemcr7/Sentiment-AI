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

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.WORDPRESS_API_KEY ?? '',
    },
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} fetching ${endpoint}`);
  }

  return res.json() as Promise<T>;
}

const FALLBACK_HEADER_FOOTER: HeaderFooterResponse = {
  header: {
    logo: { url: '/assets/logo.svg', alt: 'Sentiment AI' },
    navigation: [],
    bookACall: { title: '', url: '' },
    getInTouch: { title: '', url: '' },
  },
  footer: {
    logo: { url: '/assets/logo.svg', alt: 'Sentiment AI' },
    tagline: '',
    columns: [],
    copyright: '',
    bottomLinks: [],
  },
};

export async function getHeaderFooter() {
  try {
    return await fetchAPI<HeaderFooterResponse>('header_footer_settings');
  } catch {
    // Fallback for build-time when the WP API is unreachable (e.g. 403 from Vercel build servers)
    return FALLBACK_HEADER_FOOTER;
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
