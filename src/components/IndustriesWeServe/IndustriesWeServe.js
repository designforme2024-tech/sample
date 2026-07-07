import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import styles from './IndustriesWeServe.module.css';

const INDUSTRIES = [
  {
    id: 'interior-design',
    name: 'Interior Design',
    navLabel: 'Interior Design',
    kicker: 'Studios & Designers',
    title: 'Interior Design',
    description:
      "A finished room has to do the convincing before anyone picks up the phone. We build the brand, the site and the enquiry flow so the work reads as premium as it looks in person.",
    services: ['Brand Identity', 'Portfolio Websites', 'Social Media', 'Lead Generation'],
    // ctaLabel: 'Explore Interior Projects',
    // projectLabel: 'THE OAK STUDIO',
    // projectOutcome: 'A boutique design studio grew qualified enquiries by 42% after a full brand and site relaunch.',
    projectOutcome: "Premium websites, portfolio experiences, and lead generation strategies crafted to help interior designers attract high-value clients and showcase every project beautifully.",
    image:
      'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?w=900&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
    accent: '#567C8D',
    // gradient: 'linear-gradient(160deg, #2F4156 0%, #3E5A72 46%, #567C8D 100%)',
    gradient: `
    linear-gradient(
    135deg,
    #FCFEFF 0%,
    #F4FAFF 20%,
    #EDF6FD 45%,
    #E5F1FB 70%,
    #DCEBF8 100%
    )`,
    icon: 'interior',
  },
  {
    id: 'schools-education',
    name: 'Schools & Education',
    navLabel: 'Schools',
    kicker: 'Institutions & Training',
    title: 'Schools & Education',
    description:
      "Parents decide months before a form gets filled. We build the awareness and admissions systems that keep enquiries — and seats — full for every intake.",
    services: ['Brand Strategy', 'Admissions Funnels', 'Performance Marketing', 'CRM Setup'],
    // ctaLabel: 'Explore Education Projects',
    // projectLabel: 'RIVERSIDE ACADEMY',
    // projectOutcome: 'A growing school filled its next intake six weeks early after a targeted admissions campaign.',
    projectOutcome: "Admission-focused digital marketing, school websites, branding, and parent engagement strategies designed to increase enquiries and strengthen institutional trust.",
    image:
      'https://plus.unsplash.com/premium_photo-1663040225613-98b7801c48a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    accent: '#3D5A73',
    // gradient: 'linear-gradient(160deg, #23374B 0%, #33506A 46%, #4C7089 100%)',
    gradient: `
      linear-gradient(
      135deg,
      #FCFEFF 0%,
      #F4FAFF 20%,
      #EDF6FD 45%,
      #E5F1FB 70%,
      #DCEBF8 100%
      )
      `,
    icon: 'education',
  },
  {
    id: 'gyms-fitness',
    name: 'Gyms & Fitness',
    navLabel: 'Gyms',
    kicker: 'Studios & Trainers',
    title: 'Gyms & Fitness',
    description:
      "Fitness brands live on momentum. We build the content engine, the local campaigns and the renewal messaging that turn a first class into a standing habit.",
    services: ['Social Media', 'Performance Marketing', 'Brand Identity', 'AI Automation'],
    // ctaLabel: 'Explore Fitness Projects',
    // projectLabel: 'FORGE FITNESS CO.',
    // projectOutcome: 'A local training studio doubled membership renewals within one quarter of launch.',
    projectOutcome: "Performance marketing, social media content, membership campaigns, and brand experiences that help gyms attract new members and improve long-term retention.",
    image:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    accent: '#4C7089',
    // gradient: 'linear-gradient(160deg, #2A4155 0%, #3C5D74 46%, #5A8299 100%)',
    gradient: `
      linear-gradient(
      135deg,
      #FCFEFF 0%,
      #F4FAFF 20%,
      #EDF6FD 45%,
      #E5F1FB 70%,
      #DCEBF8 100%
      )
      `,
    icon: 'fitness',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    navLabel: 'Real Estate',
    kicker: 'Developers & Consultants',
    title: 'Real Estate',
    description:
      "Property is the biggest decision most buyers make all year. We build the visual storytelling and precise targeting that turn a scroll into a scheduled site visit.",
    services: ['Website Development', 'Lead Generation', 'Performance Marketing', 'Google Ads'],
    // ctaLabel: 'Explore Real Estate Projects',
    // projectLabel: 'MERIDIAN DEVELOPMENTS',
    // projectOutcome: 'A residential developer booked out an entire phase of site visits from one landing page.',
    projectOutcome: "High-converting real estate websites, project branding, targeted advertising, and lead generation systems built to increase quality enquiries and site visits.",
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80&ixlib=rb-4.1.0',
    accent: '#2F4156',
    // gradient: 'linear-gradient(160deg, #1F3245 0%, #2F4156 46%, #4C7089 100%)',
    gradient: `
      linear-gradient(
      135deg,
      #FCFEFF 0%,
      #F4FAFF 20%,
      #EDF6FD 45%,
      #E5F1FB 70%,
      #DCEBF8 100%
      )
      `,
    icon: 'realestate',
  },
];

