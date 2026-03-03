'use client';

import { useMemo } from 'react';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import SectionLabel from '@/components/SectionLabel';
import CTASection from '@/components/CTASection';
import { titleWithBreaks } from '@/lib/utils';
import type { AboutPageData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.12 };

export default function AboutClient({ data }: { data: AboutPageData }) {
  const animations = useMemo(() => [
    // Hero
    { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.about-hero-powered', from: defaults, delay: 0.25 },
    { selector: '.product-hero-title', from: defaults, delay: 0.3 },
    { selector: '.product-hero-description', from: defaults, delay: 0.4 },
    // Stats
    { selector: '.about-stats .stat', from: stagger, trigger: '.about-stats' },
    // Purpose
    { selector: '.about-purpose .section-label', from: defaults, trigger: '.about-purpose' },
    { selector: '.about-purpose .section-title', from: defaults, trigger: '.about-purpose' },
    { selector: '.about-purpose-text', from: defaults, trigger: '.about-purpose' },
    // Values
    { selector: '.about-values .section-label', from: defaults, trigger: '.about-values' },
    { selector: '.about-values .section-title', from: defaults, trigger: '.about-values' },
    { selector: '.value-card', from: stagger, trigger: '.values-grid' },
    // Journey
    { selector: '.about-journey .section-label', from: defaults, trigger: '.about-journey' },
    { selector: '.about-journey .section-title', from: defaults, trigger: '.about-journey' },
    { selector: '.journey-step', from: stagger, trigger: '.journey-steps' },
    // Team
    { selector: '.about-team .section-label', from: defaults, trigger: '.about-team' },
    { selector: '.about-team .section-title', from: defaults, trigger: '.about-team' },
    { selector: '.about-team-description', from: defaults, trigger: '.about-team' },
    { selector: '.team-card', from: stagger, trigger: '.team-cards' },
    // Why
    { selector: '.about-why .section-label', from: defaults, trigger: '.about-why' },
    { selector: '.about-why .section-title', from: defaults, trigger: '.about-why' },
    { selector: '.why-item', from: stagger, trigger: '.why-items' },
    // CTA
    { selector: '.product-cta .cta-title', from: defaults, trigger: '.product-cta' },
    { selector: '.product-cta .btn', from: defaults, trigger: '.product-cta' },
  ], []);

  useScrollAnimations(animations);
  useCounterAnimation('.about-stats', '.about-stats .stat-value[data-target]');
  useCounterAnimation('.about-team', '.team-card-number[data-target]');

  return (
    <main>
      {/* About Hero */}
      <section className="product-hero">
        <div className="product-hero-bg">
          <img src={data.hero.backgroundImage?.url || '/assets/hero-bg.png'} alt="" className="product-hero-bg-img" />
        </div>
        <div className="product-hero-content">
          <SectionLabel text={data.hero.label} center />
          <p className="about-hero-powered">{data.hero.poweredByText}</p>
          <h1 className="product-hero-title">{data.hero.title}</h1>
          <p className="product-hero-description">{data.hero.description}</p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="about-stats">
        <div className="stats-container">
          {data.stats.map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat-value" data-target={stat.value} data-suffix={stat.suffix}>
                0{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Purpose */}
      <section className="about-purpose">
        <div className="section-container">
          <SectionLabel text={data.purpose.label} />
          <div className="about-purpose-grid">
            <div className="about-purpose-left">
              <h2 className="section-title">{data.purpose.title}</h2>
            </div>
            <div className="about-purpose-text" dangerouslySetInnerHTML={{ __html: data.purpose.text }} />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values">
        <div className="section-container">
          <SectionLabel text={data.coreValues.label} />
          <h2 className="section-title">{data.coreValues.title}</h2>
          <div className="values-grid">
            {data.coreValues.cards.map((card) => (
              <div key={card.title} className="value-card">
                <div className="value-icon" dangerouslySetInnerHTML={{ __html: card.icon }} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="about-journey">
        <div className="section-container">
          <SectionLabel text={data.journey.label} />
          <h2 className="section-title">{data.journey.title}</h2>
          <div className="journey-steps">
            {data.journey.steps.map((step) => (
              <div key={step.number} className="journey-step">
                <span className="journey-step-number">{step.number}</span>
                <div className="journey-step-body">
                  <div className="journey-step-year">{step.year}</div>
                  <h3 className="journey-step-title">{step.title}</h3>
                  <p className="journey-step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="about-team">
        <div className="section-container">
          <SectionLabel text={data.team.label} />
          <h2 className="section-title">{data.team.title}</h2>
          <p className="about-team-description">{data.team.description}</p>
          <div className="team-cards">
            {data.team.cards.map((card) => (
              <div key={card.title} className="team-card">
                <div className="team-card-number" data-target={card.numberValue} data-suffix={card.numberSuffix}>
                  0{card.numberSuffix}
                </div>
                <h3 className="team-card-title">{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NEXA AI Lab */}
      <section className="about-why">
        <div className="section-container">
          <SectionLabel text={data.whyUs.label} />
          <div className="about-why-grid">
            <div className="about-why-left">
              <h2 className="section-title">{data.whyUs.title}</h2>
            </div>
            <div className="why-items">
              {data.whyUs.items.map((item) => (
                <div key={item.text} className="why-item">
                  <div className="why-item-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
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
