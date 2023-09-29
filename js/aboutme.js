// Nav bar opening and closing elements

//main content
let handleScroll = [];
handleScroll = document.querySelectorAll(".boxes");

window.addEventListener('scroll', function() {
    
for(let i = 0; i < handleScroll.length; i++) {
    handleScroll[i].classList.add("on-scrollbar")
}
});

let buttonClick = document.querySelectorAll(".buttons");

buttonClick.forEach(function (button) {
    button.addEventListener("click", function () {
        let targetElementId= button.getAttribute("data-target");
        let targetElement = document.getElementById(targetElementId);

        if (targetElement.classList.contains("hidden")) {
            // Open the target element and close any other elements
            closeAllElements();
            targetElement.classList.remove("hidden");
        } else {
            // Close the target element
            targetElement.classList.add("hidden");
        }
    });
});

function closeAllElements() {
    let elements = document.querySelectorAll(".buttons");
    elements.forEach(function (element) {
        let targetId = element.getAttribute("data-target");
        let targetElement = document.getElementById(targetId);
        targetElement.classList.add("hidden");
    });
}


//

let mainContent = document.querySelectorAll(".mainButtons");

mainContent.forEach(function (button) {
    button.addEventListener("click", function () {
        let targetElementId = button.getAttribute("data-target");
        let targetElement = document.getElementById(targetElementId);

        if (targetElement.classList.contains("hidden")) {
            // Open the target element and close any other elements
            closeAllElements();
            targetElement.classList.remove("hidden");
        } else {
            // Close the target element
            targetElement.classList.add("hidden");
        }
    });
});

function closeAllElements() {
    let elements = document.querySelectorAll(".mainButtons");
    elements.forEach(function (element) {
        let targetId = element.getAttribute("data-target");
        let targetElement = document.getElementById(targetId);
        targetElement.classList.add("hidden");
    });
}
