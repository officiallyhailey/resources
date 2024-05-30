

//todays date 

let today = new Date();
date = today.toLocaleDateString();
document.querySelector(".todays-date").innerHTML = date;

let time = today.toLocaleTimeString();
let timeElement = document.querySelector(".time");
timeElement.innerHTML = time;

console.log(time);

let text = document.getElementById("quote");
let author = document.getElementById("author");

//world time api and listed abbreviation for primary use

// - abbreviation
// - client_ip
// - datetime
// - day_of_week
// - day_of_year
// - dst
// - dst_offset
// - timezone
// - unixtime
// - utc_datetime
// - utc_offset
// - week_number

// let currentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })

fetch("https://worldtimeapi.org/api/ip")
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Failed to fetch current time. Status code: ${response.status}`);
    }
  })
  .then(data => {
    let current_time = data.datetime;
    console.log(`Current time: ${current_time}`);
  })
  .catch(error => {
    console.error(error);
  });


//quote  generator

let getNewQuote = async () => {
  //api for quotes
  let url = "https://type.fit/api/quotes";

  // fetch the data from api
  let response = await fetch(url);
  console.log(typeof response);

  let allQuotes = await response.json();

  let indx = Math.floor(Math.random() * allQuotes.length);

  let quote = allQuotes[indx].text;

  let auth = allQuotes[indx].author;

  if (auth == null) {
    author = "Anonymous";
  }

  text.innerHTML = quote;
  author.innerHTML = "~ " + auth;
};
getNewQuote();


//random advice
async function getRandomAdvice() {
  try {
    let response = await fetch("https://api.adviceslip.com/advice");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    document.getElementById("adviceText").textContent = data.slip.advice;
  } catch (error) {
    console.error("Error fetching random advice:", error);
  }
}

document
  .getElementById("getAdviceButton")
  .addEventListener("click", getRandomAdvice);

getRandomAdvice();


//jokes 

//these jokes are risky but some are funny

// async function getRandomJoke() {
//     try {
//         let response = await fetch('https://v2.jokeapi.dev/joke/Any');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         let data = await response.json();
//         document.getElementById('jokeText').textContent = data.setup + ' ' + data.delivery;
//     } catch (error) {
//         console.error('Error fetching random joke:', error);
//     }
// }

// document.getElementById('getJokeButton').addEventListener('click', getRandomJoke);

// getRandomJoke();

//live website doesn't work - only in live server mode does it display results


//random activity 

let activityIdeas = [
  "Go for a walk in the park",
  "Read a book",
  "Take a cooking class",
  "Visit a museum",
  "Go to a concert",
  "Attend a sports game",
  "Try a new hobby",
  "Join a club or organization",
  "Volunteer at a local organization",
  "Plan a picnic with friends",
  "Go on a road trip",
  "Attend a local festival",
  "Visit a local farmers market",
  "Take a dance class",
  "Go on a hike",
  "Try a new restaurant",
  "Attend a local lecture or talk",
  "Join a language exchange group",
  "Go to a comedy show",
  "Take a photography class",
  "Go on a scavenger hunt",
  "Attend a local art exhibition",
  "Go to a movie or play",
  "Try a new sport",
  "Join a gym or fitness center",
  "Go on a camping trip",
  "Attend a local theater production",
  "Take a pottery class",
  "Try a new type of exercise",
  "Join a book club",
  "Go to a local art gallery",
  "Take a painting or drawing class",
  "Go on a bike ride",
  "Try a new type of cuisine",
  "Join a local meetup group",
  "Go to a local music festival",
  "Take a yoga class",
  "Go on a fishing trip",
  "Try a new type of adventure activity",
  "Join a local history group",
  "Go to a local lecture series",
  "Take a knitting or crochet class",
  "Go on a gardening tour",
  "Try a new type of outdoor activity",
  "Join a local theater company",
  "Take a dance class",
  "Go on a local brewery tour",
  "Try a new type of cultural activity",
  "Join a local film society",
  "Go to a local coffee shop",
];

function getRandomItem(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
function getRandomActivity() {
  document.getElementById("activityText").innerHTML =
    getRandomItem(activityIdeas);
}

getRandomActivity();
document
  .getElementById("getactivityButton")
  .addEventListener("click", getRandomActivity);




// //expand intro text in sidebar box 

// let readMoreButton = document.querySelector('.read-more');
// let lineClampElement = document.querySelector('.sidebar-intro');
// function toggleReadMore() {


//   if (readMoreButton.innerHTML === 'click to read more') {
//     lineClampElement.style.webkitLineClamp = 'unset';
//     readMoreButton.innerHTML = 'read less';
//     readMoreButton.classList.add('fa-arrow-up')
//     readMoreButton.classList.remove('fa-arrow-down')
//   } else {
//     lineClampElement.style.webkitLineClamp = '2';
//     readMoreButton.innerHTML = 'click to read more';
//     readMoreButton.classList.remove('fa-arrow-up')
//     readMoreButton.classList.add('fa-arrow-down')
//   };
// }

// readMoreButton.addEventListener('click', toggleReadMore);



// pop up form submission for messages using  Formspree.io 
window.formbutton = window.formbutton || function () { (formbutton.q = formbutton.q || []).push(arguments) };
/* customize formbutton below*/
formbutton("create", {
  action: "https://formspree.io/f/mknlklpe",
  title: "Contact Form:",
  description: "Have a recommendation? Having issues with a link? Just want to say hello? Type away and click submit!",
  fields: [
    {
      type: "input",
      label: "Name:",
      name: "name",
      required: true,
      placeholder: "..."
    },
    {
      type: "email",
      label: "Email:",
      name: "email",
      required: true,
      placeholder: "..."
    },
    {
      type: "input",
      label: "Subject:",
      name: "Subject",
      required: true,
      placeholder: "..."
    },
    {
      type: "textarea",
      label: "Message:",
      name: "message",
      placeholder: "...",
    },
    { type: "submit" }
  ],
  styles: {
    title: {
      backgroundColor: "transparent",
      fontFamily: "Anton, monospace",
      textShadow: "0 0 100px black",

    },
    description: {
      backgroundColor: "transparent",
      borderTop: "1px solid aliceblue",
      paddingTop: "10px",
      fontFamily: "Bebas Neue, sans-serif",
      fontSize: '18px',
      textShadow: "0 0 100px black",
    },
    button: {
      backgroundImage: "url(https://i.pinimg.com/564x/1c/39/c8/1c39c81fccba10c48869ce903c533845.jpg)",
      backgroundSize: "cover",
      fill: "transparent",
      boxShadow: "0px 0px 10px aliceblue",
      cursor: "pointer",
      className: "form-button-hover",
    },
    shim: {
      backgroundColor: "#000000",
      backgroundImage: "url('gallery/contact-background.png')",
      backgroundSize: "cover"

    },
    label: {
      fontFamily: "Bebas Neue, sans-serif",
      color: "aliceblue",
      textShadow: "0 0 100px black",
    },
    input: {
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 100px black, 0 0 5px aliceblue, 0 0 200px black",
      padding: "10px",
      fontFamily: "Bebas Neue, sans-serif",
      borderRadius: "25px",
      color: "aliceblue",
    },
    modal: {
      backgroundColor: "rgba(0, 0, 0, 1)",
      border: "1px solid aliceblue",
    },
    closeButton: {
      fill: "#ff4500",
      color: "#ff4500"
    },
  }
});

//show and hide the form button 

let hideFormbutton = function () {
  formbutton('showForm', false)
};

let showFormbutton = function () {
  formbutton('showForm', true)
  setTimeout(hideFormbutton, 2000)
};

let button = document.getElementById("showFormbutton").addEventListener('click', showFormbutton, false);

// https://codepen.io/formspree/details/oNjZyQv

// https://www.joshwcomeau.com/css/custom-css-reset/


let submitForm = document.querySelector(".add");
let addButton = document.querySelector(".add-todo");
let todoList = document.querySelector(".todos");
let list = document.querySelectorAll(".todos li");
let logo = document.querySelector('.logo-header')
let lang = navigator.language;


//links to remember code

let listLenght = list.lenght;

let generateTempalate = (todo) => {
  let html = `<li>
                    <label for="todo_${listLenght}" class="link">
                      ${todo}
                    </label>
                    <i class="far fa-trash-alt color delete"></i>
                  </li>`;
  todoList.innerHTML += html;
};

function addTodos(e) {
  e.preventDefault();
  let todo = submitForm.add.value.trim();
  if (todo.length) {
    listLenght = listLenght + 1;
    generateTempalate(todo);
    submitForm.reset();
  }
}

submitForm.addEventListener("submit", addTodos);
addButton.addEventListener("click", addTodos);

function deleteTodos(e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
}

todoList.addEventListener("click", deleteTodos);


//copy to clipboard

let clipboard = document.getElementById("clipboard")

clipboard.addEventListener("click", function copyBreakdown() {

  navigator.clipboard.writeText(todoList.innerText.toLowerCase())
  console.log(todoList.innerText.toLowerCase())
})


//fading on scroll

let personal_intro = document.querySelector('.profile-intro');
let arrow = document.querySelector('.down');
let profile_image = document.querySelector('.profile')
let profile_header = document.querySelector('.content-header');
let todaybox = document.querySelector('.today');
let answerbox = document.querySelector('.answerbox');
let todobox = document.querySelector('.todobox');
let practicebox = document.querySelector('.practicebox');
let quotebox = document.querySelector('.quotes');
let funbox = document.querySelector('.funbox');
let advicebox = document.querySelector('.advice');
let ideasbox = document.querySelector('.ideasbox');
let activitybox = document.querySelector('.activity');
let terminalbox = document.querySelector('.terminalbox');
let referencepicture = document.querySelector('.reference');
let resourcebox = document.querySelector('.resourcebox');
let readpicture = document.querySelector('.read');
let readbox = document.querySelector('.readbox');
let aboutpicture = document.querySelector('.aboutme');
let aboutmebox = document.querySelector('.aboutmebox');
let cyberpicture = document.querySelector('.cyber');
let cyberbox = document.querySelector('.cyberbox')
let focuspicture = document.querySelector('.focus');


function fadeOutOnScroll(element) {
  if (!element) {
    return;
  }

  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;

  var opacity = 1;

  if (scrollTop > distanceToTop) {
    opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
  }

  if (opacity >= 0) {
    element.style.opacity = opacity;
  }
}

function scrollHandler() {
  fadeOutOnScroll(profile_image);
  fadeOutOnScroll(logo);
  fadeOutOnScroll(personal_intro);
  fadeOutOnScroll(arrow);
  fadeOutOnScroll(profile_header);
  fadeOutOnScroll(todaybox);
  fadeOutOnScroll(answerbox);
  fadeOutOnScroll(practicebox);
  fadeOutOnScroll(todobox);
  fadeOutOnScroll(quotebox);
  fadeOutOnScroll(funbox);
  fadeOutOnScroll(advicebox);
  fadeOutOnScroll(ideasbox);
  fadeOutOnScroll(activitybox);
  fadeOutOnScroll(terminalbox);
  fadeOutOnScroll(referencepicture);
  fadeOutOnScroll(resourcebox);
  fadeOutOnScroll(readpicture);
  fadeOutOnScroll(readbox);
  fadeOutOnScroll(aboutpicture);
  fadeOutOnScroll(aboutmebox);
  fadeOutOnScroll(cyberpicture);
  fadeOutOnScroll(cyberbox);
  fadeOutOnScroll(focuspicture);
}

window.addEventListener('scroll', scrollHandler);


//show resource section

let maincontent = document.querySelector('.maincontent');
let hidecontent = document.querySelector('.up');
let showcontent = document.querySelector('.down');



function toggleResources() {


    if (hidecontent.classList.contains('hidden')) {
      hidecontent.classList.remove('hidden');
    }
  

  if (maincontent.classList.contains('hidden')) {
    maincontent.classList.remove('hidden');
  }
}

arrow.onclick = function () {
  toggleResources();
};


hidecontent.onclick = function () {
  if (maincontent.classList.contains('hidden')) {
    maincontent.classList.remove('hidden');
  }
  else {
    maincontent.classList.add('hidden');
    hidecontent.classList.add('hidden')
  };
}



