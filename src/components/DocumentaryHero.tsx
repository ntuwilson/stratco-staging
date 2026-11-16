'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import FilmButton from '@/components/site/FilmButton';
import { HERO } from '@/data/siteCopy';

/**
 * Full-viewport documentary hero: a muted background loop from the
 * Her Digital Future film, a dark overlay, centred headline and two actions.
 */
export default function DocumentaryHero() {
  const loopRef = useRef<HTMLVideoElement | null>(null);
  const filmOpenRef = useRef(false);
  const allowedRef = useRef(false);

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

    allowedRef.current = true;
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

  // Pause the loop while the full film is open
  const handleFilmOpen = useCallback((open: boolean) => {
    filmOpenRef.current = open;
    const loop = loopRef.current;
    if (!loop || !allowedRef.current) return;
    if (open) loop.pause();
    else loop.play().catch(() => {});
  }, []);

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
        <p className="doc-hero__eyebrow">{HERO.label}</p>
        <h1 className="doc-hero__title">
          {HERO.headline[0]} <span>{HERO.headline[1]}</span>
        </h1>
        <p className="doc-hero__copy">{HERO.line}</p>
        <div className="doc-hero__actions">
          <a href="#contact" className="s-btn s-btn--primary">
            {HERO.primary}
          </a>
          <FilmButton className="s-btn s-btn--light" onOpenChange={handleFilmOpen}>
            {HERO.secondary}
          </FilmButton>
        </div>
      </div>
    </section>
  );
}
