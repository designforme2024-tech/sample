import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import logo from '../assets/CompanyLogo.jpeg';
// import logo from '../../assets/CompanyLogo.jpeg';
import logo from '../../assets/logo.png';
import './Navbar.css';


const serviceCategories = [
  {
    label: 'Brand Solutions',
    path: '/brand-solutions',
    items: [
      'Social Media Management',
      'Original Content & Copywriting',
      'Graphic Design, Iconography & Illustrations',
      'Video Editing & Animation',
      'Film Production, AVs & Product Photography',
      'Campaign Planning',
      'Influencer Marketing & ORM',
      'Print, OOH & Mainline Advertising',
      'New Brand Launch & Rebranding',
      'Google Reviews Management',
    ],
  },
  {
    label: 'Tech Solutions',
    path: '/tech-solutions',
    items: [
      'Custom Web Development',
      'Web Personalization',
      'UI/UX Design',
      'SEO (Search Engine Optimization)',
      'E-Commerce Development',
      'Email Marketing',
      'Marketing Automation',
      'Chatbots',
    ],
  },
  {
    label: 'Media Solutions',
    path: '/media-solutions',
    items: [
      'Media Buying',
      'Media Planning',
      'Performance Marketing',
      'Ads Management (Google, Meta, LinkedIn, YouTube)',
    ],
  },
  {
    label: 'Film & Photography',
    path: '/film-photography',
    items: [
      'Product Photoshoot',
      'UGC (User Generated Content)',
      'Model Shoot',
      'Creative Shoots',
      'Campaign Shoots',
      'Ad Films',
      'Factory Shoots',
      'Interviews',
      'Testimonials',
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#services');
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="AssignInc" className="navbar__logo-img" />
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">

          {/* 1. Home */}
          <li><Link to="/" className="navbar__link navbar__link--animated">Home</Link></li>

          {/* 2. Services — mega dropdown */}
          <li className="navbar__dropdown-wrapper" ref={dropdownRef}>
            <button
              className="navbar__link navbar__link--services"
              onClick={handleServicesClick}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              aria-expanded={dropdownOpen}
            >
              Services
              <svg className={`navbar__chevron ${dropdownOpen ? 'navbar__chevron--open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div
              className={`navbar__mega ${dropdownOpen ? 'navbar__mega--open' : ''}`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="navbar__mega-inner">
                {serviceCategories.map((cat) => (
                  <div className="navbar__mega-col" key={cat.label}>
                    <Link
                      to={cat.path}
                      className="navbar__mega-heading"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {cat.label}
                    </Link>
                    <ul className="navbar__mega-list">
                      {cat.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={cat.path}
                            className="navbar__mega-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span className="navbar__mega-item-dot" />
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>

          {/* 3. Domains */}
          {/* <li><Link to="/domains" className="navbar__link navbar__link--animated">Domains</Link></li> */}

          {/* 4. Journey */}
          <li><Link to="/journey" className="navbar__link navbar__link--animated">Events</Link></li>

          {/* 5. Case Studies */}
          <li><Link to="/case-studies" className="navbar__link navbar__link--animated">Case Studies</Link></li>

          {/* 6. About Us */}
          <li><Link to="/about" className="navbar__link navbar__link--animated">About Us</Link></li>

        </ul>

        {/* CTA */}
        <Link to="/contact" className="navbar__cta">Get Started</Link>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <Link to="/" className="navbar__mobile-link">Home</Link>

        <div className="navbar__mobile-services">
          <button
            className="navbar__mobile-link navbar__mobile-services-toggle"
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
          >
            Services
            <svg className={`navbar__chevron ${mobileServicesOpen ? 'navbar__chevron--open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {mobileServicesOpen && (
            <div className="navbar__mobile-services-list">
              {serviceCategories.map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.path}
                  className="navbar__mobile-service-cat"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* <Link to="/domains" className="navbar__mobile-link">Domains</Link> */}
        <Link to="/journey" className="navbar__mobile-link">Events</Link>
        <Link to="/case-studies" className="navbar__mobile-link">Case Studies</Link>
        <Link to="/about" className="navbar__mobile-link">About Us</Link>
        <Link to="/contact" className="navbar__mobile-cta">Get Started</Link>
      </div>
    </nav>
  );
}