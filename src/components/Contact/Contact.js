import React, { useState, useEffect, useCallback, memo } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiPhone, FiMail, FiSend, FiBriefcase,
} from 'react-icons/fi';
import styles from './Contact.module.css';

// ─── EmailJS config ─── plug in your 3 values here ───
const EMAILJS_PUBLIC_KEY  = 'WPNc7yPJTK7kDdBn7';
const EMAILJS_SERVICE_ID  = 'service_je5wlym';
const EMAILJS_TEMPLATE_ID = 'template_x325ekz';
// ──────────────────────────────────────────────────────

const STEP_META = [
  { num: '1 / 3', tag: "LET'S START" },
  { num: '2 / 3', tag: 'SO WE CAN REACH YOU' },
  { num: '3 / 3', tag: 'ALMOST DONE' },
];

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

function Contact() {
  const [step, setStep]           = useState(0);
  const [dir,  setDir]            = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [errors, setErrors]       = useState({});

  const [form, setForm] = useState({
    name: '', business: '', phone: '', email: '',
  });

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const validateStep = useCallback(() => {
    const newErrors = {};
    if (step === 0) {
      if (!form.name.trim())     newErrors.name     = 'Please fill out your name.';
      if (!form.business.trim()) newErrors.business = 'Please fill out your business name.';
    }
    if (step === 1) {
      if (!form.phone.trim() && !form.email.trim()) {
        newErrors.phone = 'Please provide at least a phone number or email.';
        newErrors.email = ' ';
      }
    }
    return newErrors;
  }, [step, form]);

  const next = useCallback(() => {
    const newErrors = validateStep();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    if (step === 2) { handleSubmit(); return; }
    setDir(1);
    setStep(s => s + 1);
  }, [step, validateStep]);

  const back = () => { setErrors({}); setDir(-1); setStep(s => s - 1); };

  const handleSubmit = async () => {
    setSending(true);
    try {
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email:   'agneha2023@gmail.com',
        from_name:  form.name,
        business:   form.business,
        phone:      form.phone || '—',
        reply_to:   form.email || '—',
      });
    } catch (err) {
      console.error('EmailJS error:', err);
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Enter') next(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next]);

  if (submitted) {
    return (
      <LazyMotion features={domAnimation}>
        <div className={styles.page} id="contact">
          <div className={styles.logoArea}>
            <p className={styles.subtitle}>Contact Form</p>
          </div>

          <m.div
            className={styles.card}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className={styles.successWrap}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.successTitle}>Message sent!</h2>
              <p className={styles.successSub}>Our team will get back to you within 24 hours.</p>
            </div>
          </m.div>

          <CallStrip />
        </div>
      </LazyMotion>
    );
  }

  const meta = STEP_META[step];

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.page} id="contact">
        <div className={styles.logoArea}>
          <p className={styles.subtitle}>Contact Us</p>
        </div>

        <div className={styles.progressBar}>
          <m.div
            className={styles.progressFill}
            animate={{ width: `${((step + 1) / 3) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className={styles.cardOuter}>
          <AnimatePresence mode="wait" custom={dir}>
            <m.div
              key={step}
              className={styles.card}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.stepMeta}>
                <span className={styles.stepNum}>{meta.num}</span>
                <span className={styles.stepDot}>·</span>
                <span className={styles.stepTag}>{meta.tag}</span>
              </div>

              {step === 0 && (
                <>
                  <h2 className={styles.heading}>Tell us about you</h2>
                  <div className={styles.fields}>
                    <Field
                      label="Your Name" required icon={<FiUser />}
                      value={form.name} onChange={e => set('name', e.target.value)}
                      placeholder="e.g. Rahul Sharma" error={errors.name}
                    />
                    <Field
                      label="Business Name" required icon={<FiBriefcase />}
                      value={form.business} onChange={e => set('business', e.target.value)}
                      error={errors.business}
                    />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className={styles.heading}>How can we contact you?</h2>
                  <div className={styles.fields}>
                    <Field
                      label="Contact Number" icon={<FiPhone />}
                      value={form.phone} onChange={e => set('phone', e.target.value)}
                      placeholder="+91 98XXX XXXXX" type="tel" error={errors.phone}
                    />
                    <Field
                      label="Email ID" icon={<FiMail />}
                      value={form.email} onChange={e => set('email', e.target.value)}
                      placeholder="you@company.com" type="email" error={errors.email}
                    />
                    {!errors.phone && !errors.email && (
                      <p className={styles.atLeastOne}>Please fill in at least one of the above.</p>
                    )}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className={styles.heading}>Ready to send?</h2>
                  <div className={styles.summaryList}>
                    <SummaryRow icon={<FiUser />}      label="Name"     value={form.name} />
                    <SummaryRow icon={<FiBriefcase />} label="Business" value={form.business} />
                    <SummaryRow icon={<FiPhone />}     label="Phone"    value={form.phone || '—'} />
                    <SummaryRow icon={<FiMail />}      label="Email"    value={form.email || '—'} />
                  </div>
                </>
              )}

              <div className={`${styles.nav} ${step === 0 ? styles.navRight : ''}`}>
                {step > 0 && (
                  <button type="button" className={styles.backBtn} onClick={back}>
                    ← Back
                  </button>
                )}
                <div className={styles.nextArea}>
                  {step === 2 ? (
                    <button
                      type="button"
                      className={styles.submitBtn}
                      onClick={next}
                      disabled={sending}
                    >
                      {sending ? 'Sending…' : <><FiSend /> Submit</>}
                    </button>
                  ) : (
                    <>
                      <button type="button" className={styles.nextBtn} onClick={next}>
                        Next →
                      </button>
                      <span className={styles.enterHint}>
                        Press <kbd>Enter ↵</kbd> to continue
                      </span>
                    </>
                  )}
                </div>
              </div>

            </m.div>
          </AnimatePresence>
        </div>

        <CallStrip />
      </div>
    </LazyMotion>
  );
}

export default memo(Contact);

function CallStrip() {
  return (
    <div className={styles.callStrip}>
      <p className={styles.callLabel}>
        <span className={styles.callDot} />
        For more information, call us
      </p>
      <div className={styles.callNumbers}>
        {[
          { label: 'General Enquiries', number: '+91 70610 33205', href: 'tel:+917061033205' },
          { label: 'Support',           number: '+91 93520 95739', href: 'tel:+919352095739' },
          { label: 'Growth & Strategy', number: '+91 74289 52055', href: 'tel:+917428952055' },
        ].map(({ label, number, href }) => (
          <a key={href} href={href} className={styles.callChip}>
            <span className={styles.callIcon}>
              <FiPhone />
            </span>
            <span className={styles.callInfo}>
              <span className={styles.callChipLabel}>{label}</span>
              <span className={styles.callNumber}>{number}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function Field({ label, required, icon, value, onChange, placeholder, type = 'text', error }) {
  return (
    <div className={styles.fieldWrap}>
      <label className={styles.fieldLabel}>
        {label}{required && <span className={styles.req}>*</span>}
      </label>
      <div className={`${styles.inputWrap} ${error ? styles.inputError : ''}`}>
        <span className={styles.inputIcon}>{icon}</span>
        <input
          type={type} className={styles.input}
          value={value} onChange={onChange} placeholder={placeholder}
        />
      </div>
      {error && error.trim() && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div className={styles.summaryRow}>
      <span className={styles.summaryIcon}>{icon}</span>
      <span className={styles.summaryLabel}>{label}</span>
      <span className={styles.summaryValue}>{value}</span>
    </div>
  );
}
