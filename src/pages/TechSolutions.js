import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';

const services = [
  { num: '01', name: 'Custom Web Development', desc: 'Scalable, performant websites built for your specific goals — from landing pages to complex web applications.' },
  { num: '02', name: 'Web Personalization', desc: 'Dynamic experiences that adapt to your users — serving the right content to the right person at the right moment.' },
  { num: '03', name: 'UI/UX Design', desc: 'Interfaces that users love. We design for clarity, delight, and conversion — backed by research and tested rigorously.' },
  { num: '04', name: 'SEO (Search Engine Optimization)', desc: 'Visibility that compounds. Our technical and content SEO strategies drive sustainable organic growth.' },
  { num: '05', name: 'E-Commerce Development', desc: 'Online stores engineered to sell — with seamless UX, fast load times, and conversion-focused architecture.' },
  { num: '06', name: 'Email Marketing', desc: 'Campaigns that land in inboxes and minds. Segmented, personalised, and optimised for opens and clicks.' },
  { num: '07', name: 'Marketing Automation', desc: 'Smarter workflows that nurture leads, reduce manual effort, and scale your marketing without scaling your team.' },
  { num: '08', name: 'Chatbots', desc: 'Intelligent conversational interfaces that engage visitors 24/7, qualify leads, and route queries automatically.' },
];

const process = [
  { step: 'Discover', desc: 'We audit your current tech stack and map digital gaps against your business objectives.' },
  { step: 'Strategize', desc: 'A tailored technology roadmap that solves real problems and enables growth.' },
  { step: 'Execute', desc: 'Clean code, thoughtful architecture, and rigorous QA — delivered on schedule.' },
  { step: 'Scale', desc: 'We monitor, optimise, and evolve your digital infrastructure as your business grows.' },
];

const TechIllustration = () => (
  <svg width="420" height="320" viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Browser window */}
    <rect x="30" y="30" width="260" height="180" rx="14" fill="#1a2e3b" opacity="0.06"/>
    <rect x="30" y="30" width="260" height="36" rx="14" fill="#1a2e3b" opacity="0.1"/>
    <circle cx="54" cy="48" r="6" fill="#ef4444" opacity="0.5"/>
    <circle cx="74" cy="48" r="6" fill="#f59e0b" opacity="0.5"/>
    <circle cx="94" cy="48" r="6" fill="#22c55e" opacity="0.5"/>
    <rect x="110" y="40" width="140" height="16" rx="8" fill="white" opacity="0.6"/>
    {/* Code lines */}
    <rect x="50" y="84" width="60" height="8" rx="4" fill="#3a7d6e" opacity="0.5"/>
    <rect x="118" y="84" width="90" height="8" rx="4" fill="#1a2e3b" opacity="0.2"/>
    <rect x="50" y="100" width="40" height="8" rx="4" fill="#f59e0b" opacity="0.4"/>
    <rect x="98" y="100" width="110" height="8" rx="4" fill="#1a2e3b" opacity="0.15"/>
    <rect x="50" y="116" width="80" height="8" rx="4" fill="#3a7d6e" opacity="0.35"/>
    <rect x="50" y="132" width="50" height="8" rx="4" fill="#f59e0b" opacity="0.3"/>
    <rect x="108" y="132" width="100" height="8" rx="4" fill="#1a2e3b" opacity="0.15"/>
    <rect x="50" y="148" width="120" height="8" rx="4" fill="#3a7d6e" opacity="0.25"/>
    <rect x="50" y="164" width="70" height="8" rx="4" fill="#1a2e3b" opacity="0.2"/>
    {/* SEO / performance meter */}
    <rect x="310" y="30" width="100" height="100" rx="14" fill="#e8f4f1"/>
    <text x="325" y="72" fontSize="28" fontWeight="bold" fill="#3a7d6e" opacity="0.8">92</text>
    <text x="320" y="90" fontSize="11" fill="#1a2e3b" opacity="0.5">SEO Score</text>
    <rect x="320" y="100" width="80" height="6" rx="3" fill="#e2e8f0"/>
    <rect x="320" y="100" width="74" height="6" rx="3" fill="#3a7d6e" opacity="0.7"/>
    {/* Mobile device */}
    <rect x="310" y="150" width="60" height="100" rx="10" fill="#1a2e3b" opacity="0.08" stroke="#1a2e3b" strokeWidth="1.5" strokeOpacity="0.15"/>
    <rect x="316" y="158" width="48" height="76" rx="6" fill="white" opacity="0.7"/>
    <rect x="322" y="163" width="36" height="8" rx="4" fill="#3a7d6e" opacity="0.3"/>
    <rect x="322" y="177" width="28" height="6" rx="3" fill="#1a2e3b" opacity="0.15"/>
    <rect x="322" y="189" width="32" height="6" rx="3" fill="#1a2e3b" opacity="0.12"/>
    <rect x="322" y="210" width="36" height="14" rx="4" fill="#3a7d6e" opacity="0.4"/>
    {/* Automation flow */}
    <circle cx="60" cy="255" r="18" fill="#3a7d6e" opacity="0.12" stroke="#3a7d6e" strokeWidth="1.5" strokeOpacity="0.3"/>
    <rect x="51" y="249" width="18" height="12" rx="3" fill="#3a7d6e" opacity="0.4"/>
    <line x1="78" y1="255" x2="108" y2="255" stroke="#3a7d6e" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"/>
    <circle cx="126" cy="255" r="18" fill="#1a2e3b" opacity="0.08" stroke="#1a2e3b" strokeWidth="1.5" strokeOpacity="0.2"/>
    <path d="M118 255 l8-6 v12 z" fill="#1a2e3b" opacity="0.3"/>
    <line x1="144" y1="255" x2="174" y2="255" stroke="#3a7d6e" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"/>
    <circle cx="192" cy="255" r="18" fill="#3a7d6e" opacity="0.12" stroke="#3a7d6e" strokeWidth="1.5" strokeOpacity="0.3"/>
    <text x="184" y="259" fontSize="14" fill="#3a7d6e" opacity="0.7">✓</text>
  </svg>
);

