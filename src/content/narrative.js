// The narrative homepage, as data.
//
// Three separate things live here, and they stay separate on purpose so a
// design change is an edit to one of them rather than a rewrite:
//
//   SCRIPT   every word that is written out on screen
//   WORK     the deck's view of the work, derived from the long-form content
//   ACT_ONE / PAGE_ORDER / GATES   the running order
//   ARC / DEPTH                    the two card geometries
//
// The long-form project and client-site write-ups stay where they were, in
// projects.js and sites.js. This file takes only what the deck shows - a
// teaser, a few scope rows, the screenshots - so there is never a second copy
// of a paragraph to keep in step.

import { PROJECT_BY_KEY } from '@/content/projects';
import { SITES } from '@/content/sites';

export const BRAND = 'Anavah Designs';

// Every line here is written live, one character at a time, over a layout that
// was measured in full first. *asterisks* mark the accent words, so emphasis
// travels with the copy instead of being baked into a layout.
//
// An emphasis must not span a line break. Lines are only ever broken between
// words, so a single marked word is always safe; a marked phrase may not be.
export const SCRIPT = {
  welcome: 'Welcome to Anavah Designs...',
  welcomeSub: 'Let me show you around',
  statement:
    'I help you with the stuff you *have* to do - so you can get back to the stuff you *want* to do...',
  name: "I'm Hals",
  workIdx: '01 · Selected work',
  workTitle: 'Up and *running*',
  workNote: 'Click a card to bring it forward · click the centre one to open it',
  tools: "Here are some of the tools I've made recently...",
  ask: 'What can I make easier for you, today?',
};

// The floating form's own copy. CONTACT_FORM in about.js belongs to the older,
// larger dialog; this one is small and asks for three things.
export const FORM = {
  heading: "Let's talk",
  lede: 'Tell me what needs to get easier.',
  fields: { name: 'Name', email: 'Email', message: 'What do you need?' },
  send: 'Send it',
  sending: 'Sending…',
  sent: { heading: 'That reached me.', body: "I'll reply as soon as I can." },
};

export const PROFILE_CARD = {
  src: '/img/profile-card.jpg',
  alt: 'Hailey Grace',
  rarity: 'Open to work',
  no: 'No. 01',
  name: 'Hailey Grace',
  title: 'Full-stack developer · operations',
  stats: [
    { v: '7+', k: 'Project Management' },
    { v: '3+', k: 'Procurement' },
    { v: '3', k: 'Certifications' },
  ],
  foot: ['Certified Cat Lover', 'CT · remote'],
};

export const ABOUT_LEAD =
  'Tech forward, operations-focused developer with 7+ years of experience in project management, workflow optimization, and business/program development. Proven history of building scalable systems, reliable workflows, and translating operational data into clear, actionable insights.';

export const ABOUT_BODY =
  'Known for creating structure, improving efficiency, and supporting leadership through data-informed decision-making - with a design eye that makes the output actually helpful to look at.';

export const ABOUT_FACTS = [
  { label: 'Back End Certification (In Progress)', year: '2026' },
  { label: 'Programming Certification', year: '2023' },
  { label: 'HR Certification', year: '2023' },
  { label: 'GitHub →', href: 'https://github.com/officiallyhailey' },
];

// LinkedIn only. The address is not put on the page: the mail button and the
// form are the route in, so a scraper has nothing to lift and a reader still
// has one obvious way to write.
export const CONTACT_LINKS = [
  { label: 'LinkedIn', value: 'hailey-g', href: 'https://www.linkedin.com/in/hailey-g/' },
];

/* ── the work ────────────────────────────────────────────────────────
   Six entries, three per branch of the ring. Anavah Publishing is left out
   deliberately: the ring is two fans of three, and a seventh card has
   nowhere to sit.

   Only the deck-specific bits are written out below. Titles, teasers and
   screenshots are read from the long-form content, so editing a teaser in
   projects.js changes it here too.
   ------------------------------------------------------------------- */
const DECK = {
  // No panel set on this one, so the front door stands in as its single shot.
  assessment: { shots: [{ src: '/img/frontdoor-assessment.jpg', title: 'The lesson' }] },
};

const PROJECT_KEYS = ['silk', 'devdeck', 'assessment', 'toolbox'];
const SITE_KEYS = ['scc', 'livinghope'];
const SITE_BY_KEY = Object.fromEntries(SITES.map((s) => [s.key, s]));

