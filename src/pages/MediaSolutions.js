import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';

const services = [
  { num: '01', name: 'Media Buying', desc: 'We secure the most valuable ad placements at the best rates — across digital, print, broadcast, and outdoor.' },
  { num: '02', name: 'Media Planning', desc: 'Strategic channel mix decisions backed by audience data — ensuring every rupee of your budget works harder.' },
  { num: '03', name: 'Performance Marketing', desc: 'ROI-obsessed campaigns that acquire customers, reduce CAC, and scale what works.' },
  { num: '04', name: 'Ads Management (Google, Meta, LinkedIn, YouTube)', desc: 'Expert campaign management across all major platforms — from setup and creative to bid strategy and reporting.' },
];

const process = [
  { step: 'Discover', desc: 'We map your audience, channels, and competitive media landscape to find the highest-leverage opportunities.' },
  { step: 'Strategize', desc: 'A data-driven media plan that allocates budget for maximum reach, frequency, and impact.' },
  { step: 'Execute', desc: 'Precise campaign setup, compelling ad creative, and real-time optimisation.' },
  { step: 'Scale', desc: "We double down on what works, cut what doesn't, and continuously improve your returns." },
];

const MediaIllustration = () => (
  <svg width="420" height="320" viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bar chart */}
    <rect x="30" y="200" width="30" height="80" rx="4" fill="#3a7d6e" opacity="0.3"/>
    <rect x="70" y="160" width="30" height="120" rx="4" fill="#3a7d6e" opacity="0.45"/>
    <rect x="110" y="130" width="30" height="150" rx="4" fill="#3a7d6e" opacity="0.6"/>
    <rect x="150" y="100" width="30" height="180" rx="4" fill="#3a7d6e" opacity="0.75"/>
    <rect x="190" y="70" width="30" height="210" rx="4" fill="#3a7d6e" opacity="0.9"/>
    {/* Trend line over bar chart */}
    <polyline points="45,195 85,155 125,125 165,95 205,65" stroke="#1a2e3b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <circle cx="205" cy="65" r="5" fill="#1a2e3b" opacity="0.7"/>
    {/* Platform icons */}
    <rect x="260" y="30" width="50" height="50" rx="12" fill="#1877f2" opacity="0.15"/>
    <text x="274" y="63" fontSize="22" fill="#1877f2" opacity="0.7">f</text>
    <rect x="320" y="30" width="50" height="50" rx="12" fill="#ea4335" opacity="0.12"/>
    <text x="332" y="63" fontSize="18" fill="#ea4335" opacity="0.6">G</text>
    <rect x="260" y="90" width="50" height="50" rx="12" fill="#0077b5" opacity="0.12"/>
    <text x="271" y="121" fontSize="16" fill="#0077b5" opacity="0.6">in</text>
    <rect x="320" y="90" width="50" height="50" rx="12" fill="#ff0000" opacity="0.1"/>
    <text x="327" y="121" fontSize="16" fill="#ff0000" opacity="0.5">▶</text>
    {/* ROAS badge */}
    <rect x="260" y="160" width="130" height="64" rx="14" fill="#e8f4f1" stroke="#3a7d6e" strokeWidth="1.5" strokeOpacity="0.3"/>
    <text x="280" y="185" fontSize="11" fill="#3a7d6e" fontWeight="600" opacity="0.7">AVERAGE ROAS</text>
    <text x="280" y="210" fontSize="26" fontWeight="bold" fill="#1a2e3b" opacity="0.8">3×</text>
    {/* Budget flow */}
    <rect x="260" y="244" width="130" height="46" rx="10" fill="#1a2e3b" opacity="0.06"/>
    <rect x="272" y="253" width="60" height="8" rx="4" fill="#1a2e3b" opacity="0.2"/>
    <rect x="272" y="267" width="100" height="6" rx="3" fill="#3a7d6e" opacity="0.4"/>
    {/* Baseline */}
    <line x1="30" y1="280" x2="230" y2="280" stroke="#1a2e3b" strokeWidth="1" opacity="0.1"/>
  </svg>
);

export default function MediaSolutions() {
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
              <p className="sp-eyebrow sp-reveal">Media Solutions</p>
              <h1 className="sp-hero__title sp-reveal">
                Reach the <br /> right<br /><em>audience, always.</em>
              </h1>
              <p className="sp-hero__sub sp-reveal">
                Precision media strategies that maximise your reach, minimise waste, and deliver measurable returns.
              </p>
              <div className="sp-hero__actions sp-reveal">
                <Link to="/contact" className="sp-btn sp-btn--primary">Start a Project</Link>
                <a href="#sp-services" className="sp-btn sp-btn--ghost">Explore Services</a>
              </div>
            </div>
            <div className="sp-hero__image-wrap sp-reveal">
              <div className="sp-hero__illustration">
                <MediaIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-intro">
        <div className="sp-container sp-reveal">
          <p className="sp-intro__text">
            "Every ad rupee counts. We plan, buy, and manage media with a performance-first mindset — combining data intelligence with creative instinct to put your brand in front of the people who matter most."
          </p>
        </div>
      </section>

      <section className="sp-services" id="sp-services">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-eyebrow">What We Do</span>
            <h2 className="sp-section-title">Media that <em>moves numbers</em></h2>
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

      {/* <section className="sp-stats">
        <div className="sp-container">
          <div className="sp-stats-grid sp-reveal">
            {[
              { val: '3×', label: 'Average ROAS improvement' },
              { val: '40%', label: 'Reduction in cost per lead' },
              { val: '₹10Cr+', label: 'Ad spend managed' },
              { val: '25+', label: 'Active brand campaigns' },
            ].map((s, i) => (
              <div key={i} className="sp-stat">
                <span className="sp-stat__val">{s.val}</span>
                <span className="sp-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section> */}

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
            <h2 className="sp-section-title">Campaigns that <em>delivered</em></h2>
          </div>
          <div className="sp-work-grid">
            {[
              { label: 'Performance Campaign', client: 'D2C Brand', tag: 'Meta + Google Ads' },
              { label: 'Media Planning', client: 'FMCG Company', tag: 'Omnichannel' },
              { label: 'Lead Generation', client: 'Real Estate', tag: 'LinkedIn + YouTube' },
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
          <h2 className="sp-cta__title">Let's make your<br /><em>media spend count.</em></h2>
          <Link to="/contact" className="sp-btn sp-btn--primary sp-btn--lg">Start Your Project →</Link>
        </div>
      </section> */}

    </div>
  );
}