import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Services.module.css';

/* ── Service cards data ───────────────────────────────── */
const SERVICES = [
  {
    key: 'content',
    name: 'Content Creation',
    tags: ['Copywriting', 'Strategy', 'Storytelling'],
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&fit=crop',
    
  },
  {
    key: 'branding',
    name: 'Branding',
    tags: ['Identity', 'Design Systems', 'Logo'],
    img:'https://miro.medium.com/v2/resize:fit:1400/1*JyjM1R5nULnhMO_gyXdsTQ.png',
    
  },
  {
    key: 'social',
    name: 'Social Media Management',
    tags: ['Community', 'Calendars', 'Engagement'],
    img: 'https://plus.unsplash.com/premium_photo-1683275025987-127a52d36593?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    
  },
  {
    key: 'paid',
    name: 'Paid Advertisement',
    tags: ['Meta Ads', 'Google Ads', 'ROI'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop',
    
  },
  {
    key: 'video',
    name: 'Video Editing',
    tags: ['Production', 'Reels', 'Ad Films'],
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80&fit=crop',
    
  },
  {
    key: 'pr',
    name: 'PR & Media',
    tags: ['Press', 'Publications', 'Reputation'],
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80&fit=crop',
    
  },
  {
    key: 'influencer',
    name: 'Influencer Marketing',
    tags: ['Collaborations', 'UGC', 'Reach'],
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&fit=crop',
    
  },
  {
    key: 'ai',
    name: 'AI Marketing',
    tags: ['Automation', 'Personalization', 'Data'],
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&fit=crop',
    
  },
  {
    key: 'seo',
    name: 'SEO / GEO / AEO',
    tags: ['Rankings', 'AI Search', 'Visibility'],
    img:'https://alreadysetup.com/wp-content/uploads/SEO-image1.jpg',
    
  },
  {
    key: 'campaigns',
    name: 'Online Campaigns',
    tags: ['Strategy', 'Execution', 'Reporting'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop',
    
  },
  {
    key: 'growth',
    name: 'Growth Collaboration',
    tags: ['Partnerships', 'Co-marketing', 'Scale'],
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fit=crop',
    
  },
  {
    key: 'website',
    name: 'Website Services',
    tags: ['Development', 'UX', 'Conversion'],
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&fit=crop',
    
  },
];

/* ── Mega-dropdown data ───────────────────────────────── */
const MEGA_COLS = [
  {
    title: 'Brand Solutions',
    page:  '/brand-solutions',
    items: [
      'Social Media Management',
      'Original Content & Copywriting',
      'Graphic Design, Iconography & Illustrations',
      'Video Editing & Animation',
      'Film Production, AVs & Product Photography',
      'Campaign Planning',
      'Influencer Marketing & ORM',
      'Print, OOH & Mainline Advertising',
      'New Brand Launch & Rebranding',
      'Google Reviews Management',
    ],
  },
  {
    title: 'Tech Solutions',
    page:  '/tech-solutions',
    items: [
      'Custom Web Development',
      'Web Personalization',
      'UI/UX Design',
      'SEO (Search Engine Optimization)',
      'E-Commerce Development',
      'Email Marketing',
      'Marketing Automation',
      'Chatbots',
    ],
  },
  {
    title: 'Media Solutions',
    page:  '/media-solutions',
    items: [
      'Media Buying',
      'Media Planning',
      'Performance Marketing',
      'Ads Management (Google, Meta, LinkedIn, YouTube)',
    ],
  },
  {
    title: 'Film & Photography',
    page:  '/film-photography',
    items: [
      'Product Photoshoot',
      'UGC (User Generated Content)',
      'Model Shoot',
      'Creative Shoots',
      'Campaign Shoots',
      'Ad Films',
      'Factory Shoots',
      'Interviews',
      'Testimonials',
    ],
  },
];

const PER_PAGE    = 4;
const TOTAL_PAGES = Math.ceil(SERVICES.length / PER_PAGE);

/* ── Mega Dropdown component ──────────────────────────── */
function MegaDropdown({ anchorRef, onClose }) {
  const panelRef = useRef(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const recalc = () => {
      if (!anchorRef?.current || !panelRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const sectionRect = anchorRef.current.closest('section')?.getBoundingClientRect();
      const offsetTop = rect.bottom - (sectionRect?.top ?? 0) + 12;
      setTop(offsetTop);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [anchorRef]);

  useEffect(() => {
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        anchorRef?.current && !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 10);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler); };
  }, [onClose, anchorRef]);

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <div className={styles.megaBackdrop} onMouseDown={onClose} />
      <div
        ref={panelRef}
        className={styles.megaDropdown}
        style={{ top }}
      >
        <button className={styles.megaClose} onClick={onClose} aria-label="Close">✕</button>
        <div className={styles.megaGrid}>
          {MEGA_COLS.map((col) => (
            <div key={col.title} className={styles.megaCol}>
              <Link
                to={col.page}
                className={styles.megaColTitle}
                onClick={onClose}
                style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              >
                {col.title}
              </Link>
              {col.items.map((label) => (
                <Link
                  key={label}
                  to={col.page}
                  className={styles.megaLink}
                  onClick={onClose}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default memo(ServicesPreview);

/* ── Main component ───────────────────────────────────── */
function ServicesPreview() {
  const navigate    = useNavigate();
  const sectionRef  = useRef(null);
  const ctaRef      = useRef(null);
  const inView      = useInView(sectionRef, { once: true, margin: '-80px' });

  const [activePage,   setActivePage]   = useState(0);

  // ── Drag state — track both axes to distinguish swipe from scroll ──
  const dragState = useRef({
    active:    false,
    startX:    0,
    startY:    0,
    isHoriz:   null,   // null = undecided, true = horizontal, false = vertical
  });

  const [megaOpen,   setMegaOpen]   = useState(null);
  const [megaAnchor, setMegaAnchor] = useState(null);

  const arrowRefs = useRef({});
  const closeMega = useCallback(() => setMegaOpen(null), []);

  const openMega = useCallback((triggerKey, anchorRef) => {
    setMegaAnchor(anchorRef);
    setMegaOpen(triggerKey);
  }, []);

  const goTo = useCallback((p) => setActivePage(p), []);

  /* ── Pointer / mouse drag (desktop) ── unchanged behaviour ── */
  const onMouseDown = (e) => {
    dragState.current = { active: true, startX: e.clientX, startY: 0, isHoriz: true };
  };

  const onMouseUp = (e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    const delta = dragState.current.startX - e.clientX;
    if (Math.abs(delta) > 30) {
      const dir = delta > 0 ? 1 : -1;
      goTo(Math.max(0, Math.min(TOTAL_PAGES - 1, activePage + dir)));
    }
  };

  const onMouseLeave = (e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    const delta = dragState.current.startX - e.clientX;
    if (Math.abs(delta) > 30) {
      const dir = delta > 0 ? 1 : -1;
      goTo(Math.max(0, Math.min(TOTAL_PAGES - 1, activePage + dir)));
    }
  };

  /* ── Touch handlers — vertical scroll ALWAYS wins ────────────
     Strategy:
       • On touchstart, record X and Y but do NOT call preventDefault.
       • On touchmove, on the first move decide axis from whichever
         delta is larger. If vertical → mark isHoriz=false and stop
         tracking entirely (native scroll takes over unimpeded).
       • On touchend, only change page if isHoriz was confirmed true
         AND the horizontal delta is large enough.
     The handlers are intentionally passive (no preventDefault) so
     Chrome/Safari never blocks the native scroll thread.
  ────────────────────────────────────────────────────────────── */
  const onTouchStart = (e) => {
    const t = e.touches[0];
    dragState.current = {
      active:  true,
      startX:  t.clientX,
      startY:  t.clientY,
      isHoriz: null,
    };
  };

  const onTouchMove = (e) => {
    if (!dragState.current.active || dragState.current.isHoriz === false) return;

    const t      = e.touches[0];
    const dx     = Math.abs(t.clientX - dragState.current.startX);
    const dy     = Math.abs(t.clientY - dragState.current.startY);

    // Only decide once we have a meaningful movement
    if (dx < 5 && dy < 5) return;

    if (dragState.current.isHoriz === null) {
      // Vertical wins on a tie — be generous to scrolling
      dragState.current.isHoriz = dx > dy * 1.5;
    }

    // If vertical, deactivate immediately so native scroll is untouched
    if (!dragState.current.isHoriz) {
      dragState.current.active = false;
    }
  };

  const onTouchEnd = (e) => {
    if (!dragState.current.active || !dragState.current.isHoriz) {
      dragState.current.active = false;
      return;
    }
    dragState.current.active = false;

    const t     = e.changedTouches[0];
    const delta = dragState.current.startX - t.clientX;
    if (Math.abs(delta) > 30) {
      const dir = delta > 0 ? 1 : -1;
      goTo(Math.max(0, Math.min(TOTAL_PAGES - 1, activePage + dir)));
    }
  };

  const pageCards = useMemo(() => (
    SERVICES.slice(activePage * PER_PAGE, activePage * PER_PAGE + PER_PAGE)
  ), [activePage]);

  return (
    <LazyMotion features={domAnimation}>
      <section className={styles.section} ref={sectionRef}>

      {/* ── Heading Bar ──────────────────────────────────── */}
      <m.div
        className={styles.headingBar}
        initial={{ opacity: 0, y: -24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.eyebrow}>What We Offer</p>
        <h2 className={styles.heading}>Top Services</h2>
        <p className={styles.headingSub}>
          A comprehensive suite of marketing solutions tailored to your unique
          business goals — backed by data, creativity, and proven strategies.
        </p>
        <span className={styles.headingRule} />
      </m.div>

      {/* ── Carousel ─────────────────────────────────────── */}
      <div
        className={styles.carouselWrap}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.track}>
          {pageCards.map((svc, idx) => {
            if (!arrowRefs.current[svc.key]) {
              arrowRefs.current[svc.key] = React.createRef();
            }
            const isArrowActive = megaOpen === svc.key;

            return (
              <m.div
                key={svc.key}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
                aria-label={svc.name}
              >
                {/* Clip layer for image only */}
                <div className={styles.cardInner}>
                  <img
                    className={styles.cardImg}
                    src={svc.img}
                    alt={svc.name}
                    loading="lazy"
                    decoding="async"
                    width="1"
                    height="1"
                  />
                  <div className={styles.overlay} />
                </div>

                {/* Bottom text */}
                <div className={styles.cardContent}>
                  <div className={styles.nameRow}>
                    <h3 className={styles.cardName}>{svc.name}</h3>

                    <div
                      ref={arrowRefs.current[svc.key]}
                      className={`${styles.arrowIcon} ${isArrowActive ? styles.arrowIconActive : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (megaOpen === svc.key) {
                          closeMega();
                        } else {
                          openMega(svc.key, arrowRefs.current[svc.key]);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label="Browse all services"
                      aria-expanded={isArrowActive}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.stopPropagation();
                          megaOpen === svc.key ? closeMega() : openMega(svc.key, arrowRefs.current[svc.key]);
                        }
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                      </svg>
                    </div>
                  </div>

                  <p className={styles.cardTags}>
                    {svc.tags.join('\u00A0\u00A0|\u00A0\u00A0')}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>

      {/* ── Dots ─────────────────────────────────────────── */}
      <div className={styles.dots}>
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activePage ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <m.div
        className={styles.ctaWrap}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button
          ref={ctaRef}
          className={`${styles.ctaBtn} ${megaOpen === 'cta' ? styles.ctaBtnActive : ''}`}
          aria-expanded={megaOpen === 'cta'}
          onClick={() => {
            if (megaOpen === 'cta') {
              closeMega();
            } else {
              openMega('cta', ctaRef);
            }
          }}
        >
          Explore All Services
          <svg className={styles.arrow} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 10h12M11 5l5 5-5 5"/>
          </svg>
        </button>
      </m.div>

      {/* ── Mega Dropdown ────────────────────────────────── */}
      {megaOpen && (
        <MegaDropdown
          anchorRef={megaAnchor}
          onClose={closeMega}
        />
      )}

      </section>
    </LazyMotion>
  );
}