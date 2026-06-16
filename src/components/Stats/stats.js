import React, { useEffect, useRef, useState } from 'react';
import './stats.css';

const statsData = [
  { value: 300,   suffix: '+', label: 'Successfully Developed Projects' },
  { value: 200,   suffix: '+', label: 'Unique Ideas Submitted'          },
  { value: 200,   suffix: '+', label: 'Satisfied Customers'             },
  { value: 50000, suffix: '+', label: 'Likes in Social Media'           },
];

function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

function StatCard({ stat, started, index }) {
  const count = useCountUp(stat.value, 2000 + index * 200, started);
  const formatted = stat.value >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <div className="stat-card" style={{ animationDelay: `${index * 0.12}s` }}>
      <div className="stat-number">
        {formatted}<span className="stat-suffix">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-container">
        {statsData.map((stat, i) => (
          <StatCard key={i} stat={stat} started={started} index={i} />
        ))}
      </div>
    </section>
  );
}