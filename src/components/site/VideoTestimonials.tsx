import React from 'react';
import FilmButton from '@/components/site/FilmButton';
import { VIDEO_TESTIMONIALS } from '@/data/siteCopy';

/**
 * Her Digital Future testimonial videos: poster, play button and length only.
 * Each opens in the film lightbox with sound; nothing loads until clicked.
 * Swipes sideways on phones.
 */
export default function VideoTestimonials() {
  return (
    <ul className="s-vcards s-rail">
      {VIDEO_TESTIMONIALS.items.map((v) => {
        const who = v.name ? `${v.name}, ${v.district}` : v.district;
        return (
          <li key={v.key}>
            <FilmButton
              className="s-vcard"
              src={v.src}
              poster={v.poster}
              title={`Testimonial — ${who}`}
              playIcon={false}
              ariaLabel={`Play testimonial: ${who}, ${v.duration}`}
            >
              <span className="s-vcard__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.poster} alt="" loading="lazy" />
                <span className="s-vcard__play" aria-hidden="true">
                  <svg viewBox="0 0 12 14">
                    <path d="M0 0v14l12-7z" fill="currentColor" />
                  </svg>
                </span>
                <span className="s-vcard__time">{v.duration}</span>
              </span>
            </FilmButton>
          </li>
        );
      })}
    </ul>
  );
}
