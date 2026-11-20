'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface GalleryPhoto {
  src: string;
  caption: string;
}

/**
 * Case photos: one wide lead image, then a grid. Any photo opens a full-screen
 * viewer with previous / next, the arrow keys and Esc.
 */
export default function CaseGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);

  const go = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) =>
        i === null ? i : (i + dir + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, go]);

  if (photos.length === 0) return null;

  // Lead photo plus an even set below (6 on a 3-column grid, else 4 or 2 on a
  // 2-column grid) so rows never end with a single orphan; the viewer has all
  const rest = photos.length - 1;
  const shown = rest >= 6 ? 6 : rest >= 4 ? 4 : rest >= 2 ? 2 : rest;
  const visible = photos.slice(0, 1 + shown);
  const hidden = photos.length - visible.length;

  return (
    <>
      <ul className={`s-gallery ${shown === 6 ? '' : 's-gallery--2'}`}>
        {visible.map((p, i) => (
          <li key={p.src} className={i === 0 ? 's-gallery__lead' : ''}>
            <button
              type="button"
              className="s-gallery__item"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`Open photo ${i + 1} of ${photos.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.caption} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <button
          type="button"
          className="s-btn s-btn--outline s-gallery__more"
          onClick={(e) => {
            lastTrigger.current = e.currentTarget;
            setOpen(visible.length);
          }}
        >
          View all {photos.length} photos
        </button>
      )}

      {open !== null && (
        <div
          className="s-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${open + 1} of ${photos.length}`}
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            className="film-lightbox__close"
            onClick={close}
          >
            <span>Close</span>
            <span aria-hidden="true">✕</span>
          </button>

          <figure className="s-viewer__frame" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[open].src} alt={photos[open].caption} />
            <figcaption>
              <span>
                {open + 1} / {photos.length}
              </span>
              {photos[open].caption}
            </figcaption>
          </figure>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="s-viewer__nav s-viewer__nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous photo"
              >
                ←
              </button>
              <button
                type="button"
                className="s-viewer__nav s-viewer__nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next photo"
              >
                →
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
