import { useEffect, useRef } from 'react';
import { CONTACT_FORM as T } from '@/content/about';
import { useForm, ValidationError } from '@formspree/react';

// The same Formspree endpoint the previous site posted to, so submissions keep
// landing in the inbox Hailey already watches.
const FORM_ID = 'mdavozgw';

export default function ContactModal({ open, onClose }) {
  const [state, handleSubmit] = useForm(FORM_ID);
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Escape closes, and the page behind must not scroll while the dialog is up.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    firstFieldRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="cmodal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmodal-title"
      // Only a click that both starts and ends on the backdrop closes it -
      // otherwise a drag that happens to release outside dismisses a filled-in
      // form, which is the most annoying way to lose someone's message.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) panelRef.current = 'backdrop';
      }}
      onMouseUp={(e) => {
        if (e.target === e.currentTarget && panelRef.current === 'backdrop') onClose();
        panelRef.current = null;
      }}
    >
      <div className="cmodal-panel">
        <button className="cmodal-x" onClick={onClose} aria-label="Close contact form">
          ×
        </button>

        {state.succeeded ? (
          <div className="cmodal-done">
            <p className="idx">{T.sent.label}</p>
            <h3>{T.sent.heading}</h3>
            <p>{T.sent.body}</p>
            <button className="lk" onClick={onClose}>{T.sent.close}</button>
          </div>
        ) : (
          <>
            <p className="idx" id="cmodal-title">{T.label}</p>
            <h3>{T.heading}</h3>
            <p className="cmodal-lede">{T.lede}</p>

            <form onSubmit={handleSubmit} className="cform">
              <label>
                <span>{T.fields.name}</span>
                <input ref={firstFieldRef} id="name" type="text" name="name" required />
              </label>
              <label>
                <span>{T.fields.email}</span>
                <input id="email" type="email" name="email" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </label>
              <label>
                <span>{T.fields.subject}</span>
                <input id="subject" type="text" name="subject" />
              </label>
              <label>
                <span>{T.fields.message}</span>
                <textarea id="message" name="message" rows={5} required />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </label>
              <button type="submit" className="cform-send" disabled={state.submitting}>
                {state.submitting ? T.sending : T.send}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
