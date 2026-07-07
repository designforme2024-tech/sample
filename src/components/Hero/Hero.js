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
  const isMobileRef = useRef(false);
  const mobileVideoRef = useRef(null);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateIsMobile = (event) => {
      isMobileRef.current = event.matches;
    };

    isMobileRef.current = mediaQuery.matches;
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateIsMobile);
    } else {
      mediaQuery.addListener(updateIsMobile);
    }

    const cleanupMediaQuery = () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateIsMobile);
      } else {
        mediaQuery.removeListener(updateIsMobile);
      }
    };

    const rightEl = rightRef.current;
    if (!rightEl) {
      cleanupMediaQuery();
      return;
    }

    const videos = Array.from(rightEl.querySelectorAll('video[data-src]'));
    const loadVideo = (video) => {
      if (!video || video.src) return;
      const src = video.dataset.src;
      if (!src) return;
      video.src = src;
      video.load();
    };
    const unloadVideo = (video) => {
      if (!video || !video.src) return;
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
    const playVideo = (video) => video.play().catch(() => {});
    const pauseVideo = (video) => video.pause();

    const isFarOutside = (entry) => {
      const bounds = entry.rootBounds;
      if (!bounds) return false;
      const top = entry.boundingClientRect.top;
      const bottom = entry.boundingClientRect.bottom;
      const height = bounds.height;
      return top > height * 1.5 || bottom < -height * 1.5;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const mobile = isMobileRef.current;
        if (!mobile) {
          const anyVisible = entries.some((entry) => entry.isIntersecting);
          if (anyVisible) {
            videos.forEach((video) => {
              loadVideo(video);
              playVideo(video);
            });
          }
          return;
        }

        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            if (!mobileVideoRef.current) {
              loadVideo(video);
              mobileVideoRef.current = video;
            } else if (mobileVideoRef.current !== video) {
              const currentRect = mobileVideoRef.current.getBoundingClientRect();
              if (currentRect.bottom < 0 || currentRect.top > window.innerHeight) {
                unloadVideo(mobileVideoRef.current);
                loadVideo(video);
                mobileVideoRef.current = video;
              }
            }
            playVideo(video);
          } else {
            pauseVideo(video);
            if (isFarOutside(entry)) {
              if (mobileVideoRef.current === video) {
                mobileVideoRef.current = null;
              }
              unloadVideo(video);
            }
          }
        });
      },
      { rootMargin: '220px 0px 220px 0px', threshold: [0, 0.01, 0.25] }
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      cleanupMediaQuery();
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
