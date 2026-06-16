import React from 'react';
import { FiInstagram, FiLinkedin, FiExternalLink } from 'react-icons/fi';
import styles from './Footer.module.css';
import logo from '../../assets/logo.png';

const navLinks = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'Domains',      href: '/domains' },
  { label: 'Journey',      href: '/journey' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About Us',     href: '/about' },
  { label: 'Contact',      href: '/contact' },
];


export default function Footer({ isHomepage = false }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>

      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>

            <div className={styles.brand}>
              <div className={styles.logo}>
                <img
                  src={logo}
                  alt="AssignInc"
                  className={styles.footerLogo}
                />
              </div>
              <p className={styles.tagline}>
                AI-powered digital transformation for brands that refuse to settle.
              </p>
              <div className={styles.govBadges}>
                <span className={styles.badge}>iStart Rajasthan</span>
                <span className={styles.badge}>Bhamashah Techno Hub</span>
              </div>
              <div className={styles.socials}>
                <a href="https://www.instagram.com/assigninc_official?igsh=N3Nic3Y2ZTE4ODBm" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FiInstagram />
                </a>
                <a href="https://www.linkedin.com/in/nehhaagarwal?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
              </div>
            </div>

            <div className={styles.linkCol}>
              <h4>Quick Links</h4>
              <ul>
                {navLinks.map(l => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>

            <div className={styles.linkCol}>
              <h4>Contact</h4>
              <ul>
                <li>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Phone</span>
                    <a href="tel:+916378549221">+91 6378549221</a>
                  </div>
                </li>
                <li>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Email</span>
                    <a href="mailto:agneha2023@gmail.com">agneha2023@gmail.com</a>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.linkCol}>
              <h4>Visit Office</h4>
              <ul>
                <li>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Office 1</span>
                    <p className={styles.addressBlock}>
                      Raw Coworking and Office Space, Opposite Sunny Trade Centre,
                      New Aatish Market, Gurjar Ki Thadi, Jaipur, Rajasthan 302020
                    </p>
                    <a
                      // href="https://www.google.com/maps/place/RAW+Coworking+and+Office+Space+%7C+Mansarovar+Jaipur/@26.8773226,75.7612229,17z"
                      href = "https://maps.app.goo.gl/HQEb6UninJEMePhb6"
                      target="_blank" rel="noreferrer" className={styles.mapsLink}
                    >
                      Open in Google Maps <FiExternalLink className={styles.mapsIcon} />
                    </a>
                  </div>
                </li>
                <hr className={styles.divider} />
                <li>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Office 2</span>
                    <p className={styles.addressBlock}>
                      Sansthan Path, Jhalana Gram, Malviya Nagar, Jaipur, Rajasthan 302017
                    </p>
                    <a
                      // href="https://www.google.com/maps/place/Bhamashah+Techno+Hub/@26.8678415,75.8183184,17z"
                      href = "https://maps.app.goo.gl/SFm9Ry7g1wDYyQV36"
                      target="_blank" rel="noreferrer" className={styles.mapsLink}
                    >
                      Open in Google Maps <FiExternalLink className={styles.mapsIcon} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <span>© {year} AssignInc. All rights reserved.</span>
            {/* <span>Government Incubated · iStart Rajasthan</span> */}
          </div>
        </div>
      </div>

    </footer>
  );
}