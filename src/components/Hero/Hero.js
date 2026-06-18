import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

// import v1 from '../../assets/videos/vid-1.mp4';
// import v3 from '../../assets/videos/vid-3.mp4';
// import v4 from '../../assets/videos/vid-4.mp4';

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

export default function Hero() {
  const navigate = useNavigate();
  const wordRef  = useRef(null);
  const idxRef   = useRef(0);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    const cycle = () => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(-12px)';
      setTimeout(() => {
        idxRef.current     = (idxRef.current + 1) % CYCLE_WORDS.length;
        el.textContent     = CYCLE_WORDS[idxRef.current];
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }, 380);
    };
    const t = setInterval(cycle, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <section className={styles.hero}>

        {/* ── LEFT ── */}
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
            {/* Trusted by 1000+ brands across India, UAE, Australia and the US. */}
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

        {/* ── RIGHT — 3 portrait columns ── */}
        <div className={styles.right}>
          <div className={styles.fadeTop} />
          <div className={styles.fadeBottom} />

          {COLS.map((col, ci) => (
            <div
              key={ci}
              className={`${styles.col} ${col.dir === 'up' ? styles.colUp : styles.colDown}`}
            >
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={styles.tile}>
                  <video
                    src={col.vid}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={styles.tileVid}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

      </section>

      {/* ── TICKER — sits between Hero and WhoWeAre ── */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {/* Duplicated twice for seamless loop */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
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