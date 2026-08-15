import { useEffect, useRef, useState } from 'react';
import {
  siAirtable,
  siAnthropic,
  siCplusplus,
  siExpress,
  siFigma,
  siGithub,
  siGoogle,
  siJavascript,
  siMapbox,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siShopify,
  siSquare,
  siSquarespace,
  siTypescript,
  siVercel,
  siVite,
  siWordpress,
} from 'simple-icons';
import { CAPABILITIES } from '@/content/about';

// Named imports so only the marks actually used are bundled.
const ICONS = {
  siAirtable,
  siAnthropic,
  siCplusplus,
  siExpress,
  siFigma,
  siGithub,
  siGoogle,
  siJavascript,
  siMapbox,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siShopify,
  siSquare,
  siSquarespace,
  siTypescript,
  siVercel,
  siVite,
  siWordpress,
};

/* A full page of bare marks and accent labels, rising. No pill containers:
   the icons and the words ARE the page.

   Every lane gets the SAME number of marks. Dealt round-robin off a list that
   does not divide evenly, some columns ran short, so their tracks were shorter
   and the field looked ragged across.

   Each track is its list twice over and travels exactly -50%, which lands dead
   on the seam. The gap between marks is folded into each mark's own margin
   rather than being a flex `gap`, because with a gap the track is
   2n*h + (2n-1)*g tall and -50% falls half a gap short - a visible jump on
   every loop. */
function lanesFor(width) {
  if (width < 700) return 3;
  return width < 1050 ? 5 : 7;
}

export default function Toolkit({ shown, down }) {
  const [lanes, setLanes] = useState(() => lanesFor(window.innerWidth));
  const timer = useRef(null);

  useEffect(() => {
    const onResize = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setLanes(lanesFor(window.innerWidth)), 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const marks = CAPABILITIES.flatMap((c) => c.items.map((it) => ({ ...it, grow: !!c.growing })));
  const per = Math.ceil(marks.length / lanes);
  const cols = Array.from({ length: lanes }, (_, i) =>
    Array.from({ length: per }, (_, j) => marks[(j * lanes + i) % marks.length])
  );

  return (
    <>
      <div className="liftoff">
        <div className="wrap">
          <div
            className={`sec-head fade${shown ? ' in' : ''}`}
            style={{ textAlign: 'center', marginBottom: 0 }}
          >
            <p className="mono idx">03 · Toolkit</p>
            <h2 className="sectitle">
              Current tech stacks <em>&amp; what&apos;s next</em>
            </h2>
          </div>
        </div>

        <div
          className={`field${down ? ' down' : ''}`}
          style={{ gridTemplateColumns: `repeat(${lanes},minmax(0,1fr))` }}
          aria-hidden="true"
        >
          {cols.map((col, i) => {
            // Tracks are equal length, so pace is set purely here. A wide
            // desktop field at 74s read as barely moving; a phone column
            // still wants slow.
            const dur = lanes === 3 ? 70 + i * 8 : 34 + i * 3;
            return (
              <div className="lane" key={i}>
                <div className="lane-track" style={{ '--dur': `${dur}s` }}>
                  {[...col, ...col].map((it, j) => {
                    const mark = it.i ? ICONS[it.i] : null;
                    return (
                      <span className={`tool${it.grow ? ' grow' : ''}`} key={`${it.n}-${j}`}>
                        {mark && (
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            style={{ fill: 'currentColor' }}
                          >
                            <path d={mark.path} />
                          </svg>
                        )}
                        <span>{it.n}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
