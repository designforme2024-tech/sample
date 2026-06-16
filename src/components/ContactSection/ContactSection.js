import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiArrowRight, FiExternalLink } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import styles from './ContactSection.module.css';

const INFO_ITEMS = [
  {
    icon: <FiMail />,
    label: 'Email Us',
    value: 'agneha2023@gmail.com',
    href: 'mailto:agneha2023@gmail.com',
  },
  {
    icon: <FiPhone />,
    label: 'Call Now',
    value: '+91 63785 49221',
    href: 'tel:+916378549221',
  },
  {
    icon: <SiWhatsapp />,
    label: 'WhatsApp',
    value: '+91 6378549221',
    href: 'https://wa.me/916378549221',
  },
  {
    icon: <FiMapPin />,
    label: 'Visit Us',
    value: 'Raw Coworking, Opposite Sunny Trade Centre, New Aatish Market, Jaipur 302020',
    // href: 'https://www.google.com/maps/place/RAW+Coworking+and+Office+Space+%7C+Mansarovar+Jaipur/@26.8773226,75.7612229,17z',
    href:'https://maps.app.goo.gl/nRPSqDBoYryxVvWV6',
  },
];

// /* Exact embed src from the provided iframe */
const MAP_EMBED =
  // 'https://maps.app.goo.gl/nRPSqDBoYryxVvWV6';
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.8243058104963!2d75.76122289999999!3d26.8773226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db57b0a54f42d%3A0x5adc6d3b71be374e!2sRAW%20Coworking%20and%20Office%20Space%20%7C%20Mansarovar%20Jaipur!5e0!3m2!1sen!2sin!4v1780904064187!5m2!1sen!2sin';

/* Direct Google Maps link for the same place */
const MAP_LINK =
  'https://maps.app.goo.gl/nRPSqDBoYryxVvWV6';


export default function ContactSection() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: '-60px' });
  const navigate = useNavigate();

  return (
    <section ref={ref} className={styles.section} id="contact-home">
      <div className="container">
        <div className={styles.grid}>

          {/* ═══════════════════
              LEFT CARD
          ═══════════════════ */}
          <motion.div
            className={styles.leftCard}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            {/* Top text block */}
            <div className={styles.leftTop}>
              <p className={styles.eyebrow}>Send Us A Message</p>
              <h2 className={styles.heading}>
                Let's Build<br />Something Great
              </h2>
              <p className={styles.sub}>
                We're here to help bring your ideas to life. Share your
                vision and let's discuss how we can make it happen.
              </p>
            </div>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Contact rows */}
            <ul className={styles.contactList}>
              {INFO_ITEMS.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.09, duration: 0.5 }}
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={styles.contactRow}
                  >
                    <span className={styles.contactIconWrap}>
                      {item.icon}
                    </span>
                    <span className={styles.contactBody}>
                      <span className={styles.contactLabel}>{item.label}</span>
                      <span className={styles.contactValue}>{item.value}</span>
                    </span>
                    <span className={styles.contactArrow}>›</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* ── Embedded Google Map ── */}
            <motion.div
              className={styles.mapWrap}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <div className={styles.mapHeader}>
                <FiMapPin className={styles.mapHeaderIcon} />
                <span>Our Location — Jaipur</span>
              </div>

              <div
                  className={styles.mapFrame}
                  onClick={() => window.open(MAP_LINK, '_blank')}
                  style={{ cursor: 'pointer' }}
                >
                  <iframe
                    title="RAW Coworking — Mansarovar Jaipur"
                    src={MAP_EMBED}
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      pointerEvents: 'none',
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <FiExternalLink size={13} />
                Open in Google Maps
              </a>
            </motion.div>
          </motion.div>

          {/* ═══════════════════
              RIGHT OUTER CARD
          ═══════════════════ */}
          <motion.div
            className={styles.rightOuter}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
          >
            {/* Nested white inner card */}
            <div className={styles.innerCard}>
              <div className={styles.innerCardIcon}>
                <FiMail />
              </div>
              <h3 className={styles.innerCardTitle}>Start Your Project</h3>
              <p className={styles.innerCardSub}>
                    Click below to open the contact form directly.
              </p>

              <button
                className={styles.ctaBtn}
                onClick={() => navigate('/contact')}
              >
                Open Contact Form
                <FiArrowRight className={styles.ctaBtnArrow} />
              </button>

              <div className={styles.badges}>
                <span className={styles.badge}>⚡ 24-hr Response</span>
                <span className={styles.badge}>💬 Free Consultation</span>
                <span className={styles.badge}>🔒 Data Safe</span>
                <span className={styles.badge}>🏛 Govt. Incubated</span>
              </div>
            </div>

            {/* Decorative watermark */}
            {/* <span className={styles.watermark} aria-hidden="true">A</span> */}
          </motion.div>

        </div>
      </div>
    </section>
  );
}