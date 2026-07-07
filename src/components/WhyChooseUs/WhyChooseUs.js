import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import styles from './WhyChooseUs.module.css';

const BENEFITS = [
  {
    title: 'Strategy before spend',
    description:
      'We map the funnel, the audience, and the numbers first, so every dollar of media and every hour of creative work is pointed at a real business outcome.',
    tags: ['Positioning', 'Funnel audit', 'Growth roadmap'],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="2.4" />
        <path d="M12 4v2.4M12 17.6V20M4 12h2.4M17.6 12H20" />
      </svg>
    ),
  },
  {
    title: 'Creative that earns attention',
    description:
      'Brand systems, ad creative, and web experiences built once and adapted fluently across paid, owned, and social — premium in look, sharp in performance.',
    tags: ['Brand systems', 'Ad creative', 'Web design'],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        <circle cx="12" cy="12" r="3.4" />
      </svg>
    ),
  },
  {
    title: 'AI-sharpened execution',
    description:
      'Applied AI runs through our research, testing, and optimization, so we move faster than a traditional agency without losing a strategist\u2019s judgment.',
    tags: ['Applied AI', 'Rapid testing', 'Optimization'],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="3" />
        <path d="M9.5 9.5h5v5h-5z" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
  },
  {
    title: 'Full visibility, always',
    description:
      'One dashboard ties creative, media spend, and conversion tracking together, so you always know what\u2019s working and why \u2014 no black boxes, no guesswork.',
    tags: ['Live reporting', 'Attribution', 'Clear ROI'],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 19h16" />
        <rect x="6" y="12" width="3" height="7" rx="0.8" />
        <rect x="10.5" y="8" width="3" height="11" rx="0.8" />
        <rect x="15" y="4" width="3" height="15" rx="0.8" />
      </svg>
    ),
  },
];

function CountUp({ value, suffix = '', decimals = 0, isVisible, duration = 1.4 }) {
  const [display, setDisplay] = useState(decimals ? '0.0' : '0');

  useEffect(() => {
    if (!isVisible) return undefined;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplay(decimals ? latest.toFixed(decimals) : Math.round(latest).toString());
      },
    });
    return () => controls.stop();
  }, [isVisible, value, decimals, duration]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

const lineVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const headerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="why-choose-assigninc"
      aria-labelledby="why-choose-heading"
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={headerContainer}
        >
          <div className={styles.headerLeft}>
            <motion.div className={styles.eyebrowRow} variants={lineVariants} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span className={styles.eyebrow}>Why Choose AssignInc</span>
            </motion.div>

            <h2 id="why-choose-heading" className={styles.title}>
              <motion.span
                className={styles.titleLine}
                variants={lineVariants}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                Ideas, engineered into
              </motion.span>
              <motion.span
                className={styles.titleLine}
                variants={lineVariants}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                <span className={styles.highlight}>measurable growth</span> —
              </motion.span>
              <motion.span
                className={styles.titleLine}
                variants={lineVariants}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                built with <em className={styles.italic}>intention</em>.
              </motion.span>
            </h2>
          </div>

          <motion.div
            className={styles.headerRight}
            variants={lineVariants}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className={styles.description}>
              AssignInc pairs brand strategy with applied AI and performance media so every
              launch lands with intention — sharper positioning, faster execution, and
              results you can trace straight back to the work.
            </p>
          </motion.div>
        </motion.div>

        <div className={styles.grid}>
          {BENEFITS.map((benefit, index) => (
            <motion.article
              key={benefit.title}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              whileHover={{ y: -6, borderColor: 'rgba(27, 42, 56, 0.22)' }}
              transition={{
                opacity: { duration: 0.55, delay: 0.32 + index * 0.1, ease: 'easeOut' },
                y: { type: 'spring', stiffness: 260, damping: 26, delay: 0.32 + index * 0.1 },
              }}
              style={{ boxShadow: '0 2px 4px rgba(27, 42, 56, 0.02)' }}
            >
              <span className={styles.cardNumber} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className={styles.cardTop}>
                <motion.span
                  className={styles.iconWrap}
                  aria-hidden="true"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5,
                  }}
                >
                  {benefit.icon}
                </motion.span>
              </div>

              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardText}>{benefit.description}</p>

              <div className={styles.tagList}>
                {benefit.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;