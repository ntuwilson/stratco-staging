'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Full-viewport documentary hero: a muted background loop from the
 * Her Digital Future film, a dark overlay, centred headline and two actions.
 * "Watch the film" opens the full film (with sound) in a lightbox.
 */
export default function DocumentaryHero() {
  const loopRef = useRef<HTMLVideoElement | null>(null);
  const filmTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [filmOpen, setFilmOpen] = useState(false);
  const filmOpenRef = useRef(false);
  filmOpenRef.current = filmOpen;

  // Background loop: plays only when motion and data allow, and only on screen.
  // preload="none" keeps reduced-motion / Save-Data visitors on the poster image.
  useEffect(() => {
    const video = loopRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData
    );
    if (reducedMotion || saveData) return;

    video.preload = 'auto';
    const observer = new IntersectionObserver(
      (entries) => {
        // Several changes can arrive in one batch; the last one is current
        const entry = entries[entries.length - 1];
        if (entry.isIntersecting && !filmOpenRef.current) {
          video.play().catch(() => {
            // Autoplay blocked: the poster stays visible
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const closeFilm = useCallback(() => {
    setFilmOpen(false);
    filmTriggerRef.current?.focus();
  }, []);

  // Lightbox: lock page scroll, pause the loop, Esc closes, focus the close button
  useEffect(() => {
    if (!filmOpen) return;
    const loop = loopRef.current;
    loop?.pause();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFilm();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      if (loop && loop.preload === 'auto') {
        loop.play().catch(() => {});
      }
    };
  }, [filmOpen, closeFilm]);

  return (
    <section className="doc-hero">
      <video
        ref={loopRef}
        className="doc-hero__video"
        muted
        loop
        playsInline
        preload="none"
        poster="/video/hero-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source
          src="/video/hero-loop-720.webm"
          type="video/webm"
          media="(max-width: 767px)"
        />
        <source
          src="/video/hero-loop-720.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src="/video/hero-loop-1080.webm" type="video/webm" />
        <source src="/video/hero-loop-1080.mp4" type="video/mp4" />
      </video>
      <div className="doc-hero__overlay" aria-hidden="true" />

      <div className="container doc-hero__content">
        <p className="doc-hero__eyebrow">Stratco · Kampala</p>
        <h1 className="doc-hero__title">
          Shaping what <span>millions remember</span>
        </h1>
        <p className="doc-hero__copy">
          Campaigns, TV adverts, documentaries and live events for Uganda’s
          leading institutions and brands.
        </p>
        <div className="doc-hero__actions">
          <a href="#contact" className="doc-pill doc-pill--primary">
            Start a project
          </a>
          <button
            ref={filmTriggerRef}
            type="button"
            className="doc-pill doc-pill--light"
            onClick={() => setFilmOpen(true)}
            aria-haspopup="dialog"
          >
            <svg viewBox="0 0 12 14" aria-hidden="true">
              <path d="M0 0v14l12-7z" fill="currentColor" />
            </svg>
            Watch the film
          </button>
        </div>
      </div>

      {filmOpen && (
        <div
          className="film-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Her Digital Future — programme film"
          onClick={closeFilm}
        >
          <button
            ref={closeRef}
            type="button"
            className="film-lightbox__close"
            onClick={closeFilm}
          >
            <span>Close</span>
            <span aria-hidden="true">✕</span>
          </button>
          <div
            className="film-lightbox__frame"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="film-lightbox__video"
              src="/video/stratco-film-720.mp4"
              poster="/video/stratco-film-poster.jpg"
              controls
              autoPlay
              playsInline
              preload="auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}
