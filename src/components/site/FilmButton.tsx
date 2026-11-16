'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A button that opens the full programme film (with sound) in a lightbox.
 * The film only downloads once the button is pressed.
 */
export default function FilmButton({
  className,
  children,
  onOpenChange,
}: {
  className: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    onOpenChange?.(open);
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close, onOpenChange]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <svg viewBox="0 0 12 14" aria-hidden="true" className="s-play">
          <path d="M0 0v14l12-7z" fill="currentColor" />
        </svg>
        {children}
      </button>

      {open && (
        <div
          className="film-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Her Digital Future — programme film"
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
          <div
            className="film-lightbox__frame"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="film-lightbox__video"
              src="/video/stratco-film-720.mp4"
              poster="/video/stratco-film-poster.jpg"
              controls
              autoPlay
              playsInline
              preload="auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
