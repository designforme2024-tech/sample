import React, { memo, useRef, useEffect, useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useInView } from 'framer-motion';
import styles from './About.module.css';
import { Link } from "react-router-dom";

import founder1 from '../../assets/about/Founder1.webp';
import founder2 from '../../assets/about/Founder2.webp';
import team3 from '../../assets/about/Team3.webp';
import team4 from '../../assets/about/Team4.webp';
import team5 from '../../assets/about/Team5.webp';
import team6 from '../../assets/about/Team7.webp';
import team7 from '../../assets/about/Team8.webp';

// ── LIVE COUNTER HOOK ─────────────────────────────────────
function useCounter(target, duration = 2200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── STAT ITEM ─────────────────────────────────────────────
function StatItem({ num, suffix, label, delay, inView }) {
  const count = useCounter(num, 2200, inView);
  return (
    <m.div
      className={styles.statItem}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7 }}
    >
      <div className={styles.statNumber}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className={styles.statDivider} />
      <div className={styles.statLabel}>{label}</div>
    </m.div>
  );
}

// ── STATS DATA ────────────────────────────────────────────
const STATS = [
  { num: 35,   suffix: '+', label: 'Dedicated Professionals' },
  { num: 1000, suffix: '+', label: 'Satisfied Clients' },
  { num: 95,   suffix: '%', label: 'Client Retention Rate' },
  { num: 50,   suffix: '+', label: 'Industry Experts' },
];

// ── TEAM DATA — 5 members ─────────────────────────────────
const TEAM = [
  { name: 'Neha Agarwal',      label: 'Co-Founder',                        initials: 'NA', photo: founder1, linkedin: 'https://www.linkedin.com/in/nehhaagarwal?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Shrey Goswami',     label: 'Co-Founder',                        initials: 'SG', photo: founder2, linkedin: 'https://www.linkedin.com/in/shreygoswami?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Udit Goswami',      label: 'Team Lead & Management Director',   initials: 'UG', photo: team3,    linkedin: 'https://www.linkedin.com/in/uditgoswami22?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Gaurav Kumar',      label: 'Marketing and Creative Director',   initials: 'GK', photo: team4,    linkedin: 'https://www.linkedin.com/in/gaurav-kumar-b0713122b?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Himanshu Dwivedi',  label: 'Marketing and Strategist Director', initials: 'HD', photo: team5,    linkedin: 'https://www.linkedin.com/in/himanshudwivedii?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
];

// ── TESTIMONIALS ──────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: 'AssignInc transformed our operations with their AI automation. Our workflow efficiency increased dramatically within weeks.',
    name: 'Rajiv Sharma',
    company: 'TechNova Solutions',
    initials: 'RS',
  },
  {
    quote: 'Their team understands B2B needs deeply. The whitelabel AI product they built for us exceeded every expectation.',
    name: 'Priya Mehta',
    company: 'GrowthBridge India',
    initials: 'PM',
  },
  {
    quote: 'From feasibility to deployment, AssignInc was a true partner. Production-ready, secure, and scalable — exactly what we needed.',
    name: 'Arjun Verma',
    company: 'ScaleOps Pvt. Ltd.',
    initials: 'AV',
  },
  {
    quote: 'The digital marketing strategy AssignInc crafted for us tripled our inbound leads in just two months. Exceptional results, exceptional team.',
    name: 'Sneha Kapoor',
    company: 'BrandVault Studios',
    initials: 'SK',
  },
];

