import React from 'react';
import { StratcoWordmark } from '@/components/StratcoVectors';
import { SOCIAL_LINKS } from '@/config/social';

export default function SiteFooter() {
  return (
    <footer className="s-footer">
      <div className="container s-footer__inner">
        <div className="s-footer__brand">
          <StratcoWordmark variant="inverted" width={132} showTagline={false} />
          <p>Stratco Limited · Kampala, Uganda</p>
        </div>

        <nav className="s-footer__links" aria-label="Footer">
          <a href="/#work">Work</a>
          <a href="/#services">What we do</a>
          <a href="/#why">About</a>
          <a href="/#contact">Contact</a>
        </nav>

        {SOCIAL_LINKS.length > 0 && (
          <div className="s-footer__social">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                className="s-footer__channel"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.name}
              </a>
            ))}
          </div>
        )}

        <p className="s-footer__legal">© 2026 Stratco Limited</p>
      </div>
    </footer>
  );
}
