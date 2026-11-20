import React from 'react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import DocumentaryHero from '@/components/DocumentaryHero';
import FilmButton from '@/components/site/FilmButton';
import ContactForm from '@/components/site/ContactForm';
import VideoTestimonials from '@/components/site/VideoTestimonials';
import CampaignCheck from '@/components/site/CampaignCheck';
import { SOCIAL_LINKS } from '@/config/social';
import HowWeWork from '@/components/site/HowWeWork';
import Sectors from '@/components/site/Sectors';
import Reveal from '@/components/site/Reveal';
import { CASE_STUDIES } from '@/data/stratcoData';
import {
  CASES,
  CHECK,
  CONTACT,
  PARTNERS,
  SERVICES,
  VIDEO_TESTIMONIALS,
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

        {/* 2. Partners and clients */}
        <section className="s-section s-section--light s-partners" aria-labelledby="partners-heading">
          <div className="container">
            <h2 id="partners-heading" className="s-label">{PARTNERS.heading}</h2>
            <ul className="s-partners__grid">
              {PARTNERS.logos.map((p) => (
                <li key={p.name} className="s-partner">
                  <span className="s-partner__logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.name}
                      loading="lazy"
                      style={{ height: `calc(var(--s-logo-h) * ${p.scale})` }}
                    />
                  </span>
                  {p.caption && (
                    <span className="s-partner__name" aria-hidden="true">
                      {p.caption}
                    </span>
                  )}
                </li>
              ))}
            </ul>
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
            <ul className="s-cards s-rail">
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
        <Sectors />

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
        <HowWeWork />

        {/* 8. In their words */}
        <section className="s-section s-section--tint s-words">
          <div className="container">
            <div className="s-head s-head--split">
              <div>
                <p className="s-label s-label--accent">{VIDEO_TESTIMONIALS.label}</p>
                <h2 className="s-h2">{VIDEO_TESTIMONIALS.heading}</h2>
              </div>
              <p className="s-head__intro">{VIDEO_TESTIMONIALS.intro}</p>
            </div>
            <VideoTestimonials />
          </div>
        </section>

        {/* 9. Free campaign check */}
        <section id="campaign-check" className="s-section s-section--light">
          <div className="container s-split s-split--check">
            <div className="s-split__text">
              <p className="s-label s-label--accent">{CHECK.label}</p>
              <h2 className="s-h2">{CHECK.heading}</h2>
              <p className="s-lead">{CHECK.body}</p>
            </div>
            <CampaignCheck />
          </div>
        </section>

        {/* 10. Watch the work */}
        <section className="s-section s-section--dark s-watch">
          <div className="container">
            <div className="s-watch__head">
              <h2 className="s-hw__title">{WATCH.heading}</h2>
              {SOCIAL_LINKS.length > 0 && (
                <div className="s-watch__social">
                  <p>{WATCH.channelsLine}</p>
                  <ul className="s-watch__channels">
                    {SOCIAL_LINKS.map((c) => (
                      <li key={c.name}>
                        <a href={c.url} target="_blank" rel="noopener noreferrer">
                          {c.name} <span aria-hidden="true">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <FilmButton
              className="s-watch__film"
              playIcon={false}
              ariaLabel={`Watch the film: ${WATCH.filmTitle}, ${WATCH.filmLength}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/video/stratco-film-poster.jpg"
                alt=""
                loading="lazy"
              />
              <span className="s-watch__shade" aria-hidden="true" />
              <span className="s-watch__play" aria-hidden="true">
                <svg viewBox="0 0 12 14">
                  <path d="M0 0v14l12-7z" fill="currentColor" />
                </svg>
              </span>
              <span className="s-watch__caption">
                <span className="s-watch__title">{WATCH.filmTitle}</span>
                <span className="s-watch__line">
                  {WATCH.filmLine} <span>{WATCH.filmLength}</span>
                </span>
              </span>
            </FilmButton>
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
      <Reveal />
    </div>
  );
}
