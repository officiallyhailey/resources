import { useEffect } from 'react';
import { PROJECTS, PROJECT_KEYS } from '@/content/projects';
import { useDeck } from '@/hooks/useDeck';
import CaseStudy from './CaseStudy';

export default function Work({ jump }) {
  const { openKey, fading, sectionRef, deckRef, stageRefs, open, close, goTo } = useDeck('.pcard');

  // A cross-link from the client tier ("…the books run on Silk Operations")
  // opens the matching case here. Keyed on the whole signal object rather than
  // the project key, so following the same cross-link twice still fires.
  useEffect(() => {
    if (jump && jump.key) goTo(jump.key);
  }, [jump, goTo]);

  return (
    <section id="work" ref={sectionRef}>
      <div className="wrap">
        <div className="head">
          <div>
            <p className="idx rv">01 — Selected work</p>
            <h2 className="sectitle rv">
              Systems built
              <br />
              end to <span className="o">end</span>
            </h2>
          </div>
          <p className="idx rv" style={{ maxWidth: '34ch', textAlign: 'right' }}>
            Four projects, each solving a problem I had in front of me.
          </p>
        </div>

        <div className="fan pane rv in" ref={deckRef} hidden={!!openKey}>
          {PROJECTS.map((p) => (
            <span className="cardslot" key={p.key}>
            <button
              className="pcard"
              style={{ '--rot': p.tilt.rot, '--dy': p.tilt.dy }}
              aria-label={`Open the ${p.title} case study`}
              onClick={(e) => open(p.key, e.currentTarget)}
            >
              <span className={`pbg ${p.bg}`} />
              <span className="pglow" />
              <span className="shot">
                <span className="chrome">
                  <i />
                  <i />
                  <i />
                  <b>{p.chrome}</b>
                </span>
                <img src={p.shot} alt={p.shotAlt} loading="lazy" />
                <span className="pfly">
                  <p className="pteaser">{p.card.teaser}</p>
                  <span className="pstack">
                    {p.card.stack.map((s) => (
                      <i key={s}>{s}</i>
                    ))}
                  </span>
                  <span className="pgo">
                    {p.card.cta} <em>→</em>
                  </span>
                </span>
              </span>
              <span className="pbody">
                <span className="ptop">
                  <span className={`ptag${p.card.tag.includes('Live') || p.card.tag.includes('Public') ? ' live' : ''}`}>
                    {p.card.tag}
                  </span>
                  <span className="pno">{p.no}</span>
                </span>
                <h3>{p.title}</h3>
                <span className="pscope">{p.card.scope}</span>
              </span>
            </button>
            </span>
          ))}
        </div>

        {!openKey && (
          <p className="fannote mono rv in">
            Hover a card to bring it forward · click to open the case study
          </p>
        )}

        <div className={`pane${fading ? ' out' : ''}`} hidden={!openKey}>
          <div className="backbar">
            <button className="back" data-deck-back onClick={close}>
              ← View all work
            </button>
          </div>
          {PROJECTS.map((p, i) => (
            <CaseStudy
              key={p.key}
              project={p}
              hidden={openKey !== p.key}
              flip={i % 2 === 1}
              stageRef={(el) => {
                stageRefs.current[p.key] = el;
              }}
              onNav={goTo}
              prev={PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length]}
              next={PROJECTS[(i + 1) % PROJECTS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { PROJECT_KEYS };
