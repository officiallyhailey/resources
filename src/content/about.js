// About, capabilities, experience and contact content - data, so copy edits
// never mean touching a component.

export const ABOUT = {
  // Rendered word-by-word on reveal. About.jsx scales the per-word delay to the
  // length, so a long lead like this one still lands in about the same time as
  // a short one instead of crawling onto the screen.
  lead:
    "Tech forward, operations-focused developer with 7+ years of experience in project management, workflow optimization, and business/program development. Proven at building scalable systems, reliable workflows, and translating operational data into clear, actionable insights. Covered everything from vendor logistics to customer experience for 2025's Top 100 Coffee Shops in the world!",
  body: [
    'Known for creating structure, improving efficiency, and supporting leadership through data-informed decision-making - with a design eye that makes the output actually helpful to look at.',
  ],
  // `year` is optional: link rows carry no date, so the cell stays empty.
  facts: [
    { label: 'Programming Certification', year: '2023' },
    { label: 'HR Certification', year: '2023' },
    { label: 'Back End Certification (In Progress)', year: '2026' },
    { label: 'GitHub →', href: 'https://github.com/officiallyhailey' },
    { label: 'Client sites →', href: '#clients' },
  ],
  // The portrait renders as a player card - rarity strip, art, stat block.
  // Stats are the same facts stated elsewhere on the page, not invented ones.
  card: {
    src: '/img/profile-card.jpg',
    alt: 'Hailey Grace',
    rarity: 'Open to work',
    no: 'No. 01',
    name: 'Hailey Grace',
    title: 'Full-stack developer · operations',
    stats: [
      { v: '7+', k: 'Years - Project Management' },
      { v: '3+', k: 'Years - Procurement' },
      { v: '3', k: 'Certifications' },
    ],
    foot: ['Certified Cat Lover', 'CT · remote'],
  },
};

// Grouped capabilities. `i` is a simple-icons export name - Skills renders the
// real brand mark when one exists and falls back to a plain chip when it does
// not, so nothing here depends on hand-drawn SVG paths that could render wrong.
//
// The last group is deliberately "Currently learning": this section describes a
// trajectory, not a ceiling.
export const CAPABILITIES = [
  {
    k: 'Frontend',
    items: [
      { n: 'React', i: 'siReact' },
      { n: 'Next.js', i: 'siNextdotjs' },
      { n: 'TypeScript', i: 'siTypescript' },
      { n: 'JavaScript', i: 'siJavascript' },
      { n: 'Vite', i: 'siVite' },
      { n: 'HTML & CSS' },
    ],
  },
  {
    k: 'Backend & data',
    items: [
      { n: 'Node.js', i: 'siNodedotjs' },
      { n: 'Express', i: 'siExpress' },
      { n: 'PostgreSQL', i: 'siPostgresql' },
      { n: 'Airtable', i: 'siAirtable' },
      { n: 'REST APIs' },
      { n: 'SWR caching' },
    ],
  },
  {
    k: 'AI & automation',
    items: [
      { n: 'Claude', i: 'siAnthropic' },
      { n: 'Tool-use agents' },
      { n: 'MCP servers' },
      { n: 'Workflow automation' },
    ],
  },
  {
    k: 'Data & reporting',
    items: [
      { n: 'Dashboards' },
      { n: 'Mapbox', i: 'siMapbox' },
      { n: 'Scorecards & KPIs' },
      { n: 'Forecasting' },
    ],
  },
  {
    k: 'Design',
    items: [
      { n: 'Figma', i: 'siFigma' },
      { n: 'Design systems' },
      { n: 'Interface design' },
      { n: 'Canva' },
      { n: 'Training guides' },
    ],
  },
  {
    k: 'Platforms',
    items: [
      { n: 'Shopify', i: 'siShopify' },
      { n: 'Squarespace', i: 'siSquarespace' },
      { n: 'WordPress', i: 'siWordpress' },
      { n: 'Square', i: 'siSquare' },
      { n: 'Vercel', i: 'siVercel' },
      { n: 'Google', i: 'siGoogle' },
    ],
  },
  {
    k: 'Ways of working',
    items: [
      { n: 'Git & GitHub', i: 'siGithub' },
      { n: 'Vitest' },
      { n: 'CI pipelines' },
      { n: 'Procurement' },
      { n: 'Payroll & scheduling' },
    ],
  },
  {
    k: 'Currently learning',
    growing: true,
    items: [
      { n: 'Python', i: 'siPython' },
      { n: 'C++', i: 'siCplusplus' },
    ],
  },
];

export const JOBS = [
  {
    period: '2023 – Present',
    title: 'Operations Manager',
    company: 'Silk City Coffee',
    points: [
      'Built backend data structures and a frontend dashboard using Airtable and AI agents - task management, recruiting, HR/payroll, analytics, B2B insights, vendor management, and SOP guides.',
      'Managed scheduling, labor modeling, and payroll for high-volume, multi-location teams within target margins.',
      'Saved over $35k through vendor management and secured an additional $35k through grant proposals.',
    ],
  },
  {
    period: '2019 – 2022',
    title: 'Non-profit Project Manager',
    company: 'The Underground NE',
    points: [
      'Contributed to a 4-year collaborative project to build and improve services for adult survivors of human trafficking in New England.',
      'Worked alongside non-profits, social services, state agencies, and law enforcement including the FBI.',
    ],
  },
];

// All contact copy, including the popup form's. Kept here with everything else
// so text edits never mean opening a component - and so apostrophes can be
// written normally instead of escaped as &apos; for JSX.
export const CONTACT_FORM = {
  label: 'Contact',
  heading: "Let's connect",
  lede: "Got an idea? I can't wait to hear about it. Fill out the form below and we'll be in touch.",
  fields: { name: 'Name', email: 'Email', subject: 'Subject', message: 'Message' },
  send: 'Send message',
  sending: 'Sending…',
  sent: {
    label: 'Sent',
    heading: 'Thanks - that reached me.',
    body: 'I read everything that comes through here and will reply as soon as I can.',
    close: 'Close',
  },
};

export const CONTACT = {
  email: 'haileydgrace@gmail.com',
  links: [
    { label: 'Email', value: 'haileydgrace@gmail.com', href: 'mailto:haileydgrace@gmail.com' },
    { label: 'LinkedIn', value: 'hailey-g', href: 'https://www.linkedin.com/in/hailey-g/' },
    { label: 'Design work', value: 'Client sites on this site', href: '#clients' },
  ],
};
