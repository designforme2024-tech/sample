/* ==========================================
   ONE DAY SHOOT + SOCIAL MEDIA MARKETING
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initCounterAnimation();
    initFAQAccordion();
    initScrollAnimations();
    initSmoothScroll();
    initStickyHeader();
    initFormValidation();
    initShowcase();
    initPortfolioSlider();
    initOtherBusinessToggle();
    initGAClickTracking();

});

/* ==========================================
   POPUP
========================================== */

function closePopup(){
    document.getElementById('successPopup')
        .style.display = 'none';
}

/* ==========================================
   "OTHER" BUSINESS TYPE FIELD TOGGLE
========================================== */

function initOtherBusinessToggle(){

    const businessType = document.getElementById('businessType');
    const otherField = document.getElementById('otherBusiness');

    if (!businessType || !otherField) return;

    businessType.addEventListener('change', function () {

        if (businessType.value === 'Other') {
            otherField.style.display = 'block';
            otherField.required = true;
            otherField.disabled = false;
        } else {
            otherField.style.display = 'none';
            otherField.required = false;
            otherField.disabled = true;
        }

    });

}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function initCounterAnimation() {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = parseInt(counter.dataset.target);

            animateCounter(counter, target);

            observer.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));

}

function animateCounter(element, target) {

    let current = 0;
    const duration = 1800;
    const increment = target / (duration / 16);

    const updateCounter = () => {

        current += increment;

        if (current < target) {

            element.textContent = Math.floor(current);

            requestAnimationFrame(updateCounter);

        } else {

            if (target === 95) {
                element.textContent = target + "%";
            } else {
                element.textContent = target + "+";
            }

        }

    };

    updateCounter();

}

/* ==========================================
   FAQ ACCORDION
========================================== */

function initFAQAccordion() {

    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {

        question.addEventListener("click", () => {

            const currentItem = question.parentElement;
            const currentAnswer = currentItem.querySelector(".faq-answer");

            document.querySelectorAll(".faq-item").forEach(item => {

                if (item !== currentItem) {

                    const answer = item.querySelector(".faq-answer");

                    answer.style.display = "none";

                    item.classList.remove("active");

                }

            });

            const isOpen = currentItem.classList.contains("active");

            if (isOpen) {

                currentAnswer.style.display = "none";
                currentItem.classList.remove("active");

            } else {

                currentAnswer.style.display = "block";
                currentItem.classList.add("active");

            }

        });

    });

}

/* ==========================================
   SCROLL ANIMATION
========================================== */

function initScrollAnimations() {

    const elements = document.querySelectorAll(
        ".service-card, .feature-card, .stat"
    );

    elements.forEach(el => el.classList.add("fade-up"));

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(el => observer.observe(el));

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}

/* ==========================================
   STICKY HEADER EFFECT
========================================== */

function initStickyHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.boxShadow =
                "0 10px 30px rgba(47,65,86,0.10)";

        } else {

            header.style.boxShadow = "none";

        }

    }, { passive: true });

}

/* ==========================================
   FORM VALIDATION + SUBMISSION + GA4
   (Single consolidated handler per form —
   previously two separate submit listeners
   were attached to the same form: one that
   actually submitted to Web3Forms, and a
   second "validation" handler that checked
   for a non-existent email field and always
   returned early, so it never ran. Both are
   merged here into one working handler.)
========================================== */

function initFormValidation() {

    const forms = document.querySelectorAll("form");

    forms.forEach(form => {

        form.addEventListener("submit", async function (e) {

            e.preventDefault();

            const name = form.querySelector('input[name="full_name"]');
            const phone = form.querySelector('input[type="tel"]');

            if (name && name.value.trim().length < 2) {
                alert("Please enter a valid name.");
                return;
            }

            const phoneRegex = /^[0-9+\-\s]{8,15}$/;

            if (phone && !phoneRegex.test(phone.value)) {
                alert("Please enter a valid phone number.");
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : "";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Submitting...";
            }

            try {

                const formData = new FormData(form);

                const response = await fetch(
                    'https://api.web3forms.com/submit',
                    {
                        method: 'POST',
                        body: formData
                    }
                );

                const result = await response.json();

                if (result.success) {

                    const popup = document.getElementById('successPopup');
                    if (popup) popup.style.display = 'flex';

                    form.reset();

                    setTimeout(closePopup, 5000);

                    if (typeof gtag === "function") {

                        const businessTypeField = form.querySelector("select");

                        gtag("event", "generate_lead", {
                            event_category: "Lead",
                            event_label: "Landing Page Form",
                            business_type: businessTypeField ? businessTypeField.value : undefined
                        });

                        gtag("event", "form_submit", {
                            event_category: "Lead",
                            event_label: "Landing Page Form"
                        });

                    }

                } else {

                    alert("Something went wrong. Please try again, or reach us on WhatsApp.");

                }

            } catch (err) {

                alert("Something went wrong. Please check your connection and try again.");

            } finally {

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }

            }

        });

    });

}

