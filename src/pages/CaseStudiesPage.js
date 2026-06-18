import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import WhatsAppFloat from '../components/UI/WhatsAppFloat';
import '../components/CaseStudies/CaseStudies.css';

// import vidFashion    from '../assets/CaseStudiesVid/Phabna(2).mp4';
// import vidRealEstate from '../assets/CaseStudiesVid/houzz mood case study.mp4';
// import vidSalon      from '../assets/CaseStudiesVid/salon.mp4';
// import vidCafe       from '../assets/CaseStudiesVid/Chai_Kaapi.mp4';
// import vidPersonal   from '../assets/CaseStudiesVid/personal branding case study.mp4';
// import vidNews       from '../assets/CaseStudiesVid/Raftar news case study.mp4';

const vidFashion =
"https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/Phabna(2).mp4";

const vidRealEstate =
"https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/houzz%20mood%20case%20study.mp4";

const vidSalon =
"https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/salon.mp4";

const vidCafe =
"https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/Chai_Kaapi.mp4";

const vidPersonal =
"https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/personal%20branding%20case%20study.mp4";

const vidNews =
"https://cdn.jsdelivr.net/gh/Navyakhandelwal07/Assign-Website@main/Raftar%20news%20case%20study.mp4";

/* ─────────────────────────────────────────────────────────────
   Pure-JS renderer – no external script tag, no public/ files
───────────────────────────────────────────────────────────── */
function initCaseStudies(videos) {
  var isMobile = typeof window !== 'undefined' && (window.matchMedia && window.matchMedia('(max-width: 1023px)').matches);

  var projects = [
    {
      id:'01', num:'01 / 06', category:'FASHION BRAND',
      title:'Fashion Brand Growth',
      tags:['#ReelsStrategy','#InfluencerContent','#Visibility'],
      wrongLabel:'WHAT WAS WRONG',
      wrongText:'Brand had strong products but low visibility and inconsistent content. Not getting good reach on reels and posts.',
      improvedLabel:'HOW WE IMPROVED',
      improvedText:'Planned weekly content calendar, shot high-quality outfit reels, used influencer-style content formats, focused on Instagram growth.',
      strategy:'Planned weekly content calendar; shot high-quality outfit reels; used influencer-style content formats; focused on Instagram growth.',
      outcome:'2x–4x reach growth (30 days); 8–20% follower growth; 30–80% engagement boost; 10–30 inbound leads organically using paid campaign.',
      video:videos.fashion,
      stats:[{value:'2x–4x',label:'REACH GROWTH'},{value:'30–80%',label:'ENGAGEMENT BOOST'}]
    },
    {
      id:'02', num:'02 / 06', category:'REAL ESTATE',
      title:'Real-Estate Lead Gen',
      tags:['#PropertyMarketing','#Walkthroughs','#DirectLeads'],
      wrongLabel:'WHAT WAS WRONG',
      wrongText:'Low-quality leads, high broker dependency with loss of control, poor social media presence.',
      improvedLabel:'HOW WE IMPROVED',
      improvedText:'Built cinematic property reels, voiceover-based walkthroughs, highlighted lifestyle & amenities, consistent posting structure.',
      strategy:'Built a property storytelling and walkthrough content system focused on lifestyle-led reels and consistent posting.',
      outcome:'Increased inquiries; higher engagement on listings; improved brand perception.',
      video:videos.realEstate,
      stats:[{value:'Increased',label:'INQUIRIES'},{value:'Higher',label:'ENGAGEMENT'}]
    },
    {
      id:'03', num:'03 / 06', category:'SALON BRAND',
      title:'Premium Salon Positioning',
      tags:['#LuxuryBranding','#CinematicContent','#Positioning'],
      wrongLabel:'WHAT WAS WRONG',
      wrongText:'Brand looked generic and lacked premium positioning. No clear luxury identity in the market.',
      improvedLabel:'HOW WE IMPROVED',
      improvedText:'Created premium product shoots, slow-motion cinematic reels, occasion-based campaigns (wedding/festive), minimal clean visual identity.',
      strategy:'Focused on luxury storytelling and aesthetic branding through premium shoots and cinematic reels.',
      outcome:'Elevated brand perception; higher engagement; stronger premium positioning.',
      video:videos.salon,
      stats:[{value:'Elevated',label:'PERCEPTION'},{value:'Stronger',label:'POSITIONING'}]
    },
    {
      id:'04', num:'04 / 06', category:'CAFE BRAND',
      title:'Café Local Reach',
      tags:['#LocalReach','#FoodReels','#Footfall'],
      wrongLabel:'WHAT WAS WRONG',
      wrongText:"Low footfall and minimal local visibility. Content wasn't driving customers to the location.",
      improvedLabel:'HOW WE IMPROVED',
      improvedText:'Created trend-based food reels, showcased aesthetic plating & café vibe, collaborated with local influencers, used geo-targeted hashtags.',
      strategy:'Created a local reach and viral reels strategy using trend-based food content and local influencer collaborations.',
      outcome:'Increased footfall; strong local recognition; higher engagement and shares.',
      video:videos.cafe,
      stats:[{value:'Increased',label:'FOOTFALL'},{value:'Strong',label:'LOCAL RECOGNITION'}]
    },
    {
      id:'05', num:'05 / 06', category:'FOUNDERS & THOUGHT LEADERS',
      title:'Personal Branding Authority',
      tags:['#FounderContent','#Authority','#Leadership'],
      wrongLabel:'WHAT WAS WRONG',
      wrongText:'No clear positioning and inconsistent content. Founder struggled to build authority and influence online.',
      improvedLabel:'HOW WE IMPROVED',
      improvedText:'Built talking-head reels, educational & value-driven content, consistent posting system, niche-based content strategy.',
      strategy:'Built a founder-led content system focused on authority using talking-head reels and value-driven educational content.',
      outcome:'Rapid follower growth; increased engagement; strong authority positioning.',
      video:videos.personal,
      stats:[{value:'Rapid',label:'FOLLOWER GROWTH'},{value:'Strong',label:'AUTHORITY'}]
    },
    {
      id:'06', num:'06 / 06', category:'NEWS CHANNEL',
      title:'Bharat Raftaar — News Channel',
      tags:['#ReelsFirst','#News','#SocialGrowth'],
      wrongLabel:'PROBLEM',
      wrongText:'Low follower base and inconsistent reach on social platforms.',
      improvedLabel:'EXECUTION',
      improvedText:'Optimised Instagram content formats; strengthened posting consistency; focused on engagement-led content.',
      strategy:'Reels-first growth strategy; shareable, fast-moving news formats; consistent publishing and trend alignment.',
      outcome:'Instagram growth: 1K → 13K followers in 1 month; Facebook growth: 5K followers organically; significant improvement in reach and engagement.',
      video:videos.news,
      stats:[{value:'1K → 13K',label:'INSTAGRAM (1 MONTH)'},{value:'5K',label:'FACEBOOK (ORGANIC)'}]
    }
  ];

  var globalStats = [
    {value:'32%',label:'AVG FOLLOWER GROWTH'},
    {value:'4x', label:'REACH MULTIPLIER'},
    {value:'50%',label:'SALES INCREASE'},
    {value:'6+', label:'CASE STUDIES'}
  ];

  var container = document.getElementById('case-studies-app');
  if (!container) return;
  /* disconnect any previously attached observers/listeners (SPA navigation safety) */
  try{
    if(container._csCleanup && typeof container._csCleanup.disconnect==='function') container._csCleanup.disconnect();
  }catch(e){}

  /* ── Stats strip HTML (shared between mobile and desktop) ── */
  var stripHTML =
    '<section class="cs-big-stats-section">'+
      '<div class="cs-container">'+
        '<div class="cs-stats-grid">'+
          globalStats.map(function(s){return '<div class="cs-big-stat"><h2>'+s.value+'</h2><p>'+s.label+'</p></div>';}).join('')+
        '</div>'+
      '</div>'+
    '</section>';

  /* ── build HTML ── */
  if (isMobile) {
    /* Mobile stacked layout: content first, then video per project. No IntersectionObservers, no sticky timeline. */
    var mobileHTML = projects.map(function(p){
      var tags = p.tags.map(function(t){ return '<span>'+t+'</span>'; }).join('');
      var s = p.strategy ? '<h4 class="cs-label">STRATEGY</h4><p class="cs-text">'+p.strategy+'</p>' : '';
      var o = p.outcome  ? '<h4 class="cs-label">OUTCOME ACHIEVED</h4><p class="cs-text">'+p.outcome+'</p>'  : '';
      return (
        '<section class="cs-mobile-section">'+
          '<div class="cs-container">'+
            '<div class="cs-mobile-content">'+
              '<span class="cs-project-num">'+p.num+'</span>'+
              '<span class="cs-project-category">'+p.category+'</span>'+
              '<h2>'+p.title+'</h2>'+
              '<div class="cs-project-tags">'+tags+'</div>'+
              '<div class="cs-project-details">'+
                '<p class="cs-label">'+p.wrongLabel+'</p><p class="cs-text">'+p.wrongText+'</p>'+
                '<p class="cs-label cs-mt-4">'+p.improvedLabel+'</p><p class="cs-text">'+p.improvedText+'</p>'+
                s+o+
              '</div>'+
            '</div>'+
            '<div class="cs-mobile-media">'+
              '<video class="cs-card-video" src="'+p.video+'" muted autoplay loop playsinline preload="metadata" aria-label="Case study video"></video>'+
            '</div>'+
          '</div>'+
        '</section>'
      );
    }).join('');

    container.innerHTML =
      '<section class="cs-hero">'+
        '<div class="cs-hero-ticker">CASE STUDIES • CASE STUDIES • CASE STUDIES • CASE STUDIES</div>'+
        '<div class="cs-container cs-text-center">'+
          '<h1 class="cs-outline-text cs-reveal cs-is-visible">CASE STUDIES</h1>'+
        '</div>'+
      '</section>' +
      mobileHTML +
      /* Stats: no cs-reveal / cs-fade-up on mobile so it's always visible */
      stripHTML;

    /* autoplay muted first video where allowed — try all mobile videos */
    setTimeout(function(){
      try{
        container.querySelectorAll('.cs-mobile-media video').forEach(function(v){ v.muted=true; v.playsInline=true; v.setAttribute('playsinline',''); v.play && v.play().catch(function(){}); });
      }catch(e){}
    }, 400);

    /* mark no-op cleanup for mobile render */
    container._csCleanup = { disconnect: function(){} };

    return { disconnect: function(){} }; /* done — skip desktop initialization */
  }

  /* ── Desktop HTML ── */
  var dotsHTML = projects.map(function(p){
    return '<span class="cs-t-dot'+(p.id==='01'?' active':'')+'" data-goto="'+p.id+'">'+p.id+'</span>';
  }).join('');

  var infoHTML = projects.map(function(p){
    var s = p.strategy ? '<p class="cs-label cs-mt-4">STRATEGY</p><p class="cs-text">'+p.strategy+'</p>' : '';
    var o = p.outcome  ? '<p class="cs-label cs-mt-4">OUTCOME ACHIEVED</p><p class="cs-text">'+p.outcome+'</p>'  : '';
    return (
      '<div class="cs-project-info-block'+(p.id==='01'?' active':'')+'" data-project="'+p.id+'">'+
        '<span class="cs-project-num">'+p.num+'</span>'+
        '<span class="cs-project-category">'+p.category+'</span>'+
        '<h2>'+p.title+'</h2>'+
        '<div class="cs-project-tags">'+p.tags.map(function(t){return '<span>'+t+'</span>';}).join('')+'</div>'+
        '<div class="cs-project-details">'+
          '<p class="cs-label">'+p.wrongLabel+'</p><p class="cs-text">'+p.wrongText+'</p>'+
          '<p class="cs-label cs-mt-4">'+p.improvedLabel+'</p><p class="cs-text">'+p.improvedText+'</p>'+
          s+o+
        '</div>'+
      '</div>'
    );
  }).join('');

  var cardsHTML = projects.map(function(p,i){
    var st = p.stats.map(function(s){return '<div><h2>'+s.value+'</h2><p>'+s.label+'</p></div>';}).join('');
    return (
      '<div class="cs-visual-trigger-zone" data-target="'+p.id+'">'+
        '<div class="cs-solid-card cs-glass" data-index="'+i+'">'+
          '<div class="cs-card-image">'+
            '<video class="cs-card-video" src="'+p.video+'" muted loop playsinline preload="metadata"></video>'+
          '</div>'+
          '<div class="cs-card-top-stats">'+st+'</div>'+
        '</div>'+
      '</div>'
    );
  }).join('');

  /* Desktop stats strip keeps the reveal animation */
  var desktopStripHTML =
    '<section class="cs-big-stats-section cs-reveal cs-fade-up">'+
      '<div class="cs-container">'+
        '<div class="cs-stats-grid">'+
          globalStats.map(function(s){return '<div class="cs-big-stat"><h2>'+s.value+'</h2><p>'+s.label+'</p></div>';}).join('')+
        '</div>'+
      '</div>'+
    '</section>';

  container.innerHTML =
    '<section class="cs-hero">'+
      '<div class="cs-hero-ticker">CASE STUDIES • CASE STUDIES • CASE STUDIES • CASE STUDIES</div>'+
      '<div class="cs-container cs-text-center">'+
        '<h1 class="cs-outline-text cs-reveal cs-is-visible">CASE STUDIES</h1>'+
      '</div>'+
    '</section>'+
    '<section class="cs-sticky-track-container">'+
      '<div class="cs-sticky-layout-wrapper">'+
        '<div class="cs-sticky-left-panel">'+
          '<div class="cs-timeline-tracker">'+
            '<div class="cs-timeline-line"><div class="cs-timeline-progress" id="cs-progressLine"></div></div>'+
            '<div class="cs-timeline-dots">'+dotsHTML+'</div>'+
          '</div>'+
          '<div class="cs-content-stack">'+infoHTML+'</div>'+
        '</div>'+
        '<div class="cs-scroll-right-gallery">'+
          '<div class="cs-gallery-nav">'+
            '<button class="cs-nav cs-prev" aria-label="Previous">&#8249;</button>'+
            '<button class="cs-nav cs-next" aria-label="Next">&#8250;</button>'+
          '</div>'+
          cardsHTML+
        '</div>'+
      '</div>'+
    '</section>'+
    desktopStripHTML;

  /* ── helpers ── */
  function playVideo(v){ if(!v) return; v.muted=true; v.loop=true; var p=v.play(); if(p&&p.catch) p.catch(function(){}); }
  function pauseVideo(v){ if(!v) return; try{v.pause();v.currentTime=0;}catch(e){} }

  var infoBlocks   = container.querySelectorAll('.cs-project-info-block');
  var visualZones  = container.querySelectorAll('.cs-visual-trigger-zone');
  var progressLine = container.querySelector('#cs-progressLine');
  var timelineDots = container.querySelectorAll('.cs-t-dot');
  var zones        = Array.prototype.slice.call(visualZones);
  var progressMap  = {'01':0,'02':20,'03':40,'04':60,'05':80,'06':100};

  /* gallery scroll observer */
  var galleryObs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var id = entry.target.getAttribute('data-target');
      infoBlocks.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-project')===id); });
      if(progressLine) progressLine.style.height=(progressMap[id]||0)+'%';
      timelineDots.forEach(function(d){ d.classList.toggle('active', d.getAttribute('data-goto')===id); });
      zones.forEach(function(z){ var v=z.querySelector('video'); z===entry.target ? playVideo(v) : pauseVideo(v); });
    });
  },{root:null,rootMargin:'-50% 0px -50% 0px',threshold:0});
  zones.forEach(function(z){ galleryObs.observe(z); });

  /* timeline dot click */
  timelineDots.forEach(function(dot){
    dot.addEventListener('click',function(){
      var z=container.querySelector('.cs-visual-trigger-zone[data-target="'+dot.getAttribute('data-goto')+'"]');
      if(z) z.scrollIntoView({behavior:'smooth',block:'center'});
    });
  });

  /* scroll reveals */
  var revealObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('cs-is-visible'); });
  },{threshold:0.15});
  container.querySelectorAll('.cs-reveal').forEach(function(el){ revealObs.observe(el); });

  /* mask-reveal h2 */
  container.querySelectorAll('.cs-project-info-block h2').forEach(function(h){
    if(h.parentElement.classList.contains('cs-mask-inner')) return;
    var w=document.createElement('div'); w.className='cs-mask-text';
    var i=document.createElement('div'); i.className='cs-mask-inner';
    h.parentNode.insertBefore(w,h); w.appendChild(i); i.appendChild(h);
  });

  /* 3-D parallax */
  container.querySelectorAll('.cs-solid-card').forEach(function(card){
    card.addEventListener('mousemove',function(ev){
      var r=card.getBoundingClientRect();
      var rx=-((ev.clientY-r.top -r.height/2)/r.height)*8;
      var ry= ((ev.clientX-r.left-r.width /2)/r.width )*8;
      card.style.transform='perspective(1000px) rotateX('+rx+'deg) rotateY('+ry+'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave',function(){ card.style.transform=''; });
  });

  /* background colour shift */
  var cs=[{r:255,g:255,b:255},{r:245,g:247,b:255},{r:255,g:244,b:245},{r:245,g:255,b:250}];
  function lerp(a,b,t){return a+(b-a)*t;}
  function updateBg(){
    var max=document.body.scrollHeight-window.innerHeight;
    var p=Math.min(1,window.scrollY/Math.max(1,max));
    var idx=Math.min(cs.length-2,Math.floor(p*(cs.length-1)));
    var lt=(p*(cs.length-1))-idx;
    var c1=cs[idx],c2=cs[idx+1]||c1;
    document.documentElement.style.setProperty('--cs-bg-main',
      'rgb('+Math.round(lerp(c1.r,c2.r,lt))+','+Math.round(lerp(c1.g,c2.g,lt))+','+Math.round(lerp(c1.b,c2.b,lt))+')');
  }
  updateBg();
  window.addEventListener('scroll',updateBg,{passive:true});

  /* prev/next nav */
  var prevBtn=container.querySelector('.cs-prev');
  var nextBtn=container.querySelector('.cs-next');
  function curIdx(){ var a=container.querySelector('.cs-visual-trigger-zone.cs-active-stack')||zones[0]; return zones.indexOf(a); }
  function goTo(i){ i=Math.max(0,Math.min(zones.length-1,i)); zones[i].scrollIntoView({behavior:'smooth',block:'center'}); }
  if(nextBtn) nextBtn.addEventListener('click',function(){ goTo(curIdx()+1); });
  if(prevBtn) prevBtn.addEventListener('click',function(){ goTo(curIdx()-1); });
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight') goTo(curIdx()+1);
    if(e.key==='ArrowLeft')  goTo(curIdx()-1);
  });

  /* stack tracker */
  var stackObs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      zones.forEach(function(z){ z.classList.remove('cs-active-stack'); });
      en.target.classList.add('cs-active-stack');
    });
  },{root:null,rootMargin:'-40% 0px -40% 0px'});
  zones.forEach(function(z){ stackObs.observe(z); });

  /* Desktop sticky-safety: detect ancestors that block position:sticky and apply fixed fallback if needed */
  var _stickyFallbackCleanup = null;
  (function(){
    try{
      var leftPanel = container.querySelector('.cs-sticky-left-panel');
      var track = container.querySelector('.cs-sticky-track-container');
      if(!leftPanel || !track) return;
      function findBlockingAncestor(el){
        var n = el.parentElement;
        while(n && n !== document.body){
          var cs = window.getComputedStyle(n);
          if(cs.transform && cs.transform !== 'none') return {node:n, reason:'transform'};
          if(cs.willChange && typeof cs.willChange === 'string' && cs.willChange.indexOf('transform')!==-1) return {node:n, reason:'will-change'};
          if(cs.perspective && cs.perspective !== 'none') return {node:n, reason:'perspective'};
          if(cs.contain && cs.contain !== 'none') return {node:n, reason:'contain'};
          if(cs.filter && cs.filter !== 'none') return {node:n, reason:'filter'};
          if((cs.overflow && cs.overflow !== 'visible') || (cs.overflowY && cs.overflowY !== 'visible') || (cs.overflowX && cs.overflowX !== 'visible')) return {node:n, reason:'overflow'};
          n = n.parentElement;
        }
        return null;
      }

      var blocker = findBlockingAncestor(leftPanel);
      // Do not apply JS fixed-position fallback on mobile — keep mobile layout unchanged.
      if(isMobile) return;

      /* fallback: emulate sticky using fixed positioning while inside the track bounds */
      var orig = { position: leftPanel.style.position || '', top: leftPanel.style.top || '', left: leftPanel.style.left || '', width: leftPanel.style.width || '', zIndex: leftPanel.style.zIndex || '' };
      var _placeholder = null;

      function updateStickyFallback(){
        var leftRect = leftPanel.getBoundingClientRect();
        var leftOffsetLeft = leftRect.left + window.scrollX;
        var leftWidth = Math.max(80, leftRect.width);
        var panelHeight = leftRect.height;

        var trackRect = track.getBoundingClientRect();
        var trackTopAbs = trackRect.top + window.scrollY;
        var trackBottomAbs = trackTopAbs + trackRect.height;
        var scrollYAbs = window.scrollY;

        if(scrollYAbs >= trackTopAbs && (scrollYAbs + panelHeight) < trackBottomAbs){
          if(!_placeholder){
            _placeholder = document.createElement('div');
            _placeholder.className = 'cs-sticky-placeholder';
            _placeholder.style.width = leftWidth + 'px';
            _placeholder.style.height = panelHeight + 'px';
            leftPanel.parentNode.insertBefore(_placeholder, leftPanel);
          }
          leftPanel.style.position = 'fixed';
          leftPanel.style.top = '0px';
          leftPanel.style.left = leftOffsetLeft + 'px';
          leftPanel.style.width = leftWidth + 'px';
          leftPanel.style.zIndex = 999;
        } else if((scrollYAbs + panelHeight) >= trackBottomAbs){
          if(!_placeholder){
            _placeholder = document.createElement('div');
            _placeholder.className = 'cs-sticky-placeholder';
            _placeholder.style.width = leftWidth + 'px';
            _placeholder.style.height = panelHeight + 'px';
            leftPanel.parentNode.insertBefore(_placeholder, leftPanel);
          }
          leftPanel.style.position = 'absolute';
          leftPanel.style.top = (trackRect.height - panelHeight) + 'px';
          leftPanel.style.left = '';
          leftPanel.style.width = leftWidth + 'px';
          leftPanel.style.zIndex = 999;
        } else {
          leftPanel.style.position = orig.position;
          leftPanel.style.top = orig.top;
          leftPanel.style.left = orig.left;
          leftPanel.style.width = orig.width;
          leftPanel.style.zIndex = orig.zIndex;
          if(_placeholder && _placeholder.parentNode){ _placeholder.parentNode.removeChild(_placeholder); _placeholder = null; }
        }
      }

      window.addEventListener('scroll', updateStickyFallback, {passive:true});
      var resizeHandler = function(){ try{ updateStickyFallback(); }catch(e){} };
      window.addEventListener('resize', resizeHandler, {passive:true});

      _stickyFallbackCleanup = function(){
        try{ window.removeEventListener('scroll', updateStickyFallback); }catch(e){}
        try{ window.removeEventListener('resize', resizeHandler); }catch(e){}
        try{ leftPanel.style.position = orig.position; leftPanel.style.top = orig.top; leftPanel.style.left = orig.left; leftPanel.style.width = orig.width; leftPanel.style.zIndex = orig.zIndex; }catch(e){}
      };

      updateStickyFallback();
    }catch(e){}
  })();

  /* autoplay first card */
  setTimeout(function(){
    var v=zones[0]&&zones[0].querySelector('video');
    if(v) playVideo(v);
  },300);

  /* Scroll-based fallback: ensure active content syncs with the zone nearest viewport center. */
  var rafPending = false;
  function syncActiveByScroll(){
    if(rafPending) return;
    rafPending = true;
    window.requestAnimationFrame(function(){
      try{
        var mid = window.innerHeight / 2;
        var bestIdx = -1; var bestDist = Infinity;
        zones.forEach(function(z, idx){
          var r = z.getBoundingClientRect();
          var center = r.top + (r.height/2);
          var dist = Math.abs(center - mid);
          if(dist < bestDist){ bestDist = dist; bestIdx = idx; }
        });
        if(bestIdx !== -1){
          var target = zones[bestIdx];
          var id = target.getAttribute('data-target');
          infoBlocks.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-project')===id); });
          if(progressLine) progressLine.style.height=(progressMap[id]||0)+'%';
          timelineDots.forEach(function(d){ d.classList.toggle('active', d.getAttribute('data-goto')===id); });
          zones.forEach(function(z, i){ var v=z.querySelector('video'); if(i===bestIdx) playVideo(v); else pauseVideo(v); });
        }
      }catch(e){}
      rafPending = false;
    });
  }
  window.addEventListener('scroll', syncActiveByScroll, {passive:true});

  /* return cleanup so callers can disconnect observers and listeners */
  var cleanup = (function(){
    return {
      disconnect: function(){
        try{ galleryObs && galleryObs.disconnect(); }catch(e){}
        try{ stackObs && stackObs.disconnect(); }catch(e){}
        try{ revealObs && revealObs.disconnect(); }catch(e){}
        try{ window.removeEventListener('scroll',updateBg); }catch(e){}
        try{ window.removeEventListener('scroll', syncActiveByScroll); }catch(e){}
        try{
          if(nextBtn && nextBtn.parentNode) { var n=nextBtn.cloneNode(true); nextBtn.parentNode.replaceChild(n,nextBtn); }
          if(prevBtn && prevBtn.parentNode) { var p=prevBtn.cloneNode(true); prevBtn.parentNode.replaceChild(p,prevBtn); }
        }catch(e){}
        try{ if(typeof _stickyFallbackCleanup === 'function') _stickyFallbackCleanup(); }catch(e){}
      }
    };
  })();

  container._csCleanup = cleanup;
  return cleanup;
}

/* ─────────────────────────────────────────────────────────────
   React component
───────────────────────────────────────────────────────────── */
export default function CaseStudiesPage() {
  useEffect(function(){
    var _cleanup = initCaseStudies({
      fashion:    vidFashion,
      realEstate: vidRealEstate,
      salon:      vidSalon,
      cafe:       vidCafe,
      personal:   vidPersonal,
      news:       vidNews
    });
    return function(){
      var el=document.getElementById('case-studies-app');
      try{ if(_cleanup && typeof _cleanup.disconnect==='function') _cleanup.disconnect(); }catch(e){}
      if(el) el.innerHTML='';
      document.documentElement.style.removeProperty('--cs-bg-main');
    };
  },[]);

  return (
    <div className="App">
      <Navbar />
      <WhatsAppFloat />
      <main>
        <div id="case-studies-app" />
      </main>
      <Footer />
    </div>
  );
}