const fromProject = (key) => {
  const p = PROJECT_BY_KEY[key];
  const d = DECK[key] || {};
  return {
    key,
    kind: 'project',
    title: p.title,
    tag: p.card.tag,
    shot: p.shot,
    teaser: p.card.teaser,
    stack: p.card.stack,
    shots: d.shots || p.panels.desktop.map((s) => ({ src: s.src, title: s.label })),
    // Where the real thing lives. The dialog used to carry a Role/Status table
    // instead, which said nothing a reader could act on; a link does.
    links: [
      ...(p.live?.url ? [{ label: 'Open it live', href: p.live.url }] : []),
      ...(p.links || [])
        .filter((l) => l.kind !== 'soon')
        .map((l) => ({ label: l.label, href: l.href })),
    ],
    // The second depth of the dialog: the long-form write-up, exactly as the
    // old case-study page carried it. Read straight off projects.js so there
    // is still only one copy of any of it.
    detail: {
      role: p.role,
      metrics: p.metrics,
      beats: p.beats,
      stack: p.stack,
    },
  };
};

const fromSite = (key) => {
  const s = SITE_BY_KEY[key];
  return {
    key,
    kind: 'site',
    title: s.title,
    // "Shopify · built & maintained" is the right line for a page about client
    // work; on a card among four products, what matters is that it is client work.
    tag: `${s.platform.split(' · ')[0]} · client site`,
    shot: s.thumb,
    teaser: s.teaser,
    stack: s.stack,
    // the client sites keep their only route in the scope rows, so it is
    // lifted out of them rather than lost with the table
    // the arrow is stripped: the icon already says "this leaves the page", and
    // in an accessible name it is read out as "north east arrow"
    links: s.scope
      .filter((x) => x.href)
      .map((x) => ({ label: x.v.replace(/\s*↗\s*$/, ''), href: x.href })),
    // client-site shots carry a caption saying what the screen does; the rail
    // shows it under the image at the second depth
    shots: s.shots.map((sh) => ({ src: sh.src, title: sh.title, caption: sh.caption })),
    detail: { cross: s.cross, stack: s.stackDetail },
  };
};

export const WORK = [...PROJECT_KEYS.map(fromProject), ...SITE_KEYS.map(fromSite)];

export const KIND = { project: 'Project', site: 'Client site' };

/* ══════════════════════════════════════════════════════════════════════
   THE RUNNING ORDER - reorder these arrays to reorder the experience
   ══════════════════════════════════════════════════════════════════════ */

// Three beats sharing the opening screen, advanced by click.
export const ACT_ONE = [
  { id: 'welcome', gate: 'Right this way' },
  { id: 'statement', gate: 'Go on' },
  { id: 'intro', gate: 'See the work' },
];

export const PAGE_ORDER = ['work', 'about', 'experience', 'skills', 'contact'];

// Which section each gate hands off to, and what its button says.
export const GATES = {
  work: { next: 'about', label: 'The full picture' },
  about: { next: 'experience', label: 'Where I have worked' },
  experience: { next: 'skills', label: 'What I build with' },
  skills: { next: 'contact', label: "Let's talk" },
};

// Panels that only belong on a small screen. On desktop the work already fans
// out behind the profile card in the intro, so a second pass at the same six
// projects is a repeat; on a phone the fan is dropped and this deck IS how the
// work gets shown.
export const NARROW_ONLY = new Set(['work']);
export const NARROW_AT = 900;

/* ── the ring behind the profile card ───────────────────────────────
   Taken straight off the reference drawing, which measures as two straight
   fans rather than a curve:
     - every card steps sideways by exactly HALF A CARD WIDTH
     - the innermost card's centre sits on the profile card's edge
     - the vertical steps are uniform, and the first offset is ~3x one step
     - depth runs inward: the nearest card is darkest, the furthest lightest
   The reference canvas is square; a widescreen has far less height than
   width, so the vertical spread is scaled to fit while its proportions and
   every horizontal rule above are kept exactly.
   ------------------------------------------------------------------- */
export const ARC = {
  perBranch: 3, // cards climbing, and the same number dropping
  stepX: 0.5, // sideways travel per card, in card widths
  dropRatio: 3.05, // first vertical offset, in vertical steps
  margin: 14, // clearance kept from every border
  depth: [
    // per rank out from the middle, nearest first
    { sat: 1, br: 1 },
    { sat: 0.82, br: 0.985 },
    { sat: 0.62, br: 0.97 },
  ],
  minCard: 190,
  maxCard: 380,
};

export const THUMB = 3 / 4; // the card's picture aspect, used to solve its height

// The coverflow's depth ramp, one step per rank away from the centre.
export const DEPTH = [
  { x: 0.0, s: 1.0, o: 1, b: 0, sat: 1, br: 1 },
  { x: 0.68, s: 0.84, o: 0.95, b: 0.6, sat: 0.8, br: 0.97 },
  { x: 1.3, s: 0.71, o: 0.78, b: 1.6, sat: 0.6, br: 0.95 },
  { x: 1.95, s: 0.6, o: 0.55, b: 2.6, sat: 0.45, br: 0.94 },
];
