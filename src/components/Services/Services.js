import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
    // img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&fit=crop',
    img:'https://miro.medium.com/v2/resize:fit:1400/1*JyjM1R5nULnhMO_gyXdsTQ.png',
    // img:'https://www.entrepreneur.com/wp-content/uploads/sites/2/2017/04/20160210172912-branding-logos-companies-businesses-identity.jpeg?resize=800,450',
    
  },
  {
    key: 'social',
    name: 'Social Media Management',
    tags: ['Community', 'Calendars', 'Engagement'],
    // img: 'https://plus.unsplash.com/premium_photo-1684979564941-dbf8664a68fc?w=600&auto=format&fit=crop&q=60',
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
    // img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&auto=format&fit=crop&q=60',
    
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

/* ── Mega-dropdown data — mirrors Image 2 exactly ─────── */
/* All items within a column navigate to that column's page */
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

  // Position the panel below the anchor element
  const [top, setTop] = useState(0);

  useEffect(() => {
    const recalc = () => {
      if (!anchorRef?.current || !panelRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const sectionRect = anchorRef.current.closest('section')?.getBoundingClientRect();
      // offset from section top
      const offsetTop = rect.bottom - (sectionRect?.top ?? 0) + 12;
      setTop(offsetTop);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [anchorRef]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        anchorRef?.current && !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    // slight delay so the opening click doesn't immediately close
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 10);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler); };
  }, [onClose, anchorRef]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div className={styles.megaBackdrop} onMouseDown={onClose} />

      {/* Panel */}
      <div
        ref={panelRef}
        className={styles.megaDropdown}
        style={{ top }}
      >
        <button className={styles.megaClose} onClick={onClose} aria-label="Close">✕</button>

        <div className={styles.megaGrid}>
          {MEGA_COLS.map((col) => (
            <div key={col.title} className={styles.megaCol}>
              {/* Column title is itself a link to the page */}
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

/* ── Main component ───────────────────────────────────── */
export default function ServicesPreview() {
  const navigate    = useNavigate();
  const sectionRef  = useRef(null);
  const ctaRef      = useRef(null);   // anchor for CTA dropdown
  const inView      = useInView(sectionRef, { once: true, margin: '-80px' });

  const [activePage,   setActivePage]   = useState(0);
  const [isDragging,   setIsDragging]   = useState(false);
  const [dragStart,    setDragStart]    = useState(0);

  // Which trigger opened the mega: 'cta' | cardKey | null
  const [megaOpen,     setMegaOpen]     = useState(null);
  const [megaAnchor,   setMegaAnchor]   = useState(null); // ref to anchor element

  // Per-card arrow refs so we can anchor the dropdown to the clicked arrow
  const arrowRefs = useRef({});

  const closeMega = useCallback(() => setMegaOpen(null), []);

  const openMega = (triggerKey, anchorRef) => {
    setMegaAnchor(anchorRef);
    setMegaOpen(triggerKey);
  };

  const goTo = (p) => setActivePage(p);

  /* Drag / swipe */
const onDragStart = (e) => {
  setIsDragging(true);
  setDragStart(
    e.clientX ?? e.touches?.[0]?.clientX
  );
};

const onDragEnd = (e) => {
  if (!isDragging) return;

  setIsDragging(false);

  const end =
    e.clientX ??
    e.changedTouches?.[0]?.clientX ??
    dragStart;

  const delta = dragStart - end;

  if (Math.abs(delta) > 30) {
    const dir = delta > 0 ? 1 : -1;

    goTo(
      Math.max(
        0,
        Math.min(TOTAL_PAGES - 1, activePage + dir)
      )
    );
  }
};

  const pageCards = SERVICES.slice(activePage * PER_PAGE, activePage * PER_PAGE + PER_PAGE);

  return (
    <section className={styles.section} ref={sectionRef}>

      {/* ── Heading Bar ──────────────────────────────────── */}
      <motion.div
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
      </motion.div>

      {/* ── Carousel ─────────────────────────────────────── */}
        <div
        className={styles.carouselWrap}
        // style={{ touchAction: "pan-y" }}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseLeave={() => isDragging && onDragEnd({ clientX: dragStart })}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        <div className={styles.track}>
          {pageCards.map((svc, idx) => {
            // ensure a ref exists for this card's arrow
            if (!arrowRefs.current[svc.key]) {
              arrowRefs.current[svc.key] = React.createRef();
            }
            const isArrowActive = megaOpen === svc.key;

            return (
              <motion.div
                key={svc.key}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
                // aria-label={`${svc.name} — go to ${svc.page.replace('/', '')}`}
                aria-label={svc.name}
              >
                {/* Clip layer for image only */}
                <div className={styles.cardInner}>
                  <div
                    className={styles.cardBg}
                    style={{ backgroundImage: `url(${svc.img})` }}
                  />
                  <div className={styles.overlay} />
                </div>

                {/* Bottom text */}
                <div className={styles.cardContent}>
                  <div className={styles.nameRow}>
                    <h3 className={styles.cardName}>{svc.name}</h3>

                    {/* Arrow — opens mega dropdown */}
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
              </motion.div>
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

      {/* ── CTA — opens same mega dropdown ───────────────── */}
      <motion.div
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
      </motion.div>

      {/* ── Mega Dropdown (shared, rendered once) ─────────── */}
      {megaOpen && (
        <MegaDropdown
          anchorRef={megaAnchor}
          onClose={closeMega}
        />
      )}

    </section>
  );
}