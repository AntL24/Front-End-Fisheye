import { Media } from "../factories/media.js";
import { filterGalerie } from "../utils/filterGallery.js";
import { id } from "../pages/photographer.js";
import { getData } from "../utils/getData.js";

//Make media objects and display them in the DOM.
//Render is called on each media object to complete the photographer's gallery.
async function getAndDisplayMedias() {
    const data = await getData();
    const allMedias = data.media;
    const photographerMedias = allMedias.filter(media => media.photographerId == id);
    const sortedMediaPriceName = await filterGalerie(photographerMedias); //Returns an array with the sorted mediaList, the firstName and the photographerPrice
    const mediaFactory = new Media();
    const container = document.querySelector(".media__container");
    container.innerHTML = "";
    sortedMediaPriceName[0].forEach(media => {
      const imgLink = document.createElement("a");
      imgLink.setAttribute("aria-label", "Voir le média " + media.title + " en grand");
      imgLink.classList.add("media__link");
      const mediaCard = document.createElement("li");
      mediaCard.classList.add("media__cardli");
      const mediaFigure = document.createElement("figure");

      // mediaFigure.appendChild(imgLink);
      // Figure element to contain the image and the figcaption
      mediaFigure.classList.add("media__card");
      mediaCard.appendChild(mediaFigure);
      
      container.appendChild(mediaCard);
      const folderName = sortedMediaPriceName[1].replace(/-/g, '%20');
      const imageFolderUrl = `FishEye_Photos/Sample%20Photos/${folderName}/`;
      const mediaObj = mediaFactory.createMedia(media);
        
        // Check if the media is an image or a video
        if (media.image) {
            const imgLink = document.createElement("a");
            imgLink.setAttribute("aria-label", "Voir le média " + media.title + " en grand");
            imgLink.classList.add("media__link");
            mediaFigure.appendChild(imgLink);
            mediaObj.render(imageFolderUrl, imgLink, mediaFigure, sortedMediaPriceName[1], sortedMediaPriceName[0]);
        } else if (media.video) {
            mediaObj.render(imageFolderUrl, null, mediaFigure, sortedMediaPriceName[1], sortedMediaPriceName[0]);
        }
    });
}

export { getAndDisplayMedias };