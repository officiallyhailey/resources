import LinkList from './LinkList';

// This is the page at /resources/links, which just shows the list of links.
export default function LinksPage() {
  return (
    <div className="res-route-grid">
      <LinkList />
    </div>
  );
}
