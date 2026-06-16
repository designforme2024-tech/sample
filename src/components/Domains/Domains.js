import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Domains.module.css';

const DOMAINS = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    tag: 'Healthcare',
    desc: 'Digital health campaigns, hospital branding & patient acquisition.',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=520&q=85&fit=crop',
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    tag: 'Real Estate',
    desc: 'Property launches, virtual tours & lead gen for developers.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=520&q=85&fit=crop',
  },
  {
    id: 'interior',
    label: 'Home Decor',
    tag: 'Home Decor',
    desc: 'Aesthetic-driven campaigns for interior designers & decor brands.',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=520&q=85&fit=crop',
  },
  {
    id: 'travel',
    label: 'Travel',
    tag: 'Travel',
    desc: 'Destination marketing, influencer trips & booking-focused campaigns.',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=520&q=85&fit=crop',
  },
  {
    id: 'it',
    label: 'IT & Tech',
    tag: 'IT & Tech',
    desc: 'B2B SaaS marketing, product launches & developer-focused branding.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=520&q=85&fit=crop',
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    tag: 'E-Commerce',
    desc: 'Product photography, D2C campaigns & marketplace optimization.',
    img: 'https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?q=80&w=687&auto=format&fit=crop',
  },
  {
    id: 'fashion',
    label: 'Fashion',
    tag: 'Fashion',
    desc: 'Lookbook creation, influencer styling & seasonal campaign strategies.',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 'b2b',
    label: 'B2B',
    tag: 'B2B',
    desc: 'Lead nurturing, corporate branding & LinkedIn-first growth strategies.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=520&q=85&fit=crop',
  },
  {
    id: 'jewellery',
    label: 'Jewellery',
    tag: 'Jewellery',
    desc: 'Premium visual storytelling & luxury-tier social presence building.',
    img: 'https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?q=80&w=687&auto=format&fit=crop',
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    tag: 'Hospitality',
    desc: 'Hotel branding, event marketing & guest experience campaigns.',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=520&q=85&fit=crop',
  },
  {
    id: 'education',
    label: 'Education',
    tag: 'Education',
    desc: 'Institution branding, student acquisition & e-learning promotion.',
    img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 'food',
    label: 'Food & Beverage',
    tag: 'F&B',
    desc: 'Restaurant launches, FMCG campaigns & food content creation.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=520&q=85&fit=crop',
  },
];

const CARD_W = 232;
const GAP = 18;
const STEP = CARD_W + GAP;
const VISIBLE = 3;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Domains() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  const [current, setCurrent]   = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const maxIdx = Math.max(0, DOMAINS.length - VISIBLE);

  const isMobile =
  typeof window !== "undefined" &&
  window.innerWidth < 860;
  
  // const isMobile = window.innerWidth < 860;

  const dragStart  = useRef(null);
  const dragOffset = useRef(0);

  const goTo = useCallback((idx) => {
    setCurrent(Math.max(0, Math.min(maxIdx, idx)));
  }, [maxIdx]);

  const onMouseDown = (e) => {
    dragStart.current  = e.clientX;
    dragOffset.current = current * STEP;
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };
  const onMouseMove = (e) => {
    if (dragStart.current === null) return;
    const raw = Math.max(0, dragOffset.current + (dragStart.current - e.clientX));
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${raw}px)`;
  };
  const onMouseUp = (e) => {
    if (dragStart.current === null) return;
    const dx = dragStart.current - e.clientX;
    if (trackRef.current) trackRef.current.style.transition = '';
    goTo(current + (dx > 60 ? 1 : dx < -60 ? -1 : 0));
    dragStart.current = null;
  };
  const onTouchStart = (e) => {
    dragStart.current  = e.touches[0].clientX;
    dragOffset.current = current * STEP;
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };
  const onTouchEnd = (e) => {
    if (dragStart.current === null) return;
    const dx = dragStart.current - e.changedTouches[0].clientX;
    if (trackRef.current) trackRef.current.style.transition = '';
    goTo(current + (dx > 50 ? 1 : dx < -50 ? -1 : 0));
    dragStart.current = null;
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Domains we serve">

      <div className={styles.inner}>

        {/* ── LEFT: sticky heading col ── */}
        <motion.div
          className={styles.leftCol}
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.eyebrow}>Industries We Work For</span>

          <h2 className={styles.heading}>
            We are Serving For{' '}
            <span className={styles.headingAccent}>15+ Different</span>{' '}
            Industries
          </h2>

          <p className={styles.headingSub}>
            From startups to established enterprises — across every domain.
          </p>

          {/* Nav lives in left col, below the copy */}
          {!isMobile && (
          <div className={styles.nav}>
            <button
              className={styles.navBtn}
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              aria-label="Previous"
            >
              ‹
            </button>

            <div className={styles.dots}>
              {Array.from({ length: maxIdx + 1 }, (_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={styles.navBtn}
              onClick={() => goTo(current + 1)}
              disabled={current === maxIdx}
              aria-label="Next"
            >
              ›
            </button>
          </div>)}
        </motion.div>

        {/* ── RIGHT: carousel ── */}
          <div className={styles.carouselRoot}>
            <div
              className={styles.trackWrap}
              onMouseDown={isMobile ? undefined : onMouseDown}
              onMouseMove={isMobile ? undefined : onMouseMove}
              onMouseUp={isMobile ? undefined : onMouseUp}
              onMouseLeave={isMobile ? undefined : onMouseUp}
              onTouchStart={isMobile ? undefined : onTouchStart}
              onTouchEnd={isMobile ? undefined : onTouchEnd}
            >
              <div
                ref={trackRef}
                className={styles.track}
                style={{
                  transform: isMobile
                    ? 'translateX(0)'
                    : `translateX(-${current * STEP}px)`
                }}
              >
              {DOMAINS.map((d, i) => (
                <motion.div
                  key={d.id}
                  className={`${styles.card} ${hoveredId === d.id ? styles.cardHovered : ''}`}
                  custom={i}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredId(d.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <img
                    className={styles.cardImg}
                    src={d.img}
                    alt={d.label}
                    draggable={false}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardTop}>
                    <span className={styles.cardTag}>{d.tag}</span>
                  </div>
                  <div className={styles.cardBottom}>
                    <h4 className={styles.cardLabel}>{d.label}</h4>
                    <p className={styles.cardDesc}>{d.desc}</p>
                  </div>
                  <div className={styles.cardLine} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}