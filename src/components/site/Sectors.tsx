'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SECTORS, SECTORS_INTRO } from '@/data/siteCopy';

// One of our own photos per sector. Brands shows our LED stage build as an
// illustration of production capability only; it has no example link.
const PHOTOS: Record<string, { src: string; alt: string } | undefined> = {
  government: {
    src: '/images/ucc/0R7A8857.jpg',
    alt: 'Speaker at the Data Protection & Privacy CEO Conference 2025',
  },
  finance: {
    src: '/images/ftb/6F1A1487.jpg',
    alt: 'Trust Empowerment Programme session in front of the Finance Trust Bank backdrop',
  },
  programmes: {
    src: '/images/dlw/UCC0117.jpg',
    alt: 'Women learning on tablets during the Her Digital Future programme',
  },
  brands: {
    src: '/images/ucc/0R7A9106.jpg',
    alt: 'LED stage and screens built by Stratco',
  },
};

/**
 * Sectors we serve: four panels side by side; the active one widens to show
 * its description and example. Hover, keyboard focus or tap selects a panel.
 * Panels rise in when the section scrolls into view.
 */
export default function Sectors() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`s-section s-section--dark s-sec ${inView ? 'is-in' : ''}`}
      aria-labelledby="sectors-heading"
    >
      <div className="container">
        <div className="s-head s-head--split">
          <h2 id="sectors-heading" className="s-hw__title">
            Sectors we serve
          </h2>
          <p className="s-head__intro">{SECTORS_INTRO}</p>
        </div>

        <ul className="s-sec__row">
          {SECTORS.map((s, i) => {
            const photo = PHOTOS[s.key];
            const isActive = active === i;
            return (
              <li
                key={s.key}
                className={`s-sec__panel ${isActive ? 'is-active' : ''} ${
                  photo ? '' : 's-sec__panel--plain'
                }`}
                style={{ '--i': i } as React.CSSProperties}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                {photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="s-sec__img"
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                  />
                )}
                <div className="s-sec__shade" aria-hidden="true" />

                <button
                  type="button"
                  className="s-sec__toggle"
                  aria-expanded={isActive}
                  aria-controls={`sector-${s.key}`}
                  onClick={() => setActive(i)}
                >
                  <span className="s-sec__num">0{i + 1}</span>
                  <span className="s-sec__title">{s.name}</span>
                </button>

                <div id={`sector-${s.key}`} className="s-sec__body">
                  <p className="s-sec__text">{s.text}</p>
                  {s.example && s.caseSlug && (
                    <a href={`/work/${s.caseSlug}/`} className="s-sec__link">
                      <span aria-hidden="true">↳</span> {s.example}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
