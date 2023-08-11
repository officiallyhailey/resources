/********************** Exercise 5 - Weather Converter **********************/
// Write a calculation that converts celsius to fahrenheit. To get the value of fahrenheit, you have to multiply the celsius value by 9/5 and then add 32. 

 // Prompt the user for the value of the temperature in celcius. 

// Run the code so that the following is exercise6 to the console: 25°C is equal to 77°F

"answer(s)"

//  OPTION ONE:

function toCelsius (pValue) { 
   return ((Number(pValue) * (9/5)) + 32);
}

let pValue = prompt("Please log the temperature in celcius here! (note the value should be less than 57.6)");

let fahrenheit = toCelsius(Number(pValue)); 

if (Number(pValue) < 57.6) {
    console.log(`${Number(pValue)}°C is equal to ${fahrenheit}°F`); } // 25 °C is equal to 77 °F


// OPTION TWO

function toCelsius (pValue) { 
    return ((pValue * (9/5)) + 32);
}

let pValue = prompt("Please log the temperature in celcius here! (note the value should be less than 57.6)");

let fahrenheit = toCelsius(pValue)

if (pValue < 57.6) {
    console.log(`${pValue}°C is equal to ${fahrenheit}°F`); } // 25 °C is equal to 77 °F

// OPTION THREE 

function toCelsius (pValue) { 
    return ((pValue * (9/5)) + 32);
}

let pValue = parseInt(prompt("Please log the temperature in celcius here! (note the value should be less than 57.6)"));

let fahrenheit = toCelsius(pValue)

if (pValue < 57.6) {
    console.log(`${pValue}°C is equal to ${fahrenheit}°F`); } // 25 °C is equal to 77 °F



//Exercise 6

// Prompt the user for two numbers.

// Make sure that the values of the variables (the strings) are converted to numbers. 

// Create a new variable, add the numbers, and log the value.

// Reassign the variable to store the values of the numbers being substracted. Log the value.

// Add 100 to the variable. Log the value.

// Divide the value of the variable by 20. Log the value.

"answer"


// This took more brain power than I'm ok with but success  {0.0}

/* Some resources I frequented in one form or another on the site: 

https://www.w3schools.com/js/default.asp

https://zzzcode.ai/code-explain 

https://discuss.codecademy.com/t/
what-is-the-difference-between-printing-3-4-and-3-4/489337 */


function toAdd1(numbers) {
    let add =  (xp + yp);
    return add;
}

function toSub1(numbers) {
    let sub =  (xp - yp);
    return sub;
}

function toHundred1(numbers) {
    let hundred = ((xp - yp) + 100);
    return hundred;
}

function toDivide1(numbers) {
    let divide =  (((xp - yp) + 100) / 2);
    return divide;
}

// I didn't get much chance to use array methods here but this worked. I would be interested in using array methods in order to cut down on some typing / make things more direct and consistely formated for when I get my big-person job one day soon! 

// (future growth and forward  thinking shout out to the Growth Mindset Udemy Course!  Link: https://anniecannons.udemy.com/course/growth-mindset-the-key-to-greater-confidence-and-impact/learn/lecture/17869850?learning_path_id=5560730#content 

//Using methods / "shortcuts" helps make a consistent template to follow. Makes for less thinking and more inserting variables into "relatively" pre-assigned locations

let numbers = prompt('Please submit two numbers (example: 31 15)').split(' ');

// output is an array with seperated variables to call on individually in the next few commands 

let exercise6 = numbers.map(Number);

// CRUCIAL: this converts the input from the prompt into numeric values so we can do the mathmatical equations seen in the above functions - I got none of the commands to work seen above and below until I did this 

let xp = exercise6[0];
let yp = exercise6[1];

// this specifically assigns the two seperate variables to a smaller variable to make typing the functions seen above shorter / quicker

console.log(`The values added together equal ${toAdd1(numbers)} and subtracted apart equals ${toSub1(numbers)}. Adding 100 to the subtracted values equals ${toHundred1(numbers)} and then further dividing that subtracted number by 2 equals ${toDivide1(numbers)}.`); // I choose the input values (8 6) to get: The values added together equal 14 and subtracted apart equals 2. Adding 100 to the subtracted values equals 102 and then further dividing that subtracted number by 2 equals 51.

// this log makes a summary sentence that answers all the specific prompts given for exercise 6 - a nice lil wrap up 

"The journey in expercise 6" 

/* THIS IS ALL THE CRAP I PLAYED AROUND WITH TO FIGURE OUT WHAT DID WHAT AND WHAT RUINED EVERYTHING SUDDENLY (RIP MY WORKING COMMANDS SOMETIMES) 

// add 1
function toAdd1(exercise6) {
    let add = (numbers[0] + numbers[1]);
    return add;
}
// sub 1
function toSub1(exercise6) {
    let sub = (numbers[0] - numbers[1]);
    return sub;
}

// add 2

function toAdd2(exercise6) {
    let add = numbers.join("+");
}

// sub 2
function toSub2(exercise6) {
    return numbers[0] -= numbers[1];
}

// sub 3

function toSub3(exercise6) {
    add = numbers.sort(function (a, b) { return b - a }).join("-");
}


// 100 1
function toHundred1(exercise6) {
    return subtracted += 100;
}

// 100 2
function toHundred2(exercise6) {
    let hundred = numbers.push("100").join("+");
}

// divide 1

function toDivide1(exercise6) {
    return (hundred / 20);
}

// divide 2
function toDivide2(exercise6) {
    return hundred /= 2;
}

let exercise6 = prompt("Please submit two numbers (example: 31 15)");
let numbers = exercise6.split(" ");
console.log(numbers);

console.log(`The values (${numbers[0]}, ${numbers[1]}) added equal ${toAdd1(exercise6)} and subtracted equal ${toSub1(exercise6)}. Adding 100 to the subtracted values equals ${toHundred1(exercise6)} and then further divided by 2 equals ${toDivide1(exercise6)}.`);
*/ 

"there were a lot more that i deleted but in the future i wont _ just so we can journey the real journey it takes to get something wrong to get it right"