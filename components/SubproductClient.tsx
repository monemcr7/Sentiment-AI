'use client';

import { useMemo } from 'react';
import SubproductBreadcrumb from '@/components/SubproductBreadcrumb';
import ProductHero from '@/components/ProductHero';
import CapabilitiesGrid from '@/components/CapabilitiesGrid';
import StepsGrid from '@/components/StepsGrid';
import CTASection from '@/components/CTASection';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import { titleWithBreaks } from '@/lib/utils';
import type { ProductDetailData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.12 };

export default function SubproductClient({ data }: { data: ProductDetailData }) {
  const animations = useMemo(() => {
    const anims = [
      { selector: '.subproduct-breadcrumb', from: defaults, delay: 0.1 },
      { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
      { selector: '.product-hero-title', from: defaults, delay: 0.3 },
      { selector: '.product-hero-description', from: defaults, delay: 0.4 },
      { selector: '.capabilities-section .section-label', from: defaults, trigger: '.capabilities-section' },
      { selector: '.capabilities-section .section-title', from: defaults, trigger: '.capabilities-section' },
      { selector: '.capability-card', from: stagger, trigger: '.capabilities-grid' },
    ];
    if (data.howItWorks) {
      anims.push(
        { selector: '.subproduct-steps .section-label', from: defaults, trigger: '.subproduct-steps' },
        { selector: '.subproduct-steps .section-title', from: defaults, trigger: '.subproduct-steps' },
        { selector: '.step-box', from: stagger, trigger: '.steps-grid' },
      );
    }
    anims.push(
      { selector: '.product-cta .cta-title', from: defaults, trigger: '.product-cta' },
      { selector: '.product-cta .btn', from: defaults, trigger: '.product-cta' },
    );
    return anims;
  }, [data.howItWorks]);

  useScrollAnimations(animations);

  return (
    <main>
      <ProductHero
        label={data.hero.label}
        title={data.hero.title}
        description={data.hero.description}
        backgroundImageUrl={data.hero.backgroundImage?.url}
      >
        <SubproductBreadcrumb label={data.hero.breadcrumb.title} url={data.hero.breadcrumb.url} />
      </ProductHero>
      <CapabilitiesGrid
        label={data.capabilities.label}
        title={data.capabilities.title}
        capabilities={data.capabilities.cards}
      />
      {data.howItWorks && (
        <StepsGrid
          label={data.howItWorks.label}
          title={data.howItWorks.title}
          steps={data.howItWorks.steps}
        />
      )}
      <CTASection title={titleWithBreaks(data.cta.title)} buttonText={data.cta.button.title} buttonHref={data.cta.button.url} className="product-cta" />
    </main>
  );
}
