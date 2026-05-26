import { RESOURCE_BOXES } from './data';
import ResourceBox from './ResourceBox';

// This page is for the individual category routes, e.g. /resources/answers, /resources/practice, etc.
export default function CategoryPage({ id }) {
  const box = RESOURCE_BOXES.find(b => b.id === id);
  if (!box) return <p className="res-empty">Category not found.</p>;
  return (
    <div className="res-route-grid">
      <ResourceBox title={box.title} items={box.items} />
    </div>
  );
}
