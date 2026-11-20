'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { STEPS } from '@/data/siteCopy';

// One of our own photos per step
const PHOTOS = [
  {
    src: '/images/ucc/0R7A8991.jpg',
    alt: 'Panel discussion at the Data Protection & Privacy CEO Conference 2025',
  },
  {
    src: '/images/ucc/0R7A8840.jpg',
    alt: 'Branded flags lining the venue arrival for the UCC conference',
  },
  {
    src: '/images/ucc/0R7A9084.jpg',
    alt: 'Conference hall with LED screens built and run by Stratco',
  },
  {
    src: '/images/ftb/6F1A2122.jpg',
    alt: 'Group photo of Trust Empowerment Programme participants',
  },
];

/**
 * How we work: a horizontal carousel of photo and text cards that bleeds off
 * the right edge. Swipe or drag, arrow buttons, or the keyboard arrow keys.
 */
export default function HowWeWork() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef<{ x: number; left: number } | null>(null);

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setAtStart(t.scrollLeft < 8);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    update();
    t.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      t.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  // Move by one card (photo or text), snapping to the next card edge
  const step = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const cards = Array.from(t.querySelectorAll<HTMLElement>('.s-hw__item'));
    const start = t.getBoundingClientRect().left;
    const offsets = cards.map(
      (c) => c.getBoundingClientRect().left - start + t.scrollLeft
    );
    const pad = parseFloat(getComputedStyle(t).scrollPaddingLeft) || 0;
    const current = t.scrollLeft + pad;
    const target =
      dir === 1
        ? offsets.find((o) => o > current + 4)
        : [...offsets].reverse().find((o) => o < current - 4);
    t.scrollTo({
      left: (target ?? (dir === 1 ? t.scrollWidth : 0)) - pad,
      behavior: 'smooth',
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    }
  };

  // Mouse drag (touch already scrolls natively)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft };
    trackRef.current.classList.add('is-dragging');
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const t = trackRef.current;
    if (!d || !t) return;
    t.scrollLeft = d.left - (e.clientX - d.x);
  };
  const endDrag = () => {
    const t = trackRef.current;
    if (!drag.current || !t) return;
    // Snapping turns back on and settles on the nearest card
    t.classList.remove('is-dragging');
    drag.current = null;
  };

  return (
    <section
      id="process"
      className="s-section s-section--dark s-hw"
      aria-labelledby="hw-heading"
    >
      <div className="container s-hw__head">
        <h2 id="hw-heading" className="s-hw__title">
          How we work
        </h2>
        <div className="s-hw__arrows">
          <button
            type="button"
            className="s-hw__arrow"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous step"
          >
            ←
          </button>
          <button
            type="button"
            className="s-hw__arrow"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next step"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="s-hw__track"
        tabIndex={0}
        role="region"
        aria-label="How we work, four steps. Use the arrow keys to move."
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <ol className="s-hw__list">
          {STEPS.map((s, i) => (
            <li key={s.title} className="s-hw__pair">
              <figure className="s-hw__item s-hw__photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTOS[i].src}
                  alt={PHOTOS[i].alt}
                  loading="lazy"
                  draggable={false}
                />
              </figure>
              <article className="s-hw__item s-hw__card">
                <p className="s-hw__label">
                  <span className="s-hw__dot" aria-hidden="true" />
                  Step 0{i + 1}
                </p>
                <h3 className="s-hw__card-title">{s.title}</h3>
                <p className="s-hw__text">{s.text}</p>
                <div className="s-hw__foot">
                  {i === STEPS.length - 1 && (
                    <a href="#contact" className="s-hw__link">
                      <span aria-hidden="true">↳</span> Start a brief
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
