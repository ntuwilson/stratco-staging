'use client';

import React, { useEffect, useState } from 'react';
import { StratcoWordmark } from '@/components/StratcoVectors';

const LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'What we do' },
  { href: '/#process', label: 'How we work' },
  { href: '/#contact', label: 'Contact' },
];

/**
 * Site-wide navigation. Over the home page video it starts transparent with
 * white type and turns solid once the hero has scrolled away; on every other
 * page it is solid from the start.
 */
export default function SiteNav({ overVideo = false }: { overVideo?: boolean }) {
  const [pastHero, setPastHero] = useState(!overVideo);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!overVideo) return;
    const onScroll = () =>
      setPastHero(window.scrollY > Math.max(window.innerHeight * 0.72, 320));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overVideo]);

  // Lock page scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header
      className={`navbar ${overVideo ? 'navbar--on-video' : ''} ${
        pastHero ? 'is-scrolled' : ''
      } ${menuOpen ? 'is-menu-open' : ''}`}
    >
      <div className="container">
        <div className="navbar__inner">
          <a
            href="/"
            className="navbar__brand"
            aria-label="Stratco home"
            onClick={close}
          >
            <StratcoWordmark
              variant="adaptive-nav"
              width={176}
              className="navbar__logo-svg"
            />
          </a>

          <nav className="navbar__links" aria-label="Primary">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="navbar__link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__right">
            <a
              href="/#contact"
              className="s-btn s-btn--primary s-btn--sm navbar__cta-desktop"
            >
              Request a proposal
            </a>
            <button
              type="button"
              className={`navbar__menu-btn ${menuOpen ? 'is-active' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="navbar__menu-label">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
              <span className="navbar__burger" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <nav
          className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`}
          aria-label="Mobile navigation"
        >
          <div className="mobile-drawer__panel">
            <div className="mobile-drawer__list">
              {LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-drawer__link"
                  onClick={close}
                >
                  <span className="mobile-drawer__num">0{i + 1}</span>
                  <span className="mobile-drawer__text">{link.label}</span>
                  <span className="mobile-drawer__arrow">↗</span>
                </a>
              ))}
            </div>

            <div className="mobile-drawer__bottom">
              <a
                href="/#contact"
                className="s-btn s-btn--primary s-btn--block"
                onClick={close}
              >
                Request a proposal
              </a>
              <div className="mobile-drawer__meta">
                <div className="mobile-drawer__contact">
                  <a href="mailto:info@stratco.agency">info@stratco.agency</a>
                  <a href="tel:+256772833500">+256 772 833500</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
