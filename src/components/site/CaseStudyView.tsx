import React from 'react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import CaseGallery, { type GalleryPhoto } from '@/components/site/CaseGallery';
import Reveal from '@/components/site/Reveal';
import FilmButton from '@/components/site/FilmButton';
import VideoTestimonials from '@/components/site/VideoTestimonials';
import { VIDEO_TESTIMONIALS, type CaseCopy } from '@/data/siteCopy';

/**
 * Case study, in the blueprint's structure:
 * header (client, year, big figure) · film or lead photo · brief, answer,
 * result · photo gallery · testimonials (film cases) · request a proposal.
 */
export default function CaseStudyView({
  item,
  image,
  photos,
  next,
}: {
  item: CaseCopy;
  image: string;
  photos: GalleryPhoto[];
  next: CaseCopy;
}) {
  return (
    <div className="s-site">
      <SiteNav />

      <main>
        <section className="s-pagehead">
          <div className="container">
            <a href="/work/" className="s-back">
              ← All work
            </a>
            <div className="s-case-head__grid">
              <h1 className="s-h1">{item.name}</h1>
              <p className="s-case-figure">
                <strong>{item.figure.value}</strong>
                <span>{item.figure.label}</span>
              </p>
            </div>
            <dl className="s-facts">
              <div>
                <dt>Client</dt>
                <dd>{item.client}</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>{item.where}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{item.year}</dd>
              </div>
            </dl>
          </div>
        </section>

        <div className="container">
          <figure className="s-case-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.film ? '/video/stratco-film-poster.jpg' : image}
              alt={item.name}
            />
            {item.film && (
              <FilmButton className="s-btn s-btn--light s-film__play">
                Watch the film
              </FilmButton>
            )}
          </figure>
        </div>

        <section className="s-section s-section--light s-section--case-body">
          <div className="container s-case-body">
            <div className="s-case-block">
              <h2 className="s-case-block__title">
                <span>01</span> The brief
              </h2>
              <p>{item.brief}</p>
            </div>
            <div className="s-case-block">
              <h2 className="s-case-block__title">
                <span>02</span> Our answer
              </h2>
              <ul>
                {item.answer.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div className="s-case-block s-case-block--result">
              <h2 className="s-case-block__title">
                <span>03</span> The result
              </h2>
              <p>{item.result}</p>
            </div>
          </div>
        </section>

        {photos.length > 0 && (
          <section className="s-section s-section--tint s-case-photos" aria-labelledby="photos-heading">
            <div className="container">
              <div className="s-case-photos__head">
                <h2 id="photos-heading" className="s-h3">In pictures</h2>
                <p>{photos.length} photos · tap any photo to view it full screen</p>
              </div>
              <CaseGallery photos={photos} />
            </div>
          </section>
        )}

        {item.film && (
          <section
            className="s-section s-section--light"
            aria-labelledby="vt-heading"
          >
            <div className="container">
              <h2 id="vt-heading" className="s-h3 s-vcards__heading">
                {VIDEO_TESTIMONIALS.heading}
              </h2>
              <VideoTestimonials />
            </div>
          </section>
        )}

        {/* One closing block: the proposal ask, then the next case */}
        <section className="s-section s-section--dark">
          <div className="container">
            <div className="s-cta-band">
              <h2 className="s-h2">Planning something similar?</h2>
              <a href="/#contact" className="s-btn s-btn--primary">
                Request a proposal
              </a>
            </div>
            <a href={`/work/${next.slug}/`} className="s-next-row">
              <span className="s-next-row__label">Next case</span>
              <span className="s-next-row__name">{next.name} →</span>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <Reveal />
    </div>
  );
}
