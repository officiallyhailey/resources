import { useEffect, useLayoutEffect, useState } from 'react';
import { SITES, SITE_KEYS, SITE_TITLES } from '@/content/sites';
import { useDeck } from '@/hooks/useDeck';
import { usePanels } from '@/hooks/usePanels';

// Tier 2: client sites. Same deck gesture as the projects, in lighter stock -
// and the breakdowns open in place, so nobody is sent off-site to learn about
// the work. The visit link comes after the story, not instead of it.
export default function Sites({ onCross }) {
  const { openKey, fading, sectionRef, deckRef, stageRefs, open, close, goTo } = useDeck('.site');

  return (
    <section id="clients" ref={sectionRef}>
      <div className="wrap">
        <div className="head">
          <div>
            <p className="idx rv">02 - Sites I build &amp; maintain</p>
            <h2 className="sectitle rv">
              Built for real <span className="o">clients</span>
            </h2>
          </div>
          <p className="idx rv" style={{ maxWidth: '32ch', textAlign: 'right' }}>
            Client sites I built and still run. Each one opens a breakdown here.
          </p>
        </div>

        <div className="sites pane rv in" ref={deckRef} hidden={!!openKey}>
          {SITES.map((s) => (
            <span className="siteslot" key={s.key}>
              <button
                className="site"
                style={{ '--rot': s.tilt.rot, '--dy': s.tilt.dy }}
                aria-label={`Open the ${s.title} breakdown`}
                onClick={(e) => open(s.key, e.currentTarget)}
              >
                <span className="thumb">
                  <img src={s.thumb} alt={s.thumbAlt} loading="lazy" />
                  <span className="pfly">
                    <p>{s.teaser}</p>
                    <span className="visit">
                      See the breakdown <em>→</em>
                    </span>
                  </span>
                </span>
                <span className="sbody">
                  <span className="plat">
                    <i />
                    {s.platform}
                  </span>
                  <h3>{s.title}</h3>
                </span>
              </button>
            </span>
          ))}
        </div>

        {!openKey && (
          <p className="fannote mono rv in">Three live sites · click any card for the breakdown</p>
        )}

        <div className={`pane${fading ? ' out' : ''}`} hidden={!openKey}>
          <div className="backbar">
            <button className="back" data-deck-back onClick={close}>
              ← All sites
            </button>
          </div>
          {SITES.map((s) => (
            <SiteCase
              key={s.key}
              site={s}
              hidden={openKey !== s.key}
              stageRef={(el) => {
                stageRefs.current[s.key] = el;
              }}
              onGo={goTo}
              onCross={onCross}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteCase({ site, hidden, stageRef, onGo, onCross }) {
  const i = SITE_KEYS.indexOf(site.key);
  const prev = SITE_KEYS[(i - 1 + SITE_KEYS.length) % SITE_KEYS.length];
  const next = SITE_KEYS[(i + 1) % SITE_KEYS.length];
  const { at, railRef, go, onScroll, reset } = usePanels();
  // The caption cross-fades rather than swapping on the same frame. `shown`
  // lags `at` by one fade so the OLD text fades out before the new one fades
  // in - binding the text straight to `at` swaps mid-transition, which is what
  // read as a glitch.
  const [shown, setShown] = useState(0);
  const [swapping, setSwapping] = useState(false);
  useEffect(() => {
    if (shown === at) return undefined;
    setSwapping(true);
    const t = setTimeout(() => {
      setShown(at);
      setSwapping(false);
    }, 190);
    return () => clearTimeout(t);
  }, [at, shown]);

  // The cases stay mounted between openings, so without this a breakdown
  // reopens on whichever slide was last viewed.
  // Reset when the case becomes VISIBLE, not when it hides. A hidden element
  // is display:none and has no scroll box, so setting scrollLeft on it does
  // nothing - the index reset but the rail stayed put, and the next opening
  // showed a later slide with the first slide's caption beside it.
  // Layout effect so it lands before paint rather than flashing the old slide.
  useLayoutEffect(() => {
    if (hidden) return;
    reset();
    setShown(0);
  }, [hidden, reset]);

  return (
    <article className="sitecase" hidden={hidden}>
      {/* Same shape as the project cases: shots lead at two thirds, the write-up
          sits beside them, and both stack below 1100px. */}
      <div className="case-split">
        <div className="case-aside">
          <div className="case-top">
            <p className="case-no">{site.platform}</p>
            <h3>{site.title}</h3>
            <p className="case-role">
              {site.role.lead}
              {site.role.crossKey && (
                <>
                  <button type="button" className="hostlink lk-cross" onClick={() => onCross(site.role.crossKey)}>
                    {site.role.crossLabel}
                  </button>
                  {site.role.tail}
                </>
              )}
            </p>
            <div className="scoperow">
              {site.scope.map((sc) => (
                <div key={sc.k}>
                  <b>{sc.k}</b>
                  {sc.href ? (
                    <a className="hostlink" href={sc.href} target="_blank" rel="noopener noreferrer">
                      {sc.v}
                    </a>
                  ) : (
                    sc.v
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="caselede">
            {/* All captions occupy the same grid cell, so the box is always as
                tall as the LONGEST one and swapping slides cannot resize it -
                which is what made the page jump. The hidden copies are
                aria-hidden so they are not read out. */}
            <div className="casesum-box">
              {site.shots.map((sh) => (
                <p className="casesum ghost" key={sh.src} aria-hidden="true">
                  {sh.caption}
                </p>
              ))}
              <p className={`casesum${swapping ? ' swapping' : ''}`}>{site.shots[shown]?.caption}</p>
            </div>
            {/* Sites whose only link duplicated the Live at row now have none,
                so the row must not render as an empty gap. */}
            {site.links.length > 0 && (
            <div className="caselede-act">
              {site.links.map((l) => (
                <a className="lk" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            )}
          </div>
        </div>

        <div className="ev evwide">
          <div className="dshot">
            <div className="stage panelled" ref={stageRef}>
              <div className="panels" ref={railRef} onScroll={onScroll}>
                {site.shots.map((shot) => (
                  <figure key={shot.src}>
                    <img src={shot.src} alt={shot.alt} />
                    <figcaption>{shot.title}</figcaption>
                  </figure>
                ))}
              </div>
              {site.shots.length > 1 && (
                <>
                  <button className="pnav prev" onClick={() => go(at - 1)}
                    disabled={at === 0} aria-label="Previous screenshot">‹</button>
                  <button className="pnav next" onClick={() => go(at + 1)}
                    disabled={at === site.shots.length - 1} aria-label="Next screenshot">›</button>
                  <div className="pdots">
                    {site.shots.map((shot, n) => (
                      <button key={shot.src} className={n === at ? 'on' : undefined}
                        onClick={() => go(n)} aria-label={`Go to ${shot.title}`}
                        aria-current={n === at} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {site.cross && (
        <div className="crossnote">
          <b>{site.cross.title}</b>
          <p>
            {site.cross.lead}
            <button type="button" className="hostlink lk-cross" onClick={() => onCross(site.cross.crossKey)}>
              {site.cross.crossLabel}
            </button>
            {site.cross.tail}
          </p>
        </div>
      )}

      <nav className="casenav sitenav" aria-label="Other sites">
        <button onClick={() => onGo(prev)}>
          <small>← Previous</small>
          <strong>{SITE_TITLES[prev]}</strong>
        </button>
        <button onClick={() => onGo(next)}>
          <small>Next →</small>
          <strong>{SITE_TITLES[next]}</strong>
        </button>
      </nav>
    </article>
  );
}
