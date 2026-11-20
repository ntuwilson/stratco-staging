'use client';

import { useEffect } from 'react';

// Elements that rise in as they scroll into view; siblings are staggered
const SELECTOR = [
  '.s-section .s-h2',
  '.s-section .s-label',
  '.s-hw__title',
  '.s-head__intro',
  '.s-partner',
  '.s-card',
  '.s-service',
  '.s-hw__pair',
  '.s-vcard',
  '.s-split__media',
  '.s-case-block',
].join(',');

/**
 * Shared scroll reveal: fade and rise with an expo-out ease, staggered
 * within each group. Content is visible until this runs (no-JS safe), and
 * nothing moves for visitors who prefer reduced motion.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    // Stagger by position among revealable siblings
    els.forEach((el) => {
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) =>
            (c as HTMLElement).matches(SELECTOR)
          )
        : [];
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.setProperty('--reveal-delay', `${Math.min(idx, 8) * 70}ms`);
      // Already on screen at load: leave it shown, so nothing blinks
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('is-in');
      }
      el.classList.add('s-reveal');
    });
    document.documentElement.classList.add('js-reveal');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
