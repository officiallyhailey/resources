import { useForm, ValidationError } from '@formspree/react';
import { FORM as T } from '@/content/narrative';

// The same Formspree endpoint the site has always posted to, so submissions
// keep landing in the inbox Hailey already watches.
const FORM_ID = 'mdavozgw';

/* The floating form. It opens itself once the closing question has finished
   asking, and the mail button in the corner reopens it from anywhere. */
export default function ContactForm({ open, onClose }) {
  const [state, handleSubmit] = useForm(FORM_ID);

  return (
    <form className={`cform${open ? ' on' : ''}`} onSubmit={handleSubmit} noValidate>
      <button type="button" className="min" onClick={onClose} aria-label="Minimise the form">
        –
      </button>

      {state.succeeded ? (
        <>
          <h4>{T.sent.heading}</h4>
          {/* optional: with none written there is no empty line holding its
              own margin open under the heading */}
          {T.sent.body ? <p>{T.sent.body}</p> : null}
        </>
      ) : (
        <>
          <h4>{T.heading}</h4>
          <p>{T.lede}</p>
          <label>
            <span>{T.fields.name}</span>
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            <span>{T.fields.email}</span>
            <input name="email" type="email" autoComplete="email" required />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </label>
          <label>
            <span>{T.fields.message}</span>
            <textarea name="message" required />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </label>
          <button className="send" type="submit" disabled={state.submitting}>
            {state.submitting ? T.sending : T.send}
          </button>
        </>
      )}
    </form>
  );
}
