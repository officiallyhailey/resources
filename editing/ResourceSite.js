// === Date & Time ===

const today = new Date();
document.querySelector('.todays-date').innerHTML = today.toLocaleDateString();
document.querySelector('.time').innerHTML = today.toLocaleTimeString();

// === Quote Generator ===

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');

async function getNewQuote() {
  const response = await fetch('https://type.fit/api/quotes');
  const quotes = await response.json();
  const { text, author } = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerHTML = text;
  authorEl.innerHTML = `~ ${author ?? 'Anonymous'}`;
}
getNewQuote();

// === Random Advice ===

async function getRandomAdvice() {
  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    document.getElementById('adviceText').textContent = data.slip.advice;
  } catch (err) {
    console.error('Error fetching advice:', err);
  }
}

document.getElementById('getAdviceButton').addEventListener('click', getRandomAdvice);
getRandomAdvice();

// === Random Activity ===

const activityIdeas = [
  'Go for a walk in the park', 'Read a book', 'Take a cooking class',
  'Visit a museum', 'Go to a concert', 'Attend a sports game',
  'Try a new hobby', 'Join a club or organization', 'Volunteer at a local organization',
  'Plan a picnic with friends', 'Go on a road trip', 'Attend a local festival',
  'Visit a local farmers market', 'Take a dance class', 'Go on a hike',
  'Try a new restaurant', 'Attend a local lecture or talk', 'Join a language exchange group',
  'Go to a comedy show', 'Take a photography class', 'Go on a scavenger hunt',
  'Attend a local art exhibition', 'Go to a movie or play', 'Try a new sport',
  'Join a gym or fitness center', 'Go on a camping trip', 'Attend a local theater production',
  'Take a pottery class', 'Try a new type of exercise', 'Join a book club',
  'Go to a local art gallery', 'Take a painting or drawing class', 'Go on a bike ride',
  'Try a new type of cuisine', 'Join a local meetup group', 'Go to a local music festival',
  'Take a yoga class', 'Go on a fishing trip', 'Try a new adventure activity',
  'Join a local history group', 'Take a knitting class', 'Go on a gardening tour',
  'Join a local theater company', 'Go on a local brewery tour', 'Join a local film society',
  'Go to a local coffee shop',
];

function getRandomActivity() {
  const idx = Math.floor(Math.random() * activityIdeas.length);
  document.getElementById('activityText').innerHTML = activityIdeas[idx];
}

getRandomActivity();
document.getElementById('getactivityButton').addEventListener('click', getRandomActivity);

// === Resource List Data ===

