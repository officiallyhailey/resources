import { useState, useEffect, useRef } from 'react';
import { usePageTransition } from '../shared/PageTransition';
import { RESOURCE_BOXES, ACTIVITY_IDEAS, QUOTES } from './data';
import ResourceBox from './ResourceBox';
import LinkList from './LinkList';
import profileImg from '../assets/gallery/profile-pic.png';
import '../../editing/resources.css';

// This is the main resources page at /resources, which shows the clock, a random quote, a random piece of advice, and a random activity idea, as well as links to the category pages.
export default function Resources({ theme, onToggleTheme }) {
  const { transitionTo } = usePageTransition();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [quote, setQuote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [advice, setAdvice] = useState('');
  const [activity, setActivity] = useState('');
  const contentRef = useRef(null);
  const backTimer = useRef(null);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toLocaleDateString());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);


  // Random advice
  const fetchAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
      .then(r => r.json())
      .then(d => setAdvice(d.slip.advice))
      .catch(() => { });
  };
  useEffect(fetchAdvice, []);

  // Random activity
  const randomActivity = () =>
    setActivity(ACTIVITY_IDEAS[Math.floor(Math.random() * ACTIVITY_IDEAS.length)]);
  useEffect(randomActivity, []);


  const scrollToContent = () =>
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="res-page">
      <div className="res-progress" />

      <div className="res-nav-bar">
        <button
          className="res-back"
          onMouseEnter={() => { backTimer.current = setTimeout(() => transitionTo('/'), 300); }}
          onMouseLeave={() => clearTimeout(backTimer.current)}
        >← Resume</button>
        <button className="res-theme-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀' : '◑'}
        </button>
      </div>

      {/* Intro / profile */}
      <header className="res-header">
        <div className="res-profile-intro">
          <h1 className="res-profile-title">
            Welcome{' '}
            <span className="res-accent">
              [ <i className="fa-solid fa-computer" /> ]
            </span>
          </h1>
          <p className="res-profile-text">
            Just three years ago I began my journey into the world of coding and web
            development. I started with a simple goal: to learn how to build websites
            and applications that could make a difference. I had no prior experience,
            but I was determined to learn and grow.
            <br /><br />
            With support from the vast online coding community and AI as a learning
            tool, I've come far and so can you! I've created this resource page to
            showcase my abilities in both frontend and backend web development and my
            passion for making custom tailored designs.
            <br /><br />
            A word of advice as you journey into becoming a developer: remember to
            take breaks, drink water, and get some sunlight in between your projects.
          </p>
        </div>

        <div className="res-profile-card">
          <img src={profileImg} className="res-profile-img" alt="Hailey Grace" />
          <div className="res-profile-links">
            <a href="https://codepen.io/officiallyhailey" target="_blank" rel="noopener noreferrer">
              <i className="fa-regular fa-user res-accent" /> Codepen
            </a>
            <a href="https://github.com/officiallyhailey" target="_blank" rel="noopener noreferrer">
              <i className="fa-regular fa-user res-accent" /> Github
            </a>
            <a href="https://www.linkedin.com/in/hailey-g/" target="_blank" rel="noopener noreferrer">
              <i className="fa-regular fa-user res-accent" /> LinkedIn
            </a>
          </div>
        </div>
      </header>

      {/* Bounce arrow */}
      <button className="res-arrow" onClick={scrollToContent} aria-label="Scroll to resources">
        <i className="fa-solid fa-chevron-down" />
      </button>

      {/* Resources content */}
      <section className="res-section" ref={contentRef}>
        <div className="res-content-header">
          <p className="res-tagline">living nervou<span className="res-flip">s</span>ly</p>
          <h1 className="res-section-title">
            <span className="res-accent">[</span>
            Resou<span className="res-flip">r</span>ces
            <span className="res-accent">]</span>
          </h1>
          <p className="res-tagline">coding audacious<span className="res-flip">l</span>y</p>
        </div>

        <div className="res-grid">

          <div className="res-box res-today">
            <p className="res-time">{time}</p>
            <p className="res-date-text">{date}</p>
          </div>

          <ResourceBox {...RESOURCE_BOXES.find(b => b.id === 'answers')} />
          <LinkList />
          <ResourceBox {...RESOURCE_BOXES.find(b => b.id === 'practice')} />

          <div className="res-box res-quotes">
            <p className="res-quote-text">{quote.text}</p>
            <p className="res-quote-author">~ {quote.author}</p>
          </div>

          <ResourceBox {...RESOURCE_BOXES.find(b => b.id === 'fun')} />

          <div className="res-box res-advice">
            <button onClick={fetchAdvice}>
              Random Advice
              <span className="res-hint"> (click for another tip)</span>
            </button>
            {advice && <p className="res-dynamic-text">{advice}</p>}
          </div>

          <ResourceBox {...RESOURCE_BOXES.find(b => b.id === 'ideas')} />

          <div className="res-box res-activity">
            <button onClick={randomActivity}>
              Take a break and ...
              <span className="res-hint"> (click for another idea)</span>
            </button>
            {activity && <p className="res-dynamic-text">{activity}</p>}
          </div>

          <ResourceBox {...RESOURCE_BOXES.find(b => b.id === 'terminals')} />

          <div className="res-box res-img-reference" />

          <ResourceBox {...RESOURCE_BOXES.find(b => b.id === 'learn')} />

          <div className="res-box res-img-read" />

          <ResourceBox {...RESOURCE_BOXES.find(b => b.id === 'read')} />

          <div className="res-box res-img-aboutme" />

        </div>
      </section>

      <footer className="res-footer">
        © {new Date().getFullYear()} Hailey Grace &nbsp;·&nbsp; Coders Resource
      </footer>
    </div>
  );
}
