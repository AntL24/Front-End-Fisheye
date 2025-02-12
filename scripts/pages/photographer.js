import { getData } from "../utils/getData.js";
import { Photographer } from "../factories/photographerFactory.js";
import { getAndDisplayMedias } from "../components/mediaCard.js";
import { setTotalLikesAndPrice } from "../components/statsElements.js";

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

//Get the photographer ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//Filter the photographers data to get the photographer with the same ID
async function getPhotographer(id) {
    const { photographers } = await getData();
    return photographers.find(photographer => photographer.id == id);
}

//Display the photographer data in the header using the photographerFactory and manipulating the DOM elements
async function displayPhotographerPage() {
  const photographer = await getPhotographer(id);
  const photographerModel = Photographer.createPhotographer(photographer);
  const photographerDOM = Photographer.createPhotographerCard(photographerModel);
  

  //Select the elements of interest within the photographerDOM
  const name = photographerDOM.querySelector(".photographer__name");
  const header = document.querySelector(".photograph_header");
  //Aria label for the photographer's header
  header.setAttribute("aria-label", "Photographe " + name.textContent);

  //Make an article to contain the name, location and tagline
  const infoContainer = document.createElement("article");
  infoContainer.setAttribute("class", "photographer__info-container");

  //Change h2 name to h1 name
  const h1 = document.createElement("h1");
  h1.textContent = name.textContent;

  //Insert, in the header, the infoContainer before the button contact me
  header.insertBefore(infoContainer, header.firstChild);
  infoContainer.appendChild(h1);
  infoContainer.appendChild(photographerDOM.querySelector(".photographer__location"));
  infoContainer.appendChild(photographerDOM.querySelector(".photographer__tagline"));

  //Append the imgContainer to the header
  header.appendChild(photographerDOM.querySelector(".photographer__img-container"));

  //Display the rest of the page
  await getAndDisplayMedias();
  const photographerPrice = photographer.price;
  setTotalLikesAndPrice(photographerPrice);

  const photographerNameParagraph = document.querySelector("#contact_modal_header");
  const nameSpan = document.createElement("span");
  nameSpan.style.display = "block";
  nameSpan.textContent = name.textContent;
  
  photographerNameParagraph.appendChild(nameSpan);
  
}

//Launch the main function
await displayPhotographerPage();

export {id} ;