let today = new Date();
date = today.toLocaleDateString()
document.querySelector('.todays-date').innerHTML = date;

let time = today.toLocaleTimeString();
let timeElement = document.querySelector('.time');
timeElement.innerHTML = time;

console.log(time)






const text=document.getElementById("quote");
const author=document.getElementById("author");


let getNewQuote = async () =>
{
    //api for quotes
    let url="https://type.fit/api/quotes";    

    // fetch the data from api
    let response=await fetch(url);
    console.log(typeof response);
   
    let allQuotes = await response.json();

    let indx = Math.floor(Math.random()*allQuotes.length);

    
    let quote=allQuotes[indx].text;

    let auth=allQuotes[indx].author;

    if(auth==null)
    {
        author = "Anonymous";
    }

    text.innerHTML=quote;
    author.innerHTML="~ "+auth;
}
getNewQuote();



//live website doesn't work - only in live server mode does it display results 

async function getRandomActivity() {
    try {
        let response = await fetch('http://www.boredapi.com/api/activity/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        document.getElementById('activityText').textContent = data.activity;
    } catch (error) {
        console.error('Error fetching random activity:', error);
    }
}

getRandomActivity()






async function getRandomAdvice() {
    try {
        let response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        document.getElementById('adviceText').textContent = data.slip.advice;
    } catch (error) {
        console.error('Error fetching random advice:', error);
    }
}

document.getElementById('getAdviceButton').addEventListener('click', getRandomAdvice);

getRandomAdvice();



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

