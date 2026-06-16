import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';

const services = [
  { num: '01', name: 'Social Media Management', desc: 'Data-driven strategies that grow your presence, build communities, and keep your brand relevant across every platform.' },
  { num: '02', name: 'Original Content & Copywriting', desc: 'Words that convert. From brand voice to campaign copy — we craft content that resonates and drives action.' },
  { num: '03', name: 'Graphic Design, Iconography & Illustrations', desc: 'Distinctive visuals that tell your brand story — logos, illustrations, and design systems built to last.' },
  { num: '04', name: 'Video Editing & Animation', desc: 'From social reels to full productions, our video team creates scroll-stopping content for every format.' },
  { num: '05', name: 'Film Production, AVs & Product Photography', desc: 'High-production visuals that showcase your products and brand at their absolute best.' },
  { num: '06', name: 'Campaign Planning', desc: 'End-to-end campaign strategy — from ideation to multi-channel rollout, on time and on brand.' },
  { num: '07', name: 'Influencer Marketing & ORM', desc: 'Connect with the right voices. We identify, manage, and measure influencer partnerships that deliver real results.' },
  { num: '08', name: 'Print, OOH & Mainline Advertising', desc: 'Outdoor, print, and integrated advertising that puts your brand in front of the right people.' },
  { num: '09', name: 'New Brand Launch & Rebranding', desc: 'Building from scratch or refreshing an identity — we create brands with purpose and staying power.' },
  { num: '10', name: 'Google Reviews Management', desc: 'Reputation is everything. We help you build, maintain, and respond to your online reviews strategically.' },
];

