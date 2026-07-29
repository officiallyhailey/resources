# Portfolio site

Source for **[anavahdesigns.com](https://anavahdesigns.com)** - a portfolio and résumé site built
with React and Vite, deployed on GitHub Pages.

Two routes: the portfolio at `/`, and a curated developer-resource directory at `/resources` that
predates the redesign and is still maintained.

## Running it

```bash
npm install
npm run dev
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm run lint` | ESLint over the repo |
| `npm run format` | Prettier (write) |

## Structure

```
src/
  content/            all copy and data - edit text here, not in components
  features/
    home/             the portfolio
    toolbox/          the /resources directory
  components/         shared across both routes
  hooks/              useDeck · useReveal · useHoverIntent
  styles/             tokens.css · global.css · site.css
public/
  img/                screenshots and photography
  404.html            GitHub Pages deep-link fix (see below)
```

**Content is data, not markup.** Every string lives in `src/content/`. Adding a project is a new
entry in `projects.js`; adding a client site is one in `sites.js`. Components render whatever is
there, so copy changes never mean opening a component - and apostrophes stay plain JavaScript
instead of `&apos;` escapes.

| File | Holds |
|---|---|
| `content/profile.js` | Hero copy, nav links, social links |
| `content/projects.js` | The four case studies |
| `content/sites.js` | Client sites and their breakdowns |
| `content/about.js` | About, capabilities, experience, contact + form copy |
| `content/toolbox.js` | The `/resources` link directory |

`@` is aliased to `src/` - import as `@/content/…`, `@/hooks/…`. Configured in `vite.config.js`
(what actually builds) and `jsconfig.json` (editor IntelliSense only).

## Things worth knowing before changing them

**Styles are scoped on purpose.** `site.css` is namespaced under `.site-root` so the portfolio
design cannot leak into `/resources`, which still runs the older `global.css`. Unscoping it means
restyling that page first.

**`public/404.html` is not a real 404 page.** GitHub Pages has no server-side rewrites, so a direct
hit on `/resources` finds no matching file. That page stashes the URL and bounces to `/`, where
`index.html` replays it before the app boots. Deleting it breaks every deep link and shared URL.

**Case studies stay mounted while hidden.** The card-to-detail morph measures its flight target the
moment a case opens, so unmounting closed cases would null the ref and break the animation. State is
reset on close instead - that is what the `setState`-in-effect lint warning in `CaseStudy.jsx` is
about, and it is deliberate.

**The card decks use a static hover wrapper.** `.cardslot` / `.siteslot` own layout and hover while
only the inner card transforms. Move the transform back onto the card itself and hovering near an
edge lifts it out from under the cursor, so the hover state oscillates.

**Reveals need their observer.** `.rv` elements are revealed by one IntersectionObserver and
word-by-word blocks (`[data-words]`) by a second one that reveals their children. Both live in
`useReveal`. An element that starts at `opacity: 0` with no observer watching it never appears.

**Screenshots are JPEG.** Site screenshots compress ~85% smaller than PNG with no visible loss.
`profile-pic.png` stays PNG - it is a cutout, and JPEG has no alpha channel.

## Deploying

Pushing to `main` publishes to GitHub Pages. Before pushing:

```bash
npm run build && npm run lint
```

Then load `/resources` directly in a fresh tab - it is the one path that behaves differently in
production than locally, because it depends on the `404.html` redirect.

## Design references

Layout templates and design mocks live outside this repo at `~/Developer/web-templates/` -
standalone HTML, no build step. Open its `index.html` to browse them.
