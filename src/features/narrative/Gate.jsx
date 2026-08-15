const ARROW_DOWN = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

const ARROW_UP = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

/* The control that ends every section. It appears only once that section has
   finished playing, which is what makes each section stop and wait rather than
   run on.

   ONE gate, for the whole deck, mounted outside the panels. A per-panel gate
   was position:fixed inside a panel that carries a transform, and a
   transformed ancestor becomes the containing block for fixed children - so
   the gate drifted with its own panel mid-transition instead of holding the
   screen. */
export default function Gate({ on, label, canGoBack, onNext, onBack }) {
  return (
    <div className={`gate${on ? ' on' : ''}`}>
      <span className="gate-label">{label}</span>
      <div className="gate-row">
        <button
          className="gate-back"
          hidden={!canGoBack}
          aria-label="Back to the previous section"
          onClick={onBack}
        >
          {ARROW_UP}
        </button>
        <button className="gate-btn" aria-label="Continue" onClick={onNext}>
          {ARROW_DOWN}
        </button>
      </div>
    </div>
  );
}
