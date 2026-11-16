import React from 'react';

/**
 * Renders copy, marking every [bracketed] fact that is still to be confirmed
 * with a dashed underline so it can't be mistaken for final content.
 */
export default function Placeholder({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={i} className="s-ph" title="To be confirmed before publishing">
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
