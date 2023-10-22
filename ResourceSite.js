//todays date 

  let today = new Date();
  date = today.toLocaleDateString();
  document.querySelector(".todays-date").innerHTML = date;

  let time = today.toLocaleTimeString();
  let timeElement = document.querySelector(".time");
  timeElement.innerHTML = time;

  console.log(time);

  const text = document.getElementById("quote");
  const author = document.getElementById("author");

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

  fetch("https://worldtimeapi.org/api/ip")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Failed to fetch current time. Status code: ${response.status}`);
      }
    })
    .then(data => {
      const current_time = data.datetime;
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




//expand intro text in sidebar box 

  let readMoreButton = document.querySelector('.read-more');
  let lineClampElement = document.querySelector('.sidebar-intro');
  function toggleReadMore() {


  if (readMoreButton.innerHTML === 'click to read more') {
      lineClampElement.style.webkitLineClamp = 'unset';
      readMoreButton.innerHTML = 'read less';
      readMoreButton.classList.add('fa-arrow-up')
      readMoreButton.classList.remove('fa-arrow-down')
  } else {
      lineClampElement.style.webkitLineClamp = '2';
      readMoreButton.innerHTML = 'click to read more';
      readMoreButton.classList.remove('fa-arrow-up')
      readMoreButton.classList.add('fa-arrow-down')
  };
  }

  readMoreButton.addEventListener('click', toggleReadMore);



// pop up form submission for link errors using Formspree.io 
window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
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
      },
      shim: {
        backgroundImage: "url(https://i.pinimg.com/564x/d6/2f/76/d62f762d08ecb0456e9f46967ba34230.jpg)",
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
      color: "aliceblue"
     },
     modal: {
      backgroundColor: "transparent",
     
     },
     closeButton: {
      fill: "orange",
      color: "orange"
     },
    }
  });