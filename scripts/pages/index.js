import { getData } from "../utils/getData.js";
import { Photographer } from "../factories/photographerFactory.js";


//Hide the loader after 3 seconds if the page is loaded
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

//Display the photographers data in the DOM according to the photographers data.
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographerData) => {
    const photographer = new Photographer(photographerData);
    const userCardDOM = Photographer.createPhotographerCard(photographer);
    photographersSection.appendChild(userCardDOM);
  });
}

//Use two accessory functions to get the photographers data and display it.
async function init() {
    const { photographers } = await getData();
    displayData(photographers);
}
    
init();
    
