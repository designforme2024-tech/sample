import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import WhoWeAre from './components/WhoWeAre/WhoWeAre';
import Services from './components/Services/Services';
import Domains from './components/Domains/Domains';
import Stats from './components/Stats/stats';
import Client from './components/Client/Client';
import Events from './components/Events/Events';
import ContactSection from './components/ContactSection/ContactSection';
import Strip from './components/Strip/Strip';
import Footer from './components/Footer/Footer';
import WhatsAppFloat from './components/UI/WhatsAppFloat';

import CaseStudiesPage from './pages/CaseStudiesPage';
import JourneyPage from './pages/JourneyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BrandSolutions from './pages/BrandSolutions';
import TechSolutions from './pages/TechSolutions';
import MediaSolutions from './pages/MediaSolutions';
import FilmPhotography from './pages/FilmPhotography';

function HomePage() {
  return (
    <div className="App">
      <Navbar />
      <WhatsAppFloat />
      <main>
        <section id="hero"><Hero /></section>
        <section id="WhoWeAre"><WhoWeAre /></section>
        <section id="services"><Services /></section>
        <section id="domains"><Domains /></section>
        <section id="stats"><Stats /></section>
        <section id="clients"><Client /></section>
        <section id="events"><Events /></section>
        <section id="contact-home"><ContactSection /></section>
        <section id="strip"><Strip /></section>
      </main>
      <Footer isHomepage={true} />
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
    </Routes>
  );
}

export default App;