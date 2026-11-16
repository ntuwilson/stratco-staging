'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CHECK, type CheckQuestion } from '@/data/siteCopy';
import { trackEvent } from '@/config/analytics';

const QUESTIONS = CHECK.questions;
const MAX = QUESTIONS.length * 3;
const NOT_DECIDED = 'Not decided';

/** Answer per question: option index (single) or list of indexes (multi). */
type Answer = number | number[] | undefined;

function channelScore(picked: number[], q: CheckQuestion) {
  const labels = picked.map((i) => q.options[i].label);
  if (labels.length === 0 || labels.includes(NOT_DECIDED)) return 0;
  return labels.length === 2 || labels.length === 3 ? 3 : 2;
}

function scoreFor(q: CheckQuestion, a: Answer) {
  if (a === undefined) return 0;
  if (q.multi) return channelScore(a as number[], q);
  return q.options[a as number].score;
}

function answerText(q: CheckQuestion, a: Answer) {
  if (a === undefined) return '—';
  if (q.multi) return (a as number[]).map((i) => q.options[i].label).join(', ');
  return q.options[a as number].label;
}

/**
 * Free campaign check: one question at a time, then a readiness score and
 * three next steps. Runs entirely in the browser; nothing is stored.
 */
export default function CampaignCheck() {
  // -1 = intro, 0..5 = questions, 6 = result
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answer[]>(() =>
    QUESTIONS.map(() => undefined)
  );
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const advanceTimer = useRef<number | null>(null);
  const mounted = useRef(false);

  const done = step >= QUESTIONS.length;

  // Move focus to the new step's heading (skip the first render)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(
    () => () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    },
    []
  );

  const result = useMemo(() => {
    const scores = QUESTIONS.map((q, i) => scoreFor(q, answers[i]));
    const total = scores.reduce((sum, s) => sum + s, 0);
    const pct = Math.round((total / MAX) * 100);
    const band = CHECK.bands.find((b) => pct >= b.min) ?? CHECK.bands[2];
    // Three lowest-scoring areas; ties keep question order
    const weakest = QUESTIONS.map((q, i) => ({ q, score: scores[i], i }))
      .filter((x) => x.score < 3)
      .sort((a, b) => a.score - b.score || a.i - b.i)
      .slice(0, 3);
    return { pct, band, weakest };
  }, [answers]);

  const start = () => {
    trackEvent('campaign_check_start');
    setStep(0);
  };

  const goTo = (next: number) => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    if (next >= QUESTIONS.length) {
      const scores = QUESTIONS.map((q, i) => scoreFor(q, answers[i]));
      const pct = Math.round(
        (scores.reduce((s, v) => s + v, 0) / MAX) * 100
      );
      const band = CHECK.bands.find((b) => pct >= b.min) ?? CHECK.bands[2];
      trackEvent('campaign_check_complete', { score: pct, band: band.name });
    }
    setStep(next);
  };

  const pickSingle = (qi: number, oi: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)));
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => goTo(qi + 1), 320);
  };

  const toggleMulti = (qi: number, oi: number) => {
    const q = QUESTIONS[qi];
    const notDecided = q.options.findIndex((o) => o.label === NOT_DECIDED);
    setAnswers((prev) =>
      prev.map((a, i) => {
        if (i !== qi) return a;
        const current = (a as number[] | undefined) ?? [];
        if (oi === notDecided) return current.includes(oi) ? [] : [oi];
        const withoutNd = current.filter((x) => x !== notDecided);
        return withoutNd.includes(oi)
          ? withoutNd.filter((x) => x !== oi)
          : [...withoutNd, oi];
      })
    );
  };

  const restart = () => {
    setAnswers(QUESTIONS.map(() => undefined));
    setStep(0);
  };

  // Hand the result to the proposal form and scroll there
  const talkToUs = () => {
    const summary = [
      `Campaign check: ${result.pct}/100 (${result.band.name})`,
      ...QUESTIONS.map((q, i) => `${q.areaName}: ${answerText(q, answers[i])}`),
    ].join('\n');
    trackEvent('generate_lead', {
      method: 'campaign_check',
      score: result.pct,
      band: result.band.name,
    });
    trackEvent('campaign_check_contact', { score: result.pct });
    window.dispatchEvent(
      new CustomEvent('stratco:prefill-brief', { detail: summary })
    );
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const q = !done && step >= 0 ? QUESTIONS[step] : null;
  const a = q ? answers[step] : undefined;
  const progress = done ? 100 : step < 0 ? 0 : (step / QUESTIONS.length) * 100;

  return (
    <div className="s-checkcard">
      <div
        className="s-checkcard__bar"
        role="progressbar"
        aria-label="Campaign check progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="s-checkcard__body" aria-live="polite">
        {step < 0 && (
          <div className="s-checkcard__intro">
            <p className="s-checkcard__step">6 questions · about a minute</p>
            <ol className="s-checkcard__areas">
              {QUESTIONS.map((item) => (
                <li key={item.area}>{item.areaName}</li>
              ))}
            </ol>
            <button
              type="button"
              className="s-btn s-btn--primary s-checkcard__start"
              onClick={start}
            >
              {CHECK.button}
            </button>
          </div>
        )}

        {q && (
          <div
            className="s-checkcard__q"
            role="group"
            aria-labelledby={`check-q-${step}`}
          >
            <p className="s-checkcard__step">
              Question {step + 1} of {QUESTIONS.length} · {q.areaName}
            </p>
            <h3
              ref={headingRef}
              id={`check-q-${step}`}
              tabIndex={-1}
              className="s-checkcard__question"
            >
              {q.question}
            </h3>
            {q.multi && (
              <p className="s-checkcard__hint">Choose all that apply.</p>
            )}
            <div className="s-checkcard__options">
              {q.options.map((o, oi) => {
                const selected = q.multi
                  ? ((a as number[] | undefined) ?? []).includes(oi)
                  : a === oi;
                return (
                  <button
                    key={o.label}
                    type="button"
                    className={`s-option ${selected ? 'is-selected' : ''}`}
                    aria-pressed={selected}
                    onClick={() =>
                      q.multi ? toggleMulti(step, oi) : pickSingle(step, oi)
                    }
                  >
                    <span className="s-option__mark" aria-hidden="true" />
                    {o.label}
                  </button>
                );
              })}
            </div>
            <div className="s-checkcard__nav">
              <button
                type="button"
                className="s-link s-checkcard__back"
                onClick={() => (step === 0 ? setStep(-1) : goTo(step - 1))}
              >
                ← Back
              </button>
              {(q.multi || a !== undefined) && (
                <button
                  type="button"
                  className="s-btn s-btn--dark s-btn--sm"
                  disabled={
                    q.multi
                      ? ((a as number[] | undefined) ?? []).length === 0
                      : false
                  }
                  onClick={() => goTo(step + 1)}
                >
                  {step === QUESTIONS.length - 1 ? 'See my score' : 'Next'}
                </button>
              )}
            </div>
          </div>
        )}

        {done && (
          <div className="s-checkcard__result">
            <p className="s-checkcard__step">Your campaign readiness</p>
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="s-checkcard__score"
            >
              <strong>{result.pct}</strong>
              <span>/100</span>
            </h3>
            <p className="s-checkcard__band">{result.band.name}</p>
            <p className="s-checkcard__line">{result.band.line}</p>

            <h4 className="s-checkcard__tips-title">Your three next steps</h4>
            <ol className="s-checkcard__tips">
              {result.weakest.length > 0
                ? result.weakest.map((w) => (
                    <li key={w.q.area}>
                      <span>
                        <strong>{w.q.areaName}.</strong> {w.q.tip}
                      </span>
                    </li>
                  ))
                : CHECK.momentumTips.map((t) => (
                    <li key={t}>
                      <span>{t}</span>
                    </li>
                  ))}
              {result.weakest.length > 0 &&
                result.weakest.length < 3 &&
                CHECK.momentumTips
                  .slice(0, 3 - result.weakest.length)
                  .map((t) => (
                    <li key={t}>
                      <span>{t}</span>
                    </li>
                  ))}
            </ol>

            <div className="s-checkcard__actions">
              <button
                type="button"
                className="s-btn s-btn--primary"
                onClick={talkToUs}
              >
                Talk to us about this campaign
              </button>
              <button
                type="button"
                className="s-btn s-btn--outline"
                onClick={restart}
              >
                Start again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
