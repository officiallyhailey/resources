import { useCallback, useEffect, useRef } from 'react';
import { ARC, NARROW_AT, THUMB, WORK } from '@/content/narrative';
import { clamp } from './typewriter';

/* The work, ringed behind the profile card.
   ══════════════════════════════════════════════════════════════════════
   Two straight fans from the middle of the card, one climbing and one
   dropping, each card stepping half a card sideways from the last until the
   outermost lands on the screen edge. The rules are in ARC; this file only
   applies them.

   The geometry is measured rather than guessed, because it hangs off the
   profile card's real position - which moves with the viewport, and again
   once the fonts land. Hence the three re-measures at the bottom.
   ══════════════════════════════════════════════════════════════════════ */
export default function Arc({ dealt, chosen, picked, onChoose }) {
  const arcRef = useRef(null);

  const layout = useCallback(() => {
    const arc = arcRef.current;
    if (!arc) return;
    const cards = [...arc.querySelectorAll('.acard')];

    // the phone layout drops the ring entirely, so the maths is skipped
    if (window.innerWidth <= NARROW_AT) {
      cards.forEach((c, i) => {
        c.removeAttribute('style');
        c.style.setProperty('--i', i);
      });
      return;
    }

    const beat = arc.parentElement;
    const slot = beat.querySelector('.focus');
    if (!slot) return;
    const br = beat.getBoundingClientRect();
    const sr = slot.getBoundingClientRect();
    // everything is measured from the middle of the profile card
    const cx = sr.left + sr.width / 2 - br.left;
    const cy = sr.top + sr.height / 2 - br.top;
    const vx = sr.left + sr.width / 2; // the same point, in the viewport
    const vy = sr.top + sr.height / 2;

    const P = ARC.perBranch;
    const M = ARC.margin;
    const capH = arc.querySelector('.cap')?.getBoundingClientRect().height || 43;
    const halfPW = sr.width / 2;

    // WIDTH comes from the sideways rule: the outermost card's far edge lands
    // on the screen border, having stepped half a card at a time from the
    // profile card's edge.  halfPW + (P-1)*aw/2 + aw/2 = spaceToBorder
    const spaceX = window.innerWidth - M - vx - halfPW;
    const aw = clamp(spaceX / (P / 2), ARC.minCard, ARC.maxCard);
    const h = aw * THUMB + capH;

    // HEIGHT is what a widescreen cannot give at the reference's scale, so the
    // spread is fitted to the room there is, keeping the reference's 3.05:1
    // ratio between the first offset and each step after it.
    const budget = Math.min(vy, window.innerHeight - vy) - M - h / 2;
    const step = Math.max(18, budget / (ARC.dropRatio + (P - 1)));
    const drop = step * ARC.dropRatio;

    cards.forEach((c, i) => {
      const up = i < P;
      const j = up ? i : i - P; // rank out from the middle
      const dx = halfPW + j * (aw * ARC.stepX); // exactly half a card, each
      const dy = drop + j * step;
      const d = ARC.depth[Math.min(j, ARC.depth.length - 1)];
      c.style.setProperty('--aw', `${aw.toFixed(1)}px`);
      c.style.setProperty('--x', `${(cx + dx - aw / 2).toFixed(1)}px`);
      c.style.setProperty('--y', `${(cy + (up ? -dy : dy) - h / 2).toFixed(1)}px`);
      c.style.setProperty('--rot', '0deg'); // upright, every one of them
      c.style.setProperty('--sat', d.sat);
      c.style.setProperty('--br', d.br);
      // Nearest the middle sits in front of its neighbours, which is what the
      // darkest card in the reference says. These stay UNDER the profile card
      // (z-index 5) so the ring reads as being behind it; hovering lifts one
      // clear above it, see .acard.lifted.
      c.style.setProperty('--z', String(4 - j));
    });
  }, []);

  useEffect(() => {
    layout();
    window.addEventListener('resize', layout);
    // the beat shifts a little as fonts and images land, and the run is
    // measured off the profile card - so measure again once those have settled
    window.addEventListener('load', layout);
    if (document.fonts?.ready) document.fonts.ready.then(layout);
    return () => {
      window.removeEventListener('resize', layout);
      window.removeEventListener('load', layout);
    };
  }, [layout]);

  // dealing re-measures first: the card may never have been laid out at this
  // width, and dealing to stale positions is what makes the ring arrive as a heap
  useEffect(() => {
    if (dealt) layout();
  }, [dealt, layout]);

  const lift = (e, on) => e.currentTarget.classList.toggle('lifted', on);

  return (
    <div
      className={`arc${dealt ? ' dealt' : ''}${picked ? ' picked' : ''}`}
      ref={arcRef}
      role="list"
      aria-label="Selected work"
    >
      {WORK.map((p, i) => (
        <div
          className={`acard${chosen === p.key ? ' chosen' : ''}`}
          data-key={p.key}
          style={{ '--i': i }}
          role="listitem"
          key={p.key}
          onMouseEnter={(e) => lift(e, true)}
          onMouseLeave={(e) => lift(e, false)}
        >
          <button
            className="acard-hit"
            aria-label={`Bring ${p.title} to the centre`}
            onFocus={(e) => e.currentTarget.parentElement.classList.add('lifted')}
            onBlur={(e) => e.currentTarget.parentElement.classList.remove('lifted')}
            onClick={() => onChoose(p.key)}
          >
            <span className="thumb">
              <img src={p.shot} alt="" loading="lazy" />
            </span>
            <span className="cap">
              <b>{p.title}</b>
              <span>{p.tag}</span>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
