// The four showcased projects, as data rather than markup — adding one is a
// new entry here, never a change to the components that render it.
//
// Shape:
//   card     what the deck shows: tag, teaser, stack chips, CTA wording
//   metrics  three numbers that count up above the write-up
//   scope    role / status pairs
//   beats    the write-up: label + body, `em` wraps in accent
//   stack    grouped by layer, each chip carrying why it was chosen
//   evidence product screenshot (+ optional live embed) and the build breakdown

export const PROJECTS = [
  {
    key: 'silk',
    no: '001',
    title: 'Silk Operations',
    kicker: '01 / Operations platform',
    tilt: { rot: '-9deg', dy: '16px' },
    bg: 'pbg-1',
    chrome: 'silk finance — front door',
    shot: '/img/frontdoor-silk-gate.jpg',
    shotAlt:
      'The Silk Operations opening screen: the Traction wordmark above a grid of section icons and a light-switch pull.',
    card: {
      tag: 'Deployed · private',
      scope: '2023 — ongoing · In production',
      teaser:
        'The internal platform behind a two-location coffee company — invoices in, a weekly scorecard out, run by the leads team themselves.',
      stack: ['Next.js', 'Airtable', 'Claude'],
      cta: 'Read case study',
    },
    role: 'The internal platform behind Silk City Coffee — built solo, in production across two locations',
    metrics: [
      { to: 2, label: 'Locations running it daily' },
      { to: 6, label: 'Manual workflows it replaced' },
      { to: 1, label: 'Developer — design to deploy' },
    ],
    scope: [
      { k: 'Role', v: 'Sole developer' },
      { k: 'Status', v: 'In production' },
    ],
    beats: [
      {
        b: 'Problem',
        p: 'Weekly bookkeeping for Manchester and Willimantic ran through ad-hoc tooling only I could operate. The leads team could not answer "what did we spend on dairy last week?" without going through me.',
      },
      {
        b: 'Built',
        p: 'A password-protected finance dashboard. Upload invoices, statements and sales exports; review and correct the parsed data; a weekly <em>scorecard</em> rolls up COG %, labor and cost-of-service by location and department.',
      },
      {
        b: 'Key decision',
        p: 'Every field is read by <em>field ID, never field name</em> — so renaming a column in Airtable cannot silently break production. Messy PDF invoices are parsed by forcing Claude into tool-use, which returns structured line items instead of prose that needs re-parsing.',
      },
      {
        b: 'Result',
        p: 'Bookkeeping became self-serve. <em>Airtable is the database</em>, reached only through a server-side proxy that holds the token — so there was no second datastore to provision, migrate or back up, and no ORM or state library either. That is what kept the whole system small enough for one person to maintain.',
      },
    ],
    stack: [
      {
        group: 'Frontend',
        chips: [
          { name: 'Next.js 16', why: 'App Router gives pages and the server-side API routes in one codebase, so there is no separate backend to deploy.' },
          { name: 'React 19', why: 'The dashboard is mostly forms and tables reacting to fetched data — exactly what React is for.' },
          { name: 'TypeScript strict', why: 'Financial data has shapes worth enforcing. The compiler catches a mis-keyed field before a report does.' },
        ],
      },
      {
        group: 'Data',
        chips: [
          { name: 'Airtable REST', why: 'The team already lived in Airtable. Using it as the database meant no migration and no second source of truth.' },
          { name: 'SWR', why: 'Caches responses and revalidates after writes, so the screen always matches what was just saved.' },
        ],
      },
      {
        group: 'AI',
        chips: [
          { name: 'Anthropic SDK', why: 'Forced tool-use makes Claude return structured line items from a messy PDF invoice, instead of prose I would have to re-parse.' },
        ],
      },
      {
        group: 'Infra',
        chips: [
          { name: 'Vercel', why: 'Static pages plus serverless route handlers — the handlers are the only place the Airtable token exists.' },
          { name: 'Signed-cookie auth', why: 'One password mints an HMAC-SHA256 signed cookie via Web Crypto, so no auth library and nothing sensitive on the client.' },
        ],
      },
    ],
    links: [{ kind: 'soon', label: 'Private — the front door is public, the data is not' }],
    live: { url: 'https://scc-green-one.vercel.app/', auto: false },
    liveNote: 'The public front door — no client data behind the sign-in',
    build: {
      cap: 'Architecture — click a step to see what it does',
      flow: [
        { label: 'Browser', sub: 'client components · SWR cache', detail: 'The dashboard runs in the browser and never holds a credential. It only ever calls this app’s own /api routes, same-origin.' },
        { label: 'Server proxy', sub: 'auth gate + Airtable PAT', detail: 'A serverless route handler checks the signed session cookie, attaches the Airtable token and forwards the request. This is the one and only place that token exists.' },
        { label: 'Airtable + Claude', sub: 'REST · invoice parsing', detail: 'Airtable returns the records. Messy PDF invoices go to Claude with forced tool-use, which hands back structured line items instead of prose I would have to re-parse.' },
      ],
      kv: [
        ['Framework', 'Next.js 16 (App Router)'],
        ['UI', 'React 19 · TypeScript strict'],
        ['Data', 'Airtable REST · SWR polling every 6s'],
        ['AI', 'Anthropic SDK · forced tool-use'],
        ['Auth', 'HMAC-SHA256 signed cookie (Web Crypto)'],
        ['Hosting', 'Vercel — static pages + serverless handlers'],
      ],
      modsTitle: "What's in it",
      mods: [
        ['Upload', 'Invoices in, drafts out', 'Drop in invoices, receipts and statements. Claude files the line items as draft expenses, which are reviewed before anything is committed.'],
        ['Payroll', 'Timesheets and tips', 'Timesheets, tips and the weekly pivot — reviewed and approved before any of it goes to the provider.'],
        ['Expenses', 'One list, corrected once', 'Every expense in one place, with category, vendor, inventory and amounts fixed before the report runs.'],
        ['Inventory', 'The pantry', 'Every item, its vendor, its cost and what is in stock.'],
        ['Sales', 'Square, by item', 'Square sales by item, with products linked so each sale lands in the right category.'],
        ['Scorecard', 'The weekly health check', 'Four-week expenses, sales and COG % by department — the number the leads team actually meets about.'],
      ],
    },
  },

  {
    key: 'devdeck',
    no: '002',
    title: 'DevDeck',
    kicker: '02 / Career operating system',
    tilt: { rot: '2deg', dy: '-10px' },
    bg: 'pbg-2',
    chrome: 'devdeck — front door',
    shot: '/img/frontdoor-devdeck.jpg',
    shotAlt: 'The DevDeck landing page: "All your dev needs, one deck" over a retro computer.',
    card: {
      tag: 'Deployed · private',
      scope: 'Solo · 2025 · Daily driver',
      teaser:
        'One installable app that runs my working day — tasks, projects, a job hunt on a map, and an assistant that does the work.',
      stack: ['Next.js', 'MCP', 'Mapbox'],
      cta: 'Read case study',
    },
    role: 'Built and shipped solo · runs my actual working day',
    metrics: [
      { to: 40, prefix: '~', label: 'Actions its assistant can run' },
      { to: 9, label: 'Apps replaced by one codebase' },
      { to: 0, label: 'Secrets that reach the browser' },
    ],
    scope: [
      { k: 'Role', v: 'Sole developer' },
      { k: 'Status', v: 'Daily driver' },
    ],
    beats: [
      { b: 'Problem', p: 'A job hunt and active project work spread across a task app, a spreadsheet and a notes tool — none of which talked to each other, so nothing could be measured.' },
      { b: 'Built', p: 'One installable web app: a task board with real start/stop timers, a project command center, a job hunt as an interactive map, and an in-app AI assistant that can actually perform the work rather than just describe it.' },
      { b: 'Key decision', p: 'The in-app assistant and an external <em>MCP server</em> (~40 tools) run on <em>one shared tool layer</em> — so an outside agent and the built-in one can never drift apart. A layer of pure predicates guarantees the counts the assistant reports match exactly what the boards show.' },
      { b: 'Judgment call', p: 'Detecting closed job postings by scraping produced false positives — it once flagged a live role as dead. I replaced it with authoritative ATS APIs only; every other link now reads an honest <em>"verify manually."</em> A wrong answer is worse than an admitted unknown.' },
    ],
    stack: [
      { group: 'Frontend', chips: [
        { name: 'Next.js 16', why: 'One codebase serving both the interface and the API routes that hold the secrets.' },
        { name: 'React 19', why: 'Nine sections of interactive boards, filters and live-updating fields.' },
        { name: 'TypeScript strict', why: 'Typed end to end; the types double as documentation of every data shape.' },
      ] },
      { group: 'Data', chips: [
        { name: 'Airtable', why: 'Tasks, projects, jobs and activity all live here — one base, reached only through the proxy.' },
        { name: 'SWR suspense', why: 'Dedupes identical requests and revalidates after writes so boards never show stale counts.' },
      ] },
      { group: 'AI', chips: [
        { name: 'Anthropic', why: 'Powers Deva, the in-app assistant, through a tool-use loop that performs work rather than describing it.' },
        { name: 'MCP server', why: 'Exposes ~40 tools to outside agents over the same tool layer Deva uses, so the two can never drift apart.' },
      ] },
      { group: 'Infra', chips: [
        { name: 'Mapbox GL', why: 'Geocodes each role’s address and plots the job hunt as a map rather than a list.' },
        { name: 'Vitest + CI', why: 'The predicate layer that guarantees reported counts match the boards is the part most worth testing.' },
        { name: 'PWA', why: 'A manifest and themed icons let it install to a phone home screen and launch full-screen.' },
      ] },
    ],
    links: [{ kind: 'soon', label: 'Private — read-only demo in progress' }],
    live: { url: 'https://dev-app-roan.vercel.app/', auto: true },
    liveNote: 'The public landing page — the app itself is gated',
    build: {
      cap: 'Architecture — click a step to see what it does',
      flow: [
        { label: 'Browser', sub: 'React UI · SWR · PWA', detail: 'Your phone or laptop runs the React app. It never holds the Airtable token — it only ever calls this app’s own /api routes.' },
        { label: 'API proxy', sub: 'serverless · holds token', detail: 'A serverless function attaches the secret token and forwards the request to Airtable. This is the one and only place that token exists.' },
        { label: 'Airtable + Mapbox', sub: 'REST · geocoding', detail: 'Airtable returns the records; Mapbox geocodes addresses for the Jobs map. The response travels back through the proxy to the browser.' },
      ],
      kv: [
        ['Framework', 'Next.js 16 (App Router)'],
        ['UI', 'React 19 · TypeScript strict'],
        ['Data fetching', 'SWR (suspense mode)'],
        ['Maps', 'Mapbox GL · react-map-gl'],
        ['Auth', 'Signed cookie · middleware gate on every route'],
        ['Testing', 'Vitest + GitHub Actions CI'],
        ['Hosting', 'Vercel — serverless handlers + 3 crons'],
        ['Install', 'PWA — manifest, icons, Add to Home Screen'],
      ],
      modsTitle: 'Nine sections, one codebase',
      mods: [
        ['Dashboard', 'Daily command center', 'Search, planner, timers, activity log and the morning briefing in one screen.'],
        ['Tasks', 'Living board with time tracking', 'Real start/stop timers, a running log and recurrence — the same timers that recorded this portfolio work.'],
        ['Dev Work', 'Project command center', 'Projects → milestones → tasks, a Plan/Run split and living docs per project.'],
        ['Jobs', 'Opportunities on a map', 'Paste a link, let AI read it, geocode the address and watch the pipeline on an interactive map.'],
        ['Briefings', 'AI morning and job-fit reads', 'The day’s schedule and a fit read on each role, refreshed on demand.'],
        ['Deva', 'In-app AI assistant', 'A tool-use loop that plans days, preps jobs and scaffolds projects — it performs the work rather than describing it.'],
        ['MCP server', 'External agent endpoint', 'JSON-RPC at /api/mcp exposing ~40 bearer-authed tools over the same tool layer Deva uses, so the two can never drift apart.'],
      ],
    },
  },

  {
    key: 'assessment',
    no: '003',
    title: 'Assessment',
    kicker: '03 / Teaching tool',
    tilt: { rot: '-2deg', dy: '4px' },
    bg: 'pbg-3',
    chrome: 'assessment — lesson site',
    shot: '/img/frontdoor-assessment.jpg',
    shotAlt: 'The Assessment lesson site: "Three backend topics, explained" above three lesson cards.',
    card: {
      tag: 'Public repo · try it',
      scope: 'Solo · 2026 · Taught live',
      teaser: 'Three backend lessons — SQL, an endpoint, a React fetch — that run live in the page. Public repo.',
      stack: ['React', 'Express', 'Postgres'],
      cta: 'Try the demo',
    },
    role: 'Backend lessons · public repo · used to teach a live session',
    metrics: [
      { to: 3, label: 'Lessons that run live in-page' },
      { to: 5, label: 'Real API endpoints behind them' },
      { to: 0, label: 'Install needed to try it' },
    ],
    scope: [
      { k: 'Role', v: 'Sole developer & instructor' },
      { k: 'Status', v: 'Public repo' },
    ],
    beats: [
      { b: 'Problem', p: 'Teach three backend concepts — a SQL table, a POST endpoint, and a React GET — in one session, to people who had never seen any of them.' },
      { b: 'Built', p: 'An interactive lesson site where the explanation sits beside the code: hover a word for what it means, hover a line for when it runs, and press <em>Try it</em> to send a real request against a live Postgres database.' },
      { b: 'Key decision', p: 'The lessons are written as <em>data</em>, not markup, so content is editable without touching rendering. The database reseeds to the same three rows on every restart — a session always starts from a known state, so a demo cannot be broken by the last person who used it.' },
      { b: 'Safety net', p: 'A <em>DATA_SOURCE=json</em> mode swaps the database for an in-memory twin. If the connection dies five minutes before a class, the lesson still runs.' },
    ],
    stack: [
      { group: 'Frontend', chips: [
        { name: 'React 18', why: 'Lesson 3 teaches useState and useEffect, so the site itself had to be the thing being taught.' },
        { name: 'Vite', why: 'Instant reloads matter when you are editing a lesson live in front of a room.' },
      ] },
      { group: 'Backend', chips: [
        { name: 'Express 4', why: 'Five endpoints in one readable file — small enough that a beginner can hold it in their head.' },
        { name: 'Neon Postgres', why: 'A real hosted database, so "Try it" sends a genuine request rather than a simulated one.' },
      ] },
      { group: 'Teaching', chips: [
        { name: 'Lessons as data', why: 'Content lives in one array per lesson, so editing a lesson never means touching rendering code.' },
        { name: 'Offline mode', why: 'DATA_SOURCE=json swaps in an in-memory twin, so a dead connection cannot cancel a class.' },
      ] },
    ],
    links: [
      { kind: 'code', label: 'View the code', href: 'https://github.com/officiallyhailey/Assessment' },
    ],
    live: { url: '', auto: true },
    liveNote: 'Deploy pending — the lesson site, captured',
    build: {
      cap: 'The path one row travels — click a step to see what it does',
      flow: [
        { label: 'React client', sub: 'vite · useState + useEffect', detail: 'The lesson site runs in the browser. Every demo fires a real request and puts the timing on screen, because a request not being instant is the whole point of lesson 3.' },
        { label: 'Vite proxy', sub: 'strips the /api prefix', detail: 'Everything the demos fetch starts with /api, and the proxy rewrites that prefix away before forwarding. The server itself knows nothing about /api.' },
        { label: 'Express', sub: 'one file, five endpoints', detail: 'Every endpoint does the same three steps: read the input, call a helper, send a response. No SQL lives in this file — the queries all sit in helpers.js.' },
        { label: 'Neon Postgres', sub: 'client_form · parameterised', detail: 'Values are always passed separately as $1, $2, so a value can never be read as part of the command. That is SQL injection, prevented by construction.' },
      ],
      kv: [
        ['Client', 'React 18 · Vite'],
        ['Server', 'Express 4 · five endpoints'],
        ['Database', 'Neon Postgres · pg Pool'],
        ['Safety net', 'DATA_SOURCE=json swaps in an in-memory twin'],
        ['Secrets', 'config.js is gitignored, never committed'],
        ['Repo', 'Public — read every line'],
      ],
      modsTitle: 'The three lessons',
      mods: [
        ['01 · Create a table with SQL', 'CREATE TABLE · INSERT · SELECT', 'What a table is, how a row gets in, and how you read it back — with the statements running against a real database as they are explained.'],
        ['02 · Create a POST endpoint', 'Express · req.body', 'Where the data in a request actually lives, and what it takes to turn it into a saved row.'],
        ['03 · Send a GET request in React', 'fetch · useState · useEffect', 'Why a component renders twice, and why the list is empty on the first pass — the lesson the timing display exists to make.'],
      ],
    },
  },

  {
    key: 'toolbox',
    no: '004',
    title: 'Coders Resource',
    kicker: '04 / Resource directory',
    tilt: { rot: '9deg', dy: '14px' },
    bg: 'pbg-4',
    chrome: 'coders resource — the grid',
    shot: '/img/frontdoor-toolbox.jpg',
    shotAlt:
      'Coders Resource: categorised boxes of developer links — terminals and tools, learn, read up.',
    card: {
      tag: 'Live · public',
      scope: 'Solo · live & maintained',
      teaser:
        'Forty-six developer resources I actually use, sorted into seven categories — built while learning, still live, still maintained.',
      stack: ['React', 'Vite', 'Router'],
      cta: 'Read case study',
    },
    role: 'The page I built while learning, still live and still maintained',
    metrics: [
      { to: 46, label: 'Curated links, all hand-picked' },
      { to: 7, label: 'Categories a beginner can navigate' },
      { to: 0, label: 'Sign-ups or paywalls to use it' },
    ],
    scope: [
      { k: 'Role', v: 'Sole developer & designer' },
      { k: 'Status', v: 'Live at anavahdesigns.com/resources' },
    ],
    beats: [
      { b: 'Problem', p: 'Learning to code means drowning in bookmarks. The genuinely useful links get buried among the ones that only looked useful, and a beginner has no way to tell which is which.' },
      { b: 'Built', p: 'A single page of <em>46 resources I actually use</em>, sorted into seven plain-English categories — Answers, Practice, Terminals&nbsp;/&nbsp;Tools, Learn, Read Up, Ideas and Lil Fun. Named for what you need, not for what the tool calls itself.' },
      { b: 'Key decision', p: 'Every link is <em>content, not markup</em> — the directory is one exported array, so adding a resource is a one-line change and the rendering is never touched. The same separation the Assessment lessons use.' },
      { b: 'Still standing', p: 'This is the oldest thing here and the only one publicly live throughout. It carries the honest scars of early work, including two lint warnings left in place rather than quietly rewritten.' },
    ],
    stack: [
      { group: 'Frontend', chips: [
        { name: 'React 18', why: 'The page is a few small components — a box, a link list, a clock — which is all a directory needs.' },
        { name: 'Vite', why: 'Instant dev server and a tiny static build; there is no backend to speak of.' },
        { name: 'React Router', why: 'Client-side routing so the resource page and the resume ship as one deploy.' },
      ] },
      { group: 'Live data', chips: [
        { name: 'Advice Slip API', why: 'A third-party API supplies a random piece of advice on each visit — a real fetch, with a failure path that degrades quietly rather than breaking the page.' },
        { name: 'Live clock', why: 'A ticking clock and a rotating quote, so the page is never quite the same twice.' },
      ] },
      { group: 'Hosting', chips: [
        { name: 'GitHub Pages', why: 'Free static hosting. The 404-to-router trick is what lets a deep link like /resources survive a hard refresh.' },
      ] },
    ],
    links: [
      { kind: 'open', label: 'Open it live ↗', href: '/resources' },
    ],
    live: { url: '/resources', auto: false },
    liveNote: 'Publicly live and maintained',
    build: {
      cap: 'How a deep link survives a static host — click a step',
      flow: [
        { label: 'Direct hit', sub: '/resources', detail: 'A visitor opens /resources directly. GitHub Pages has no server-side rewrites, so no such file exists and it serves 404.html — with a genuine 404 status.' },
        { label: '404.html', sub: 'stores the URL', detail: '404.html stores the full URL in sessionStorage and redirects to the root, which is the one path the host will actually serve.' },
        { label: 'Route restored', sub: 'replaceState', detail: 'index.html reads that value back before the app boots and calls history.replaceState, so React Router starts on the right route and the address bar never shows the detour.' },
      ],
      kv: [
        ['Content model', 'One exported array — adding a link is a one-line change'],
        ['Categories', 'Seven, named for the need rather than the tool'],
        ['Third-party', 'Advice Slip API, with a silent failure path'],
        ['Hosting', 'GitHub Pages — static, free, no backend'],
      ],
      modsTitle: "What's in it",
      mods: [
        ['Answers', 'When you are stuck right now', 'The places you actually go mid-bug, rather than the ones that look impressive in a bookmark bar.'],
        ['Practice', 'Somewhere to write code', 'Sandboxes and challenge sites for when reading has stopped helping and you need to type something.'],
        ['Terminals / Tools', 'Scratch space', 'CodeSandbox, JS Bin, CodePen, JSFiddle, MDN Playground, Dillinger and Replit — try an idea without starting a project.'],
        ['Learn', 'Structured routes in', 'MDN, GeeksforGeeks, Codecademy, W3Docs, Refactoring Guru and Treehouse — the courses and references worth the time.'],
        ['Read Up', 'Depth, once the basics land', 'LogRocket, MDN’s blog, Josh Comeau and Martin Fowler on refactoring — writing that changed how I build things.'],
        ['Ideas & Lil Fun', 'Momentum', 'Project prompts for when you cannot think what to build, plus a rotating quote, a random activity and a live clock — the page tells you to take a break, so it may as well mean it.'],
      ],
    },
  },
];

export const PROJECT_KEYS = PROJECTS.map((p) => p.key);
export const PROJECT_BY_KEY = Object.fromEntries(PROJECTS.map((p) => [p.key, p]));
