/* The typewriter, and the two timing helpers the whole sequence leans on.
   ══════════════════════════════════════════════════════════════════════
   The trick is that nothing here writes text. Every line is laid out IN FULL
   before a single character shows - one span per character, all hidden - and
   typing only flips characters visible. Because the copy already occupies its
   final box, nothing reflows: the line never re-centres, never rewraps, and
   the letters already written never move.

   React draws the spans (see Typed.jsx). This module only walks the finished
   DOM and reveals them, which is why it is plain functions rather than state:
   a line of 90 characters would otherwise be 90 renders.
   ══════════════════════════════════════════════════════════════════════ */

export const REDUCED =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* Resolves once an element has finished sliding into place. Typing that begins
   while its own block is still travelling reads as the text jumping upward as
   characters appear - which is exactly what a long entrance plus an immediate
   write-out produced. Falls back to a timeout so a transition that never fires
   cannot stall the sequence. */
export function settled(el, prop = 'transform', max = 900) {
  if (REDUCED || !el) return Promise.resolve();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.removeEventListener('transitionend', onEnd);
      resolve();
    };
    const onEnd = (e) => {
      if (e.target === el && e.propertyName === prop) finish();
    };
    el.addEventListener('transitionend', onEnd);
    setTimeout(finish, max);
  });
}

/* ── laying the copy out ─────────────────────────────────────────────
   Copy is split into at most four balanced lines. Breaking only ever happens
   between words, which is what keeps an emphasis marker from being orphaned
   on the far side of a line break.
   ------------------------------------------------------------------- */
const MAX_LINES = 4;

export function wrapLines(text, target) {
  const words = text.split(' ');
  const n = Math.min(MAX_LINES, Math.max(1, Math.ceil(text.length / target)));
  if (n === 1) return [text];
  // aim every line at the same length, so the block sits evenly
  const per = Math.ceil(text.length / n);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const grown = cur ? `${cur} ${w}` : w;
    if (cur && grown.length > per && lines.length < n - 1) {
      lines.push(cur);
      cur = w;
    } else cur = grown;
  }
  if (cur) lines.push(cur);
  return lines;
}

/* One line becomes a list of tokens ready to render:
     { em }        does this run carry the accent
     { word }      a run of characters that must never be split
     { space }     the whitespace between them, revealed like any character
   Characters are individual spans, so without the word wrapper a line could
   break in the middle of one. */
export function tokenise(line) {
  const runs = [];
  const re = /\*([^*]+)\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) runs.push({ em: false, text: line.slice(last, m.index) });
    runs.push({ em: true, text: m[1] });
    last = m.index + m[0].length;
  }
  if (last < line.length) runs.push({ em: false, text: line.slice(last) });

  return runs.map((run) => ({
    em: run.em,
    parts: run.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((part) => ({ space: /^\s+$/.test(part), text: part })),
  }));
}

/* ── the reveal ──────────────────────────────────────────────────────
   Driven by the frame clock, not by a chain of timers. setTimeout drifts and
   is clamped by the browser, and adding jitter or a pause on punctuation on
   top of that is what reads as stalling. How many characters should be
   showing is a pure function of elapsed time, so the reveal is even and
   frame-accurate.
   ------------------------------------------------------------------- */
/* A block writes itself exactly once, and a second request for one already
   writing joins the first rather than starting a competing loop. The record is
   kept against the node, so it survives a component re-running its effect -
   which React does on purpose in development, and did once make the second run
   skip the typing the first run had only just started. */
const runs = new WeakMap();

/* One caret per typed block, made once and reused. It lives in the block
   rather than on the current character precisely so that it is not part of any
   line: see the note on .tcaret in narrative.css for what a per-character
   pseudo-element cost. */
