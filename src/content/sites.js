// The client sites, as data rather than markup — adding one is a new entry
// here, never a change to the components that render it.
//
// Shape:
//   card    what the deck shows: platform line, teaser, thumbnail
//   scope   platform / role / live-at pairs shown above the shots
//   shots   the breakdown itself: one screenshot per deliverable, each with a
//           caption saying what it does and why it is built that way
//   cross   optional link to a tier-1 case study, for work that spans both
//   links   where to go to see the real thing

export const SITES = [
  {
    key: 'scc',
    title: 'Silk City Coffee',
    platform: 'Shopify · built & maintained',
    tilt: { rot: '-9deg', dy: '16px' },
    thumb: '/img/site-scc.jpg',
    thumbAlt: 'The Silk City Coffee storefront homepage.',
    teaser:
      'The storefront customers actually buy from. Retail beans, gift cards, a subscription coffee club and a wholesale portal for trade accounts.',
    // The only site whose story continues into tier 1 — same business, other half.
    role: {
      lead: 'The customer-facing half of a two-location coffee company — and the front end of the same business whose books run on ',
      crossKey: 'silk',
      crossLabel: 'Silk Operations',
      tail: '.',
    },
    scope: [
      { k: 'Platform', v: 'Shopify · Square for cafe ordering' },
      { k: 'Role', v: 'Build, merchandising & ongoing care' },
      { k: 'Live at', href: 'https://silkcitycoffee.com/', v: 'silkcitycoffee.com ↗' },
    ],
    shots: [
      {
        src: '/img/site-scc.jpg',
        alt: 'Silk City Coffee — the storefront homepage.',
        title: 'The storefront',
        caption:
          'Where every new customer lands, and where the brand is expressed first, before any product. The homepage is a portal to mobile ordering from our cafes, the roastery, and wholesale members accessing their purchasing portal.',
      },
      {
        src: '/img/site-scc-2.jpg',
        alt: 'Silk City Coffee — the coffee collection.',
        title: 'The coffee',
        caption:
          'Single origins and blends each with their own page. These are the same products whose cost of goods is tracked on the internal side — one catalogue, two systems.',
      },
      {
        src: '/img/site-scc-3.jpg',
        alt: 'Silk City Coffee — the wholesale portal.',
        title: 'Wholesale',
        caption:
          'A separate B2B route for wholesale accounts to log in and place orders. The same products, the same inventory, but a different experience. Onboarding is automated through Shopify workflows and a custom form, so the wholesale team can focus on the accounts rather than the paperwork.',
      },
    ],
    cross: {
      title: 'The other half',
      lead: 'Every order placed here becomes a sales row the leads team reconciles in ',
      crossKey: 'silk',
      crossLabel: 'Silk Operations',
      tail:
        ', where it is rolled into the weekly scorecard alongside expenses and labor. The storefront is the front end customers see; the platform is where the numbers land.',
    },
    links: [
      { href: 'https://silkcitycoffee.com/', label: 'Visit silkcitycoffee.com' },
      { href: 'https://silkcitycoffee.square.site/', label: 'Cafe ordering on Square' },
    ],
  },
  {
    key: 'livinghope',
    title: 'Living Hope Farms',
    platform: 'Squarespace · built & maintained',
    tilt: { rot: '2deg', dy: '-10px' },
    thumb: '/img/site-livinghope.jpg',
    thumbAlt: 'The Living Hope Farms homepage.',
    teaser:
      'Nonprofit residential home for survivors of human trafficking. Donations, an Airtable-backed application flow, resource pages and a social-enterprise shop.',
    role: {
      lead:
        'A nonprofit residential home where survivors of exploitation and their children find safety — 15 acres, 17 bedrooms and a working garden.',
    },
    scope: [
      { k: 'Platform', v: 'Squarespace' },
      { k: 'Role', v: 'Design, build & ongoing care' },
      { k: 'Live at', href: 'https://www.livinghopefarms.org/', v: 'livinghopefarms.org ↗' },
    ],
    shots: [
      {
        src: '/img/site-livinghope.jpg',
        alt: 'Living Hope Farms — the front door.',
        title: 'The front door',
        caption:
          'Leads with the mission and puts the two things a visitor most often needs — Donate and Apply — in the primary nav.',
      },
      {
        src: '/img/site-livinghope-2.jpg',
        alt: 'Living Hope Farms — services.',
        title: 'Services',
        caption:
          'The programmes set out plainly, so a referring agency can see what is offered without having to make a phone call first.',
      },
      {
        src: '/img/site-livinghope-3.jpg',
        alt: 'Living Hope Farms — giving.',
        title: 'Giving',
        caption:
          'Donations handled on-site rather than handed off to a third-party page, so a donor never leaves the brand mid-decision.',
      },
    ],
    links: [{ href: 'https://www.livinghopefarms.org/', label: 'Visit livinghopefarms.org' }],
  },
  {
    key: 'anavah',
    title: 'Anavah Publishing',
    platform: 'WordPress · built & maintained',
    tilt: { rot: '9deg', dy: '14px' },
    thumb: '/img/site-anavah.jpg',
    thumbAlt: 'The Anavah Publishing homepage.',
    teaser:
      'Independent children’s publisher. Book catalogue, Square checkout, author visits, newsletter and four retail stockists.',
    role: {
      lead:
        'An independent children’s publisher with an award-winning picture book, an activity book and four brick-and-mortar stockists.',
    },
    scope: [
      { k: 'Platform', v: 'WordPress' },
      { k: 'Role', v: 'Design, build & ongoing care' },
      { k: 'Live at', href: 'https://anavahpublishing.com/', v: 'anavahpublishing.com ↗' },
    ],
    shots: [
      {
        src: '/img/site-anavah.jpg',
        alt: 'Anavah Publishing — the front door.',
        title: 'The front door',
        caption:
          'Brand first: the mark, the promise and the publisher’s own voice before any product, which is what an indie author is deciding on.',
      },
      {
        src: '/img/site-anavah-2.jpg',
        alt: 'Anavah Publishing — the catalogue.',
        title: 'The catalogue',
        caption:
          'Each title with room for its story and its awards, rather than a grid of covers competing for the same glance.',
      },
      {
        src: '/img/site-anavah-3.jpg',
        alt: 'Anavah Publishing — the shop.',
        title: 'The shop',
        caption:
          'Square checkout wired into WordPress, so payments run on infrastructure the owner already uses for events and signings.',
      },
    ],
    links: [{ href: 'https://anavahpublishing.com/', label: 'Visit anavahpublishing.com' }],
  },
];

export const SITE_KEYS = SITES.map((s) => s.key);
export const SITE_TITLES = Object.fromEntries(SITES.map((s) => [s.key, s.title]));
