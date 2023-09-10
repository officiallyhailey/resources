
// Nav bar opening and closing elements

const navButtons = document.querySelectorAll(".navButton");

navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const targetElementId = button.getAttribute("data-target");
        const targetElement = document.getElementById(targetElementId);

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
    const elements = document.querySelectorAll(".navButton");
    elements.forEach(function (element) {
        const targetId = element.getAttribute("data-target");
        const targetElement = document.getElementById(targetId);
        targetElement.classList.add("hidden");
    });
}