const AUTOPLAY_MS = 4800;
const RESUME_AFTER_MS = 6500;

/* ------------------------------------------------------------------------ */
/* Monoline icons                                                           */
/* ------------------------------------------------------------------------ */
function Icon({ name, className }) {
  const common = {
    className,
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  switch (name) {
    case 'interior':
      return (
        <svg {...common}>
          <path d="M4 17v-4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4" />
          <path d="M4 17h16v2H4z" />
          <path d="M6 10V7a2 2 0 0 1 2-2h1" />
          <circle cx="17" cy="7" r="2" />
        </svg>
      );
    case 'education':
      return (
        <svg {...common}>
          <path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Z" />
          <path d="M6 10.8V15c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-4.2" />
          <path d="M21 8.5v6" />
        </svg>
      );
    case 'fitness':
      return (
        <svg {...common}>
          <path d="M6.5 9.5v5" />
          <path d="M17.5 9.5v5" />
          <path d="M3.5 11v2" />
          <path d="M20.5 11v2" />
          <path d="M6.5 12h11" />
        </svg>
      );
    case 'realestate':
      return (
        <svg {...common}>
          <path d="M4 21V10.5L12 4l8 6.5V21" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'right' ? 'M5 12h13M13 6l6 6-6 6' : 'M19 12H6M11 6l-6 6 6 6'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndustriesWeServe() {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, margin: '-120px' });
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimer = useRef(null);

  const active = INDUSTRIES[activeIndex];

  const pauseThenResume = useCallback(() => {
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), RESUME_AFTER_MS);
  }, []);

  const selectIndustry = useCallback(
    (index) => {
      setActiveIndex((index + INDUSTRIES.length) % INDUSTRIES.length);
      pauseThenResume();
    },
    [pauseThenResume]
  );

  useEffect(() => {
    if (isPaused || shouldReduceMotion || !isVisible) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % INDUSTRIES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion, isVisible]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const handleDragEnd = (_event, info) => {
    const threshold = 60;
    if (info.offset.x < -threshold) selectIndustry(activeIndex + 1);
    else if (info.offset.x > threshold) selectIndustry(activeIndex - 1);
    else pauseThenResume();
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="industries-we-serve"
      aria-labelledby="industries-heading"
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.eyebrow}>Industries We Serve</span>
          <h2 id="industries-heading" className={styles.visuallyHidden}>
            Industries We Serve
          </h2>
        </motion.div>

        {/* Floating pill navigation */}
        <div className={styles.navWrap}>
          <div
            className={styles.nav}
            role="tablist"
            aria-label="Featured industries"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {INDUSTRIES.map((industry, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={industry.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={styles.navTab}
                  data-active={isActive}
                  onClick={() => selectIndustry(index)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className={styles.navPill}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 340, damping: 32 }
                      }
                    />
                  )}
                  <span className={styles.navTabContent}>
                    <Icon name={industry.icon} className={styles.navIcon} />
                    {industry.navLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main feature panel */}
        <motion.div
          className={styles.panel}
          drag={shouldReduceMotion ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className={styles.panelBg}
              style={{ backgroundImage: active.gradient }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <div className={styles.grain} />
              <motion.div
                className={styles.glowOne}
                animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className={styles.glowTwo}
                animate={{ x: [0, -18, 0], y: [0, 20, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </AnimatePresence>

          <div className={styles.panelGrid}>
            {/* Left content */}
            <div className={styles.left}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.kicker}>{active.kicker}</span>
                  <h3 className={styles.title}>{active.title}</h3>
                  <p className={styles.description}>{active.description}</p>
                  <ul className={styles.serviceList} aria-label={`Services for ${active.name}`}>
                    {active.services.map((service) => (
                      <li key={service} className={styles.serviceChip}>
                        {service}
                      </li>
                    ))}
                  </ul>
                
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right floating showcase card */}
            <div className={styles.right}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.cardImageWrap}>
                    <motion.img
                      src={active.image}
                      alt={active.name}
                      className={styles.cardImage}
                      loading="lazy"
                      initial={{ scale: 1.12 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 6, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {!shouldReduceMotion && !isPaused && (
            <motion.div
              key={`${active.id}-progress`}
              className={styles.progress}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>

        {/* Mobile tab strip (horizontally scrollable) */}
        <div className={styles.mobileTabs} role="tablist" aria-label="Featured industries (mobile)">
          {INDUSTRIES.map((industry, index) => (
            <button
              key={industry.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={styles.mobileTab}
              onClick={() => selectIndustry(index)}
            >
              <Icon name={industry.icon} className={styles.mobileTabIcon} />
              <span>{industry.navLabel}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndustriesWeServe;