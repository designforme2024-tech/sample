import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./BlogPage.css";

const ARTICLES = [
  {
    slug: "choosing-the-right-digital-marketing-agency",
    category: "Digital Marketing",
    title: "How to Choose the Right Digital Marketing Agency for Your Business",
    excerpt:
      "Picking the best partner for your business can feel overwhelming. Here's exactly what to look for before you sign a contract.",
    date: "Dec 12, 2025",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "seo-fundamentals-every-business-owner-should-know",
    category: "SEO",
    title: "SEO Fundamentals Every Business Owner Should Know",
    excerpt:
      "Search engine optimization doesn't have to be confusing. We break down the basics that actually move the needle.",
    date: "Dec 10, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "ai-tools-reshaping-modern-marketing",
    category: "AI",
    title: "5 AI Tools Reshaping Modern Marketing Teams",
    excerpt:
      "From content generation to predictive analytics, these tools are changing how marketing teams operate day to day.",
    date: "Dec 8, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "building-a-brand-that-customers-remember",
    category: "Branding",
    title: "Building a Brand That Customers Actually Remember",
    excerpt:
      "Strong branding goes beyond a logo. Learn the core elements that create lasting recognition and trust.",
    date: "Dec 6, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "social-media-strategies-for-2024",
    category: "Social Media Marketing",
    title: "Boost Your Brand: Proven Social Media Strategies for 2024",
    excerpt:
      "Social media moves fast. Here are the strategies that are still driving real engagement and growth this year.",
    date: "Dec 4, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "performance-marketing-metrics-that-matter",
    category: "Performance Marketing",
    title: "Performance Marketing Metrics That Actually Matter",
    excerpt:
      "Stop tracking vanity numbers. These are the metrics that tell you whether your campaigns are truly working.",
    date: "Dec 2, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "why-react-is-still-a-top-choice-for-web-apps",
    category: "React",
    title: "Why React Is Still a Top Choice for Modern Web Apps",
    excerpt:
      "With so many frameworks available, here's why React continues to be a reliable choice for growing products.",
    date: "Nov 29, 2025",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "web-development-trends-to-watch",
    category: "Web Development",
    title: "Web Development Trends to Watch This Year",
    excerpt:
      "From performance budgets to component-driven design, here's what's shaping how we build for the web.",
    date: "Nov 26, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "marketing-automation-for-small-teams",
    category: "Automation",
    title: "Marketing Automation for Small Teams: Where to Start",
    excerpt:
      "You don't need a huge team to benefit from automation. These are the workflows worth setting up first.",
    date: "Nov 23, 2025",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "content-marketing-that-actually-converts",
    category: "Content Marketing",
    title: "Content Marketing That Actually Converts Readers Into Leads",
    excerpt:
      "Great content does more than inform. Here's how to structure content that quietly drives conversions.",
    date: "Nov 20, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "google-ads-tips-to-lower-your-cost-per-click",
    category: "Google Ads",
    title: "Google Ads Tips to Lower Your Cost Per Click",
    excerpt:
      "Small tweaks to your account structure and targeting can meaningfully reduce what you pay per click.",
    date: "Nov 17, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=640&h=420&q=80",
  },
  {
    slug: "signs-its-time-to-scale-your-business",
    category: "Business Growth",
    title: "5 Signs It's Time to Scale Your Business Operations",
    excerpt:
      "Growth brings new problems. Here's how to know when it's time to invest in scaling, and what to scale first.",
    date: "Nov 14, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=640&h=420&q=80",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------------------------------------------------------
   Small inline icon set (no external icon library required)
   --------------------------------------------------------- */

const Icon = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9z" />
    </svg>
  ),
  bars: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="6" y1="20" x2="6" y2="11" />
      <line x1="12" y1="20" x2="12" y2="5" />
      <line x1="18" y1="20" x2="18" y2="14" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.3 8.05 4 4 0 0 1 17 18H7z" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5" cy="12" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <line x1="7.2" y1="10.8" x2="15.9" y2="6.9" />
      <line x1="7.2" y1="13.2" x2="15.9" y2="17.1" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 11v2a2 2 0 0 0 2 2h1l3 5h2l-1-5h2l7 4V6l-7 4H6a2 2 0 0 0-2 2z" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 8 4 12 9 16" />
      <polyline points="15 8 20 12 15 16" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13a7.97 7.97 0 0 0 0-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1L15 3h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.97 7.97 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1L11 21h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4z" />
    </svg>
  ),
  activity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 12 8 12 10 18 14 6 16 12 21 12" />
    </svg>
  ),
};

/**
 * Floating category chips, positioned to echo the reference layout —
 * a ring of labeled, icon-led pills surrounding the BLOG wordmark.
 */
const CHIPS = [
  { label: "SEO", icon: Icon.search, pos: "bh-chip--1" },
  { label: "AI", icon: Icon.globe, pos: "bh-chip--2" },
  { label: "Analytics", icon: Icon.bars, pos: "bh-chip--3" },
  { label: "Cloud", icon: Icon.cloud, pos: "bh-chip--4" },
  { label: "Social Media", icon: Icon.share, pos: "bh-chip--5" },
  { label: "Branding", icon: Icon.edit, pos: "bh-chip--6" },
  { label: "Performance", icon: Icon.activity, pos: "bh-chip--7" },
  { label: "Marketing", icon: Icon.megaphone, pos: "bh-chip--8" },
  { label: "Automation", icon: Icon.settings, pos: "bh-chip--9" },
  { label: "Web Development", icon: Icon.code, pos: "bh-chip--10" },
];