/* ==========================================
   INDUSTRY SHOWCASE — RADIAL FLOW DIAGRAM
   (data layer extended with image + badge info
   for the right-hand preview panel only —
   left-side cards/positions are untouched)
========================================== */

const INDUSTRY_DATA = {

    healthcare: {
        icon: "🩺",
        title: "Health Care",
        index: "01",
        badge: "Health Care",
        desc: "Building digital trust for clinics and hospitals through patient-first visuals and credible storytelling.",
        services: ["Facility Photography", "Patient Trust Content", "Reels Creation", "Appointment Campaigns"],
        deliverables: [["10", "Reels"], ["20", "Photos"], ["1", "FAQ Series"]],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
    },

    realestate: {
        icon: "🏠",
        title: "Real Estate",
        index: "02",
        badge: "Real Estate",
        desc: "Walkthroughs and drone visuals that help buyers picture themselves in the space before they even visit.",
        services: ["Property Photography", "Walkthrough Reels", "Drone Shots", "Listing Pages"],
        deliverables: [["10", "Reels"], ["40", "Photos"], ["1", "Virtual Tour"]],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },

    interior: {
        icon: "🛋️",
        title: "Interior",
        index: "03",
        badge: "Interior",
        desc: "Showcasing finished spaces and design process in a way that turns inspiration into inquiries.",
        services: ["Space Photography", "Before/After Reels", "Mood Board Content", "Portfolio Pages"],
        deliverables: [["12", "Reels"], ["30", "Photos"], ["1", "Portfolio Reel"]],
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
    },

    travel: {
        icon: "✈️",
        title: "Travel",
        index: "04",
        badge: "Travel",
        desc: "Destination-led storytelling that makes your packages the obvious next trip to book.",
        services: ["Destination Photography", "Itinerary Reels", "Package Promotions", "Influencer Trips"],
        deliverables: [["15", "Reels"], ["35", "Photos"], ["1", "Travel Guide"]],
        image:"https://plus.unsplash.com/premium_photo-1679830513869-cd3648acb1db?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    it: {
        icon: "💻",
        title: "IT",
        index: "05",
        badge: "IT & Tech",
        desc: "Translating technical work into clear, credible content that builds trust with decision-makers.",
        services: ["Product Demo Reels", "Team Photography", "Case Study Content", "LinkedIn Campaigns"],
        deliverables: [["10", "Reels"], ["15", "Photos"], ["1", "Case Study"]],
        image:"https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    ecom: {
        icon: "🛒",
        title: "E-commerce",
        index: "06",
        badge: "E-commerce",
        desc: "Product-first content engineered to stop the scroll and move people straight to checkout.",
        services: ["Product Photography", "Unboxing Reels", "Ad Creatives", "Catalog Shoots"],
        deliverables: [["20", "Reels"], ["50", "Photos"], ["1", "Ad Creative Set"]],
        image:"https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RWNvbW1lcmNlfGVufDB8fDB8fHww"
    },

    fashion: {
        icon: "👗",
        title: "Fashion",
        index: "07",
        badge: "Fashion",
        desc: "Lookbooks and styled reels that give your collection the editorial feel shoppers scroll to stop for.",
        services: ["Lookbook Shoots", "Reel Styling", "Product Photography", "Influencer Coordination"],
        deliverables: [["20", "Reels"], ["35", "Photos"], ["1", "Seasonal Lookbook"]],
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
    },

    b2b: {
        icon: "🤝",
        title: "B2B",
        index: "08",
        badge: "B2B",
        desc: "Authority-building content that turns your expertise into the reason clients choose you.",
        services: ["Thought Leadership Content", "Founder Reels", "Case Study Design", "LinkedIn Strategy"],
        deliverables: [["8", "Reels"], ["12", "Assets"], ["1", "Brand Deck"]],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
    },

    jewellery: {
        icon: "💎",
        title: "Jewellery",
        index: "09",
        badge: "Jewellery",
        desc: "Macro detail and sparkle, shot to make every piece feel as premium as it is.",
        services: ["Macro Product Shoots", "Try-On Reels", "Festive Campaigns", "Catalog Photography"],
        deliverables: [["15", "Reels"], ["40", "Photos"], ["1", "Festive Campaign"]],
        image:"https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    fmcg: {
        icon: "🧴",
        title: "FMCG",
        index: "10",
        badge: "FMCG",
        desc: "High-volume, high-consistency content built for shelves, feeds and everything in between.",
        services: ["Product Photography", "Recipe/Usage Reels", "Retail Campaigns", "Influencer Seeding"],
        deliverables: [["18", "Reels"], ["30", "Photos"], ["1", "Retail Campaign"]],
        image:"https://www.simtrade.fr/blog_simtrade/wp-content/uploads/2025/05/img_Top_FMCG_companies_brands.png"
    },

    political: {
        icon: "🗳️",
        title: "Political Consultants",
        index: "11",
        badge: "Political",
        desc: "Disciplined, on-message visual content built for rapid-response campaigns and public trust.",
        services: ["Rally & Event Coverage", "Message Reels", "Press-Ready Photography", "Rapid Turnaround"],
        deliverables: [["20", "Reels"], ["40", "Photos"], ["Daily", "Content Cycle"]],
        image:"https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvbGl0aWNzfGVufDB8fDB8fHww"
    }

};

