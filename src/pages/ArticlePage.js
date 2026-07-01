import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./ArticlePage.css";

const ARTICLES_BY_SLUG = {
  "choosing-the-right-digital-marketing-agency": {
    category: "Digital Marketing",
    title: "How to Choose the Right Digital Marketing Agency for Your Business",
    author: "AssignInc Team",
    date: "Dec 12, 2025",
    readTime: "7 min read",
    heroImage:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&h=640&q=80",
    content: [
      {
        type: "p",
        text: "Today, the digital world moves fast, and finding the right digital marketing agency is more important than ever for business success. The agency you choose shapes how your brand is seen, how many leads you generate, and ultimately how fast you grow. This guide walks through exactly what to look for before you sign a contract.",
      },
      { type: "h2", text: "Understanding Your Business Needs" },
      {
        type: "p",
        text: "Before reaching out to any agency, it's worth spending time defining what you actually need. Are you trying to build **brand awareness**, generate **qualified leads**, or improve **conversion rates** on an existing funnel? Different agencies specialize in different parts of the marketing journey, and a mismatch here is the most common reason partnerships fail.",
      },
      {
        type: "ul",
        items: [
          "Clarify your primary goal: awareness, leads, or retention",
          "Define your budget range before the first call",
          "List the channels you already use and where the gaps are",
          "Decide how involved your internal team wants to be",
        ],
      },
      { type: "h2", text: "What to Look for in an Agency" },
      {
        type: "p",
        text: "Not all agencies are built the same way. Some specialize in **SEO**, others focus heavily on **paid media**, and some position themselves as full-service shops. The right fit depends on where your business currently struggles most.",
      },
      { type: "h3", text: "Proven Track Record" },
      {
        type: "p",
        text: "Ask for case studies relevant to your industry and company size. A strong agency will happily share **before-and-after metrics**, not just polished screenshots. Pay close attention to whether results were achieved for businesses similar in scale to yours.",
      },
      { type: "h3", text: "Transparent Reporting" },
      {
        type: "p",
        text: "You should never have to guess what's happening with your budget. Look for agencies that provide **clear, regular reporting** tied to business outcomes, not just vanity metrics like impressions or likes.",
      },
      { type: "h3", text: "Cultural and Communication Fit" },
      {
        type: "p",
        text: "Marketing is a long-term relationship. The best results usually come from agencies that communicate proactively, push back respectfully when needed, and treat your goals as their own.",
      },
      { type: "h2", text: "Questions to Ask Before You Sign" },
      {
        type: "ul",
        items: [
          "Who exactly will be working on our account day to day?",
          "How do you measure success, and how often will we review it?",
          "What happens if results underperform in the first 90 days?",
          "Can we see examples of monthly reports from current clients?",
        ],
      },
      { type: "h2", text: "Red Flags to Watch For" },
      {
        type: "p",
        text: "Be cautious of agencies that guarantee specific rankings, refuse to share past results, or push you into long, rigid contracts before you've even seen a strategy. **Confidence backed by data** looks very different from pressure tactics.",
      },
      { type: "h2", text: "Making the Final Decision" },
      {
        type: "p",
        text: "Once you've narrowed your shortlist, trust the combination of data and instinct. The right agency will feel like an extension of your own team — one that understands your goals, communicates clearly, and is genuinely invested in your **long-term growth**, not just a single campaign.",
      },
      {
        type: "p",
        text: "Choosing a digital marketing agency is rarely about finding the single \"best\" option on paper. It's about finding the partner whose strengths line up with where your business needs help right now, and who you trust to grow with you over time.",
      },
    ],
  },
};

const RELATED_ARTICLES = [
  {
    slug: "seo-fundamentals-every-business-owner-should-know",
    category: "SEO",
    title: "SEO Fundamentals Every Business Owner Should Know",
    date: "Dec 10, 2025",
    readTime: "4 min read",
    image: "https://placehold.co/640x420/DBEAFE/3B82F6?text=SEO",
  },
  {
    slug: "building-a-brand-that-customers-remember",
    category: "Branding",
    title: "Building a Brand That Customers Actually Remember",
    date: "Dec 6, 2025",
    readTime: "4 min read",
    image: "https://placehold.co/640x420/DBEAFE/2563EB?text=Branding",
  },
  {
    slug: "google-ads-tips-to-lower-your-cost-per-click",
    category: "Google Ads",
    title: "Google Ads Tips to Lower Your Cost Per Click",
    date: "Nov 17, 2025",
    readTime: "4 min read",
    image: "https://placehold.co/640x420/EFF6FF/2563EB?text=Google+Ads",
  },
];

const DEFAULT_ARTICLE = ARTICLES_BY_SLUG["choosing-the-right-digital-marketing-agency"];

