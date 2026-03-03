'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import ProductHero from '@/components/ProductHero';
import CTASection from '@/components/CTASection';
import { titleWithBreaks } from '@/lib/utils';
import type { CaseStudiesPageData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.12 };

export default function CaseStudiesClient({ data }: { data: CaseStudiesPageData }) {
  const animations = useMemo(() => [
    { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.product-hero-title', from: defaults, delay: 0.3 },
    { selector: '.product-hero-description', from: defaults, delay: 0.4 },
    { selector: '.cs-article', from: stagger, trigger: '.case-studies-section' },
    { selector: '.product-cta .cta-title', from: defaults, trigger: '.product-cta' },
    { selector: '.product-cta .btn', from: defaults, trigger: '.product-cta' },
  ], []);

  useScrollAnimations(animations);

  return (
    <main>
      <ProductHero
        label={data.hero.label}
        title={data.hero.title}
        description={data.hero.description}
        backgroundImageUrl={data.hero.backgroundImage?.url}
      />

      <section className="case-studies-section">
        <div className="section-container">
          {data.caseStudies.map((cs) => (
            <article key={cs.companyName} className="cs-article">
              <h3>{cs.companyName}</h3>
              <div className="cs-article-grid">
                <div className="cs-article-left">
                  <div className="cs-label">Client Background</div>
                  <p className="cs-text">{cs.clientBackground}</p>
                  <div className="cs-label">Performance Challenge</div>
                  <p className="cs-text">{cs.performanceChallenge}</p>
                </div>
                <div className="cs-article-right">
                  <div className="cs-label">Implementation</div>
                  <p className="cs-text">{cs.implementation}</p>
                  <div className="cs-label">Measurable Results</div>
                  <ul className="cs-results-list">
                    {cs.measurableResults.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="cs-article-footer">
                <Link href={cs.footerCta.url} className="btn btn-dark">
                  {cs.footerCta.title}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title={titleWithBreaks(data.cta.title)}
        buttonText={data.cta.button.title}
        buttonHref={data.cta.button.url}
        className="product-cta"
      />
    </main>
  );
}