/* ==========================================
   PREVIEW PANEL RENDER
   Only touches #showcasePreview (right side).
========================================== */

function renderShowcasePreview(key) {

    const data = INDUSTRY_DATA[key];
    const panel = document.getElementById("showcasePreview");

    if (!data || !panel) return;

    const services = data.services
        .map(s => `<span class="preview-service-tag">${s}</span>`)
        .join("");

    const deliverables = data.deliverables
        .map(([num, label]) => `
            <div class="preview-deliverable">
                <strong>${num}</strong>
                <span>${label}</span>
            </div>
        `).join("");

    panel.innerHTML = `
        <div class="preview-visual">
            <img
                src="${data.image}"
                alt="${data.title} content example"
                loading="lazy"
                decoding="async"
                class="preview-img"
            >
        </div>
        <h3 class="preview-title">${data.title}</h3>
        <p class="preview-desc">${data.desc}</p>
        <div class="preview-services">${services}</div>
        <div class="preview-deliverables">${deliverables}</div>
    `;

    /* Trigger the fade-in after paint so the
       img starts at opacity 0 (set in CSS) and
       transitions to 1 — gives a cross-fade
       feel without any extra libraries. */
    requestAnimationFrame(() => {

        const img = panel.querySelector(".preview-img");

        if (!img) return;

        const reveal = () => img.classList.add("is-loaded");

        if (img.complete) {
            reveal();
        } else {
            img.addEventListener("load", reveal, { once: true });
        }

    });

}

function initShowcase() {

    const cards = document.querySelectorAll(".orbit-card");

    if (!cards.length) return;

    let activeKey = "healthcare";

    renderShowcasePreview(activeKey);

    cards.forEach(card => {

        const key = card.dataset.key;

        card.addEventListener("mouseenter", () => renderShowcasePreview(key));

        card.addEventListener("mouseleave", () => renderShowcasePreview(activeKey));

        card.addEventListener("click", () => {

            activeKey = key;

            cards.forEach(c => {
                c.classList.remove("is-active");
                c.setAttribute("aria-selected", "false");
            });

            card.classList.add("is-active");
            card.setAttribute("aria-selected", "true");

            renderShowcasePreview(key);

        });

    });

}

