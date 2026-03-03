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
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} fetching ${endpoint}`);
  }

  return res.json() as Promise<T>;
}

export function getHeaderFooter() {
  return fetchAPI<HeaderFooterResponse>('header_footer_settings');
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
