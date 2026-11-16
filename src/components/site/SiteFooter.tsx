import React from 'react';
import { StratcoWordmark } from '@/components/StratcoVectors';
import Placeholder from '@/components/site/Placeholder';
import { WATCH } from '@/data/siteCopy';

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

        <div className="s-footer__social">
          {WATCH.channels.map((name) => (
            <span key={name} className="s-footer__channel">
              {name}
            </span>
          ))}
          <Placeholder text={WATCH.pending} />
        </div>

        <p className="s-footer__legal">© 2026 Stratco Limited</p>
      </div>
    </footer>
  );
}
