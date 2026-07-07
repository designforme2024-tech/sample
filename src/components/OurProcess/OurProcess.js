import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './OurProcess.module.css';

// Switch between 'Our Process' and 'Our Approach' here.
const HEADING_TEXT = 'Our Approach';

const PROCESS_STEPS = [
  {
    number: '01',
    progress: 25,
    title: 'Discover',
    description:
      'We start inside your business, not a template. A structured audit of your market, funnel, and past marketing surfaces exactly what\u2019s holding growth back \u2014 and what\u2019s already working in your favor.',
    deliverables: ['Business & Market Audit', 'Competitor Benchmarking', 'Goal Alignment Workshop'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
        <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    progress: 50,
    title: 'Strategize',
    description:
      'Findings become a plan. We map the channels, offers, and creative direction that fit your budget and timeline, then sequence the work so every deliverable reinforces the next.',
    deliverables: ['Growth Roadmap', 'Channel & Budget Plan', 'Content & Messaging Framework'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14.6 9.4L12.9 12.9L9.4 14.6L11.1 11.1L14.6 9.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    progress: 75,
    title: 'Execute',
    description:
      'Design, development, content, and paid media move in lockstep. Nothing launches in isolation \u2014 every asset is built to reinforce the same customer journey, on schedule.',
    deliverables: ['Design & Development', 'Coordinated Campaign Launch', 'Real-Time Performance Tracking'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13 2L4 14H11L9 22L20 9H13L13 2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: '04',
    progress: 100,
    title: 'Optimize',
    description:
      'Growth is a habit, not a one-time launch. We report weekly, test what\u2019s uncertain, and reinvest in what\u2019s converting so results keep compounding after launch.',
    deliverables: ['Weekly Performance Reporting', 'Ongoing A/B Testing', 'Scaling What Wins'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 17L9 11L13 15L21 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 5H21V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function OurProcess() {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, margin: '-120px' });
  const shouldReduceMotion = useReducedMotion();

  const headerInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(6px)' };
  const headerAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <section ref={sectionRef} className={styles.section} id="our-process" aria-labelledby="process-heading">
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={headerInitial}
          animate={isVisible ? headerAnimate : headerInitial}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 id="process-heading" className={styles.title}>
            {HEADING_TEXT}
          </h2>
        </motion.div>

        <ol className={styles.timelineWrap} aria-label="Our four-stage process">
          {PROCESS_STEPS.map((step, index) => {
            const baseDelay = index * 0.14;
            const nodeInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 };
            const nodeAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 };
            const connectorInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.2 };
            const connectorAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 };
            const cardInitial = shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 26, filter: 'blur(8px)' };
            const cardAnimate = shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: 'blur(0px)' };

            return (
              <motion.li key={step.number} className={styles.stepUnit}>
                <div className={styles.markerCol}>
                  <motion.div
                    className={styles.node}
                    initial={nodeInitial}
                    animate={isVisible ? nodeAnimate : nodeInitial}
                    transition={{ duration: 0.5, delay: baseDelay, ease: 'easeOut' }}
                  >
                    {step.icon}
                  </motion.div>
                  <motion.div
                    className={styles.connector}
                    initial={connectorInitial}
                    animate={isVisible ? connectorAnimate : connectorInitial}
                    transition={{ duration: 0.5, delay: baseDelay + 0.12, ease: 'easeOut' }}
                  />
                </div>

                <motion.article
                  className={styles.card}
                  initial={cardInitial}
                  animate={isVisible ? cardAnimate : cardInitial}
                  transition={{ duration: 0.6, delay: baseDelay + 0.22, ease: 'easeOut' }}
                  whileHover={shouldReduceMotion ? {} : { y: -8 }}
                  transition2={undefined}
                >
                  <span className={styles.watermark} aria-hidden="true">
                    {step.number}
                  </span>

                  <span className={styles.stepTag}>Step {step.number}</span>
                  <h3 className={styles.cardTitle}>{step.title}</h3>

                  <div className={styles.progressTrack}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ width: '0%' }}
                      animate={isVisible ? { width: `${step.progress}%` } : { width: '0%' }}
                      transition={{ duration: 0.7, delay: baseDelay + 0.35, ease: 'easeOut' }}
                    />
                  </div>

                  <p className={styles.cardText}>{step.description}</p>

                  <ul className={styles.deliverables}>
                    {step.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default OurProcess;