/**
 * WhoWeAre.jsx — Performance-Optimised
 *
 * Changes vs original (UI/animations/layout: ZERO changes):
 *  1. Video element uses data-src instead of src → no network fetch on render
 *  2. Existing IntersectionObserver (already used for text reveals) is extended
 *     to also trigger video src assignment + play when the section enters viewport
 *  3. preload="none" prevents any speculative fetching
 *  4. React.memo prevents unnecessary re-renders from parent updates
 *  5. useCallback on navigate handler (stable reference across renders)
 */

import React, { useRef, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WhoWeAre.module.css';

const VIDEO_SRC =
  'https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/vid-6.mp4';

function WhoWeAre() {
  const navigate = useNavigate();
  const rightRef = useRef(null);
  const videoRef = useRef(null); // direct ref to the <video> element

  // Stable navigate callback — avoids recreating the click handler on every render
  const handleCta = useCallback(() => navigate('/contact'), [navigate]);

  useEffect(() => {
    // ── Text reveal observer (unchanged behaviour) ─────────────────────────
    const textEls = rightRef.current?.querySelectorAll('[data-reveal]');

    const textObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.revealed);
            textObs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );

    textEls?.forEach((el) => textObs.observe(el));

    // ── Video lazy-load observer ───────────────────────────────────────────
    //    rootMargin '300px' → browser starts fetching the video ~300 px before
    //    the section scrolls into view, so it's ready to autoplay on entry.
    const videoEl = videoRef.current;
    let videoObs = null;

    if (videoEl) {
      videoObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (!videoEl.src) {
              videoEl.src = VIDEO_SRC;
              videoEl.load();
              videoEl.play().catch(() => {}); // swallow AbortError on unmount
            }
            videoObs.disconnect();
          });
        },
        { rootMargin: '300px 0px', threshold: 0 }
      );
      videoObs.observe(videoEl);
    }

    return () => {
      textObs.disconnect();
      videoObs && videoObs.disconnect();
    };
  }, []);

  return (
    <section className={styles.section}>
      {/* LEFT — tall portrait video card (layout unchanged) */}
      <div className={styles.left}>
        <div className={styles.videoCard}>
          {/*
           * KEY CHANGE: src removed, data-src used instead.
           * autoPlay / muted / loop / playsInline kept so the browser honours
           * them as soon as the IntersectionObserver assigns .src above.
           * preload="none" stops any network activity until then.
           */}
          <video
            ref={videoRef}
            data-src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className={styles.video}
          />
          <div className={styles.sheen} />
        </div>
      </div>

      {/* RIGHT — text (completely unchanged) */}
      <div className={styles.right} ref={rightRef}>
        <p className={styles.eyebrow} data-reveal>
          <span className={styles.eyeDot} />
          AI-POWERED CREATIVITY
        </p>
        <h2 className={styles.heading} data-reveal>
          An AI-First Agency<br />
          <span className={styles.accent}>Built for Growth</span>
        </h2>
        <p className={styles.body} data-reveal>
          AssignInc is a Jaipur-based AI-powered creative and growth agency helping businesses
          scale through content, marketing, automation, and technology. From AI-generated ad
          shoots and brand storytelling to website development and performance marketing, we
          create solutions designed for measurable business growth.
        </p>
        <p className={styles.body} data-reveal>
          Our team combines creativity with cutting-edge AI to deliver faster production,
          smarter campaigns, and better outcomes. Whether you're building brand awareness,
          generating leads, or streamlining operations, we act as an extension of your
          team—focused on growth at every stage of the journey.
        </p>
        <button
          className={styles.ctaBtn}
          data-reveal
          onClick={handleCta}
        >
          Let's Build Together →
        </button>
      </div>
    </section>
  );
}

export default memo(WhoWeAre);
