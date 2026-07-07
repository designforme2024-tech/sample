import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import './VideoTestimonial.css';
import T1 from '../../assets/Testimonials/T1.mp4';

// ─────────────────────────────────────────────────────────────────
//  TESTIMONIALS DATA ARRAY
//  Only testimonials[0] is rendered.
//  Add future entries below the comment — they won't appear until
//  the render logic is updated to show them.
// ─────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    videoSrc: T1,
    posterSrc: null,
    quoteDisplay: 'Event Management,\nNoida, Jaipur.',
    services: [
      {
        icon: 'video',
        title: 'Video Editing',
        desc: 'Professional editing that transforms raw footage into engaging brand content.',
      },
      {
        icon: 'event',
        title: 'Event Management',
        desc: 'Complete content coverage and execution support for events and activations.',
      },
      {
        icon: 'social',
        title: 'Social Media Marketing',
        desc: 'Content designed to increase reach, engagement, and brand visibility.',
      },
      {
        icon: 'strategy',
        title: 'Content Strategy',
        desc: 'Planning and structuring content that supports long-term business growth.',
      },
    ],
  },

  // ── ADD FUTURE TESTIMONIALS BELOW THIS LINE ──
  // {
  //   id: 2,
  //   videoSrc: T2,
  //   posterSrc: null,
  //   quoteDisplay: 'Client Name,\nCity.',
  //   services: [...],
  // },
  // ── END FUTURE TESTIMONIALS ──
];

const active = testimonials[0];

// ── Service icon SVGs ──────────────────────────────────────────────
const ServiceIcon = ({ type }) => {
  switch (type) {
    case 'video':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="2" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M17 9l5-3v12l-5-3V9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      );
    case 'event':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M22 4s-2.5 1.5-4 2c-.9-1-2.2-1.5-3.5-1.5C12 4.5 10 6.5 10 9v1C7 10 4 8.5 2 6c0 0-1 3 2 5-1 0-2-.5-2-.5 0 2.5 1.5 4.5 4 5-.5.5-1.5.5-2 .5.5 2 2 3.5 4 3.5C6.5 21 4 22 2 22c2 1.5 4.5 2 7 2 8 0 13-7 13-13v-.5C23 9.5 22.5 9 22 8.5c.5-.5 1-1.5 0-4.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      );
    case 'strategy':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M7 16l4-5 4 3 4-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

function VideoTestimonial() {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [headerVis,   setHeaderVis]   = useState(false);
  const [videoVis,    setVideoVis]    = useState(false);
  const [cardVis,     setCardVis]     = useState(false);
  const [isMuted,     setIsMuted]     = useState(true);
  const [showPill,    setShowPill]    = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 860px)');
    const updateIsMobile = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateIsMobile);
    } else {
      mediaQuery.addListener(updateIsMobile);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateIsMobile);
      } else {
        mediaQuery.removeListener(updateIsMobile);
      }
    };
  }, []);

  // ── Intersection Observer ──────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVis(true);
          if (isMobile) {
            setVideoVis(true);
            setCardVis(true);
          } else {
            setTimeout(() => setVideoVis(true), 150);
            setTimeout(() => setCardVis(true),  300);
          }

          if (!videoLoaded && active.videoSrc) {
            video.src = active.videoSrc;
            setVideoLoaded(true);
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [videoLoaded, isMobile]);

  // ── Unmute toggle ──────────────────────────────────────────────
  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  return (
    <section
      className="vt-section"
      ref={sectionRef}
      aria-label="Client Testimonials"
    >
      {/* ══ HEADER — solid navy bar ══ */}
      <div className={`vt-hero${headerVis ? ' vt-hero--visible' : ''}`}>
        <h2 className="vt-hero__heading">Client Testimonials</h2>
      </div>

      {/* ══ TWO-COLUMN BODY ══ */}
      {/* align-items:stretch makes both columns fill the same height */}
      <div className="vt-body">

        {/* ── LEFT — Video ── */}
        <div
          className={`vt-video-col${videoVis ? ' vt-video-col--visible' : ''}`}
          onMouseEnter={() => setShowPill(true)}
          onMouseLeave={() => setShowPill(false)}
        >
          {!videoLoaded && (
            <div className="vt-poster" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" stroke="rgba(139,163,197,0.5)" strokeWidth="2"/>
                <path d="M20 17L33 24L20 31V17Z" fill="rgba(139,163,197,0.6)"/>
              </svg>
            </div>
          )}

          <video
            ref={videoRef}
            className="vt-video"
            preload="none"
            autoPlay
            muted
            loop
            playsInline
            {...(active.posterSrc ? { poster: active.posterSrc } : {})}
            aria-label="Client testimonial video"
          />

          <button
            className={`vt-unmute-pill${showPill ? ' vt-unmute-pill--show' : ''}`}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            type="button"
          >
            {isMuted ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                  <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Tap to Unmute
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Mute
              </>
            )}
          </button>
        </div>

        {/* ── RIGHT — Content card ── */}
        <div className={`vt-card${cardVis ? ' vt-card--visible' : ''}`}>

          {/*
            Card is split into two flex regions:
            1. vt-card__quote-region  — grows to fill available space, centers the quote
            2. vt-card__bottom        — services block, fixed at bottom
          */}

          {/* ── QUOTE REGION (flex-grow) ── */}
          <div className="vt-card__quote-region">
            {/* Decorative opening curly quote — top-left */}
            <span className="vt-card__open-quote" aria-hidden="true">&#8220;</span>

            {/* Centered quote text */}
            <div className="vt-card__quote-body">
              {active.quoteDisplay.split('\n').map((line, i) => (
                <span key={i} className="vt-card__quote-line">{line}</span>
              ))}
            </div>

            {/* Decorative closing curly quote — bottom-right */}
            <span className="vt-card__close-quote" aria-hidden="true">&#8221;</span>
          </div>

          {/* ── BOTTOM: divider + services ── */}
          <div className="vt-card__bottom">
            <div className="vt-card__divider" aria-hidden="true" />

            <p className="vt-card__services-label">SERVICES</p>

            <ul className="vt-card__services" aria-label="Services provided">
              {active.services.map((svc, i) => (
                <li
                  key={svc.title}
                  className="vt-svc"
                  style={{ '--delay': `${i * 80}ms` }}
                >
                  <div className="vt-svc__icon" aria-hidden="true">
                    <ServiceIcon type={svc.icon} />
                  </div>
                  <div className="vt-svc__text">
                    <span className="vt-svc__title">{svc.title}</span>
                    <span className="vt-svc__desc">{svc.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(VideoTestimonial);