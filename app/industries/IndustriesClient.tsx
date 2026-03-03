'use client';

import { useMemo } from 'react';
import ProductHero from '@/components/ProductHero';
import CTASection from '@/components/CTASection';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import { titleWithBreaks } from '@/lib/utils';
import type { IndustriesPageData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.12 };

export default function IndustriesClient({ data }: { data: IndustriesPageData }) {
  const animations = useMemo(() => [
    { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.product-hero-title', from: defaults, delay: 0.3 },
    { selector: '.product-hero-description', from: defaults, delay: 0.4 },
    { selector: '.ind-card', from: stagger, trigger: '.industry-cards' },
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

      <section className="industries-page">
        <div className="section-container">
          <div className="industry-cards">
            {data.industryCards.map((card) => (
              <div key={card.title} className="ind-card">
                <div className="ind-card-left">
                  <div className="ind-card-header">
                    <span className="ind-card-number">{card.number}</span>
                    <span dangerouslySetInnerHTML={{ __html: card.icon }} />
                  </div>
                  <h3 className="ind-card-title">{card.title}</h3>
                  <p className="ind-card-description">{card.description}</p>
                </div>
                <ul className="ind-card-list">
                  {card.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
