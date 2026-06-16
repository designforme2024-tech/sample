import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WhoWeAre.module.css';

import v1 from '../../assets/videos/vid-6.mp4';

// const v1 =
// 'https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/vid-6.mp4';

export default function WhoWeAre() {
  const navigate  = useNavigate();
  const rightRef  = useRef(null);

  useEffect(() => {
    const els = rightRef.current?.querySelectorAll('[data-reveal]');
    if (!els?.length) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.revealed);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section}>

      {/* LEFT — tall portrait video card */}
      <div className={styles.left}>
        <div className={styles.videoCard}>
          <video
            src={v1}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={styles.video}
          />
          <div className={styles.sheen} />
        </div>
      </div>

      {/* RIGHT — text */}
      <div className={styles.right} ref={rightRef}>

        <p className={styles.eyebrow} data-reveal>
          <span className={styles.eyeDot} />
          {/* Why Visionary Brands Choose Us? */}
          AI-POWERED CREATIVITY
        </p>

        <h2 className={styles.heading} data-reveal>
          An AI-First Agency<br />
          <span className={styles.accent}>Built for Growth</span>
        </h2>

        <p className={styles.body} data-reveal>
          AssignInc is a Jaipur-based AI-powered creative and growth agency helping businesses scale through content, marketing, automation, and technology. From AI-generated ad shoots and brand storytelling to website development and performance marketing, we create solutions designed for measurable business growth.
        </p>

        <p className={styles.body} data-reveal>
          Our team combines creativity with cutting-edge AI to deliver faster production, smarter campaigns, and better outcomes. Whether you're building brand awareness, generating leads, or streamlining operations, we act as an extension of your team—focused on growth at every stage of the journey.
        </p>

        <button
          className={styles.ctaBtn}
          data-reveal
          onClick={() => navigate('/contact')}
        >
          Let's Build Together →
        </button>

      </div>
    </section>
  );
}