document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Scroll Reveal Animation
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 1a. Events & Achievements — graceful image placeholders
  // Until real photos are dropped into assets/events/, show a tasteful
  // "Add photo" placeholder tile instead of a broken-image icon.
  // ==========================================
  document.querySelectorAll('.events-tile img').forEach(img => {
    img.addEventListener('error', () => {
      const tile = img.closest('.events-tile');
      if (tile) tile.classList.add('img-pending');
    }, { once: true });
  });

  // ==========================================
  // 1b. Hero Video Wall — resilience + loading illustration
  // Every card has a real src straight in the HTML (nothing depends on JS
  // to appear), so this block layers on top of that:
  //  - the two priority clips per column load fully (preload=auto); the
  //    other 12 start on preload=metadata to ease bandwidth pressure on
  //    mobile, then get bumped to full preload once idle time allows
  //  - each card shows an animated "loading" illustration (see .video-loader
  //    in style.css) until its clip fires loadeddata/playing
  //  - if a clip 404s / errors out, swap in another clip's src that's
  //    already known to be playing, so no card is ever left blank
  //  - nudge .play() on load in case autoplay didn't kick in immediately
  //    (e.g. the tab was backgrounded on arrival from the ad)
  // ==========================================
  const heroVideos = document.querySelectorAll('.video-wall .video-el');

  const getWorkingHeroSrc = (excludeVideo) => {
    for (const v of heroVideos) {
      if (v === excludeVideo) continue;
      const src = v.currentSrc || (v.querySelector('source') || {}).src;
      if (src && v.readyState >= 2) return src; // HAVE_CURRENT_DATA or better
    }
    return null;
  };

  heroVideos.forEach(video => {
    video.addEventListener('error', () => {
      const fallbackSrc = getWorkingHeroSrc(video);
      const source = video.querySelector('source');
      if (fallbackSrc && source && source.src !== fallbackSrc) {
        source.src = fallbackSrc;
        video.load();
        video.play().catch(() => {});
      }
    }, true); // capture — media error events don't bubble

    video.addEventListener('canplay', () => {
      if (video.paused) video.play().catch(() => {});
    });

    // Reveal the actual clip and dismiss the loading illustration as soon
    // as there's real playable data — 'playing' also covers the fallback
    // swap above, so a card never gets stuck showing the loader forever.
    const markReady = () => {
      const card = video.closest('.video-card');
      if (card) card.classList.add('is-ready');
    };
    video.addEventListener('loadeddata', markReady);
    video.addEventListener('playing', markReady);
  });

  // Safety nudge: the lower-priority clips start on preload="metadata" to
  // ease initial bandwidth pressure (helps mobile). If one is still stuck
  // a few seconds in (slow connection, video paused because the tab was
  // backgrounded, etc.) bump it to full preload so it isn't left waiting
  // behind higher-priority clips indefinitely.
  setTimeout(() => {
    heroVideos.forEach(video => {
      if (video.readyState < 2 && video.preload !== 'auto') {
        video.preload = 'auto';
        video.load();
        video.play().catch(() => {});
      }
    });
  }, 3500);

  // ==========================================
  // 2. Sticky CTA Bar Visibility
  // ==========================================
  const stickyCta = document.getElementById('sticky-cta');
  const heroSection = document.getElementById('hero');
  
  window.addEventListener('scroll', () => {
    if (!stickyCta || !heroSection) return;
    const heroHeight = heroSection.offsetHeight;
    if (window.scrollY > heroHeight - 100) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  });

  // ==========================================
  // 3. FAQ Accordion Interaction
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ==========================================
  // 4. Custom Radio / Checkbox Tiles styling helpers
  // ==========================================
  const radioLabels = document.querySelectorAll('.radio-tile-label');
  const checkboxLabels = document.querySelectorAll('.checkbox-tile-label');

  const syncTileStates = () => {
    radioLabels.forEach(label => {
      const input = label.querySelector('input[type="radio"]');
      if (input && input.checked) {
        label.classList.add('checked');
      } else {
        label.classList.remove('checked');
      }
    });

    checkboxLabels.forEach(label => {
      const input = label.querySelector('input[type="checkbox"]');
      if (input && input.checked) {
        label.classList.add('checked');
      } else {
        label.classList.remove('checked');
      }
    });
  };

  radioLabels.forEach(label => {
    const input = label.querySelector('input[type="radio"]');
    label.addEventListener('click', () => {
      if (input) {
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        syncTileStates();
      }
    });
  });

  checkboxLabels.forEach(label => {
    const input = label.querySelector('input[type="checkbox"]');
    label.addEventListener('click', (e) => {
      if (e.target !== input) {
        if (input) {
          input.checked = !input.checked;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          syncTileStates();
        }
      }
    });
    if (input) {
      input.addEventListener('change', syncTileStates);
    }
  });

  syncTileStates();

  // ==========================================
  // Mobile Nav Toggle (Breadcrumb menu)
  // ==========================================
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  
  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
  }

  // ==========================================
  // 5. Lead Generation Form Submission (Formspree)
  // ==========================================
  const form = document.getElementById('growth-application-form');
  const successModal = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      // Loading state on the submit button
      if (submitBtn) {
        submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting…';
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          console.log('Lead submitted to Formspree successfully.');

    if (typeof gtag === "function") {
    gtag("event", "conversion", {
      send_to: "AW-18311707106/Csr8CK2IzNUcEOLz2ZtE",
      value: 1.0,
      currency: "INR"
     });

     console.log("Google Ads conversion tracked.");
  }
          
          form.reset();
          
          if (successModal) {
            successModal.classList.add('open');
          }
        } else {
          const result = await response.json().catch(() => null);
          const message = (result && Array.isArray(result.errors) && result.errors.length)
            ? result.errors.map(err => err.message).join(', ')
            : 'Something went wrong submitting your application. Please try again or contact us directly.';
          alert(message);
        }
      } catch (err) {
        console.error('Formspree submission failed:', err);
        alert('Network error — please check your connection and try again.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.dataset.originalText;
        }
      }
    });
  }

  // Close Success Modal Handler
  if (modalCloseBtn && successModal && form) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('open');
      form.reset();
      syncTileStates();
    });
  }

  // ==========================================
  // 6. Mobile Dot-Indicator Carousels (Events & Achievements + Client Stories)
  // Both sections become horizontal snap-scrollers on mobile (<=768px).
  // This wires up matching dot indicators: dots reflect whichever card is
  // currently centered/in-focus, and tapping a dot scrolls to that card.
  // For Client Stories specifically, only the card in focus keeps its video
  // playing — every other card's video is paused — so we're never running
  // several videos at once on a mobile connection, and it feels like a
  // Reels-style "one clip in focus" carousel.
  // ==========================================
  function setupDotCarousel({ trackSelector, dotsSelector, itemSelector, mediaQuery, onActivate, onDeactivate }) {
    const track = document.querySelector(trackSelector);
    const dotsWrap = document.querySelector(dotsSelector);
    if (!track || !dotsWrap) return;

    let items = [];
    let dots = [];
    let observer = null;

    const setActiveDot = (index) => {
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    };

    const buildDots = () => {
      dotsWrap.innerHTML = '';
      dots = [];
      items = Array.from(track.querySelectorAll(itemSelector));
      items.forEach((item, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
      setActiveDot(0);
    };

    const startObserving = () => {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const idx = items.indexOf(entry.target);
          if (idx === -1) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveDot(idx);
            if (onActivate) onActivate(entry.target);
          } else if (onDeactivate) {
            onDeactivate(entry.target);
          }
        });
      }, { root: track, threshold: [0, 0.6, 1] });
      items.forEach(item => observer.observe(item));
    };

    const enable = () => {
      buildDots();
      startObserving();
    };

    const disable = () => {
      if (observer) observer.disconnect();
      observer = null;
      dotsWrap.innerHTML = '';
      // Leaving mobile mode — hand every card back to its default state
      // (Client Stories videos resume normal desktop autoplay-all).
      if (onDeactivate) {
        Array.from(track.querySelectorAll(itemSelector)).forEach(item => onActivate ? onActivate(item) : null);
      }
    };

    const mqList = window.matchMedia(mediaQuery);
    const handleChange = (e) => (e.matches ? enable() : disable());
    mqList.addEventListener('change', handleChange);
    handleChange(mqList);
  }

  // Events & Achievements — dots only, no play/pause behavior needed
  setupDotCarousel({
    trackSelector: '.events-grid',
    dotsSelector: '#events-dots',
    itemSelector: '.events-tile',
    mediaQuery: '(max-width: 768px)'
  });

  // Client Stories — dots + "only the focused card plays" behavior
  setupDotCarousel({
    trackSelector: '.video-testimonials-grid',
    dotsSelector: '#testimonials-dots',
    itemSelector: '.video-testimonial-card',
    mediaQuery: '(max-width: 768px)',
    onActivate: (card) => {
      const video = card.querySelector('video');
      if (video) video.play().catch(() => {});
    },
    onDeactivate: (card) => {
      const video = card.querySelector('video');
      if (video) video.pause();
    }
  });

}); 
