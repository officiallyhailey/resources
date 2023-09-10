
// Nav bar opening and closing elements

let navButtons = document.querySelectorAll(".navButton");

navButtons.forEach(function (button) {
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
    let elements = document.querySelectorAll(".navButton");
    elements.forEach(function (element) {
        let targetId = element.getAttribute("data-target");
        let targetElement = document.getElementById(targetId);
        targetElement.classList.add("hidden");
    });
}




//main content

let content = document.querySelectorAll(".content");

content.forEach(function (button) {
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
    let elements = document.querySelectorAll(".content");
    elements.forEach(function (element) {
        let targetId = element.getAttribute("data-target");
        let targetElement = document.getElementById(targetId);
        targetElement.classList.add("hidden");
    });
}
