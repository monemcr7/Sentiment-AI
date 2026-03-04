'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import ProductHero from '@/components/ProductHero';
import CTASection from '@/components/CTASection';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import { titleWithBreaks } from '@/lib/utils';
import type { PricingPageData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.15 };

const checkIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.33 8l3.34 3.33L12.67 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function PricingClient({ data }: { data: PricingPageData }) {
  const animations = useMemo(() => [
    { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.product-hero-title', from: defaults, delay: 0.3 },
    { selector: '.product-hero-description', from: defaults, delay: 0.4 },
    { selector: '.pricing-card', from: stagger, trigger: '.pricing-grid' },
    { selector: '.pricing-info .section-title', from: defaults, trigger: '.pricing-info' },
    { selector: '.pricing-info-text', from: stagger, trigger: '.pricing-info' },
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

      <section className="pricing-section">
        <div className="section-container">
          <div className="pricing-grid">
            {data.plans.map((plan) => (
              <div key={plan.name} className={`pricing-card${plan.isFeatured ? ' pricing-card--featured' : ''}`}>
                {plan.badge && <span className="pricing-card-badge">{plan.badge}</span>}
                <div className="pricing-card-head">
                  <h3 className="pricing-card-name">{plan.name}</h3>
                  <p className="pricing-card-desc">{plan.description}</p>
                </div>
                <ul className="pricing-card-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>{checkIcon} {feature}</li>
                  ))}
                </ul>
                <Link href="/contact" className={`pricing-card-btn${plan.isFeatured ? ' pricing-card-btn--primary' : ''}`}>
                  {plan.button.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-info">
        <div className="section-container">
          <h2 className="section-title" style={{ textAlign: 'left' }}>{data.pricingInfo.title}</h2>
          <div className="pricing-info-text" dangerouslySetInnerHTML={{ __html: data.pricingInfo.text }} />
        </div>
      </section>

      <CTASection
        title={titleWithBreaks(data.cta.title)}
        buttonText={data.cta.button.title}
        buttonHref="/contact"
        className="product-cta"
      />
    </main>
  );
}
