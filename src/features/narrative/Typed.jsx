import { Fragment } from 'react';
import { tokenise, wrapLines } from './typewriter';

// One character. They are revealed in document order, so the order they are
// written here is the order they appear on screen.
const Chars = ({ text }) =>
  [...text].map((ch, i) => (
    <span className="c" key={i}>
      {ch}
    </span>
  ));

/* A block of copy, laid out in full and hidden, ready to be revealed a
   character at a time by playTyped().

   `wrap` is the line length to aim for. It is a target, not a limit: the copy
   is split into at most four lines all of roughly that length, so the block
   sits evenly rather than ending on one short line.

   Nothing here animates. The markup is the whole job - see typewriter.js. */
export default function Typed({ text, wrap = 42, className }) {
  const lines = wrapLines(text, wrap);

  return (
    <span className={`tblock${className ? ` ${className}` : ''}`} data-typed>
      {lines.map((line, li) => (
        <span className="tline" key={li}>
          {tokenise(line).map((run, ri) => {
            const body = run.parts.map((part, pi) =>
              part.space ? (
                // whitespace is revealed like any other character, so the gap
                // between two words never appears before the words do
                <Fragment key={pi}>
                  <Chars text={part.text} />
                </Fragment>
              ) : (
                // characters are separate spans, so without this wrapper a
                // line could break in the middle of a word
                <span className="w" key={pi}>
                  <Chars text={part.text} />
                </span>
              )
            );
            return run.em ? <em key={ri}>{body}</em> : <Fragment key={ri}>{body}</Fragment>;
          })}
        </span>
      ))}
    </span>
  );
}