/* SVG scaled to portrait dimensions (420 × 440) */
const BrandIllustration = () => (
  <svg width="420" height="440" viewBox="0 0 420 440" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* ── Top card: content mockup ── */}
    <rect x="30" y="30" width="170" height="115" rx="16" fill="#e8f4f1" />
    <rect x="50" y="52" width="130" height="12" rx="6" fill="#3a7d6e" opacity="0.4"/>
    <rect x="50" y="72" width="100" height="8" rx="4" fill="#3a7d6e" opacity="0.25"/>
    <rect x="50" y="88" width="118" height="8" rx="4" fill="#3a7d6e" opacity="0.25"/>
    <rect x="50" y="104" width="80" height="8" rx="4" fill="#3a7d6e" opacity="0.2"/>
    <circle cx="75" cy="128" r="14" fill="#2F4156" opacity="0.12"/>
    <text x="68" y="133" fontSize="13" fill="#2F4156" fontWeight="bold" opacity="0.5">B</text>

    {/* ── Top right: social icons card ── */}
    <rect x="220" y="22" width="170" height="108" rx="16" fill="#fdf6ee"/>
    <circle cx="254" cy="64" r="18" fill="#1a2e3b" opacity="0.09"/>
    <circle cx="254" cy="64" r="9" fill="#1a2e3b" opacity="0.18"/>
    <circle cx="298" cy="64" r="18" fill="#3a7d6e" opacity="0.13"/>
    <rect x="290" y="56" width="16" height="16" rx="4" stroke="#3a7d6e" strokeWidth="2" fill="none" opacity="0.5"/>
    <circle cx="342" cy="64" r="18" fill="#1a2e3b" opacity="0.07"/>
    <path d="M334 64 L350 64 M342 56 L342 72" stroke="#1a2e3b" strokeWidth="2" opacity="0.28" strokeLinecap="round"/>
    <rect x="232" y="88" width="80" height="24" rx="12" fill="#3a7d6e" opacity="0.13"/>
    <rect x="242" y="96" width="60" height="8" rx="4" fill="#3a7d6e" opacity="0.35"/>
    <rect x="320" y="88" width="56" height="24" rx="12" fill="#1a2e3b" opacity="0.08"/>
    <rect x="330" y="96" width="36" height="8" rx="4" fill="#1a2e3b" opacity="0.22"/>

    {/* ── Middle: campaign banner ── */}
    <rect x="30" y="165" width="360" height="84" rx="14" fill="#1a2e3b" opacity="0.055"/>
    <rect x="50" y="182" width="210" height="14" rx="7" fill="#1a2e3b" opacity="0.14"/>
    <rect x="50" y="204" width="148" height="10" rx="5" fill="#3a7d6e" opacity="0.28"/>
    <rect x="308" y="182" width="62" height="36" rx="9" fill="#3a7d6e" opacity="0.72"/>
    <rect x="319" y="196" width="40" height="7" rx="3" fill="white" opacity="0.9"/>

    {/* ── Tags row ── */}
    <rect x="30" y="265" width="95" height="30" rx="15" fill="#1a2e3b" opacity="0.07"/>
    <rect x="42" y="274" width="71" height="10" rx="5" fill="#1a2e3b" opacity="0.22"/>
    <rect x="140" y="265" width="100" height="30" rx="15" fill="#3a7d6e" opacity="0.11"/>
    <rect x="152" y="274" width="76" height="10" rx="5" fill="#3a7d6e" opacity="0.38"/>
    <rect x="256" y="265" width="80" height="30" rx="15" fill="#2F4156" opacity="0.09"/>
    <rect x="268" y="274" width="56" height="10" rx="5" fill="#2F4156" opacity="0.28"/>

    {/* ── Growth chart ── */}
    <rect x="30" y="313" width="360" height="90" rx="14" fill="#eef4f8" opacity="0.8"/>
    <polyline points="55,385 95,362 140,370 190,345 245,328 300,312 355,298" stroke="#3a7d6e" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="355" cy="298" r="5" fill="#3a7d6e"/>
    <circle cx="245" cy="328" r="4" fill="#3a7d6e" opacity="0.55"/>
    <circle cx="140" cy="370" r="4" fill="#3a7d6e" opacity="0.38"/>

    {/* ── Star rating ── */}
    <text x="40" y="422" fontSize="18" fill="#f59e0b">★★★★★</text>
    <rect x="40" y="428" width="90" height="7" rx="3" fill="#1a2e3b" opacity="0.13"/>
    <rect x="260" y="415" width="110" height="22" rx="11" fill="#3a7d6e" opacity="0.13"/>
    <rect x="272" y="422" width="86" height="8" rx="4" fill="#3a7d6e" opacity="0.4"/>
  </svg>
);

export default function BrandSolutions() {
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

      {/* ── Hero ── */}
      <section className="sp-hero">
        <div className="sp-container">
          <div className="sp-hero__layout">
            <div className="sp-hero__left">
              <p className="sp-eyebrow sp-reveal">Brand Solutions</p>
              <h1 className="sp-hero__title sp-reveal">
                Building brands<br /><em>people remember.</em>
              </h1>
              <p className="sp-hero__sub sp-reveal">
                From identity to execution — we transform how your brand looks, speaks, and connects with the world.
              </p>
              <div className="sp-hero__actions sp-reveal">
                <Link to="/contact" className="sp-btn sp-btn--primary">Start a Project</Link>
                <a href="#sp-services" className="sp-btn sp-btn--ghost">Explore Services</a>
              </div>
            </div>
            <div className="sp-hero__image-wrap sp-reveal">
              <div className="sp-hero__illustration">
                <BrandIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="sp-intro">
        <div className="sp-container sp-reveal">
          <p className="sp-intro__text">
            "Great brands aren't built by accident. We combine strategic thinking with bold creative execution to craft brand experiences that cut through the noise — and leave a lasting impression."
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="sp-services" id="sp-services">
        <div className="sp-container">
          <div className="sp-section-header sp-reveal">
            <span className="sp-eyebrow">What We Do</span>
            <h2 className="sp-section-title">Every service, <em>one vision</em></h2>
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

    </div>
  );
}