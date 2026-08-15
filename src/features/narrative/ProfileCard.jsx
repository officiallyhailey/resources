import { PROFILE_CARD as C } from '@/content/narrative';

// The portrait as a player card. `shown` drives the whole entrance: the card
// rises and un-rotates, and the three stats follow it in on a delay chain.
export default function ProfileCard({ shown = true }) {
  return (
    <div className={`pcard${shown ? ' shown' : ''}`}>
      <div className="pc-art">
        <span className="pc-rarity">
          <i className="pc-dot" />
          {C.rarity}
        </span>
        <span className="pc-no">{C.no}</span>
        <img src={C.src} alt={C.alt} />
        <div className="pc-name">
          <b>{C.name}</b>
          <span>{C.title}</span>
        </div>
      </div>
      <div className="pc-stats">
        {C.stats.map((s) => (
          <div className="pc-stat" key={s.k}>
            <b>{s.v}</b>
            <span>{s.k}</span>
          </div>
        ))}
      </div>
      <div className="pc-foot">
        {C.foot.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
    </div>
  );
}