// ── FAQ DATA ──────────────────────────────────────────────
const FAQS = [
  {
    q: 'What kind of businesses does AssignInc work with?',
    a: 'We work with MSMEs, startups, and mid-to-large enterprises across India and internationally. Our solutions are modular — whether you\'re a 5-person team or a 500-person org, we can tailor an engagement that fits your scale, budget, and goals.',
  },
  {
    q: 'What services does AssignInc offer?',
    a: 'AssignInc offers a full spectrum of digital and AI services: AI automation & workflow integration, web & app development, digital marketing, brand strategy, content creation, social media management, SEO/GEO/AEO, PR & media, film & photography, and whitelabel AI product development.',
  },
  {
    q: 'How long does it typically take to launch a project?',
    a: 'Timelines vary by scope. A focused automation module or marketing campaign can be live in 2–4 weeks. End-to-end AI product development or full-funnel transformation programs typically run 6–16 weeks. We\'ll share a clear timeline after the initial discovery call.',
  },
  {
    q: 'Is AssignInc government-recognised or incubated?',
    a: 'Yes. AssignInc is proudly incubated under iStart Rajasthan — the Government of Rajasthan\'s flagship startup initiative. This gives our clients added confidence in our credibility, compliance posture, and long-term stability.',
  },
  {
    q: 'What makes AssignInc different from other digital agencies?',
    a: 'We sit at the intersection of AI-first thinking and full-funnel execution. We don\'t just advise — we build, deploy, and operate. Our in-house team of 35+ professionals covers strategy, engineering, creative, and growth, giving you a single accountable partner rather than a fragmented vendor stack.',
  },
  {
    q: 'Can AssignInc build a custom AI product for my business?',
    a: 'Absolutely. We specialise in whitelabel AI product development — from lead generation copilots and operations automation fabrics to secure RAG (Retrieval-Augmented Generation) on your internal documents. We handle feasibility analysis, data infrastructure, model selection, and production deployment.',
  },
  {
    q: 'How do I get started with AssignInc?',
    a: 'The easiest way is to reach out via our Contact page or email us directly. We\'ll schedule a no-obligation discovery call to understand your needs and share a tailored proposal within 48 hours.',
  },
];

// ── DOMAIN MARQUEE ────────────────────────────────────────
const DOMAINS = [
  { icon: '🤖', label: 'AI Automation' },
  { icon: '🌐', label: 'Web Development' },
  { icon: '📊', label: 'Digital Marketing' },
  { icon: '✍️', label: 'Content Writing' },
  { icon: '🔗', label: 'Workflow Integration' },
  { icon: '🧠', label: 'Branding' },
  { icon: '📦', label: 'Whitelabel AI' },
  { icon: '🚀', label: 'Social Media Management' },
  { icon: '🛡️', label: 'Online Campaigns' },
  { icon: '☁️', label: 'SEO/GEO/AEO' },
  { icon: '🎥', label: 'PR & Media' },
];

