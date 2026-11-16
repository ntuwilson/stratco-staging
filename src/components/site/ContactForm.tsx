'use client';

import React, { useState } from 'react';
import { CONTACT } from '@/data/siteCopy';
import { trackEvent } from '@/config/analytics';

const TIMELINES = ['Within a month', '1 – 3 months', 'Later / ongoing'];

/**
 * Proposal request form. There is no server (static site), so it opens the
 * visitor's email app with the brief filled in, and offers copy / open-mail
 * fallbacks if the mail app did not open.
 */
export default function ContactForm() {
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [need, setNeed] = useState(CONTACT.needs[2]);
  const [timeline, setTimeline] = useState(TIMELINES[1]);
  const [brief, setBrief] = useState('');
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const [preparedText, setPreparedText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Proposal request: ${need} — ${org || name}`;
    const body = [
      `Name: ${name}`,
      `Organisation: ${org || '—'}`,
      `Email: ${email}`,
      `Phone: ${phone || '—'}`,
      `What we need: ${need}`,
      `When: ${timeline}`,
      '',
      'Brief:',
      brief || '—',
    ].join('\n');
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setPreparedText(`To: ${CONTACT.email}\nSubject: ${subject}\n\n${body}`);
    setMailtoHref(href);
    trackEvent('generate_lead', {
      method: 'proposal_form',
      need,
      timeline,
    });
    window.location.href = href;
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(preparedText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard blocked: the open-mail link still works
    }
  };

  return (
    <form className="s-form" onSubmit={handleSubmit}>
      <div className="s-form__grid">
        <div className="s-field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="s-field">
          <label htmlFor="cf-org">Organisation</label>
          <input
            id="cf-org"
            autoComplete="organization"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            required
          />
        </div>
        <div className="s-field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="s-field">
          <label htmlFor="cf-phone">
            Phone <span>(optional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <fieldset className="s-choice">
        <legend>What do you need?</legend>
        <div className="s-choice__row">
          {CONTACT.needs.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={need === item}
              className={`s-chip ${need === item ? 'is-active' : ''}`}
              onClick={() => setNeed(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="s-choice">
        <legend>When do you need it?</legend>
        <div className="s-choice__row">
          {TIMELINES.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={timeline === item}
              className={`s-chip ${timeline === item ? 'is-active' : ''}`}
              onClick={() => setTimeline(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="s-field">
        <label htmlFor="cf-brief">Brief</label>
        <textarea
          id="cf-brief"
          rows={4}
          placeholder="Goal, audience, location and key dates"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
        />
      </div>

      <div className="s-form__actions">
        <button type="submit" className="s-btn s-btn--primary">
          {CONTACT.button}
        </button>
        <p className="s-form__note">{CONTACT.reassurance}</p>
      </div>

      {mailtoHref && (
        <p className="s-form__dispatch" role="status">
          Brief ready. If your email app didn’t open,{' '}
          <button type="button" className="s-link" onClick={copyBrief}>
            {copied ? 'copied' : 'copy it'}
          </button>{' '}
          or{' '}
          <a className="s-link" href={mailtoHref}>
            open email
          </a>
          .
        </p>
      )}
    </form>
  );
}
