
// This file contains the data for the resources page, including the quotes, activity ideas, and resource boxes. It also exports the NAV_ITEMS array for the navigation menu.
export const QUOTES = [
  { text: 'The best way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
  { text: 'The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.', author: 'Winston Churchill' },
  { text: "Don't let yesterday take up too much of today.", author: 'Will Rogers' },
  { text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.", author: 'Unknown' },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: 'Vince Lombardi' },
  { text: 'If you are working on something that you really care about, you don\'t have to be pushed. The vision pulls you.', author: 'Steve Jobs' },
  { text: "People who are crazy enough to think they can change the world, are the ones who do.", author: 'Rob Siltanen' },
  { text: 'Failure will never overtake me if my determination to succeed is strong enough.', author: 'Og Mandino' },
  { text: 'We may encounter many defeats but we must not be defeated.', author: 'Maya Angelou' },
  { text: 'Knowing is not enough; we must apply. Wishing is not enough; we must do.', author: 'Johann Wolfgang Von Goethe' },
  { text: 'Imagine your life is perfect in every respect; what would it look like?', author: 'Brian Tracy' },
  { text: 'We generate fears while we sit. We overcome them by action.', author: 'Dr. Henry Link' },
  { text: 'Whether you think you can or think you can\'t, you\'re right.', author: 'Henry Ford' },
  { text: 'Security is mostly a superstition. Life is either a daring adventure or nothing.', author: 'Helen Keller' },
  { text: 'The man who has confidence in himself gains the confidence of others.', author: 'Hasidic Proverb' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'Experience is the name everyone gives to their mistakes.', author: 'Oscar Wilde' },
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: 'Your time is limited, so don\'t waste it living someone else\'s life.', author: 'Steve Jobs' },
];

export const ACTIVITY_IDEAS = [
  'Go for a walk in the park', 'Read a book', 'Take a cooking class',
  'Visit a museum', 'Go to a concert', 'Attend a sports game',
  'Try a new hobby', 'Join a club or organization', 'Volunteer locally',
  'Plan a picnic with friends', 'Go on a road trip', 'Attend a local festival',
  'Visit a farmers market', 'Take a dance class', 'Go on a hike',
  'Try a new restaurant', 'Attend a local lecture or talk',
  'Go to a comedy show', 'Take a photography class', 'Go on a scavenger hunt',
  'Attend a local art exhibition', 'Go to a movie or play', 'Try a new sport',
  'Join a gym or fitness center', 'Go on a camping trip', 'Take a pottery class',
  'Join a book club', 'Go on a bike ride', 'Go to a local coffee shop',
];

export const RESOURCE_BOXES = [
  {
    id: 'answers', title: 'Answers',
    items: [
      { icon: 'fa-handshake-angle', href: 'https://stackoverflow.com/', text: 'Stack Overflow' },
      { icon: 'fa-handshake-angle', href: 'https://dev.to/', text: 'Dev: Community forum' },
      { icon: 'fa-square-poll-horizontal', href: 'https://www.shecodes.io/athena', text: 'SheCodes: Athena AI' },
      { icon: 'fa-square-poll-horizontal', href: 'https://zzzcode.ai/code-explain', text: 'CODE AI: Line by line explainer' },
      { icon: 'fa-square-poll-horizontal', href: 'https://www.blackbox.ai/', text: 'Blackbox AI' },
      { icon: 'fa-handshake-angle', href: 'https://gist.github.com/', text: 'GitHub Gist' },
      { icon: 'fa-square-poll-horizontal', href: 'https://kittygiraudel.github.io/selectors-explained/', text: 'Selector Explained: CSS' },
    ],
  },
  {
    id: 'practice', title: 'Practice',
    items: [
      { icon: 'fa-chalkboard-user', href: 'https://edabit.com/', text: 'Edabit' },
      { icon: 'fa-chalkboard-user', href: 'https://www.hackerearth.com/practice/', text: 'Hacker Earth' },
      { icon: 'fa-chalkboard-user', href: 'https://practice.geeksforgeeks.org/explore?page=1&sortBy=submissions', text: 'GeeksforGeeks: Problem Solving' },
      { icon: 'fa-chalkboard-user', href: 'https://www.w3docs.com/quiz/', text: 'W3Doc: Quizzes' },
      { icon: 'fa-chalkboard-user', href: 'https://www.w3schools.com/exercises/index.php', text: 'W3Schools: Exercises' },
      { icon: 'fa-chalkboard-user', href: 'https://codepen.io/challenges', text: 'Codepen: CSS Challenges' },
    ],
  },
  {
    id: 'fun', title: 'Lil Fun',
    items: [
      { icon: 'fa-puzzle-piece', href: 'https://css-diner.netlify.app/', text: 'CSS Diner' },
      { icon: 'fa-puzzle-piece', href: 'https://cmdchallenge.com/', text: 'CMD Challenge' },
      { icon: 'fa-puzzle-piece', href: 'http://www.flexboxdefense.com/', text: 'Flexbox Defense' },
      { icon: 'fa-puzzle-piece', href: 'https://flexboxfroggy.com/', text: 'Flexbox Froggy' },
      { icon: 'fa-gamepad', href: 'https://www.codingame.com/start/', text: 'Coding Game' },
      { icon: 'fa-puzzle-piece', href: 'https://www.w3schools.com/codegame/index.html', text: 'W3Schools Coding Game' },
    ],
  },
  {
    id: 'ideas', title: 'Ideas',
    items: [
      { icon: 'fa-pen-ruler', href: 'https://foolishdeveloper.com/', text: 'Foolish Developer' },
      { icon: 'fa-pen-ruler', href: 'https://www.joshwcomeau.com/goodies/', text: 'Josh Comeau: Free Tools' },
      { icon: 'fa-pen-ruler', href: 'https://phuoc.ng/', text: 'Phuoc Nguyen: Front End Collections' },
      { icon: 'fa-pen-ruler', href: 'https://css-tricks.com/', text: 'CSS Tricks' },
      { icon: 'fa-pen-ruler', href: 'https://codepen.io/trending', text: 'Codepen: Trends' },
      { icon: 'fa-pen-ruler', href: 'https://freefrontend.com/css-animated-backgrounds/', text: 'CSS Background Animations' },
      { icon: 'fa-pen-ruler', href: 'https://fontawesome.com/icons', text: 'Font Awesome Icons' },
    ],
  },
  {
    id: 'terminals', title: 'Terminals / Tools',
    items: [
      { icon: 'fa-table-columns', href: 'https://codesandbox.io/', text: 'Codesandbox' },
      { icon: 'fa-table-columns', href: 'https://jsbin.com/', text: 'JS Bin' },
      { icon: 'fa-table-columns', href: 'https://codepen.io/pen/', text: 'Codepen' },
      { icon: 'fa-table-columns', href: 'https://jsfiddle.net/', text: 'JS Fiddle' },
      { icon: 'fa-table-columns', href: 'https://developer.mozilla.org/en-US/play', text: 'MDN Playground' },
      { icon: 'fa-table-columns', href: 'https://dillinger.io/', text: 'Dillinger: Markdown' },
      { icon: 'fa-screwdriver-wrench', href: 'https://docs.replit.com/', text: 'Replit' },
    ],
  },
  {
    id: 'learn', title: 'Learn',
    items: [
      { icon: 'fa-lines-leaning', href: 'https://www.tutorialspoint.com/articles/index.php', text: 'Tutorials Point' },
      { icon: 'fa-lines-leaning', href: 'https://practice.geeksforgeeks.org/courses', text: 'GeeksforGeeks: Courses' },
      { icon: 'fa-lines-leaning', href: 'https://www.codecademy.com/catalog', text: 'Code Academy' },
      { icon: 'fa-lines-leaning', href: 'https://developer.mozilla.org/en-US/', text: 'MDN Mozilla' },
      { icon: 'fa-lines-leaning', href: 'https://www.w3docs.com/', text: 'W3Docs' },
      { icon: 'fa-lines-leaning', href: 'https://refactoring.guru/refactoring', text: 'Refactoring Guru' },
      { icon: 'fa-lines-leaning', href: 'https://teamtreehouse.com/library', text: 'Team TreeHouse' },
      { icon: 'fa-lines-leaning', href: 'https://code.org/curriculum/docs/k-5/glossary', text: 'Code: Language Glossary' },
    ],
  },
  {
    id: 'read', title: 'Read Up',
    items: [
      { icon: 'fa-newspaper', href: 'https://blog.logrocket.com/', text: 'LogRocket Blog' },
      { icon: 'fa-newspaper', href: 'https://www.tutorialspoint.com/articles/index.php', text: 'Tutorials Point Articles' },
      { icon: 'fa-newspaper', href: 'https://developer.mozilla.org/en-US/blog/', text: 'MDN Blog' },
      { icon: 'fa-newspaper', href: 'https://www.joshwcomeau.com/', text: 'Josh Comeau Posts' },
      { icon: 'fa-newspaper', href: 'https://martinfowler.com/books/refactoring.html', text: 'Refactoring by Martin Fowler' },
    ],
  },
];

export const NAV_ITEMS = [
  { path: '/resources',           label: 'Dashboard', icon: 'fa-gauge',            end: true },
  { path: '/resources/answers',   label: 'Answers',   icon: 'fa-handshake-angle'              },
  { path: '/resources/practice',  label: 'Practice',  icon: 'fa-chalkboard-user'              },
  { path: '/resources/fun',       label: 'Lil Fun',   icon: 'fa-puzzle-piece'                 },
  { path: '/resources/ideas',     label: 'Ideas',     icon: 'fa-pen-ruler'                    },
  { path: '/resources/terminals', label: 'Terminals', icon: 'fa-table-columns'                },
  { path: '/resources/learn',     label: 'Learn',     icon: 'fa-lines-leaning'                },
  { path: '/resources/read',      label: 'Read Up',   icon: 'fa-newspaper'                    },
  { path: '/resources/links',     label: 'Links',     icon: 'fa-clipboard'                    },
];