function BlogCard({ article }) {
  const navigate = useNavigate();

  const goToArticle = () => {
    navigate(`/blog/${article.slug}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToArticle();
    }
  };

  return (
    <motion.article
      className="blog-card"
      variants={cardVariants}
      role="link"
      tabIndex={0}
      onClick={goToArticle}
      onKeyDown={handleKeyDown}
      aria-label={`Read article: ${article.title}`}
    >
      <div className="blog-card__media">
        <span className="blog-card__badge">{article.category}</span>
        <img
          className="blog-card__image"
          src={article.image}
          alt={article.title}
          loading="lazy"
        />
      </div>

      <div className="blog-card__body">
        <h3 className="blog-card__title">{article.title}</h3>
        <p className="blog-card__excerpt">{article.excerpt}</p>

        <div className="blog-card__footer">
          <div className="blog-card__meta">
            <span className="blog-card__date">{article.date}</span>
            <span className="blog-card__dot" aria-hidden="true">
              &middot;
            </span>
            <span className="blog-card__readtime">{article.readTime}</span>
          </div>

          <button
            type="button"
            className="blog-card__read-btn"
            onClick={(event) => {
              event.stopPropagation();
              goToArticle();
            }}
          >
            Read article
            <span className="blog-card__read-arrow" aria-hidden="true">
              &rarr;
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function HeroSection() {
  return (
    <section className="bh-hero" aria-label="Blog introduction">
      {/* Background: gradient mesh, dot grid, network nodes + lines */}
      <div className="bh-bg" aria-hidden="true">
        <div className="bh-bg__mesh" />
        <div className="bh-bg__dots" />
        <svg
          className="bh-bg__lines"
          viewBox="0 0 1536 1024"
          preserveAspectRatio="none"
        >
          <line x1="60" y1="120" x2="320" y2="300" />
          <line x1="320" y1="300" x2="200" y2="560" />
          <line x1="200" y1="560" x2="380" y2="760" />
          <line x1="1180" y1="140" x2="1420" y2="320" />
          <line x1="1420" y1="320" x2="1300" y2="600" />
          <line x1="1300" y1="600" x2="1480" y2="780" />
          <line x1="480" y1="200" x2="700" y2="340" />
          <line x1="836" y1="340" x2="1060" y2="200" />
          <line x1="380" y1="760" x2="700" y2="860" />
          <line x1="1480" y1="780" x2="1160" y2="880" />
          {[
            [60, 120], [320, 300], [200, 560], [380, 760],
            [1180, 140], [1420, 320], [1300, 600], [1480, 780],
            [480, 200], [700, 340], [836, 340], [1060, 200],
            [700, 860], [1160, 880],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" />
          ))}
        </svg>
        <div className="bh-bg__glow bh-bg__glow--1" />
        <div className="bh-bg__glow bh-bg__glow--2" />
      </div>

      {/* Decorative data-panel mockups, top corners */}
      <div className="bh-panel bh-panel--left" aria-hidden="true">
        <div className="bh-panel__dots">
          <span /><span /><span />
        </div>
        <div className="bh-panel__bars">
          <span /><span /><span /><span />
        </div>
      </div>
      <div className="bh-panel bh-panel--right" aria-hidden="true">
        <div className="bh-panel__dots">
          <span /><span /><span />
        </div>
        <svg className="bh-panel__chart" viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline points="2,30 18,18 34,26 50,10 66,20 82,6 98,14" />
        </svg>
      </div>

      <div className="bh-container bh-text-center">
        <div className="bh-stage">
          <div className="bh-chips" aria-hidden="true">
            {CHIPS.map((chip) => (
              <motion.span
                key={chip.label}
                className={`bh-chip ${chip.pos}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="bh-chip__icon">{chip.icon}</span>
                {chip.label}
              </motion.span>
            ))}
          </div>

          <motion.h1
            className="bh-heading"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            BLOG
          </motion.h1>

          {/* <motion.p
            className="bh-tagline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            Digital Marketing <span className="bh-tagline__dot">•</span> AI{" "}
            <span className="bh-tagline__dot">•</span> Technology
          </motion.p>

          <motion.span
            className="bh-divider"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.22 }}
            aria-hidden="true"
          /> */}

          <motion.p
            className="bh-subtext"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            {/* Practical insights, case studies and strategies that help
            businesses grow smarter. */}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function BlogPage() {
  const articles = useMemo(() => ARTICLES, []);

  return (
    <main className="blog-page">
      <HeroSection />

      <section className="blog-intro">
        <motion.p
          className="blog-intro__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          From the Blog
        </motion.p>

        <motion.h2
          className="blog-intro__title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          Latest Articles &amp; SEO Insights
        </motion.h2>

        <motion.p
          className="blog-intro__subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          Practical Digital Marketing, SEO, AI and Technology insights from AssignInc.
        </motion.p>
      </section>

      <motion.section
        className="blog-grid"
        id="blog-articles"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        aria-label="Blog articles"
      >
        {articles.map((article) => (
          <BlogCard key={article.slug} article={article} />
        ))}
      </motion.section>
    </main>
  );
}