const RESOURCE_BOXES = [
  {
    id: 'answers',
    title: 'Answers',
    items: [
      { icon: 'fa-handshake-angle', href: 'https://stackoverflow.com/', text: 'Stack Overflow: Community forum' },
      { icon: 'fa-handshake-angle', href: 'https://dev.to/', text: 'Dev: Community forum' },
      { icon: 'fa-square-poll-horizontal', href: 'https://www.shecodes.io/athena', text: 'SheCodes: Athena AI Support' },
      { icon: 'fa-square-poll-horizontal', href: 'https://zzzcode.ai/code-explain', text: 'CODE AI: Code explainer, line by line' },
      { icon: 'fa-square-poll-horizontal', href: 'https://www.blackbox.ai/', text: 'Blackbox AI: AI playground' },
      { icon: 'fa-handshake-angle', href: 'https://gist.github.com/', text: 'GitHub Gist: Community forum' },
      { icon: 'fa-square-poll-horizontal', href: 'https://kittygiraudel.github.io/selectors-explained/', text: 'Selector Explained: CSS selectors explained' },
    ],
  },
  {
    id: 'practice',
    title: 'Practice',
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
    id: 'fun',
    title: 'Lil Fun',
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
    id: 'ideas',
    title: 'Ideas',
    items: [
      { icon: 'fa-pen-ruler', href: 'https://foolishdeveloper.com/', text: 'Foolish Developer: Front and Backend Tutorials' },
      { icon: 'fa-pen-ruler', href: 'https://www.joshwcomeau.com/goodies/', text: 'Josh Comeau: Free Tools/Tutorials' },
      { icon: 'fa-pen-ruler', href: 'https://phuoc.ng/', text: 'Phuoc Nguyen: Front End Collections' },
      { icon: 'fa-pen-ruler', href: 'https://css-tricks.com/', text: 'CSS Tricks: CSS Specific Articles' },
      { icon: 'fa-pen-ruler', href: 'https://codepen.io/trending', text: 'Codepen: Front End Trends' },
      { icon: 'fa-pen-ruler', href: 'https://freefrontend.com/css-animated-backgrounds/', text: 'Frontend: CSS Background Animations' },
      { icon: 'fa-pen-ruler', href: 'https://blog.avada.io/css', text: 'Avada: Design Ideas Library' },
      { icon: 'fa-pen-ruler', href: 'https://cdnjs.com', text: 'CDNJS: Open source CDN' },
      { icon: 'fa-pen-ruler', href: 'https://fontawesome.com/icons', text: 'Font Awesome Icons' },
    ],
  },
  {
    id: 'terminals',
    title: 'Terminals / Tools',
    items: [
      { icon: 'fa-table-columns', href: 'https://codesandbox.io/', text: 'Codesandbox: Terminal' },
      { icon: 'fa-table-columns', href: 'https://jsbin.com/', text: 'JS Bin: Terminal' },
      { icon: 'fa-table-columns', href: 'https://codepen.io/pen/', text: 'Codepen: Terminal' },
      { icon: 'fa-table-columns', href: 'https://jsfiddle.net/', text: 'JS Fiddle: Terminal' },
      { icon: 'fa-table-columns', href: 'https://www.tutorialspoint.com/codingground.htm', text: 'Tutorials Point: Terminal Library' },
      { icon: 'fa-table-columns', href: 'https://www.boardinfinity.com/playground/coding', text: 'Board Infinity: Terminal' },
      { icon: 'fa-table-columns', href: 'https://developer.mozilla.org/en-US/play', text: 'MDN: Terminal' },
      { icon: 'fa-table-columns', href: 'https://dillinger.io/', text: 'Markdown: Markdown Terminal' },
      { icon: 'fa-table-columns', href: 'https://www.w3schools.com/tryit/tryit.asp?filename=tryhtml_hello', text: 'W3School: Terminal' },
      { icon: 'fa-screwdriver-wrench', href: 'https://docs.replit.com/', text: 'Replit: Software development platform' },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    items: [
      { icon: 'fa-lines-leaning', href: 'https://www.tutorialspoint.com/articles/index.php', text: 'Tutorials Point: Courses' },
      { icon: 'fa-lines-leaning', href: 'https://practice.geeksforgeeks.org/courses', text: 'GeeksforGeeks: Courses' },
      { icon: 'fa-lines-leaning', href: 'https://www.boardinfinity.com/programs/free-courses', text: 'Board Infinity: Courses' },
      { icon: 'fa-lines-leaning', href: 'https://www.codechef.com', text: 'CodeChef: Courses' },
      { icon: 'fa-lines-leaning', href: 'https://teamtreehouse.com/library', text: 'Team TreeHouse: Course Library' },
      { icon: 'fa-lines-leaning', href: 'https://www.codecademy.com/catalog', text: 'Code Academy: Course Library' },
      { icon: 'fa-lines-leaning', href: 'https://developer.mozilla.org/en-US/', text: 'MDN Mozilla: Guides' },
      { icon: 'fa-screwdriver-wrench', href: 'https://www.w3docs.com/', text: 'W3Docs: Full Site Library' },
      { icon: 'fa-lines-leaning', href: 'https://code.org/curriculum/docs/k-5/glossary', text: 'Code: Language Glossary' },
      { icon: 'fa-lines-leaning', href: 'https://www.quackit.com/', text: 'Quackit: HTML & CSS reference guide' },
      { icon: 'fa-lines-leaning', href: 'https://refactoring.guru/refactoring', text: 'Refactoring: Clean up your code!' },
    ],
  },
  {
    id: 'read-up',
    title: 'Read Up',
    items: [
      { icon: 'fa-newspaper', iconStyle: 'regular', href: 'https://blog.logrocket.com/', text: 'LogRocket Blog' },
      { icon: 'fa-newspaper', iconStyle: 'regular', href: 'https://www.tutorialspoint.com/articles/index.php', text: 'Tutorials Point Articles' },
      { icon: 'fa-newspaper', iconStyle: 'regular', href: 'https://developer.mozilla.org/en-US/blog/', text: 'MDN Blog' },
      { icon: 'fa-newspaper', iconStyle: 'regular', href: 'https://www.joshwcomeau.com/', text: 'Josh Comeau Posts' },
      { icon: 'fa-newspaper', iconStyle: 'regular', href: 'https://martinfowler.com/books/refactoring.html', text: 'Refactoring: book by Martin Fowler, with Kent Beck' },
    ],
  },
];

function renderResourceBoxContents({ title, items }) {
  const listItems = items.map(({ icon, iconStyle = 'solid', href, text }) => `
    <li>
      <a href="${href}" target="_blank">
        <span class="item"><i class="fa-${iconStyle} color ${icon}"></i> ${text}</span>
      </a>
    </li>`).join('');

  return `
    <div>
      <h3 class="h3"><span class="title">${title}</span></h3>
    </div>
    <ul>${listItems}</ul>`;
}

document.querySelectorAll('[data-resource-box]').forEach(container => {
  const box = RESOURCE_BOXES.find(b => b.id === container.dataset.resourceBox);
  if (box) container.innerHTML = renderResourceBoxContents(box);
});

// === Links to Remember (Todo List) ===

const todoForm = document.querySelector('.add');
const addButton = document.querySelector('.add-todo');
const todoList = document.querySelector('.todos');
let listLength = todoList.querySelectorAll('li').length;

function generateTemplate(todo) {
  todoList.innerHTML += `
    <li>
      <label class="link">${todo}</label>
      <i class="far fa-trash-alt color delete"></i>
    </li>`;
}

function addTodo(e) {
  e.preventDefault();
  const todo = todoForm.add.value.trim();
  if (todo.length) {
    listLength++;
    generateTemplate(todo);
    todoForm.reset();
  }
}

todoForm.addEventListener('submit', addTodo);
addButton.addEventListener('click', addTodo);

todoList.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) e.target.parentElement.remove();
});

