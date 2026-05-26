import { useState, useEffect } from 'react';
import { ACTIVITY_IDEAS, QUOTES } from './data';

// This is the main dashboard page at /resources, which shows the clock, a random quote, a random piece of advice, and a random activity idea.
export default function Dashboard() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [advice, setAdvice] = useState('Loading...');
  const [activity, setActivity] = useState('');

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

  const fetchAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
      .then(r => r.json())
      .then(d => setAdvice(d.slip.advice))
      .catch(() => {});
  };
  useEffect(fetchAdvice, []);

  const randomActivity = () => setActivity(ACTIVITY_IDEAS[Math.floor(Math.random() * ACTIVITY_IDEAS.length)]);
  useEffect(randomActivity, []);

  return (
    <div className="res-route-grid">
      {/* Clock */}
      <div className="res-box res-today">
        <p className="res-time">{time}</p>
        <p className="res-date">{date}</p>
      </div>

      {/* Quote */}
      <div className="res-box res-quotes">
        <p className="res-quote-text">{quote.text}</p>
        <p className="res-quote-author">~ {quote.author}</p>
      </div>

      {/* Advice */}
      <div className="res-box res-advice">
        <button onClick={fetchAdvice}>
          Random Advice
          <span className="res-click-hint"> (click for another tip)</span>
        </button>
        {advice && <p className="res-advice-text">{advice}</p>}
      </div>

      {/* Activity */}
      <div className="res-box res-activity">
        <button onClick={randomActivity}>
          Take a break and ...
          <span className="res-click-hint"> (click for another idea)</span>
        </button>
        {activity && <p className="res-activity-text">{activity}</p>}
      </div>
    </div>
  );
}