function caretFor(host) {
  let caret = host.querySelector('.tcaret');
  if (!caret) {
    caret = document.createElement('span');
    caret.className = 'tcaret';
    caret.setAttribute('aria-hidden', 'true');
  }
  // Deliberately not parented here. Where it belongs depends on the character
  // it is about to sit against, and placeCaret is what knows that.
  // stays hidden until it has somewhere to be, so it never flashes at 0,0
  caret.hidden = true;
  return caret;
}

/* Sit the caret against the right edge of a character. Offsets are read from
   the character's own box and applied as a transform, so moving the caret
   never writes a layout-affecting property. */
function placeCaret(caret, cell) {
  /* The caret is parented to the very box its numbers are measured from, and
     re-parented if that changes. Both come from the character, so they cannot
     disagree.

     They did disagree: playTyped is sometimes handed the heading that WRAPS a
     typed block rather than the block itself, and hanging the caret on that
     put it in a different positioning context from the offsets - which are
     always relative to the nearest positioned ancestor, the block. The numbers
     described a spot a few hundred pixels into the block; the caret read them
     against the whole panel and sat up near the top of the screen. */
  const anchor = cell.offsetParent;
  if (!anchor) return;
  if (caret.parentElement !== anchor) anchor.appendChild(caret);
  caret.style.height = `${cell.offsetHeight * 0.78}px`;
  caret.style.transform = `translate(${cell.offsetLeft + cell.offsetWidth}px, ${
    cell.offsetTop + cell.offsetHeight * 0.16
  }px)`;
  caret.hidden = false;
}

export function playTyped(host) {
  if (!host) return Promise.resolve();
  const already = runs.get(host);
  if (already) return already;

  const cells = [...host.querySelectorAll('.c')];
  if (!cells.length) return Promise.resolve();
  // already written, by a run whose node this one inherited
  if (cells[cells.length - 1].classList.contains('on')) return Promise.resolve();

  if (REDUCED) {
    cells.forEach((c) => c.classList.add('on'));
    return Promise.resolve();
  }

  const rate = clamp(1500 / Math.max(12, cells.length), 13, 46);
  const lead = 180;
  host.classList.add('writing');

  const caret = caretFor(host);

  const run = new Promise((resolve) => {
    let start = performance.now();
    let last = start;
    let shown = 0;
    let tip = null;
    const frame = (now) => {
      // If frames stopped for a while - a hidden tab pauses rAF entirely - do
      // not let the elapsed time cash in all at once and dump the rest of the
      // line on screen. Slide the clock instead and carry on from here.
      if (now - last > 400) start += now - last;
      last = now;
      const due = clamp(Math.floor((now - start - lead) / rate), 0, cells.length);
      while (shown < due) {
        cells[shown].classList.add('on');
        shown += 1;
      }
      /* The caret rides the last revealed character, but never a space: a
         blank has no right edge for it to sit against, so it would read as
         floating in the gap between two words. */
      let mark = shown - 1;
      while (mark > 0 && !cells[mark].textContent.trim()) mark -= 1;
      if (shown > 0 && cells[mark] !== tip) {
        tip = cells[mark];
        placeCaret(caret, tip);
      }
      if (shown < cells.length) {
        requestAnimationFrame(frame);
        return;
      }
      host.classList.remove('writing');
      setTimeout(() => {
        caret.hidden = true;
        resolve();
      }, 140);
    };
    requestAnimationFrame(frame);
  });

  runs.set(host, run);
  return run;
}

// Writes every block inside a container, one line after the next.
export function playGroup(root, gap = 260) {
  if (!root) return Promise.resolve();
  const blocks = [...root.querySelectorAll('[data-typed]')];
  return blocks.reduce(
    (chain, n, i) =>
      chain
        .then(() => playTyped(n))
        // no pause after the LAST line: whatever comes next (the arrow) should
        // arrive as the final character does, not a beat behind it
        .then(() => wait(REDUCED || i === blocks.length - 1 ? 0 : gap)),
    Promise.resolve()
  );
}
