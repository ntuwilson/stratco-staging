import React from 'react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import DocumentaryHero from '@/components/DocumentaryHero';
import Placeholder from '@/components/site/Placeholder';
import FilmButton from '@/components/site/FilmButton';
import ContactForm from '@/components/site/ContactForm';
import { CASE_STUDIES } from '@/data/stratcoData';
import {
  CASES,
  CHECK,
  CLIENTS,
  CONTACT,
  NUMBERS,
  SECTORS,
  SECTORS_INTRO,
  SERVICES,
  STEPS,
  TESTIMONIALS,
  WATCH,
  WHY,
} from '@/data/siteCopy';

function caseImage(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug)?.image ?? '';
}

/**
 * Home page, in the blueprint's order:
 * film hero · numbers and clients · why we exist · selected work · sectors ·
 * what we do · how we work · in their words · campaign check · watch and
 * follow · start a project.
 */
export default function StratcoHome() {
  return (
    <div className="s-site">
      <SiteNav overVideo />

      <main id="top">
        {/* 1. Film hero */}
        <DocumentaryHero />

        {/* 2. Numbers and clients */}
        <section className="s-section s-section--light" aria-label="Numbers and clients">
          <div className="container">
            <ul className="s-numbers">
              {NUMBERS.map((n) => (
                <li key={n.label} className="s-number">
                  <span className="s-number__value">
                    <Placeholder text={n.value} />
                  </span>
                  <span className="s-number__label">
                    <Placeholder text={n.label} />
                  </span>
                </li>
              ))}
            </ul>

            <div className="s-clients">
              <p className="s-label">{CLIENTS.heading}</p>
              <ul className="s-clients__list">
                {CLIENTS.names.map((name) => (
                  <li key={name}>{name}</li>
                ))}
                <li>
                  <Placeholder text={CLIENTS.pending} />
                </li>
              </ul>
              <p className="s-note">
                <Placeholder text="[Client logos appear here once written permission is confirmed]" />
              </p>
            </div>
          </div>
        </section>

        {/* 3. Why we exist */}
        <section id="why" className="s-section s-section--tint">
          <div className="container s-split">
            <div className="s-split__text">
              <p className="s-label">{WHY.label}</p>
              <h2 className="s-h2">{WHY.heading}</h2>
              <p className="s-lead">{WHY.body}</p>
              <ul className="s-points">
                {WHY.points.map((p) => (
                  <li key={p.title}>
                    <strong>{p.title}</strong> {p.text}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="s-split__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ucc/0R7A9106.jpg"
                alt="LED stage built by Stratco for the Data Protection & Privacy CEO Conference 2025 in Kampala"
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* 4. Selected work */}
        <section id="work" className="s-section s-section--light">
          <div className="container">
            <div className="s-head">
              <h2 className="s-h2">Selected work</h2>
              <a href="/work/" className="s-btn s-btn--outline">
                See the work
              </a>
            </div>
            <ul className="s-cards">
              {CASES.map((c) => (
                <li key={c.slug}>
                  <a href={`/work/${c.slug}/`} className="s-card">
                    <div className="s-card__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={caseImage(c.slug)} alt={c.name} loading="lazy" />
                    </div>
                    <div className="s-card__body">
                      <p className="s-card__figure">
                        <span>{c.figure.value}</span> {c.figure.label}
                      </p>
                      <h3 className="s-card__title">{c.name}</h3>
                      <p className="s-card__text">{c.oneLine}</p>
                      <p className="s-card__meta">{c.year}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Sectors */}
        <section className="s-section s-section--dark">
          <div className="container">
            <div className="s-head s-head--split">
              <h2 className="s-h2">Sectors we serve</h2>
              <p className="s-head__intro">{SECTORS_INTRO}</p>
            </div>
            <ul className="s-sectors">
              {SECTORS.map((s, i) => (
                <li key={s.key} className="s-sector">
                  <span className="s-sector__num">0{i + 1}</span>
                  <h3 className="s-sector__title">{s.name}</h3>
                  <p className="s-sector__text">{s.text}</p>
                  {s.example && s.caseSlug ? (
                    <a href={`/work/${s.caseSlug}/`} className="s-sector__example">
                      <span className="s-sector__example-label">Example</span>
                      <span className="s-sector__example-name">
                        {s.example} <span aria-hidden="true">→</span>
                      </span>
                    </a>
                  ) : (
                    <span className="s-sector__example" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. What we do */}
        <section id="services" className="s-section s-section--light">
          <div className="container">
            <div className="s-head">
              <h2 className="s-h2">What we do</h2>
            </div>
            <ol className="s-grid3">
              {SERVICES.map((s, i) => (
                <li key={s.title} className="s-service">
                  <span className="s-service__num">0{i + 1}</span>
                  <h3 className="s-service__title">{s.title}</h3>
                  <p className="s-service__text">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7. How we work */}
        <section id="process" className="s-section s-section--tint">
          <div className="container">
            <div className="s-head">
              <h2 className="s-h2">How we work</h2>
            </div>
            <ol className="s-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="s-step">
                  <span className="s-step__num">{i + 1}</span>
                  <h3 className="s-step__title">{s.title}</h3>
                  <p className="s-step__text">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8. In their words */}
        <section className="s-section s-section--dark">
          <div className="container">
            <p className="s-label">{TESTIMONIALS.heading}</p>
            <div className="s-quotes">
              {TESTIMONIALS.quotes.map((q) => (
                <blockquote key={q.who} className="s-quote">
                  <p>“{q.text}”</p>
                  <cite>{q.who}</cite>
                </blockquote>
              ))}
              <div className="s-quote s-quote--pending">
                <p>
                  <Placeholder text={TESTIMONIALS.pending} />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Free campaign check (static preview until the quiz is approved) */}
        <section className="s-section s-section--light">
          <div className="container s-split s-split--even">
            <div className="s-split__text">
              <p className="s-label">Free campaign check</p>
              <h2 className="s-h2">{CHECK.heading}</h2>
              <p className="s-lead">{CHECK.body}</p>
              <button
                type="button"
                className="s-btn s-btn--outline"
                disabled
                aria-describedby="check-soon"
              >
                {CHECK.button}
              </button>
              <p id="check-soon" className="s-note">
                <Placeholder text="[Interactive check to be built once the idea is approved]" />
              </p>
            </div>
            <ol className="s-check">
              {CHECK.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* 10. Watch and follow */}
        <section className="s-section s-section--tint">
          <div className="container s-split">
            <div className="s-split__text">
              <h2 className="s-h2">{WATCH.heading}</h2>
              <p className="s-lead">{WATCH.body}</p>
              <ul className="s-channels">
                {WATCH.channels.map((c) => (
                  <li key={c}>{c}</li>
                ))}
                <li>
                  <Placeholder text={WATCH.pending} />
                </li>
              </ul>
            </div>
            <figure className="s-split__media s-film">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/video/stratco-film-poster.jpg"
                alt="Still from the Her Digital Future programme film"
                loading="lazy"
              />
              <FilmButton className="s-btn s-btn--light s-film__play">
                Watch the film
              </FilmButton>
            </figure>
          </div>
        </section>

        {/* 11. Start a project */}
        <section id="contact" className="s-section s-section--dark">
          <div className="container s-split s-split--contact">
            <div className="s-split__text">
              <h2 className="s-h2">{CONTACT.heading}</h2>
              <p className="s-lead">{CONTACT.body}</p>
              <ul className="s-direct">
                <li>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </li>
                {CONTACT.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                  </li>
                ))}
                <li>{CONTACT.address}</li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
