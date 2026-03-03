'use client';

import { useMemo } from 'react';
import ProductHero from '@/components/ProductHero';
import CTASection from '@/components/CTASection';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import { titleWithBreaks } from '@/lib/utils';
import type { HowItWorksPageData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.15 };

export default function HowItWorksClient({ data }: { data: HowItWorksPageData }) {
  const animations = useMemo(() => [
    { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.product-hero-title', from: defaults, delay: 0.3 },
    { selector: '.product-hero-description', from: defaults, delay: 0.4 },
    { selector: '.timeline-section .section-title', from: defaults, trigger: '.timeline-section' },
    { selector: '.timeline-step', from: stagger, trigger: '.timeline' },
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

      <section className="timeline-section">
        <div className="section-container">
          <h2 className="section-title">{data.timeline.title}</h2>

          <div className="timeline">
            {data.timeline.steps.map((step, i) => (
              <div key={step.badge} className="timeline-step">
                <div className="timeline-marker">
                  <div className="timeline-badge">{step.badge}</div>
                  {i < data.timeline.steps.length - 1 && <div className="timeline-line"></div>}
                </div>
                <div className="timeline-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
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
