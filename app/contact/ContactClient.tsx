'use client';

import { useMemo, useState, FormEvent } from 'react';
import { useScrollAnimations } from '@/hooks/useScrollAnimation';
import ProductHero from '@/components/ProductHero';
import type { ContactPageData } from '@/lib/types';

const CONTACT_FORM_URL = 'https://sentimentai.nexatestwp.com/wp-json/custom/v1/contact-form';

const defaults = { opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' };
const stagger = { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', stagger: 0.12 };

export default function ContactClient({ data }: { data: ContactPageData }) {
  const [form, setForm] = useState({
    fullName: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const animations = useMemo(() => [
    { selector: '.product-hero .section-label', from: defaults, delay: 0.2 },
    { selector: '.product-hero-title', from: defaults, delay: 0.3 },
    { selector: '.product-hero-description', from: defaults, delay: 0.4 },
    { selector: '.contact-form', from: defaults, trigger: '.contact-section' },
    { selector: '.contact-steps-heading', from: defaults, trigger: '.contact-steps' },
    { selector: '.contact-step-item', from: stagger, trigger: '.contact-steps' },
  ], []);

  useScrollAnimations(animations);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await fetch(CONTACT_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'full-name': form.fullName,
          company: form.company,
          role: form.role,
          'your-email': form.email,
          phone: form.phone,
          'your-message': form.message,
        }),
      });

      let result: { status?: string; success?: boolean; message?: string } = {};
      try {
        result = await res.json();
      } catch {
        setStatus('error');
        setStatusMessage('Invalid response from server. Please try again.');
        return;
      }

      const success = result.status === 'mail_sent' || result.success === true;

      if (success) {
        setStatus('success');
        setStatusMessage(result.message || 'Thank you! Your message has been sent.');
        setForm({ fullName: '', company: '', role: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please try again.');
    }
  }

  return (
    <main>
      <ProductHero
        label={data.hero.label}
        title={data.hero.title}
        description={data.hero.description}
        backgroundImageUrl={data.hero.backgroundImage?.url}
      />

      <section className="contact-section">
        <div className="contact-grid">

          <div className="contact-form">
            <form onSubmit={handleSubmit}>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name">Full Name</label>
                  <input
                    type="text"
                    id="full-name"
                    name="fullName"
                    className="form-input"
                    placeholder="Jane Smith"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-input"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="role">Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    className="form-input"
                    placeholder="VP of Sales"
                    value={form.role}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="jane@acme.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row form-row--full">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row form-row--full">
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us about your team..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="form-submit btn btn-white" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Request Demo'}
              </button>

              {statusMessage && (
                <p className={`form-status ${status === 'success' ? 'form-status--success' : 'form-status--error'}`}>
                  {statusMessage}
                </p>
              )}

            </form>
          </div>

          <div className="contact-steps">
            <h2 className="contact-steps-heading">{data.nextSteps.title}</h2>
            <div className="contact-step-list">
              {data.nextSteps.steps.map((step) => (
                <div key={step.number} className="contact-step-item">
                  <div className="contact-step-number">{step.number}</div>
                  <div className="contact-step-content">
                    <h3 className="contact-step-title">{step.title}</h3>
                    <p className="contact-step-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
