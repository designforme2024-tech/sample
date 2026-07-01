/**
 * Hero.jsx — Performance-Optimised
 *
 * Changes vs original (UI/animations/layout: ZERO changes):
 *  1. Videos use data-src instead of src in JSX → no network request on render
 *  2. A single IntersectionObserver on the right column fires once the section
 *     enters the viewport, then copies data-src → src and calls play()
 *  3. preload="none" prevents any speculative fetching
 *  4. Ticker and heading cycle logic unchanged
 *  5. React.memo wraps the export to prevent parent-driven re-renders
 *  6. useCallback on the interval callback (stable reference)
 *  7. All constant arrays stay module-level (no recreation on render)
 */

import React, { useRef, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const v1 =
  'https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/vid-1.mp4';
const v3 =
  'https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/vid-3.mp4';
const v4 =
  'https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/vid-4.mp4';

const CYCLE_WORDS = ['Website', 'Campaigns', 'Socials', 'Branding', 'Content', 'Much More'];

const COLS = [
  { vid: v1, dir: 'down' },
  { vid: v3, dir: 'up'   },
  { vid: v4, dir: 'down' },
];

const TICKER_ITEMS = [
  'Social Media Management',
  'Content Creation',
  'Branding & Design',
  'SEO & Digital Marketing',
  'Website Development',
  'Video Production',
  'Performance Marketing',
  'Campaign Strategy',
];

// ─── Duplicated once for seamless CSS ticker loop (module-level, never recreated) ───
const TICKER_DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

function Hero() {
  const navigate = useNavigate();
  const wordRef  = useRef(null);
  const idxRef   = useRef(0);
  const rightRef = useRef(null);   // watches the video column section
  const videoObsRef = useRef(null); // stores the IO so we can disconnect

  // ── Word cycler (unchanged logic, stable callback) ──────────────────────────
  const cycle = useCallback(() => {
    const el = wordRef.current;
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(-12px)';
    setTimeout(() => {
      idxRef.current = (idxRef.current + 1) % CYCLE_WORDS.length;
      el.textContent     = CYCLE_WORDS[idxRef.current];
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 380);
  }, []);

  useEffect(() => {
    const t = setInterval(cycle, 2500);
    return () => clearInterval(t);
  }, [cycle]);

  // ── Lazy-load all column videos when the right panel enters viewport ─────────
  //    rootMargin '200px' → starts loading 200 px before the section is visible,
  //    giving the browser a small head-start so autoplay fires smoothly.
  useEffect(() => {
    const rightEl = rightRef.current;
    if (!rightEl) return;

    const loadAndPlay = (videoEl) => {
      if (!videoEl || videoEl.src) return; // already loaded
      const src = videoEl.dataset.src;
      if (!src) return;
      videoEl.src = src;
      videoEl.load();
      // play() returns a promise; swallow AbortError on unmount
      videoEl.play().catch(() => {});
    };

    videoObsRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          // Load every video inside the right panel
          rightEl.querySelectorAll('video[data-src]').forEach(loadAndPlay);
          // Only need to fire once
          videoObsRef.current.disconnect();
        });
      },
      { rootMargin: '200px 0px', threshold: 0 }
    );

    videoObsRef.current.observe(rightEl);

    return () => {
      videoObsRef.current && videoObsRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <section className={styles.hero}>

        {/* ── LEFT (unchanged) ── */}
        <div className={styles.left}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Full-Service Digital Agency
          </p>

          <div className={styles.headline}>
            <span className={styles.line}>We Help</span>
            <span className={styles.line}>businesses with</span>
            <span
              className={styles.cycler}
              ref={wordRef}
              style={{ transition: 'opacity 0.35s ease, transform 0.35s ease' }}
            >
              {CYCLE_WORDS[0]}
            </span>
          </div>

          <p className={styles.sub}>
            Turning ideas into growth stories with content that performs.
          </p>

          <div className={styles.ctas}>
            <button className={styles.btnGhost} onClick={() => navigate('/case-studies')}>
              Case Studies
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── RIGHT — 3 portrait columns (layout unchanged) ── */}
        {/*   KEY CHANGE: src → data-src, preload="none"       */}
        <div className={styles.right} ref={rightRef}>
          <div className={styles.fadeTop} />
          <div className={styles.fadeBottom} />

          {COLS.map((col, ci) => (
            <div
              key={ci}
              className={`${styles.col} ${col.dir === 'up' ? styles.colUp : styles.colDown}`}
            >
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={styles.tile}>
                  {/*
                   * data-src holds the real URL — no network request until
                   * the IntersectionObserver above sets .src and calls play().
                   * autoPlay / muted / loop / playsInline attributes are kept
                   * so the browser honours them as soon as src is assigned.
                   */}
                  <video
                    data-src={col.vid}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className={styles.tileVid}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

      </section>

      {/* ── TICKER (unchanged) ── */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {TICKER_DOUBLED.map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item}
              <span className={styles.tickerDot} aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

// React.memo: Hero has no props — memoisation prevents any ancestor re-render
// from unnecessarily diffing/re-running this tree.
export default memo(Hero);
