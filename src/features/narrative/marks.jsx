import {
  siAirtable,
  siAnthropic,
  siExpress,
  siGithubpages,
  siMapbox,
  siNeon,
  siNextdotjs,
  siPwa,
  siReact,
  siReactrouter,
  siSwr,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
  siShopify,
  siSquare,
  siSquarespace,
} from 'simple-icons';

/* Real brand marks for the things that have one, in their own colours.
   ══════════════════════════════════════════════════════════════════════
   Keyed on the name as it is written in the content rather than on an icon
   slug, so the content stays plain English: "Airtable REST" is what belongs
   on the page, and which mark to draw for it is a rendering decision.

   Anything not listed here has no platform behind it - "Lessons as data",
   "Offline mode", "MCP server" are approaches rather than products - and
   renders as text. Inventing a mark for those would imply a vendor that
   does not exist.
   ══════════════════════════════════════════════════════════════════════ */
const MARKS = {
  'Next.js': siNextdotjs,
  React: siReact,
  'React Router': siReactrouter,
  'TypeScript strict': siTypescript,
  Vite: siVite,
  'Airtable REST': siAirtable,
  Airtable: siAirtable,
  SWR: siSwr,
  'SWR suspense': siSwr,
  'Anthropic SDK': siAnthropic,
  Anthropic: siAnthropic,
  'Mapbox GL': siMapbox,
  Express: siExpress,
  'Neon Postgres': siNeon,
  Vercel: siVercel,
  'Vitest + CI': siVitest,
  PWA: siPwa,
  'GitHub Pages': siGithubpages,
  Shopify: siShopify,
  Square: siSquare,
  Squarespace: siSquarespace,
};

export default function Mark({ name }) {
  const m = MARKS[name];
  if (!m) return null;
  return (
    <svg className="bd-mark" viewBox="0 0 24 24" aria-hidden="true" style={{ fill: `#${m.hex}` }}>
      <path d={m.path} />
    </svg>
  );
}
