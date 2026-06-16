import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';

const services = [
  { num: '01', name: 'Product Photoshoot', desc: 'Hero shots and lifestyle imagery that showcase your products at their best — for e-commerce, catalogues, and campaigns.' },
  { num: '02', name: 'UGC (User Generated Content)', desc: 'Authentic, creator-led content that feels native to social feeds and drives trust at scale.' },
  { num: '03', name: 'Model Shoot', desc: 'Fashion and lifestyle shoots with professional models, styled and directed for maximum impact.' },
  { num: '04', name: 'Creative Shoots', desc: 'Conceptually driven photography that brings brand worlds to life — bold, unexpected, and unforgettable.' },
  { num: '05', name: 'Campaign Shoots', desc: 'Full campaign production from concept to final delivery — coordinated across talent, locations, and formats.' },
  { num: '06', name: 'Ad Films', desc: 'Short-form and long-form commercial films crafted to perform — from script to screen.' },
  { num: '07', name: 'Factory Shoots', desc: 'Showcasing your manufacturing process and facilities with clarity, precision, and professionalism.' },
  { num: '08', name: 'Interviews', desc: 'Polished on-camera interviews that humanise your brand — founders, teams, clients, and experts.' },
  { num: '09', name: 'Testimonials', desc: 'Genuine, compelling customer stories captured on camera to build trust and accelerate conversions.' },
];

const process = [
  { step: 'Discover', desc: 'We understand your brand vision, reference points, and production requirements in detail.' },
  { step: 'Strategize', desc: 'Creative direction, moodboards, talent, locations — every detail planned before a single frame is shot.' },
  { step: 'Execute', desc: 'Professional production with an experienced crew. Every shot intentional, every moment captured.' },
  { step: 'Scale', desc: 'Post-production, colour grading, and delivery optimised for every platform and format you need.' },
];

const FilmIllustration = () => (
  <svg width="420" height="320" viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Camera body */}
    <rect x="60" y="90" width="200" height="150" rx="18" fill="#1a2e3b" opacity="0.08"/>
    <rect x="60" y="90" width="200" height="150" rx="18" stroke="#1a2e3b" strokeWidth="2" strokeOpacity="0.15" fill="none"/>
    {/* Lens */}
    <circle cx="160" cy="165" r="52" fill="#3a7d6e" opacity="0.1" stroke="#3a7d6e" strokeWidth="2" strokeOpacity="0.25"/>
    <circle cx="160" cy="165" r="38" fill="#3a7d6e" opacity="0.12" stroke="#3a7d6e" strokeWidth="1.5" strokeOpacity="0.3"/>
    <circle cx="160" cy="165" r="24" fill="#1a2e3b" opacity="0.15"/>
    <circle cx="160" cy="165" r="10" fill="#1a2e3b" opacity="0.25"/>
    <circle cx="153" cy="157" r="4" fill="white" opacity="0.5"/>
    {/* Viewfinder top */}
    <rect x="100" y="72" width="80" height="22" rx="8" fill="#1a2e3b" opacity="0.1" stroke="#1a2e3b" strokeWidth="1.5" strokeOpacity="0.15"/>
    {/* Flash */}
    <rect x="220" y="100" width="32" height="20" rx="6" fill="#f59e0b" opacity="0.25"/>
    <text x="227" y="115" fontSize="12" fill="#f59e0b" opacity="0.7">⚡</text>
    {/* Shutter button */}
    <circle cx="240" cy="150" r="10" fill="#1a2e3b" opacity="0.15" stroke="#1a2e3b" strokeWidth="1.5" strokeOpacity="0.2"/>
    <circle cx="240" cy="150" r="6" fill="#3a7d6e" opacity="0.4"/>
    {/* Film strip */}
    <rect x="290" y="60" width="100" height="200" rx="6" fill="#1a2e3b" opacity="0.06"/>
    <rect x="290" y="60" width="100" height="200" rx="6" stroke="#1a2e3b" strokeWidth="1" strokeOpacity="0.12" fill="none"/>
    {/* Film frames */}
    {[80, 130, 180, 210].map((y, i) => (
      <rect key={i} x="298" y={y} width="84" height={i === 3 ? 36 : 42} rx="4" fill={i % 2 === 0 ? '#3a7d6e' : '#1a2e3b'} opacity={i === 3 ? 0.06 : 0.1}/>
    ))}
    {/* Sprocket holes */}
    {[75, 105, 135, 165, 195, 225, 245].map((y, i) => (
      <rect key={i} x="292" y={y} width="8" height="8" rx="2" fill="#1a2e3b" opacity="0.15"/>
    ))}
    {[75, 105, 135, 165, 195, 225, 245].map((y, i) => (
      <rect key={i} x="380" y={y} width="8" height="8" rx="2" fill="#1a2e3b" opacity="0.15"/>
    ))}
    {/* Aperture icon */}
    <circle cx="50" cy="240" r="28" stroke="#3a7d6e" strokeWidth="1.5" strokeOpacity="0.3" fill="#3a7d6e" fillOpacity="0.06"/>
    <path d="M50 215 L50 265 M28 228 L72 252 M28 252 L72 228" stroke="#3a7d6e" strokeWidth="1.5" opacity="0.3" strokeLinecap="round"/>
    {/* Play button */}
    <circle cx="350" cy="255" r="20" fill="#1a2e3b" opacity="0.08" stroke="#1a2e3b" strokeWidth="1.5" strokeOpacity="0.15"/>
    <path d="M344 247 L344 263 L360 255 Z" fill="#1a2e3b" opacity="0.3"/>
  </svg>
);

export default function FilmPhotography() {
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
              <p className="sp-eyebrow sp-reveal">Film & Photography</p>
              <h1 className="sp-hero__title sp-reveal">
                Visuals that<br /><em>stop <br />the <br />scroll.</em>
              </h1>
              <p className="sp-hero__sub sp-reveal">
                From intimate product shots to large-scale productions — we create imagery and film that makes your brand impossible to ignore.
              </p>
              <div className="sp-hero__actions sp-reveal">
                <Link to="/contact" className="sp-btn sp-btn--primary">Start a Project</Link>
                <a href="#sp-services" className="sp-btn sp-btn--ghost">Explore Services</a>
              </div>
            </div>
            <div className="sp-hero__image-wrap sp-reveal">
              <div className="sp-hero__illustration">
                <FilmIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-intro">
        <div className="sp-container sp-reveal">
          <p className="sp-intro__text">
            "In a world flooded with content, the brands that win are those with visuals that genuinely stop people. We bring creative direction, technical expertise, and storytelling instinct to every project — whatever the format."
          </p>
        </div>
      </section>

      <section className="sp-services" id="sp-services">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-eyebrow">What We Shoot</span>
            <h2 className="sp-section-title">Every format, <em>one standard</em></h2>
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
            <h2 className="sp-section-title">Shot with <em>intention</em></h2>
          </div>
          <div className="sp-work-grid">
            {[
              { label: 'Product Campaign', client: 'Skincare Brand', tag: 'Product + Lifestyle' },
              { label: 'Brand Ad Film', client: 'Apparel Label', tag: 'Ad Film' },
              { label: 'Founder Story', client: 'D2C Startup', tag: 'Interview + UGC' },
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
          <h2 className="sp-cta__title">Let's create visuals<br /><em>worth remembering.</em></h2>
          <Link to="/contact" className="sp-btn sp-btn--primary sp-btn--lg">Start Your Project →</Link>
        </div>
      </section> */}

    </div>
  );
}