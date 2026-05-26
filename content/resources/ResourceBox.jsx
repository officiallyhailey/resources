
// This component is for the "Links to Remember" box on the main resources page, which allows users to save links they want to remember. The links are stored in localStorage so they persist across sessions.
export default function ResourceBox({ title, items }) {
  return (
    <div className="res-box res-list">
      <span className="res-box-title">{title}</span>
      <ul className="res-link-list">
        {items.map(({ icon, href, text }) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <i className={`fa-solid ${icon} res-accent`} />
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
