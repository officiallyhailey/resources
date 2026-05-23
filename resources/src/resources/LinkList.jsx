import { useState } from 'react';

const DEFAULT_LINKS = [
  'https://www.shecodes.io/athena',
  'https://edabit.com/',
];

export default function TodoBox() {
  const [items, setItems] = useState(DEFAULT_LINKS);
  const [input, setInput] = useState('');

  const add = (e) => {
    e.preventDefault();
    const val = input.trim();
    if (val) { setItems(p => [...p, val]); setInput(''); }
  };

  const remove = (i) => setItems(p => p.filter((_, idx) => idx !== i));
  const copy = () => navigator.clipboard.writeText(items.join('\n'));

  // Persist links in localStorage
  return (
    <div className="res-box res-todo">
      <p className="res-todo-title">Links to Remember</p>
      <p className="res-todo-hint">add + | copy <i className="fa-regular fa-clipboard res-color" /></p>
      <form className="res-todo-form" onSubmit={add}>
        <input
          type="text"
          placeholder="Add a link or note..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" aria-label="Add">
          <i className="fa-solid fa-plus res-color" />
        </button>
      </form>
      <ul className="res-todo-list">
        {items.map((item, i) => (
          <li key={i}>
            <span>{item}</span>
            <button onClick={() => remove(i)} aria-label="Delete">
              <i className="fa-regular fa-trash-alt" />
            </button>
          </li>
        ))}
      </ul>
      <button className="res-copy-btn" onClick={copy}>
        <i className="fa-regular fa-clipboard res-color" /> Copy List
      </button>
    </div>
  );
}
