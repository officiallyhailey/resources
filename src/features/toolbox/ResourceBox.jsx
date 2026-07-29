// Renders one titled category of resource links (icon + label + external link).
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
