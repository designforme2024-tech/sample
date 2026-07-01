import { memo, useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import styles from "./GrowthJourneyV3.module.css";

// import { useTranslation } from "react-i18next";

import img1 from "../../assets/journey/Image-1.webp";
import img2 from "../../assets/journey/Image-2.webp";
import img3 from "../../assets/journey/Image-3.webp";
import img4 from "../../assets/journey/Image-4.webp";
import img5 from "../../assets/journey/Image-5.webp";
import img6 from "../../assets/journey/Image-6.webp";

import evtImg1 from "../../assets/events/img-1.webp";
import evtImg2 from "../../assets/events/img-2.webp";
import evtImg3 from "../../assets/events/img-3.webp";
import evtImg4 from "../../assets/events/img-4.webp";
import evtImg5 from "../../assets/events/img-5.webp";
import evtImg6 from "../../assets/events/img-6.webp";
import evtImg7 from "../../assets/events/img-7.webp";
import evtImg8 from "../../assets/events/img-8.webp";
import evtImg9 from "../../assets/events/img-9.webp";
import evtImg10 from "../../assets/events/img-10.webp";
import evtImg11 from "../../assets/events/img-11.webp";
import evtImg12 from "../../assets/events/img-12.webp";
import evtImg13 from "../../assets/events/img-13.webp";
import evtImg14 from "../../assets/events/img-14.webp";
import evtImg15 from "../../assets/events/img-15.webp";
import evtImg17 from "../../assets/events/img-17.webp";

const milestones = [
  {
    image: img1,
    year: "2023",
    title: "VGU Youth Event",
    tag: "300+ Students • RJ Kartik",
    details:
      "Executed a large-scale youth engagement event at VGU with over 300 students alongside DP World.",
  },
  {
    image: img2,
    year: "2024",
    title: "IMC Event Collaboration",
    tag: "Industry Connect",
    details:
      "Represented AssignInc at India Mobile Congress and collaborated in an event associated with Anant Ambani.",
  },
  {
    image: img3,
    year: "2024",
    title: "Government Startup Funding",
    tag: "Official Recognition",
    details:
      "Received startup support and recognition through government-backed innovation initiatives.",
  },
  {
    image: img4,
    year: "2025",
    title: "Social Media Management of Government Organisation",
    tag: "Leadership Campaigns",
    details:
      "Managed high-impact digital campaigns and communication strategies for state leadership initiatives.",
  },
  {
    image: img5,
    year: "2025",
    title: "DOITC Partnership",
    tag: "Government Technology",
    details:
      "Collaborated with Rajasthan government technology initiatives and ecosystem projects for digital transformation.",
  },
  {
    image: img6,
    year: "2026",
    title: "Top 10 Startup Selection",
    tag: "Government Of India Recognition",
    details:
      "Selected among Top 10 emerging startups and recognized for innovation, impact and consistent growth.",
  },
];

const galleryImages = [
  evtImg1, evtImg2, evtImg3, evtImg4, evtImg5, evtImg6, evtImg7,
  evtImg8, evtImg9, evtImg10, evtImg11, evtImg12, evtImg13, evtImg14,
  evtImg15, evtImg17,
];

const slideVariants = [
  { x: -100 },
  { x: 100 },
  { y: 100 },
  { y: -100 },
];

/* ── Lightbox component ── */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.lightboxOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label="Image preview"
      >
        <motion.div
          className={styles.lightboxContent}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            className={styles.lightboxImage}
          />
          <button
            className={styles.lightboxClose}
            onClick={onClose}
            aria-label="Close image preview"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(GrowthJourneyV3);

function GrowthJourneyV3() {
  // const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null); // { src, alt }
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const gallerySectionRef = useRef(null);
  const galleryInView = useInView(gallerySectionRef, { once: true, margin: "-100px" });

  // ── Single drag detection ref that works for BOTH mouse and touch ──
  const pointerState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    pointerId: null,
  });

  /* ══════════════════════════════
     MOUSE drag-to-scroll (desktop)
  ══════════════════════════════ */
  const onMouseDown = useCallback((e) => {
    pointerState.current.isDragging = false;
    pointerState.current.startX = e.pageX - scrollRef.current.offsetLeft;
    pointerState.current.scrollLeft = scrollRef.current.scrollLeft;
    scrollRef.current.style.userSelect = "none";
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!scrollRef.current.matches(":active")) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - pointerState.current.startX;
    // Only flag as drag if moved more than 5px — avoids accidental drags
    if (Math.abs(walk) > 5) {
      pointerState.current.isDragging = true;
    }
    scrollRef.current.scrollLeft = pointerState.current.scrollLeft - walk * 1.4;
  }, []);

  const onMouseUp = useCallback(() => {
    if (scrollRef.current) scrollRef.current.style.userSelect = "";
  }, []);

  /* ══════════════════════════════
     TOUCH drag-to-scroll (mobile)
     This was MISSING — causing all mobile bugs.
     Touch events don't fire mouse events, so isDragging
     was always false on mobile, but scroll-snap was also
     fighting with click events, causing index mismatches.
  ══════════════════════════════ */
  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    pointerState.current.isDragging = false;
    pointerState.current.startX = touch.clientX;
    pointerState.current.startY = touch.clientY;
    pointerState.current.scrollLeft = scrollRef.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    const dx = touch.clientX - pointerState.current.startX;
    const dy = touch.clientY - pointerState.current.startY;
    // Only mark as horizontal drag (not vertical scroll)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
      pointerState.current.isDragging = true;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    // isDragging flag persists until next touchstart/mousedown
    // so handleCardClick can read it correctly
    // We reset it with a tiny delay to let the synthetic click event
    // (which fires ~300ms after touchend) read the correct value
    setTimeout(() => {
      pointerState.current.isDragging = false;
    }, 350);
  }, []);

  /* ══════════════════════════════
     INTERSECTION OBSERVER
     Only updates visibleIndex (dot nav) — does NOT touch activeIndex.
     This was a source of confusion: visibleIndex ≠ activeIndex.
     They are independent — visibleIndex is for the dot, activeIndex
     is for the expanded detail panel. Keeping them separate is correct.
  ══════════════════════════════ */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setVisibleIndex(idx);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.55 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Scroll to card ── */
  const scrollToCard = useCallback((idx) => {
    const el = cardRefs.current[idx];
    if (!el || !scrollRef.current) return;
    const containerLeft = scrollRef.current.getBoundingClientRect().left;
    const elLeft = el.getBoundingClientRect().left;
    const center =
      scrollRef.current.scrollLeft +
      elLeft -
      containerLeft -
      scrollRef.current.clientWidth / 2 +
      el.clientWidth / 2;
    scrollRef.current.scrollTo({ left: center, behavior: "smooth" });
  }, []);

  /* ══════════════════════════════
     TOGGLE DETAIL — single source of truth
     Called with the EXACT index from the map() closure.
     Both mouse clicks and touch taps route through here.
     
     FIX: We check isDragging BEFORE the setTimeout reset window.
     On mobile, if touchEnd -> synthetic click fires during the 350ms
     window, isDragging is still true, so we correctly suppress it.
  ══════════════════════════════ */
  const handleCardClick = useCallback((index) => {
    if (pointerState.current.isDragging) {
      return; // This was a scroll swipe, not a tap
    }
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  /* ══════════════════════════════
     MILESTONE IMAGE CLICK — open lightbox
     
     FIX: Also gate on isDragging so a swipe on the image area
     doesn't accidentally open the lightbox.
  ══════════════════════════════ */
  const handleMilestoneImageClick = useCallback((e, item) => {
    e.stopPropagation(); // Don't trigger card expand
    if (pointerState.current.isDragging) return;
    setLightbox({ src: item.image, alt: item.title });
  }, []);

  /* ── Open lightbox for gallery image ── */
  const handleGalleryImageClick = useCallback((src, index) => {
    setLightbox({ src, alt: `Event photo ${index + 1}` });
  }, []);

  return (
    <section className={styles.section}>

      {/* ── HEADING — white background ── */}
      <motion.div
        className={styles.headingWrap}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className={styles.heading}>
          Growth <span className={styles.headingAccent}>Journey</span>
        </h2>
        <p className={styles.headingSubline}>
          Six milestones that define who we are today.
        </p>
      </motion.div>

      {/* ── LIGHT BLUE BAND with cards ── */}
      <div className={styles.trackBand}>
        <div
          className={styles.trackScroll}
          ref={scrollRef}
          /* Mouse events (desktop) */
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          /* Touch events (mobile) — was completely missing before */
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {milestones.map((item, index) => (
            <div
              key={index}
              className={styles.milestoneWrap}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <motion.div
                className={`${styles.card} ${activeIndex === index ? styles.active : ""}`}
                /*
                 * FIX: Use onClick only (not onTouchEnd + onClick).
                 * React's synthetic onClick fires after touchend on mobile
                 * via the 300ms delay emulation, OR immediately on desktop.
                 * Our isDragging flag (reset after 350ms) correctly blocks
                 * swipe-triggered synthetic clicks on mobile.
                 * 
                 * DO NOT add onTouchEnd here — it would fire BEFORE the
                 * scroll-snap settles, causing the wrong index to be read
                 * if the container repositioned mid-gesture.
                 */
                onClick={() => handleCardClick(index)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* ── Image area ── */}
                <div
                  className={styles.imgWrap}
                  onClick={(e) => handleMilestoneImageClick(e, item)}
                  title="Click to enlarge"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.image}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    /* Prevent long-press context menu on mobile from
                       interfering with touch events */
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <span className={styles.yearBadge}>{item.year}</span>
                  <span className={styles.imgExpandHint} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3h5M3 3v5M3 3l5.5 5.5M17 3h-5M17 3v5M17 3l-5.5 5.5M3 17h5M3 17v-5M3 17l5.5-5.5M17 17h-5M17 17v-5M17 17l-5.5-5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>

                {/* ── Footer bar ── */}
                <div className={styles.cardFooter}>
                  <div className={styles.titleGroup}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <span className={styles.cardTag}>{item.tag}</span>
                  </div>
                  <button
                    className={styles.expandBtn}
                    aria-label={activeIndex === index ? "Collapse details" : "Expand details"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(index);
                    }}
                  >
                    ↓
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ── Dot nav — uses visibleIndex (scroll position), independent of activeIndex ── */}
        <div className={styles.dotNav} role="tablist" aria-label="Milestones">
          {milestones.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.navDot} ${visibleIndex === idx ? styles.activeDot : ""}`}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to milestone ${idx + 1}: ${milestones[idx].title}`}
              role="tab"
              aria-selected={visibleIndex === idx}
            />
          ))}
        </div>
      </div>

      {/* ── DETAIL PANEL — white background, slides open below band ── */}
      <div
        className={`${styles.detailPanel} ${activeIndex !== null ? styles.open : ""}`}
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              className={styles.detailInner}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className={styles.detailYear}>
                {milestones[activeIndex].year}
              </span>
              <div className={styles.detailContent}>
                <h4 className={styles.detailTitle}>
                  {milestones[activeIndex].title}
                </h4>
                <div className={styles.detailTagRow}>
                  <span className={styles.detailDot} />
                  <span className={styles.detailTag}>
                    {milestones[activeIndex].tag}
                  </span>
                </div>
                <p className={styles.detailDesc}>
                  {milestones[activeIndex].details}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── WORK SAMPLES HEADING ── */}
      <div className={styles.workSamplesWrap}>
        <h2 className={styles.workSamplesHeading}>
          Networking <span className={styles.workSamplesAccent}>& Events</span>
        </h2>
      </div>

      {/* ── PHOTO GALLERY ── */}
      <div ref={gallerySectionRef} className={styles.gallerySection}>
        <div className={styles.galleryInner}>
          <div className={styles.galleryGrid}>
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                className={styles.galleryItem}
                initial={{ ...slideVariants[index % slideVariants.length], opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                onClick={() => handleGalleryImageClick(img, index)}
                title="Click to enlarge"
              >
                <img
                  src={img}
                  alt={`Work sample ${index + 1}`}
                  className={styles.galleryImage}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                <span className={styles.galleryExpandHint} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3h5M3 3v5M3 3l5.5 5.5M17 3h-5M17 3v5M17 3l-5.5 5.5M3 17h5M3 17v-5M3 17l5.5-5.5M17 17h-5M17 17v-5M17 17l-5.5-5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}

    </section>
  );
}