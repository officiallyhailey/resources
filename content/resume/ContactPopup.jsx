import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import contactBg from '../assets/gallery/contact-background.png';

export default function ContactPopup() {
  const [open, setOpen] = useState(false);
  const [state, handleSubmit] = useForm('mdavozgw');

  function close() {
    setOpen(false);
  }

  return (
    <>
      <button
        className={`cp-btn${open ? ' cp-btn-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close contact form' : 'Open contact form'}
      >
        ✉
      </button>

      <div
        className={`cp-overlay${open ? ' cp-open' : ''}`}
        aria-hidden={!open}
        onClick={e => e.target === e.currentTarget && close()}
      >
        <div className="cp-modal" style={{ backgroundImage: `url(${contactBg})` }}>
          <button className="cp-close" onClick={close} aria-label="Close">✕</button>

          <h2 className="cp-title">Contact Form</h2>
          <p className="cp-desc">
            Have a recommendation? Having issues with a link? Just want to say hello?
            Type away and click submit!
          </p>

          {state.succeeded ? (
            <p className="cp-success">Message sent — I'll be in touch!</p>
          ) : (
            <form className="cp-form" onSubmit={handleSubmit}>
              <label className="cp-label">
                Name
                <input className="cp-input" name="name" type="text" required placeholder="..." />
              </label>
              <ValidationError prefix="Name" field="name" errors={state.errors} className="cp-error" />

              <label className="cp-label">
                Email
                <input className="cp-input" name="email" type="email" required placeholder="..." />
              </label>
              <ValidationError prefix="Email" field="email" errors={state.errors} className="cp-error" />

              <label className="cp-label">
                Subject
                <input className="cp-input" name="subject" type="text" required placeholder="..." />
              </label>

              <label className="cp-label">
                Message
                <textarea className="cp-input cp-textarea" name="message" placeholder="..." />
              </label>
              <ValidationError prefix="Message" field="message" errors={state.errors} className="cp-error" />

              <button className="cp-submit" type="submit" disabled={state.submitting}>
                {state.submitting ? 'Sending…' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
