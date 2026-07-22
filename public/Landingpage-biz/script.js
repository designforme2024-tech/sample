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
  // Interactive Hero Card Stack Focus (.fan-card)
  // ==========================================
  const cards = document.querySelectorAll('.fan-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = card.classList.contains('active-stack');
      cards.forEach(c => c.classList.remove('active-stack'));
      if (!isActive) {
        card.classList.add('active-stack');
      }
    });
  });

  document.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active-stack'));
  });

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

});
