import { CONTACT } from '@/content/about';

export default function Contact({ onOpenForm }) {
  return (
    <>
      <section id="contact">
        <div className="wrap">
          <p className="idx rv">06 — Contact</p>
          {/* The headline is one link, so the whole slab is the target. The
              accented O sits inside the word rather than colouring a whole
              line, which keeps the shape reading as a single mark. */}
          {/* the headline opens the form rather than firing a mail client —
              a mailto is a dead end for anyone without a desktop client set up */}
          <button className="cta-big rv" onClick={onOpenForm}>
            LET&apos;S W<span className="o">O</span>RK
            <br />
            TOGETHER
          </button>
          <div className="clinks rv">
            {CONTACT.links.map((l) => (
              <a
                className="cl"
                key={l.label}
                href={l.href}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <b>{l.label}</b>
                <span>{l.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} Hailey Grace</span>
          <span>[ABC = true]</span>
        </div>
      </footer>
    </>
  );
}
