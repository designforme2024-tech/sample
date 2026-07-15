import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import WhatsAppFloat from './components/UI/WhatsAppFloat';

const WhoWeAre = lazy(() => import('./components/WhoWeAre/WhoWeAre'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs/WhyChooseUs'));
const Services = lazy(() => import('./components/Services/Services'));
const IndustriesWeServe = lazy(() => import('./components/IndustriesWeServe/IndustriesWeServe'));
// const Domains = lazy(() => import('./components/Domains/Domains'));
const OurProcess = lazy(() => import('./components/OurProcess/OurProcess'));
const Stats = lazy(() => import('./components/Stats/stats'));
const Client = lazy(() => import('./components/Client/Client'));
const Events = lazy(() => import('./components/Events/Events'));
// const FAQ = lazy(() => import('./components/FAQ/FAQ'));
const ContactSection = lazy(() => import('./components/ContactSection/ContactSection'));
const Strip = lazy(() => import('./components/Strip/Strip'));
const VideoTestimonial = lazy(() => import('./components/VideoTestimonial/VideoTestimonial'));
const Footer = lazy(() => import('./components/Footer/Footer'));

const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BrandSolutions = lazy(() => import('./pages/BrandSolutions'));
const TechSolutions = lazy(() => import('./pages/TechSolutions'));
const MediaSolutions = lazy(() => import('./pages/MediaSolutions'));
const FilmPhotography = lazy(() => import('./pages/FilmPhotography'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));


const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Optional: explicit route for Ads.html (not required if it's in public/)
app.get('/ads', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/Ads.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


function LazyLoadOnView({ children, rootMargin = '320px 0px 160px 0px' }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return <div ref={ref}>{mounted ? children : null}</div>;
}

function HomePage() {
  return (
    <div className="App">
      <Navbar />
      <WhatsAppFloat />
      <main>
        <section id="hero"><Hero /></section>
        <section id="WhoWeAre">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <WhoWeAre />
            </Suspense>
          </LazyLoadOnView>
        </section>
        <section id="why-choose-assigninc">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <WhyChooseUs />
            </Suspense>
          </LazyLoadOnView>
        </section>
        <section id="services">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <Services />
            </Suspense>
          </LazyLoadOnView>
        </section>
        <section id="industries-we-serve">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <IndustriesWeServe />
            </Suspense>
          </LazyLoadOnView>
        </section>
        {/* <section id="domains">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <Domains />
            </Suspense>
          </LazyLoadOnView>
        </section> */}
        <section id="our-process">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <OurProcess />
            </Suspense>
          </LazyLoadOnView>
        </section>
        <section id="stats">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <Stats />
            </Suspense>
          </LazyLoadOnView>
        </section>
        <section id="clients">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <Client />
            </Suspense>
          </LazyLoadOnView>
        </section>
        <section id="video-testimonial">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <VideoTestimonial />
            </Suspense>
          </LazyLoadOnView>
        </section>
        <section id="events">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <Events />
            </Suspense>
          </LazyLoadOnView>
        </section>
        {/* <section id="faq">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <FAQ />
            </Suspense>
          </LazyLoadOnView>
        </section> */}
        <section id="contact-home">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <ContactSection />
            </Suspense>
          </LazyLoadOnView>
        </section>
        <section id="strip">
          <LazyLoadOnView>
            <Suspense fallback={null}>
              <Strip />
            </Suspense>
          </LazyLoadOnView>
        </section>
      </main>
      <LazyLoadOnView>
        <Suspense fallback={null}>
          <Footer isHomepage={true} />
        </Suspense>
      </LazyLoadOnView>
    </div>
  );
}

function ServicePageWrapper({ children }) {
  return (
    <div className="App">
      <Navbar />
      <WhatsAppFloat />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    document.body.style.visibility = 'visible';
  }, []);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/brand-solutions" element={<ServicePageWrapper><BrandSolutions /></ServicePageWrapper>} />
        <Route path="/tech-solutions" element={<ServicePageWrapper><TechSolutions /></ServicePageWrapper>} />
        <Route path="/media-solutions" element={<ServicePageWrapper><MediaSolutions /></ServicePageWrapper>} />
        <Route path="/film-photography" element={<ServicePageWrapper><FilmPhotography /></ServicePageWrapper>} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/blog" element={<ServicePageWrapper><BlogPage /></ServicePageWrapper>} />
        <Route path="/blog/:slug" element={<ServicePageWrapper><ArticlePage /></ServicePageWrapper>} />
      </Routes>
    </Suspense>
  );
}

export default App;
