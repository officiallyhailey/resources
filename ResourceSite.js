let today = new Date();
date = today.toLocaleDateString()
document.querySelector('.todays-date').innerHTML = date;

let time = today.toLocaleTimeString();
let timeElement = document.querySelector('.time');
timeElement.innerHTML = time;

console.log(time)
