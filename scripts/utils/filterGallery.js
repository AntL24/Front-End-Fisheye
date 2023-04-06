import {getData} from "../utils/getData.js";
import {id} from "../pages/photographer.js";

//According to the filterMode, and return the sorted mediaList, the firstName and the photographerPrice.
async function filterGalerie(){
    //Rearrange the mediaList array depending on the filterMode
    //filterMode can be "Popularité", "Date" or "Titre"

    const datas = await getData();
    const allMedia = datas.media;

    const photographerName = datas.photographers.find((photographer) => photographer.id == id).name;
    const firstName = photographerName.split(" ")[0];
    const photographerPrice = datas.photographers.find((photographer) => photographer.id == id).price.toString();

    const mediaList = allMedia.filter((media) => media.photographerId == id); 
    const filterMode = document.getElementById("selectedOption").textContent.trim();

    //Sort by likes
    if (filterMode == "Popularité") {
        mediaList.sort((a, b) => b.likes - a.likes);
    }

    //Sort by date
    if (filterMode == "Date") {
        mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    //Sort by title
    if (filterMode == "Titre") {
        mediaList.sort((a, b) => a.title.localeCompare(b.title));
    }

    //Return the mediaList, the firstName and the photographerPrice
    return [mediaList, firstName, photographerPrice];
}

export {filterGalerie};