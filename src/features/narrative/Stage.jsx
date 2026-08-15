import { useEffect, useRef, useState } from 'react';
import { ACT_ONE, SCRIPT } from '@/content/narrative';
import Arc from './Arc';
import ProfileCard from './ProfileCard';
import Typed from './Typed';
import { playGroup, playTyped, REDUCED, settled, wait } from './typewriter';

/* Stage one: three beats sharing one screen, advanced by click rather than by
   scroll. Each beat plays, stops, and waits.

   The pacing is written out here as one sequence rather than spread across CSS
   delays, so the timing of a beat is edited in one place. */
export default function Stage({ beatAt, onReady, chosen, onChoose }) {
  // The beats are always mounted and each is named, so they are addressed by
  // that name rather than through a ref for each one.
  const beatEl = (id) => document.querySelector(`#intro [data-beat="${id}"]`);
  const played = useRef(new Set());
  const [cardShown, setCardShown] = useState(false);
  const [dealt, setDealt] = useState(false);

  useEffect(() => {
    if (beatAt < 0) return undefined;
    let cancelled = false;
    const id = ACT_ONE[beatAt].id;
    const beat = beatEl(id);

    // Coming back to a beat already played: everything is written and dealt
    // already, so it should simply be there rather than typing itself out for
    // a second time.
    if (played.current.has(id)) {
      onReady(beatAt);
      return undefined;
    }

    (async () => {
      // let the beat land before a single character is written into it: typing
      // that starts while its own block is still travelling reads as the text
      // jumping upward as characters arrive
      await settled(beat);
      if (cancelled) return;

      if (id === 'intro') {
        // name, card, a short beat, the line - and the work deals itself out
        // the moment the line lands, so nobody has to be told to go and look
        await playTyped(beat.querySelector('[data-name]'));
        await wait(REDUCED ? 0 : 240);
        if (cancelled) return;
        setCardShown(true);
        await wait(REDUCED ? 0 : 850);
        if (cancelled) return;
        await playTyped(beat.querySelector('[data-tools]'));
        setDealt(true);
        await wait(REDUCED ? 0 : 380);
      } else {
        await playGroup(beat);
      }
      if (cancelled) return;
      // marked once it has finished, not when it starts: a beat left part way
      // through should still play out when the reader comes back to it
      played.current.add(id);
      onReady(beatAt);
    })();

    return () => {
      cancelled = true;
    };
  }, [beatAt, onReady]);

  const cls = (i) =>
    `beat b-${ACT_ONE[i].id}${i === beatAt ? ' on' : ''}${i < beatAt ? ' out' : ''}`;

  return (
    <>
      <div className={cls(0)} data-beat="welcome">
        <p className="line">
          <Typed text={SCRIPT.welcome} wrap={30} />
        </p>
        <p className="mono sub">
          <Typed text={SCRIPT.welcomeSub} wrap={30} />
        </p>
      </div>

      <div className={cls(1)} data-beat="statement">
        <p className="say">
          <Typed text={SCRIPT.statement} wrap={34} />
        </p>
      </div>

      <div className={cls(2)} data-beat="intro">
        <div className="copyside">
          <h1 data-name>
            <Typed text={SCRIPT.name} wrap={20} />
          </h1>
          <p className="tools" data-tools>
            <Typed text={SCRIPT.tools} wrap={26} />
          </p>
        </div>

        {/* The profile card holds the centre and stays there. Picking a card
            from the ring opens the project dialog directly: it used to swap a
            small card in here first, which meant crossing two thresholds to
            reach content that was always going to need the larger container. */}
        <div className="cardside">
          <div className="focus">
            <div className="focus-me">
              <ProfileCard shown={cardShown} />
            </div>
          </div>
        </div>

        <Arc dealt={dealt} chosen={chosen} picked={!!chosen} onChoose={onChoose} />
      </div>
    </>
  );
}