function renderInline(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  );
}

function ArticleBlock({ block, index }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="article-content__h2" key={index}>
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="article-content__h3" key={index}>
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="article-content__list" key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "p":
    default:
      return (
        <p className="article-content__p" key={index}>
          {renderInline(block.text)}
        </p>
      );
  }
}

function RelatedCard({ article }) {
  const navigate = useNavigate();

  const goToArticle = () => navigate(`/blog/${article.slug}`);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToArticle();
    }
  };

  return (
    <article
      className="related-card"
      role="link"
      tabIndex={0}
      onClick={goToArticle}
      onKeyDown={handleKeyDown}
      aria-label={`Read article: ${article.title}`}
    >
      <div className="related-card__media">
        <span className="related-card__badge">{article.category}</span>
        <img
          className="related-card__image"
          src={article.image}
          alt={article.title}
          loading="lazy"
        />
      </div>
      <div className="related-card__body">
        <h3 className="related-card__title">{article.title}</h3>
        <div className="related-card__meta">
          <span>{article.date}</span>
          <span className="related-card__dot" aria-hidden="true">
            &middot;
          </span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  );
}

function NewsletterToast({ toast, onClose }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!toast) return undefined;
    if (toast.type !== "success") return undefined;

    timerRef.current = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timerRef.current);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className={`newsletter-toast newsletter-toast--${toast.type}`}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <span className="newsletter-toast__icon" aria-hidden="true">
            {toast.type === "success" ? "✓" : "!"}
          </span>
          <span className="newsletter-toast__text">{toast.message}</span>
          <button
            type="button"
            className="newsletter-toast__close"
            onClick={onClose}
            aria-label="Dismiss notification"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const article = useMemo(
    () => (slug && ARTICLES_BY_SLUG[slug]) || DEFAULT_ARTICLE,
    [slug]
  );

  const relatedArticles = useMemo(
    () => RELATED_ARTICLES.filter((item) => item.slug !== slug).slice(0, 3),
    [slug]
  );

  const handleBackToBlog = () => navigate("/blog");

  const closeToast = useCallback(() => setToast(null), []);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value.trim();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email) {
      setToast({
        type: "error",
        message: "Please enter your email address to subscribe.",
      });
      return;
    }

    if (!isValidEmail) {
      setToast({
        type: "error",
        message: "That email doesn't look quite right — please check and try again.",
      });
      return;
    }

    setToast({
      type: "success",
      message: "You're successfully subscribed to the AssignInc Blog.",
    });
    form.reset();
  };

  return (
    <main className="article-page">
      <div className="article-container">
        <motion.button
          type="button"
          className="back-button"
          onClick={handleBackToBlog}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="back-button__arrow" aria-hidden="true">
            &larr;
          </span>
          Back to Blog
        </motion.button>

        <motion.div
          className="article-hero"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            className="article-hero__image"
            src={article.heroImage}
            alt={article.title}
            loading="lazy"
          />
        </motion.div>

        <motion.h1
          className="article-title"
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          {article.title}
        </motion.h1>

        <motion.div
          className="article-meta"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
        >
          <span className="article-meta__badge">{article.category}</span>
          <span className="article-meta__author">{article.author}</span>
          <span className="article-meta__dot" aria-hidden="true">
            &middot;
          </span>
          <span className="article-meta__date">{article.date}</span>
          <span className="article-meta__dot" aria-hidden="true">
            &middot;
          </span>
          <span className="article-meta__readtime">{article.readTime}</span>
        </motion.div>

        <motion.article
          className="article-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        >
          {article.content.map((block, index) => (
            <ArticleBlock block={block} index={index} key={index} />
          ))}
        </motion.article>
      </div>

      {/* {relatedArticles.length > 0 && (
        <section className="related-section" aria-label="Related articles">
          <div className="related-container">
            <h2 className="related-heading">Related Articles</h2>
            <motion.div
              className="related-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {relatedArticles.map((item) => (
                <motion.div
                  key={item.slug}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.45, ease: "easeOut" },
                    },
                  }}
                >
                  <RelatedCard article={item} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )} */}

      {/* <section className="newsletter-section" aria-label="Newsletter signup">
        <div className="newsletter-container">
          <h2 className="newsletter-heading">Stay Updated</h2>
          <p className="newsletter-subtitle">
            Get the latest digital marketing and SEO insights delivered straight to your inbox.
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
            <label htmlFor="newsletter-email" className="newsletter-label">
              Email address
            </label>
            <div className="newsletter-input-row">
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit">
                Subscribe
              </button>
            </div>
          </form>

          <NewsletterToast toast={toast} onClose={closeToast} />
        </div>
      </section> */}
    </main>
  );
}