document.getElementById('clipboard').addEventListener('click', () => {
  navigator.clipboard.writeText(todoList.innerText.toLowerCase());
});

// === Contact Form (Formspree) ===

window.formbutton = window.formbutton || function () { (formbutton.q = formbutton.q || []).push(arguments); };
formbutton('create', {
  action: 'https://formspree.io/f/mknlklpe',
  title: 'Contact Form:',
  description: 'Have a recommendation? Having issues with a link? Just want to say hello? Type away and click submit!',
  fields: [
    { type: 'input',    label: 'Name:',    name: 'name',    required: true, placeholder: '...' },
    { type: 'email',    label: 'Email:',   name: 'email',   required: true, placeholder: '...' },
    { type: 'input',    label: 'Subject:', name: 'Subject', required: true, placeholder: '...' },
    { type: 'textarea', label: 'Message:', name: 'message', placeholder: '...' },
    { type: 'submit' },
  ],
  styles: {
    title:       { backgroundColor: 'transparent', fontFamily: 'Anton, monospace', textShadow: '0 0 100px black' },
    description: { backgroundColor: 'transparent', borderTop: '1px solid aliceblue', paddingTop: '10px', fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', textShadow: '0 0 100px black' },
    button:      { backgroundImage: 'url(https://i.pinimg.com/564x/1c/39/c8/1c39c81fccba10c48869ce903c533845.jpg)', backgroundSize: 'cover', fill: 'transparent', boxShadow: '0px 0px 10px aliceblue', cursor: 'pointer' },
    shim:        { backgroundColor: '#000000', backgroundImage: "url('gallery/contact-background.png')", backgroundSize: 'cover' },
    label:       { fontFamily: 'Bebas Neue, sans-serif', color: 'aliceblue', textShadow: '0 0 100px black' },
    input:       { backgroundColor: 'transparent', boxShadow: 'inset 0 0 100px black, 0 0 5px aliceblue, 0 0 200px black', padding: '10px', fontFamily: 'Bebas Neue, sans-serif', borderRadius: '25px', color: 'aliceblue' },
    modal:       { backgroundColor: 'rgba(0, 0, 0, 1)', border: '1px solid aliceblue' },
    closeButton: { fill: '#ff4500', color: '#ff4500' },
  },
});

document.getElementById('showFormbutton').addEventListener('click', () => {
  formbutton('showForm', true);
  setTimeout(() => formbutton('showForm', false), 2000);
});

// === Scroll Fade ===

const FADE_SELECTORS = [
  '.logo-header', '.profile-intro', '.profile', '.down',
  '.content-header', '.today', '.answers-box', '.todobox',
  '.practice-box', '.quotes', '.fun-box', '.advice',
  '.ideas-box', '.activity', '.terminals-box', '.reference',
  '.resources-box', '.read', '.read-up-box', '.aboutme',
];

let fadeElements = null;

function fadeOutOnScroll(el) {
  if (!el) return;
  const distanceToTop = window.pageYOffset + el.getBoundingClientRect().top;
  const scrollTop = document.documentElement.scrollTop;
  const opacity = scrollTop > distanceToTop
    ? 1 - (scrollTop - distanceToTop) / el.offsetHeight
    : 1;
  if (opacity >= 0) el.style.opacity = opacity;
}

window.addEventListener('scroll', () => {
  if (!fadeElements) fadeElements = FADE_SELECTORS.map(s => document.querySelector(s));
  fadeElements.forEach(fadeOutOnScroll);
});

// === Show / Hide Resource Section ===

const mainContent = document.querySelector('.maincontent');
const hideArrow = document.querySelector('.up');
const showArrow = document.querySelector('.down');

showArrow.addEventListener('click', () => {
  mainContent.classList.remove('hidden');
  hideArrow.classList.remove('hidden');
});

hideArrow.addEventListener('click', () => {
  if (mainContent.classList.contains('hidden')) {
    mainContent.classList.remove('hidden');
  } else {
    mainContent.classList.add('hidden');
    hideArrow.classList.add('hidden');
  }
});
