//BEGIN BUTTON
let buttonStart = document.getElementById("start")
buttonStart.addEventListener("click", function startBudget() {

  // Set beginning elements
  let nameInput = document.getElementById("name");
  let buttonBegin = document.getElementById("begin");
  let budgetInput = document.getElementById("salary");
  let beginning = [nameInput, budgetInput, buttonBegin]
  for (let i = 0; i< 3; i++) {
  beginning[i].classList.remove("hidden1")
  }

  let person = ''

  let needs = 0;

  let savings = 0;

  let wants = 0;


// Remove begin button
let buttonStart = document.getElementById("start")
buttonStart.classList.add("hidden1")

// Remove intro
let intro = document.getElementById("intro")
intro.classList.add("hidden1")

// let intro_container = document.getElementById("fields")
// intro_container.classList.add("hidden1")

// Activate needs button 

buttonBegin.addEventListener("click", function myBudget() {

let name = nameInput.value

person = `👤${name}'s Monthly Budget`;
document.getElementById("person").innerHTML = person
  
budget = Number(budgetInput.value);

document.getElementById("income").innerHTML = `💰${budget}`;

needs = budget * 0.5;

let needsInitial = Number(budgetInput.value) * 0.5;

savings = budget * 0.2;

let savingsInitial = Number(budgetInput.value) * 0.2;

wants = budget * 0.3;

let wantsInitial = Number(budgetInput.value) * 0.3;


  // Remove beginning set up 
  for (let i = 0; i< 3; i++) {
    beginning[i].classList.add("hidden1")
    }

    // Set Needs Elements
  let submitNeeds = document.getElementById("submitNeed")
    let monthly = document.getElementById("monthly")
    let foodInput = document.getElementById("food")
    let housingInput = document.getElementById("housing")
    let expensesInput = document.getElementById("bills")
    let healthcareInput = document.getElementById("healthcare")
    let transportationInput = document.getElementById("transportation")
    let essentialsInput = document.getElementById("essentials")

    // Reveal needs elements

    let monthlySection = [foodInput, housingInput, expensesInput, healthcareInput, transportationInput, essentialsInput, monthly, submitNeeds]
    for (let i = 0; i< 8; i++) {
      monthlySection[i].classList.remove("hidden1")
    }

         //Active needs Button
    submitNeeds.addEventListener("click", function submitNeed() {

      let monthly = document.getElementById("monthly")
      monthly.classList.remove("hidden1")


    let food = Number(foodInput.value)
    document.getElementsByClassName("food").innerHTML = food

    let housing = Number(housingInput.value);
    document.getElementsByClassName("housing").innerHTML = housing

    let expenses = Number(expensesInput.value);
    document.getElementsByClassName("bills").innerHTML = expenses

    let healthcare = Number(healthcareInput.value);
    document.getElementsByClassName("healthcare").innerHTML = healthcare

    let transportation = Number(transportationInput.value);
    document.getElementsByClassName("transportation").innerHTML = transportation

    let  essentials = Number(essentialsInput.value);
    document.getElementsByClassName("essentials").innerHTML = essentials

    needs = needs - (food + housing + expenses + healthcare + transportation + essentials);

    let monthlyExpenses = (food + housing + expenses + healthcare + transportation + essentials);
    document.getElementById("monthlyExpenses").innerHTML = `💰${monthlyExpenses}`;

    if (needs < 0) {
      wants = wants + needs;
      let warning = document.getElementById("warning2")
      warning.classList.remove("hidden1")
      needsMessage = document.getElementById("warning2").innerHTML
      document.getElementById("warning2").innerHTML = `You are 💰${needs} over budget. The overage will be reduced from your wants fund.`;
      setTimeout(function() {document.getElementById("warning2").innerHTML = needsMessage }, 6000)

        //Remove needs set up 
        for (let i = 0; i< 8; i++) {
          monthlySection[i].classList.add("hidden1")
        }
    
    } else {
      let warning = document.getElementById("warning")
      warning.classList.remove("hidden1")
      needsMessage = document.getElementById("warning").innerHTML
      document.getElementById("warning").innerHTML = `You're doing great!`;
      setTimeout(function() {
        document.getElementById("warning").innerHTML = needsMessage }, 7000);

        //Remove needs set up 
        for (let i = 0; i< 8; i++) {
          monthlySection[i].classList.add("hidden1")
        }
      }

    document.getElementById("fields").style.height = '80vh'; 

      // Set emergency elements
      let emergencyButton = document.getElementById("emergency")
      let emergencyMessage = document.getElementById("conclusion")
      let emergencyInput = document.getElementById("emergencyInput")
  
      // Reveal emergency elements
      let emergencySection = [emergencyButton, emergencyMessage, emergencyInput]
      for (let i = 0; i< 3; i++) {
        emergencySection[i].classList.remove("hidden1")
      }

      emergencyMessage.innerHTML = `Setting money aside into an emergency fund is one of the smartest things you can do for your future self. Right now you can invest up to 💰${savings} based on what your savings fund amounted to for this months income value.`

  // Activate Emergency Button
  emergency.addEventListener("click", function emergencyFund() {

    let needsMessage = document.getElementById("warning")
      needsMessage.classList.add("hidden3")

    let funds = Number(emergencyInput.value);


    if (funds > savings) {
      let emergencyMessage = document.getElementById("conclusion")
      emergencyMessage.innerHTML = "Thats too much. Try a smaller amount.";
      emergencyInput.value = ''
    } else {

        // Reveal the emergency fund table
    let emergencyTable = document.getElementById("table3");
    emergencyTable.classList.remove("hidden1");
      savings = savings - funds;

      document.getElementById("needs").innerHTML = `💰${needs}`;

      document.getElementById("savings").innerHTML = `💰${savings}`;

      document.getElementById("wants").innerHTML = `💰${wants}`;

      document.getElementById("funds").innerHTML = `💰${funds}`;


//Minimize fields element
document.getElementById("fields").style.height = '0px'; 
// Remove field element
let fields = document.getElementById("fields")
fields.classList.add("hidden1")

  // Reveal Table to display budget
  let table1 = document.getElementById("table1");
  table1.classList.remove("hidden1");

        // Remove emergency set up
    for (let i = 0; i< 3; i++) {
      emergencySection[i].classList.add("hidden1")
    }



    // Reveal breakdown list button
    let breakdown = document.getElementById("breakdownList");
    breakdown.classList.remove("hidden1")

// Activate breakdown List
    breakdown.addEventListener("click", function revealBreakdown() {

      // Reveal breakdown box
      let breakdown = document.getElementById("breakdown")
      breakdown.classList.remove("hidden1")

      document.getElementById("breakdown").innerHTML = `Monthly Budget:<br>
      Monthly Income: 💰${budget}<br>
      Monthly Expenses = 💰${monthlyExpenses}<br><br>
      Needs Fund is 50% of your monthly budget and is reserved for monthly expenses.<br>
      Original value: 💰${needsInitial}<br>
      Final value after monthly expenses are subtracted: 💰${needs}<br><br>
      Savings Fund is 20% of your monthly income and is reserved for future investments. This is also where any emergency funds will be subtracted from.<br>
      Original value: 💰${savingsInitial}<br>
      Final value after subtracting emergency fund value: 💰${savings}<br><br> 
      Wants Fund is 30% of your monthly income and is reserved for whatever use you would like! If your monthly expenses are higher than what is in your needs fund, the remaining amount will be subtracted from here.<br>
      Original value: 💰${wantsInitial}<br>
      Final value after subtracting any possible overage: 💰${wants}<br><br>
      Emergency Fund is subtracted from savings and is reserved for...emergencies! It is suggested to save up to three times you're monthly income to prepare yourself for any possible situations that could arise.<br>
      This months investment: 💰${funds}<br><br>
      This information has been copied to your clipboard for you to take with you!<br>`

      //Remove breakdown button
      breakdownList.classList.add("hidden1")

      // Reveal clipboard button

    let clipboard = document.getElementById("clipboard2")
    clipboard.classList.remove("hidden1")

          //Reveal Start Over Button
          let startOver = document.getElementById("startOver");
          startOver.classList.remove("hidden1");

                    // Activate Start Over
      startOver.addEventListener("click", function refreshPage(){
        window.location.reload();
    })


      // Activate clipboard
      clipboard.addEventListener("click", function copyBreakdown() {
      
        /* Copy text into clipboard */
      navigator.clipboard.writeText
          (`Monthly Budget:\n
            Monthly Income: 💰${budget}\n
            Monthly Expenses = 💰${monthlyExpenses}\n\n
            Needs Fund is 50% of your monthly budget and is reserved for monthly expenses.\n
            Original value: 💰${needsInitial}\n
            Final value after monthly expenses are subtracted: 💰${needs}\n\n
            Savings Fund is 20% of your monthly income and is reserved for future investments This is also where any emergency funds will be subtracted from.\n
            Original value: 💰${savingsInitial}\n
            Final value after subtracting emergency fund value: 💰${savings}\n\n 
            Wants Fund is 30% of your monthly income and is reserved for whatever use you would like! If your monthly expenses are higher than what is in your needs fund, this is where the remaining amount will be subtracted from.\n
            Original value: 💰${wantsInitial}\n
            Final value after subtracting any possible overage: 💰${wants}\n\n
            Emergency Fund is subtracted from savings and is reserved for...emergencies! It is suggested to save up to three times you're monthly income to prepare yourself for any possible situations that could arise.\n
            This months investment: 💰${funds}`); 

      });
    });
  };
})
    })
  })
})




