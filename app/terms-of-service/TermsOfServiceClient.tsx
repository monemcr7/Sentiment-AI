'use client';

import { useMemo } from 'react';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import ProductHero from '@/components/ProductHero';
import type { LegalPageData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };

export default function TermsOfServiceClient({ data }: { data: LegalPageData }) {
  const animations = useMemo(() => [
    { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.product-hero-title', from: defaults, delay: 0.3 },
    { selector: '.product-hero-description', from: defaults, delay: 0.4 },
    { selector: '.privacy-content', from: defaults, trigger: '.privacy-section' },
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

      <section className="privacy-section">
        <div className="section-container">
          <div
            className="privacy-content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </section>
    </main>
  );
}
