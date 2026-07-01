import React from 'react';
import './Strip.css';

const partners = [
  {
    id: 'ads',
    card: (
      <img
        src="https://www.proceedinnovative.com/wp-content/uploads/2025/06/Google-Ads-Certified.png"
        alt="Google Ads Certified Partner"
        className="sp-img sp-img--ads"
        loading="lazy"
        decoding="async"
      />
    ),
  },
  {
    id: 'ga',
    card: (
      <img
        // src="https://developers.google.com/static/analytics/images/terms/lockup_ic_Google_Analytics_vert_388px_clr.png"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Logo_Google_Analytics.svg/1280px-Logo_Google_Analytics.svg.png"
        alt="Google Analytics"
        className="sp-img sp-img--ga"
        loading="lazy"
        decoding="async"
      />
    ),
  },
  {
    id: 'gp',
    card: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5O7SUwSGUECjfIL-THTgT1X1KE-YZJlnwQ&s"
        alt="Google Partner"
        className="sp-img sp-img--gp"
        loading="lazy"
        decoding="async"
      />
    ),
  },
  {
    id: 'meta',
    card: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9yi2V1HboNLUvxl8zLVIR6obHWna_SrcPYw&s"
        alt="Meta Business Partner"
        className="sp-img sp-img--meta"
        loading="lazy"
        decoding="async"
      />
    ),
  },
  {
    id: 'shopify',
    card: (
      <img
        src="https://cdn.eastsideco.com/media/v3/blog/shopify-partner-logo.jpg"
        alt="Shopify Partners"
        className="sp-img sp-img--shopify"
        loading="lazy"
        decoding="async"
      />
    ),
  },
];

const track = [...partners, ...partners, ...partners];

const Strip = () => (
  <section className="sp-section">
    <div className="sp-outer">
      <div className="sp-overflow">
        <div className="sp-track">
          {track.map((p, i) => (
            <div className="sp-card" key={`${p.id}-${i}`}>
              {p.card}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Strip;