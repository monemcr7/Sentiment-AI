'use client';

import { useMemo } from 'react';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import ProductHero from '@/components/ProductHero';
import type { ResourcesPageData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.12 };

export default function ResourcesClient({ data }: { data: ResourcesPageData }) {
  const animations = useMemo(() => [
    { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.product-hero-title', from: defaults, delay: 0.3 },
    { selector: '.product-hero-description', from: defaults, delay: 0.4 },
    { selector: '.resource-card', from: stagger, trigger: '.resources-grid' },
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

      <section className="resources-section">
        <div className="section-container">
          <div className="resources-grid">
            {data.resourceCards.map((card) => (
              <div key={card.title} className="resource-card">
                <div className="resource-card-icon" dangerouslySetInnerHTML={{ __html: card.icon }} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a href={card.button.url} className="resource-card-btn">
                  <span dangerouslySetInnerHTML={{ __html: card.icon }} />
                  {card.button.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
