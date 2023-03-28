
// Dropdown menu mechanism on button click
const toggleDropdown = () => {
    const dropdownToggle = document.getElementById("exposed-dropdown-toggle"); //Exposed button element
    const dropdownMenu = document.getElementById("exposed-dropdown-menu");
    const dropdownIcon = dropdownToggle.querySelector("i");
  //Hidden case, we show the dropdown menu
    if (dropdownToggle.getAttribute("aria-expanded") === "false") {
      dropdownIcon.classList.remove("fa-chevron-down");
      dropdownIcon.classList.add("fa-chevron-up");
      dropdownToggle.setAttribute("aria-expanded", "true");
      dropdownMenu.setAttribute("aria-expanded", "true");
      dropdownMenu.innerHTML = ""; //Clear the dropdown menu before populating it, so that it doesn't duplicate the options
      populateMenu();
    } else {
  //Exposed case, we hide the dropdown menu
    dropdownIcon.classList.remove("fa-chevron-up");
    dropdownIcon.classList.add("fa-chevron-down");
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownMenu.setAttribute("aria-expanded", "false");
    dropdownMenu.innerHTML = "";
    }
  };
  
  //Select the option and hide the dropdown menu when an option is clicked
  const selectOption = async (option) => {
    const dropdownToggle = document.getElementById("exposed-dropdown-toggle");
    const dropdownMenu = document.getElementById("exposed-dropdown-menu");
  
    //Hide the dropdown menu
    dropdownMenu.setAttribute("aria-expanded", "false");
    dropdownToggle.innerHTML = option.textContent;
    dropdownToggle.setAttribute("aria-expanded", "false");
  
    //Change the aria-selected attribute of the selected option
    option.setAttribute("aria-selected", "true");
    const newExposedOptionWithIcon = option.textContent + " " + '<i class="fas fa-chevron-down"></i>';
    dropdownToggle.innerHTML = newExposedOptionWithIcon;
    //Call the function to sort the photographers cards
    await filterGalerie(option.textContent);
};
  
//Populate the dropdown menu with the available options when the dropdown menu is shown
const populateMenu = () => {
    const dropdownMenu = document.getElementById("exposed-dropdown-menu");
    const exposedOption = document.getElementById("exposed-dropdown-toggle").textContent.trim();//Trim to get rid of anything else than the text
    const options = ["Popularité", "Date", "Titre"];
  
    //Filter the options to remove the selected option
    const optionsFiltered = options.filter((option) => option !== exposedOption);
  
    optionsFiltered.forEach((optionText) => {
  
      const option = document.createElement("li");
      option.textContent = optionText;
      option.setAttribute("role", "option");
      option.setAttribute("tabindex", "0");
      option.setAttribute("aria-selected", "false");
      option.addEventListener("click", () => {
        selectOption(option);
      });
      dropdownMenu.appendChild(option);
  
    });
  
    const selectedOption = dropdownMenu.querySelector(
      'li[aria-selected="true"]'
    );
    //If there is a selected option, we change the old exposed option to the new selected option
    if (selectedOption) {
      const dropdownToggle = document.getElementById("exposed-dropdown-toggle");
      const newExposedOptionWithIcon = selectedOption.textContent.trim() + " " + '<i class="fas fa-chevron-down"></i>';
      dropdownToggle.innerHTML = newExposedOptionWithIcon;
    }
};