// LinkedIn SVG Icon
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ── FAQ ITEM ──────────────────────────────────────────────
function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <m.div
      className={`${styles.faqItem} ${open ? styles.faqItemOpen : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <button
        className={styles.faqQuestion}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className={`${styles.faqChevron} ${open ? styles.faqChevronOpen : ''}`}>
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            className={styles.faqAnswer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            <p>{answer}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

// ─────────────────────────────────────────────────────────
function About() {
  const heroRef    = useRef(null);
  const statsRef   = useRef(null);
  const teamRef    = useRef(null);
  const galleryRef = useRef(null);
  const testiRef   = useRef(null);

  const heroInView    = useInView(heroRef,    { once: true, margin: '-80px' });
  const statsInView   = useInView(statsRef,   { once: true, margin: '-80px' });
  const teamInView    = useInView(teamRef,    { once: true, margin: '-80px' });
  const galleryInView = useInView(galleryRef, { once: true, margin: '-80px' });
  const testiInView   = useInView(testiRef,   { once: true, margin: '-80px' });

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.page}>

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroInner}>

          <m.div
            className={styles.heroTextCol}
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className={styles.tagBadge}>
              <span className={styles.dot} />
              About AssignInc
            </div>

            <h1 className={styles.heroTitle}>
              We are a passionate<br />
              <span>AI-driven agency</span><br />
              delivering impactful results.
            </h1>

            <div className={styles.heroTags}>
              <span>📍 Jaipur Born</span>
              <span>🚀 Innovation Driven</span>
              <span>🏛 iStart Incubated</span>
            </div>

            <p className={styles.heroDesc}>
              AssignInc is an AI-powered technology and digital transformation company founded in Jaipur, Rajasthan in 2022. We help MSMEs, startups, and enterprises automate workflows, scale operations, and accelerate growth — with 35+ dedicated professionals working with brands across India and beyond.
            </p>

            <Link to="/contact" className={styles.heroCtaBtn}>
              Work With Us
            </Link>
          </m.div>

          <m.div
            className={styles.heroPhotoCol}
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            <div className={styles.foundersGrid}>
              <m.div
                className={styles.founderCard}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <img
                  src={founder1}
                  alt="Founder"
                  className={styles.founderImage}
                  loading="lazy"
                  decoding="async"
                />
              </m.div>

              <m.div
                className={`${styles.founderCard} ${styles.founderCardOffset}`}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.65 }}
              >
                <img
                  src={founder2}
                  alt="Co-Founder"
                  className={styles.founderImage}
                  loading="lazy"
                  decoding="async"
                />
              </m.div>
            </div>
          </m.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. ABOUT CONTENT
      ══════════════════════════════════════════════════ */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <m.div
            className={styles.contentGrid}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
          >
            <div className={styles.contentLeft}>
              <div className={styles.sectionLabel}>Who We Are</div>
              <h2 className={styles.sectionTitle}>
                We Are<br />AssignInc
              </h2>
              <div className={styles.accentLine} />
            </div>

            <div className={styles.contentRight}>
              <p className={styles.leadPara}>
                AssignInc is an AI-powered technology and digital transformation company
                founded in <strong>Jaipur, Rajasthan</strong> in 2022 and proudly incubated
                under <strong>iStart</strong> — Rajasthan's government startup initiative.
              </p>
              <p className={styles.para}>
                We help MSMEs, startups, and enterprises <strong>automate workflows</strong>,
                scale operations, and accelerate growth through intelligent AI solutions,
                full-funnel marketing, web development, and digital transformation services.
              </p>
              <p className={styles.para}>
                Our modular offerings are engineered for outcomes — from lead generation
                copilots and operations automation fabrics to secure RAG on documents,
                whitelabel AI products, and cloud-based productivity tools.
              </p>
              <p className={styles.para}>
                We offer feasibility analysis, data and machine learning infrastructure, and AI copilots for teams.
                We build data pipelines, vector databases, and model operations with a focus on security, speed, and scalability.
              </p>
              <p className={styles.para}>
                Operating within Rajasthan's innovation ecosystem, we focus on building
                <strong> secure, scalable, and production-ready</strong> solutions designed
                to create measurable business outcomes.
              </p>
              <div className={styles.metaRow}>
                <div className={styles.metaChip}>
                  <span className={styles.metaIcon}>📍</span>
                  Aatish Market, Jaipur — 302020
                </div>
                <div className={styles.metaChip}>
                  <span className={styles.metaIcon}>🌐</span>
                  www.assigninc.com
                </div>
                <div className={styles.metaChip}>
                  <span className={styles.metaIcon}>🏛️</span>
                  iStart Incubated
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. STATS
      ══════════════════════════════════════════════════ */}
      <section ref={statsRef} className={styles.statsSection}>
        <div className={styles.statsInner}>
          {STATS.map((s, i) => (
            <StatItem
              key={i}
              num={s.num}
              suffix={s.suffix}
              label={s.label}
              delay={i * 0.15}
              inView={statsInView}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. TEAM SECTION — 5 members
      ══════════════════════════════════════════════════ */}
      <section ref={teamRef} className={styles.teamSection}>
        <div className={styles.teamContainer}>

          <m.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.sectionLabel}>The Team</div>
            <h2 className={styles.teamHeadingBig}>
              35+ Dedicated Professionals
            </h2>
          </m.div>

          <m.div
            className={styles.teamPhotoStrip}
            initial={{ opacity: 0, y: 40 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {TEAM.map((member, i) => (
              <m.div
                key={i}
                className={styles.teamPhotoCard}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
              >
                <div className={styles.teamPhotoBg}>
                  {member.photo
                    ? <img
                        src={member.photo}
                        alt={member.name}
                        className={`${styles.teamPhotoImg} ${member.photo === team3 ? styles.teamPhotoImgCropped : ''}`}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    : <span className={styles.teamInitials}>{member.initials}</span>
                  }
                </div>
                <div className={styles.teamMemberInfo}>
                  <div className={styles.teamMemberName}>{member.name}</div>
                  <div className={styles.teamMemberLabel}>{member.label}</div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinBtn}
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <LinkedInIcon />
                  </a>
                </div>
              </m.div>
            ))}
          </m.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4b. TEAM IN ACTION GALLERY
      ══════════════════════════════════════════════════ */}
      <section ref={galleryRef} className={styles.gallerySection}>
        <div className={styles.galleryInner}>

          <m.div
            className={styles.galleryTextCol}
            initial={{ opacity: 0, x: -40 }}
            animate={galleryInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className={styles.galleryTextTop}>
              <div className={styles.galleryBadge}>
                <span className={styles.galleryBadgeDot} />
                Our People
              </div>

              <h2 className={styles.galleryHeading}>
                The Minds<br />
                <span className={styles.galleryHeadingAccent}>Behind the Work</span>
              </h2>

              <div className={styles.galleryDivider} />

              <p className={styles.gallerySubtext}>
                Beyond titles and roles — <br /> we are builders, strategists, and
                creators<br /> who show up every day <br /> to do meaningful work together.<br />
                Every project carries the fingerprint of a team that genuinely cares.
              </p>
            </div>

            <div className={styles.galleryMeta}>
              {/* <div className={styles.galleryMetaItem}>
                <span className={styles.galleryMetaIcon}>🏙️</span>
                Based in Jaipur, working globally
              </div> */}
              <div className={styles.galleryMetaItem}>
                <span className={styles.galleryMetaIcon}>🤝</span>
                35+ professionals, one mission
              </div>
              <div className={styles.galleryMetaItem}>
                <span className={styles.galleryMetaIcon}>🏛️</span>
                iStart Rajasthan incubated
              </div>
            </div>
          </m.div>

          <div className={styles.galleryImageCol}>
            <m.div
              className={styles.galleryCard}
              initial={{ opacity: 0, y: 30 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.2 }}
            >
              <img
                src={team6}
                alt="AssignInc team"
                className={styles.galleryImg}
                loading="lazy"
                decoding="async"
              />
            </m.div>

            <m.div
              className={`${styles.galleryCard} ${styles.galleryCardOffset}`}
              initial={{ opacity: 0, y: 30 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.35 }}
            >
              <img
                src={team7}
                alt="AssignInc team at work"
                className={styles.galleryImg}
                loading="lazy"
                decoding="async"
              />
            </m.div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. CLIENT TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section ref={testiRef} className={styles.testiSection}>
        <div className={styles.container}>
          <m.div
            className={styles.testiLayout}
            initial={{ opacity: 0 }}
            animate={testiInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <m.div
              className={styles.testiLeft}
              initial={{ opacity: 0, x: -40 }}
              animate={testiInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className={styles.testiLabelSmall}>TESTIMONIAL</div>
              <h2 className={styles.testiHeading}>WHAT OUR<br />CLIENTS SAY</h2>
            </m.div>

            <m.div
              className={styles.testiRight}
              initial={{ opacity: 0, x: 40 }}
              animate={testiInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.testiCard}>
                <div className={styles.starRow}>
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className={styles.star}>{s}</span>
                  ))}
                </div>
                <p className={styles.quoteText}>
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </p>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar}>
                    {TESTIMONIALS[activeTestimonial].initials}
                  </div>
                  <div>
                    <div className={styles.testiName}>
                      {TESTIMONIALS[activeTestimonial].name}
                    </div>
                    <div className={styles.testiCompany}>
                      {TESTIMONIALS[activeTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.testiDots}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot2} ${i === activeTestimonial ? styles.dotActive : ''}`}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. FAQ SECTION
      ══════════════════════════════════════════════════ */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>

          <m.div
            className={styles.faqTopHeader}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.faqTopTitle}>Frequently Asked Questions</h2>
            <p className={styles.faqTopSubtitle}>
              Everything you need to know about working with AssignInc.
            </p>
          </m.div>

          <div className={styles.faqBody}>

            <m.div
              className={styles.faqImageCol}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <img
                src="https://img.magnific.com/free-vector/tiny-business-people-with-giant-faq-letters-gadget-users-searching-instructions-useful-information-flat-vector-illustration-customer-support-solution-concept-banner-landing-web-page_74855-23409.jpg?semt=ais_hybrid&w=740&q=80"
                alt="FAQ illustration"
                className={styles.faqIllustrationImg}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </m.div>

            <div className={styles.faqList}>
              {FAQS.map((item, i) => (
                <FaqItem key={i} question={item.q} answer={item.a} index={i} />
              ))}
            </div>

          </div>

          <m.div
            className={styles.faqCta}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p>Still have questions? We'd love to hear from you.</p>
            <Link to="/contact" className={styles.heroCtaBtn}>
              Get in Touch
            </Link>
          </m.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. DOMAIN MARQUEE
      ══════════════════════════════════════════════════ */}
      <section className={styles.marqueeSection}>
        <div className={styles.marqueeFade} />
        <div className={styles.marqueeFadeRight} />

        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeInner}>
            {[...DOMAINS, ...DOMAINS].map((d, i) => (
              <div key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeIcon}>{d.icon}</span>
                {d.label}
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.marqueeTrack} ${styles.marqueeRTL}`}>
          <div className={`${styles.marqueeInner} ${styles.marqueeInnerRTL}`}>
            {[...DOMAINS, ...DOMAINS].reverse().map((d, i) => (
              <div key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeIcon}>{d.icon}</span>
                {d.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>
    </LazyMotion>
  );
}

  export default memo(About);