import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Events.module.css';

import img1 from '../../assets/events/img-1.png';
import img2 from '../../assets/events/img-2.png';
import img3 from '../../assets/events/img-3.png';
import img4 from '../../assets/events/img-4.png';
import img5 from '../../assets/events/img-5.jpeg';
import img6 from '../../assets/events/img-6.png';
import img7 from '../../assets/events/img-7.png';
import img8 from '../../assets/events/img-8.jpeg';
import img9 from '../../assets/events/img-9.jpeg';
import img10 from '../../assets/events/img-10.jpeg';
import img11 from '../../assets/events/img-11.jpeg';
import img12 from '../../assets/events/img-12.jpeg';
import img13 from '../../assets/events/img-13.jpeg';
import img14 from '../../assets/events/img-14.jpeg';
import img15 from '../../assets/events/img-15.jpeg';
// import img16 from '../../assets/events/img-16.jpeg';
import img17 from '../../assets/events/img-17.jpeg';

const images = [
  img1, img2, img3, img4, img5, img6, img7,
  img8, img9, img10, img11, img12, img13, img14,
  img15, img17,
];

const slideVariants = [
  { x: -100 },
  { x: 100 },
  { y: 100 },
  { y: -100 },
];

export default function Events() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div ref={sectionRef} className={styles.section}>
      <div className="bg-glow-right" style={{ top: '30%', right: '-10%' }} />

      <div className={styles.inner}>

        {/* ── Heading Bar ─────────────────────────────────────── */}
        <motion.div
          className={styles.headingBar}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.headingBarLine} />
          <h2 className={styles.headingBarText}>Events</h2>
          <div className={styles.headingBarLine} />
        </motion.div>

        {/* ── Gallery Grid ────────────────────────────────────── */}
        <div className={styles.galleryGrid}>
          {images.map((img, index) => (
            <motion.div
              key={index}
              className={styles.galleryItem}
              initial={{ ...slideVariants[index % slideVariants.length], opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
            >
              <img
                src={img}
                alt={`Event ${index + 1}`}
                className={styles.galleryImage}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}