/* ==========================================
   PORTFOLIO SLIDER + VIDEO LAZY LOAD
   - Videos use data-src (not src) so nothing
     downloads on page load.
   - A single IntersectionObserver per card
     handles: fade-in on first view, assigning
     the real video src only when the card is
     about to enter the viewport (rootMargin),
     and play/pause once it's actually visible.
   - preload="none" stays on the <video> tag
     as a fallback for older browsers.
========================================== */

function initPortfolioSlider(){

    const track  = document.getElementById('pfTrack');
    const prev   = document.getElementById('pfPrev');
    const next   = document.getElementById('pfNext');
    const dotsEl = document.getElementById('pfDots');

    if(!track) return;

    const cards = Array.from(track.querySelectorAll('.pf-card'));
    const dots  = dotsEl ? Array.from(dotsEl.querySelectorAll('.pf-dot')) : [];

    /* Cache each card's video element once, instead of
       re-querying the DOM inside observer callbacks. */
    const cardVideoMap = new Map(
        cards.map(card => [card, card.querySelector('.pf-video')])
    );

    function loadVideoSrc(video){
        if (!video || video.dataset.loaded) return;
        const src = video.getAttribute('data-src');
        if (src) {
            video.src = src;
            video.dataset.loaded = "true";
        }
    }

    /* ---- Fade-in on scroll (load src slightly before
       the card is visible, then fade it in) ---- */
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                const idx = cards.indexOf(entry.target);
                loadVideoSrc(cardVideoMap.get(entry.target));
                setTimeout(() => {
                    entry.target.classList.add('pf-visible');
                }, idx * 80);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "200px 0px" });

    cards.forEach(card => fadeObserver.observe(card));

    /* ---- Auto-play / pause videos based on visibility ---- */
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const vid = cardVideoMap.get(entry.target);
            if(!vid) return;
            if(entry.isIntersecting){
                loadVideoSrc(vid);
                vid.play().catch(() => {});
            } else {
                vid.pause();
            }
        });
    }, { threshold: 0.40 });

    cards.forEach(card => videoObserver.observe(card));

    /* ---- Arrow navigation ---- */
    function cardWidth(){
        if(!cards[0]) return 0;
        const style = getComputedStyle(track);
        const gap = parseFloat(style.gap) || 24;
        return cards[0].getBoundingClientRect().width + gap;
    }

    function scrollBy(dir){
        track.scrollBy({ left: dir * cardWidth(), behavior:'smooth' });
    }

    if(prev) prev.addEventListener('click', () => scrollBy(-1));
    if(next) next.addEventListener('click', () => scrollBy(1));

    /* ---- Dot sync ---- */
    function updateDots(){
        if(!dots.length) return;
        const cw = cardWidth();
        if(!cw) return;
        const idx = Math.round(track.scrollLeft / cw);
        dots.forEach((d, i) => {
            d.classList.toggle('pf-dot--active', i === idx);
        });
    }

    track.addEventListener('scroll', updateDots, { passive: true });

    /* ---- Keyboard support ---- */
    if(prev) prev.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') scrollBy(-1); });
    if(next) next.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') scrollBy(1); });

}

/* ==========================================
   GA4 EVENT TRACKING (delegated, single
   listener for the whole page instead of
   several separate click listeners)
========================================== */

function initGAClickTracking(){

    document.addEventListener("click", function (e) {

        if (typeof gtag !== "function") return;

        const target = e.target.closest("a, button");
        if (!target) return;

        // Form submit button — already tracked as generate_lead / form_submit
        if (target.type === "submit") return;

        const href = target.getAttribute("href") || "";

        if (href.startsWith("tel:")) {
            gtag("event", "phone_click", {
                event_category: "Lead",
                event_label: "Call CTA"
            });
            return;
        }

        if (href.includes("wa.me") || href.includes("whatsapp")) {
            gtag("event", "whatsapp_click", {
                event_category: "Lead",
                event_label: "WhatsApp CTA"
            });
            return;
        }

        if (target.classList.contains("btn-get-started")) {
            gtag("event", "cta_click", {
                event_category: "CTA",
                event_label: "Header Call Icon"
            });
            return;
        }

        if (target.classList.contains("btn")) {
            gtag("event", "cta_click", {
                event_category: "CTA",
                event_label: target.textContent.trim()
            });
        }

    });

}

/* ==========================================
   END OF FILE
========================================== */