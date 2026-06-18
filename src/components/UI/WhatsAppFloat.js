import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WhatsAppFloat.module.css';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

export default function WhatsAppFloat() {
  const [showTip, setShowTip] = useState(false);
  const phone = '916378549221'; // Replace with actual number
  const message = encodeURIComponent('Hi AssignInc! I found you online and would like to know more about your services.');

  const trackWhatsAppClick = () => {
  if (window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'Contact',
      event_label: 'Floating WhatsApp Button'
    });
  }
};

  return (
    <div className={styles.wrap}>
      <AnimatePresence>
        {showTip && (
          <motion.div
            className={styles.tip}
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            Chat on WhatsApp 👋
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
          href="tel:+916378549221"
          className={styles.callBtn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 300 }}
          aria-label="Call Now"
        >
        <FaPhoneAlt />
      </motion.a>
      <motion.a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 300 }}
        aria-label="Chat on WhatsApp"
        onClick={trackWhatsAppClick}
      >
      
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.116 1.528 5.845L.057 23.406a.75.75 0 00.925.926l5.592-1.465A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.686-.5-5.232-1.377l-.374-.219-3.877 1.016 1.034-3.77-.239-.387A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        <div className={styles.pulse} />
      </motion.a>
    </div>
  );
}
