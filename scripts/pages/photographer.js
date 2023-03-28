// Hide the loader after 3 seconds if the page is loaded
function hideLoader() {
    setTimeout(function() {
      if (document.readyState === "complete") {
        const loader = document.querySelector(".loader");
        loader.classList.add("hide");
      } else {
        hideLoader();
      }
    }, 3000);
  }
  
hideLoader();
  
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

//Get the photographer ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//Get the photographers data from the json file
async function getData() {
    try {
        const response = await fetch("data/photographers.json");
        if (!response.ok) {
            throw new Error('Erreur de chargement des données');
        }
        const photographersData = await response.json();
        return photographersData;
    } catch (error) {
        console.log(error);
        return { photographersData: [] };
    }
}

//Filter the photographers data to get the photographer with the same ID
async function getPhotographer(id) {
    const { photographers } = await getData();
    //photographers tab within the json file
    return photographers.find(photographer => photographer.id == id);
}

//Display the photographer data
async function displayPhotographer() {
    const photographer = await getPhotographer(id);
    const photographerPrice = photographer.price;
    const photographerDOM = photographerFactory(photographer).getUserCardDOM();
    
    //Select the elements of insterest within the photographerDOM
    // const img = photographerDOM.querySelector('.photographer__img');
    const name = photographerDOM.querySelector('.photographer__name');
    const header = document.querySelector('.photograph_header');
    const price = photographerDOM.querySelector('.photographer__price');

    //Make an article to contain the name, location and tagline
    const infoContainer = document.createElement('article');
    infoContainer.setAttribute('class', 'photographer__info-container');

    //Change h2 name to h1 name
    const h1 = document.createElement('h1');
    h1.textContent = name.textContent;

    //Insert, in the header, the infoContainer before the button contact me
    header.insertBefore(infoContainer, header.firstChild);
    infoContainer.appendChild(h1);
    infoContainer.appendChild(photographerDOM.querySelector('.photographer__location'));
    infoContainer.appendChild(photographerDOM.querySelector('.photographer__tagline'));

    //Append the imgContainer to the header
    header.appendChild(photographerDOM.querySelector('.photographer__img-container'));
    await getAndDisplayMedias();
    setTotalLikesAndPrice(photographerPrice);
}

//Launch the main function
displayPhotographer();