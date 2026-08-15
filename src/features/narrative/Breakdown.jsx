import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { KIND, WORK } from '@/content/narrative';

/* The project dialog: ONE container, two depths.
   ══════════════════════════════════════════════════════════════════════
   Clicking a card opens it at the first depth, carrying exactly what the
   small card used to carry - the shot rail, the teaser, the scope rows and
   the stack. Asking for the breakdown does not open a second thing: the
   long-form write-up unfolds underneath, in the same container, and the
   body scrolls.

   That is the whole point of the shape. A card that opened a small panel
   which then opened a large one made the reader cross two thresholds to
   reach content that was always going to fit in the large one.
   ══════════════════════════════════════════════════════════════════════ */
export default function Breakdown({ on, openKey, onClose }) {
  const p = WORK.find((x) => x.key === openKey) || null;

  useEffect(() => {
    if (!on) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [on, onClose]);

  return (
    <>
      <div className={`bd-scrim${on ? ' on' : ''}`} onClick={onClose} />
      {/* `on && p`, never `on` alone: an empty dialog collapses to its own
          border, and a 1px line across a dimmed page reads as the site having
          broken rather than as a dialog with nothing in it */}
      <article
        className={`bd${on && p ? ' on' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Project breakdown"
      >
        {/* keyed on the project, so opening a second one starts at the first
            depth on its own first screenshot, never where the last was left */}
        {p && <Body key={p.key} p={p} onClose={onClose} />}
      </article>
    </>
  );
}

function Body({ p, onClose }) {
  const railRef = useRef(null);
  const bodyRef = useRef(null);
  const moreRef = useRef(null);
  const closeRef = useRef(null);
  const [shot, setShot] = useState(0);
  const [deep, setDeep] = useState(false);
  const d = p.detail || {};

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  const goShot = (i) => {
    const rail = railRef.current;
    if (rail) rail.scrollTo({ left: rail.clientWidth * i, behavior: 'smooth' });
  };

  // Opening the detail should move the reader to it, or the content they just
  // asked for unfolds below the fold and nothing appears to have happened.
  const openDeep = () => {
    setDeep(true);
    requestAnimationFrame(() => {
      const body = bodyRef.current;
      const more = moreRef.current;
      if (body && more) body.scrollTo({ top: more.offsetTop - 16, behavior: 'smooth' });
    });
  };

  const closeDeep = () => {
    setDeep(false);
    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="bd-top">
        <div>
          <p className="mono">{p.tag}</p>
          <h3>{p.title}</h3>
        </div>
        <span className="bd-kind">{KIND[p.kind]}</span>
        {/* Where to go and see it, in line with the other controls rather than
            a row of its own. It sits in the header so it is reachable at both
            depths without scrolling - for the client sites and the resources
            page this is the only route to them anywhere on the site. */}
        <Links links={p.links} />
        <button className="bd-close" ref={closeRef} aria-label="Close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className={`bd-body${deep ? ' deep' : ''}`} ref={bodyRef}>
        {/* the summary is the two-column part; the write-up is a plain block
            beneath it rather than a second grid row, because a grid row sized
            itself to the shorter column and let the write-up draw underneath
            the shot rail */}
        <div className="bd-summary">
          <div className="bd-shots">
            <div
              className="bd-rail"
              ref={railRef}
              onScroll={(e) =>
                setShot(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))
              }
            >
              {p.shots.map((s) => (
                <figure key={s.src}>
                  <img src={s.src} alt={s.title} />
                </figure>
              ))}
            </div>
            {p.shots.length > 1 && (
              <>
                <button
                  className="bd-arrow prev"
                  onClick={() => goShot(Math.max(0, shot - 1))}
                  disabled={shot === 0}
                  aria-label="Previous screenshot"
                >
                  ‹
                </button>
                <button
                  className="bd-arrow next"
                  onClick={() => goShot(Math.min(p.shots.length - 1, shot + 1))}
                  disabled={shot === p.shots.length - 1}
                  aria-label="Next screenshot"
                >
                  ›
                </button>
                <div className="bd-dots">
                  {p.shots.map((s, i) => (
                    <button
                      key={s.src}
                      className={i === shot ? 'on' : undefined}
                      aria-label={s.title}
                      aria-current={i === shot}
                      onClick={() => goShot(i)}
                    />
                  ))}
                </div>
              </>
            )}
            {/* The caption belongs to the shot on screen, not inside the rail.
              Inside it, every figure takes the height of the longest caption
              and the whole column outgrows its grid row. */}
            <div className="bd-shotcap">
              <b>{p.shots[shot]?.title}</b>
              {deep && p.shots[shot]?.caption && <span>{p.shots[shot].caption}</span>}
            </div>
          </div>

          <div className="bd-side">
            <p className="mono">What it is</p>
            <p className="teaser">{p.teaser}</p>
            <div className="bd-chips">
              {p.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>

            {!deep && (
              <button className="bd-more-btn" onClick={openDeep}>
                Open the full breakdown <em aria-hidden="true">↓</em>
              </button>
            )}
          </div>
        </div>

        {deep && (
          <div className="bd-more" ref={moreRef}>
            <Detail p={p} d={d} />
            <div className="bd-more-foot">
              <button className="bd-more-btn ghost" onClick={closeDeep}>
                Hide the detail <em aria-hidden="true">↑</em>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* The long-form write-up. Projects and client sites carry different things,
   so each renders what it actually has rather than being forced into one
   shape with empty rows in it. */
function Detail({ p, d }) {
  return p.kind === 'project' ? <ProjectDetail d={d} /> : <SiteDetail p={p} d={d} />;
}

function ProjectDetail({ d }) {
  const [why, setWhy] = useState(null);

  return (
    <>
      {d.role && <p className="bd-role">{d.role}</p>}

      {d.beats?.map((b) => (
        <div className="bd-beat" key={b.b}>
          <b>{b.b}</b>
          {/* the accent spans are authored in the content as markup, the same
              way the old case study rendered them */}
          <p dangerouslySetInnerHTML={{ __html: b.p }} />
        </div>
      ))}

      {d.stack?.length > 0 && (
        <>
          <p className="mono bd-sub">Built with</p>
          <div className="bd-stackgrid">
            {d.stack.map((g) => (
              <div key={g.group}>
                <b>{g.group}</b>
                <div>
                  {g.chips.map((c) => (
                    <span
                      key={c.name}
                      className="chip live"
                      tabIndex={0}
                      onMouseEnter={() => setWhy(c)}
                      onFocus={() => setWhy(c)}
                      onMouseLeave={() => setWhy(null)}
                      onBlur={() => setWhy(null)}
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className={`bd-why${why ? ' lit' : ''}`}>
            {why ? (
              <>
                <em>{why.name}</em>
                {why.why}
              </>
            ) : (
              'Hover or tap a technology to see why it is there.'
            )}
          </p>
        </>
      )}

      {d.build && <BuildFlow build={d.build} />}
    </>
  );
}

function BuildFlow({ build }) {
  const [step, setStep] = useState(0);

  return (
    <>
      <p className="mono bd-sub">How it runs</p>
      {build.cap && <p className="bd-cap">{build.cap}</p>}
      <div className="bd-flow">
        {build.flow.map((f, i) => (
          <span key={f.label} style={{ display: 'contents' }}>
            {i > 0 && (
              <span className="bd-farrow" aria-hidden="true">
                →
              </span>
            )}
            <button
              type="button"
              className={`bd-fstep${i === step ? ' on' : ''}`}
              onClick={() => setStep(i)}
            >
              <b>{f.label}</b>
              <span>{f.sub}</span>
            </button>
          </span>
        ))}
      </div>
      <p className="bd-fdetail">{build.flow[step].detail}</p>

      {build.kv?.length > 0 && (
        <div className="bd-kv">
          {build.kv.map(([k, v]) => (
            <div key={k}>
              <b>{k}</b>
              <span>{v}</span>
            </div>
          ))}
        </div>
      )}

      {build.mods?.length > 0 && (
        <div className="bd-mods">
          <b>{build.modsTitle}</b>
          {build.mods.map(([name, what, detail]) => (
            <details key={name}>
              <summary>
                <b>{name}</b>
                <i>{what}</i>
              </summary>
              <p>{detail}</p>
            </details>
          ))}
        </div>
      )}
    </>
  );
}

function SiteDetail({ d }) {
  const r = d.role || {};
  return (
    <>
      {r.lead && (
        <p className="bd-role">
          {r.lead}
          {r.crossLabel && <b>{r.crossLabel}</b>}
          {r.tail || ''}
        </p>
      )}
      {d.cross?.lead && (
        <div className="bd-beat">
          <b>{d.cross.title}</b>
          <p>
            {d.cross.lead}
            {d.cross.crossLabel && <b>{d.cross.crossLabel}</b>}
            {d.cross.tail || ''}
          </p>
        </div>
      )}
      <p className="mono bd-sub">The screens</p>
      <p className="bd-cap">
        Each shot above carries what that screen does, and why it is built that way.
      </p>
    </>
  );
}

const OUT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

/* An icon rather than a labelled button: it holds the header line with the
   kind badge and the close control, and the destination is carried by the
   accessible name and the tooltip instead of by visible text.

   An internal href routes rather than reloading; the resources page is the
   one that matters, since a full load there takes the host's 404 bounce. */
function Links({ links = [] }) {
  if (!links.length) return null;
  return (
    <>
      {links.map((l) =>
        l.href.startsWith('http') ? (
          <a
            className="bd-out"
            key={l.href}
            href={l.href}
            title={l.label}
            aria-label={l.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {OUT}
          </a>
        ) : (
          <Link className="bd-out" key={l.href} to={l.href} title={l.label} aria-label={l.label}>
            {OUT}
          </Link>
        )
      )}
    </>
  );
}