export default function TechSolutions() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('sp-visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.sp-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sp-page">

      <section className="sp-hero">
        <div className="sp-container">
          <div className="sp-hero__layout">
            <div className="sp-hero__left">
              <p className="sp-eyebrow sp-reveal">Tech Solutions</p>
              <h1 className="sp-hero__title sp-reveal">
                Technology that<br /><em>drives <br />growth.</em>
              </h1>
              <p className="sp-hero__sub sp-reveal">
                We build the digital infrastructure modern businesses need — fast, scalable, and designed to convert.
              </p>
              <div className="sp-hero__actions sp-reveal">
                <Link to="/contact" className="sp-btn sp-btn--primary">Start a Project</Link>
                <a href="#sp-services" className="sp-btn sp-btn--ghost">Explore Services</a>
              </div>
            </div>
            <div className="sp-hero__image-wrap sp-reveal">
              <div className="sp-hero__illustration">
                <TechIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-intro">
        <div className="sp-container sp-reveal">
          <p className="sp-intro__text">
            "Your digital presence is your most powerful sales tool. We engineer websites, platforms, and marketing systems that work around the clock — turning visitors into customers and data into decisions."
          </p>
        </div>
      </section>

      <section className="sp-services" id="sp-services">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-eyebrow">What We Build</span>
            <h2 className="sp-section-title">Digital tools, <em>real results</em></h2>
          </div>
          <div className="sp-services-grid">
            {services.map((s, i) => (
              <div key={s.num} className="sp-service-card sp-reveal" style={{ '--delay': `${i * 0.06}s` }}>
                <span className="sp-service-num">{s.num}</span>
                <h3 className="sp-service-name">{s.name}</h3>
                <p className="sp-service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="sp-process">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-eyebrow">How We Work</span>
            <h2 className="sp-section-title">Our process</h2>
          </div>
          <div className="sp-process-grid">
            {process.map((p, i) => (
              <div key={p.step} className="sp-process-item sp-reveal" style={{ '--delay': `${i * 0.1}s` }}>
                <span className="sp-process-num">0{i + 1}</span>
                <h3 className="sp-process-step">{p.step}</h3>
                <p className="sp-process-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="sp-work">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-eyebrow">Featured Work</span>
            <h2 className="sp-section-title">Built to <em>perform</em></h2>
          </div>
          <div className="sp-work-grid">
            {[
              { label: 'E-Commerce Platform', client: 'Retail Brand', tag: 'Web Dev + UX' },
              { label: 'SEO Transformation', client: 'B2B SaaS', tag: 'SEO + Content' },
              { label: 'Automation System', client: 'Real Estate Agency', tag: 'Automation + CRM' },
            ].map((w, i) => (
              <div key={i} className="sp-work-card sp-reveal" style={{ '--delay': `${i * 0.1}s` }}>
                <div className="sp-work-card__visual" />
                <div className="sp-work-card__info">
                  <span className="sp-work-card__tag">{w.tag}</span>
                  <h4 className="sp-work-card__label">{w.label}</h4>
                  <p className="sp-work-card__client">{w.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="sp-cta">
        <div className="sp-container sp-reveal">
          <p className="sp-eyebrow">Ready?</p>
          <h2 className="sp-cta__title">Let's engineer<br /><em>your next chapter.</em></h2>
          <Link to="/contact" className="sp-btn sp-btn--primary sp-btn--lg">Start Your Project →</Link>
        </div>
      </section> */}

    </div>
  );
}