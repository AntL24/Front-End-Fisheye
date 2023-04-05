import { getAndDisplayMedias } from "../factories/media.js";
        
async function selectOption(option) {
    document.getElementById("selectedOption").innerHTML = option + " <i class='fas fa-chevron-down arrow'></i>";
    var options = document.querySelectorAll(".dropdown-content a");
    for (var i = 0; i < options.length; i++) {
        options[i].style.display = "block";
        // options[i].setAttribute("tabindex", "-1");
    }
    var selectedOption = document.getElementById(option);
    selectedOption.style.display = "none";
    // selectedOption.setAttribute("tabindex", "-1");
    selectedOption.parentElement.style.display = "none";
    selectedOption.parentElement.previousElementSibling.setAttribute("aria-expanded", "false");
    await getAndDisplayMedias();
}

document.getElementById("selectedOption").addEventListener("click", function(event) {
    event.preventDefault();
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
        this.setAttribute("aria-expanded", "false");
    } else {
        dropdownContent.style.display = "block";
        this.setAttribute("aria-expanded", "true");
        // var firstOption = dropdownContent.querySelector("[role='menuitem']");

    }
});

document.getElementById("selectedOption").addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
            this.setAttribute("aria-expanded", "false");
        } else {
            dropdownContent.style.display = "block";
            this.setAttribute("aria-expanded", "true");
            // var firstOption = dropdownContent.querySelector("[role='menuitem']");                
        }
    }
});

var options = document.querySelectorAll(".dropdown-content a");
for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            selectOption(this.innerHTML);
        }
    });
}

options.forEach((optionElement) => {
    optionElement.addEventListener('click', (event) => {
      event.preventDefault();
      selectOption(optionElement.textContent);
    });
  });