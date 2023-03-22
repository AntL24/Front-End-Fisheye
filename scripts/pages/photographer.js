//Mettre le code JavaScript lié à la page photographer.html
//Get the photographer ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//Import the photographer factory
import { photographerFactory } from '../factories/photographer.js';
import { getMedia } from '../factories/media.js';

//Get the photographers data from the json file
async function getPhotographers() {
    try {
        const response = await fetch("data/photographers.json");
        if (!response.ok) {
            throw new Error('Erreur de chargement des données');
        }
        const photographers = await response.json();
        return photographers;
    } catch (error) {
        console.log(error);
        return { photographers: [] };
    }
}

//Filter the photographers data to get the photographer with the same ID
async function getPhotographer(id) {
    const { photographers } = await getPhotographers();
    console.log("photographe id is " + id);
    return photographers.find(photographer => photographer.id == id);
}

//Display the photographer data
async function displayPhotographer() {
    const photographer = await getPhotographer(id);
    const photographerDOM = photographerFactory(photographer).getUserCardDOM();
    
    //Select the elements of insterest within the photographerDOM
    const img = photographerDOM.querySelector('.photographer__img');
    const name = photographerDOM.querySelector('.photographer__name');
    const header = document.querySelector('.photograph_header');

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

    //Append the img to the header too
    header.appendChild(img);

    getMedia(name);

}




//Launch the main function
displayPhotographer();