'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import SectionLabel from '@/components/SectionLabel';
import CTASection from '@/components/CTASection';
import { titleWithBreaks } from '@/lib/utils';
import type { HomePageData } from '@/lib/types';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.12 };

export default function HomeClient({ data }: { data: HomePageData }) {
  const animations = useMemo(() => [
    // Hero
    { selector: '.hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.hero .hero-title', from: defaults, delay: 0.3 },
    { selector: '.hero .hero-description', from: defaults, delay: 0.4 },
    { selector: '.hero .hero-buttons', from: defaults, delay: 0.5 },
    { selector: '.hero .trusted-by', from: defaults, delay: 0.6 },
    { selector: '.hero-right', from: { opacity: 0, x: 40, duration: 0.7, ease: 'power2.out' }, delay: 0.4 },
    // Stats
    { selector: '.stats .stat', from: stagger, trigger: '.stats' },
    // Who We Are
    { selector: '.who-we-are .section-label', from: defaults, trigger: '.who-we-are' },
    { selector: '.who-we-are .section-title', from: defaults, trigger: '.who-we-are' },
    { selector: '.who-we-are .who-right', from: defaults, trigger: '.who-we-are' },
    { selector: '.problem-card', from: stagger, trigger: '.problem-cards' },
    // Methods
    { selector: '.methods .section-label', from: defaults, trigger: '.methods' },
    { selector: '.methods .section-title', from: defaults, trigger: '.methods' },
    { selector: '.method-card', from: stagger, trigger: '.methods-grid' },
    // How It Works
    { selector: '.how-it-works .section-label', from: defaults, trigger: '.how-it-works' },
    { selector: '.how-it-works .section-title', from: defaults, trigger: '.how-it-works' },
    { selector: '.step', from: stagger, trigger: '.steps' },
    // Integrations
    { selector: '.integrations .section-label', from: defaults, trigger: '.integrations' },
    { selector: '.integrations .section-title', from: defaults, trigger: '.integrations' },
    { selector: '.integration-card', from: stagger, trigger: '.integration-logos' },
    // Industries
    { selector: '.industries .section-label', from: defaults, trigger: '.industries' },
    { selector: '.industries .section-title', from: defaults, trigger: '.industries' },
    { selector: '.industry-card', from: stagger, trigger: '.industries-grid' },
    // Case Study
    { selector: '.case-study .section-label', from: defaults, trigger: '.case-study' },
    { selector: '.case-study-title', from: defaults, trigger: '.case-study' },
    { selector: '.case-study-description', from: defaults, trigger: '.case-study' },
    { selector: '.case-study .btn', from: defaults, trigger: '.case-study' },
    // CTA
    { selector: '.cta .cta-title', from: defaults, trigger: '.cta' },
    { selector: '.cta .btn', from: defaults, trigger: '.cta' },
  ], []);

  useScrollAnimations(animations);
  useCounterAnimation('.stats', '.stat-value[data-target]');

  return (
    <main>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img src={data.hero.backgroundImage?.url || '/assets/hero-bg.png'} alt="" className="hero-bg-img" />
        </div>
        <div className="hero-content">
          <div className="hero-left">
            <SectionLabel text={data.hero.label} />
            <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: data.hero.title }} />
            <p className="hero-description">{data.hero.description}</p>
            <div className="hero-buttons">
              <Link href={data.hero.primaryCTA.url} className="btn btn-white">
                {data.hero.primaryCTA.title}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href={data.hero.secondaryCTA.url} className="btn btn-dark">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {data.hero.secondaryCTA.title}
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="trusted-by">
              <div className="avatar-group">
                {data.hero.trustedByAvatars.map((avatar, i) => (
                  <img key={i} src={avatar.url} alt={avatar.alt || ''} className="avatar" />
                ))}
              </div>
              <span className="trusted-text" dangerouslySetInnerHTML={{ __html: data.hero.trustedByText }} />
            </div>
            <img src={data.hero.cardImage.url} alt={data.hero.cardImage.alt || 'Sentiment AI Dashboard'} className="hero-card" />
            <img src={data.hero.dashboardImage.url} alt={data.hero.dashboardImage.alt || 'Revenue Intelligence Dashboard'} className="hero-dashboard" />
          </div>
        </div>
        <div className="hero-gradient-bar">
          <img src={data.hero.gradientBarImage.url} alt="" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
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

      {/* Who We Are Section */}
      <section className="who-we-are">
        <div className="section-container">
          <div className="who-grid">
            <div className="who-left">
              <SectionLabel text={data.whoWeAre.label} />
              <h2 className="section-title">{data.whoWeAre.title}</h2>
            </div>
            <div className="who-right">
              <p className="who-description">{data.whoWeAre.description}</p>
              <div className="problem-cards">
                {data.whoWeAre.cards.map((card) => (
                  <div key={card.title} className="problem-card">
                    <h4>{card.title}</h4>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Methods Section */}
      <section className="methods">
        <div className="methods-bg">
          <img src="/assets/blue-glow.png" alt="" />
        </div>
        <div className="section-container">
          <SectionLabel text={data.methods.label} />
          <h2 className="section-title">{data.methods.title}</h2>
          <div className="methods-grid">
            {data.methods.cards.map((card) => (
              <div key={card.title} className="method-card">
                <h3>{card.title}</h3>
                <p className="method-subtitle">{card.subtitle}</p>
                <p className="method-description">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-container">
          <SectionLabel text={data.howItWorks.label} />
          <h2 className="section-title">{data.howItWorks.title}</h2>
          <div className="steps">
            {data.howItWorks.steps.map((step) => (
              <div key={step.number} className="step">
                <span className="step-number">/ {step.number}</span>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <div className="step-tags">
                  {step.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="integrations">
        <div className="integrations-bg">
          <img src="/assets/hero-bg.png" alt="" />
          <div className="integrations-overlay"></div>
        </div>
        <div className="section-container center">
          <SectionLabel text={data.integrations.label} center />
          <h2 className="section-title center">{data.integrations.title}</h2>
          <div className="integration-logos">
            {data.integrations.items.map((item) => (
              <div key={item.name} className={`integration-card${item.isActive ? ' integration-card--active' : ''}`}>
                <img src={item.logo.url} alt={item.logo.alt || item.name} className="integration-icon" />
                {item.isActive && <span>{item.name}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="industries" id="industries">
        <div className="industries-bg">
          <img src="/assets/blue-glow.png" alt="" />
        </div>
        <div className="industries-content">
          <SectionLabel text={data.industries.label} />
          <h2 className="section-title">{data.industries.title}</h2>
          <div className="industries-grid">
            {data.industries.cards.map((card) => (
              <a key={card.name} href={card.link} className="industry-card">
                <span dangerouslySetInnerHTML={{ __html: card.icon }} />
                <span>{card.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study + CTA (shared background) */}
      <div className="last-sections">
        {/* Case Study Section */}
        <section className="case-study" id="case-study">
          <div className="case-study-card">
            <div className="case-study-content">
              <SectionLabel text={data.caseStudy.label} />
              <h2 className="case-study-title">{data.caseStudy.title}</h2>
              <p className="case-study-description">{data.caseStudy.description}</p>
              <Link href={data.caseStudy.cta.url} className="btn btn-dark btn-sm">
                {data.caseStudy.cta.title}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title={titleWithBreaks(data.cta.title)}
          buttonText={data.cta.button.title}
          buttonHref={data.cta.button.url}
        />
      </div>

    </main>
  );
}
