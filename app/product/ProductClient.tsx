'use client';

import { useMemo } from 'react';
import ProductHero from '@/components/ProductHero';
import SectionLabel from '@/components/SectionLabel';
import CTASection from '@/components/CTASection';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import { titleWithBreaks } from '@/lib/utils';
import type { ProductPageData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.12 };

export default function ProductClient({ data }: { data: ProductPageData }) {
  const animations = useMemo(() => [
    { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.product-hero-title', from: defaults, delay: 0.3 },
    { selector: '.product-hero-description', from: defaults, delay: 0.4 },
    { selector: '.product-features .section-label', from: defaults, trigger: '.product-features' },
    { selector: '.product-features .section-title', from: defaults, trigger: '.product-features' },
    { selector: '.feature-card', from: stagger, trigger: '.feature-cards' },
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

      <section className="product-features">
        <div className="section-container">
          <SectionLabel text={data.features.label} />
          <h2 className="section-title">{data.features.title}</h2>

          <div className="feature-cards">
            {data.features.cards.map((card) => (
              <div key={card.number} className={`feature-card${card.isExpanded ? ' feature-card--expanded' : ''}`}>
                <span className="feature-number">{card.number}</span>
                <div className="feature-body">
                  <h3 className="feature-title">{card.title}</h3>
                  <p className="feature-description">{card.description}</p>
                  {card.listItems.length > 0 && (
                    <ul className="feature-list">
                      {card.listItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {card.tags.length > 0 && (
                    <div className="feature-tags">
                      {card.tags.map((tag) => (
                        <span key={tag} className="feature-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
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
