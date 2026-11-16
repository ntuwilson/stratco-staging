'use client';

import React, { useState } from 'react';
import { CASE_STUDIES } from '@/data/stratcoData';
import { CASES, WORK_PAGE, type SectorKey } from '@/data/siteCopy';

function caseImage(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug)?.image ?? '';
}

/** Work index: sector filters over the case cards used on the home page. */
export default function WorkIndex() {
  const [filter, setFilter] = useState<'all' | SectorKey>('all');
  const shown = CASES.filter((c) => filter === 'all' || c.sector === filter);

  return (
    <>
      <section className="s-pagehead">
        <div className="container">
          <h1 className="s-h1">{WORK_PAGE.heading}</h1>
          <p className="s-lead">{WORK_PAGE.line}</p>
          <div className="s-filters" role="group" aria-label="Filter by sector">
            {WORK_PAGE.filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`s-filter ${filter === f.key ? 'is-active' : ''}`}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="s-section s-section--light" style={{ paddingTop: 0 }}>
        <div className="container">
          {shown.length === 0 ? (
            <p className="s-empty" role="status">
              No published case in this sector yet.
            </p>
          ) : (
            <ul className="s-cards" aria-live="polite">
              {shown.map((c) => (
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
                      <h2 className="s-card__title">{c.name}</h2>
                      <p className="s-card__text">{c.oneLine}</p>
                      <p className="s-card__meta">{c.year}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
