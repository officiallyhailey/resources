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
    //convert response to json and store it in quotes array
    let allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    let indx = Math.floor(Math.random()*allQuotes.length);

    //Store the quote present at the randomly generated index
    let quote=allQuotes[indx].text;

    //Store the author of the respective quote
    let auth=allQuotes[indx].author;

    if(auth==null)
    {
        author = "Anonymous";
    }

    //function to dynamically display the quote and the author
    text.innerHTML=quote;
    author.innerHTML="~ "+auth;
}
getNewQuote();


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

document.getElementById('getActivityButton').addEventListener('click', getRandomActivity);

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