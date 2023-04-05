import { getData } from "../utils/getData.js";
import { lightBox } from "../utils/lightBox.js";
import { addStatsElement } from "../factories/statsElements.js";
import { filterGalerie } from "../utils/filterGallery.js";
import { id } from "../pages/photographer.js";

//Factory class to create media objects. Contains Image and Video classes.
class MediaFactory {
    createMedia(media) {
      if (media.video) {
        return new Video(media);
      } else {
        return new Image(media);
      }
    }
  }
  
  class Image {
    constructor(media) {
      this.media = media;
    }
  
    render(imageFolderUrl, imgLink, mediaCard, photographerPrice, photographerMedias) {
      const imgElement = document.createElement("img");
      imgElement.src = `${imageFolderUrl}${this.media.image}`;
      imgElement.alt = this.media.description;
      imgElement.classList.add("media__img");
      imgLink.href = `${imageFolderUrl}${this.media.image}`;
      imgLink.addEventListener("click", (e) => {
        e.preventDefault();
        lightBox(this.media.image, imageFolderUrl, photographerMedias);
      });
      imgLink.appendChild(imgElement);
      mediaCard.appendChild(imgLink);
      addStatsElement(mediaCard, this.media.title, photographerPrice);
    }
  }
  
  class Video {
    constructor(media) {
      this.media = media;
    }
  
    render(imageFolderUrl, imgLink, mediaCard, photographerPrice, photographerMedias) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("media__video");
      videoElement.src = `${imageFolderUrl}${this.media.video}`;
      videoElement.alt = this.media.description;
      videoElement.controls = true;
      imgLink.href = `${imageFolderUrl}${this.media.video}`;
      imgLink.addEventListener("click", (e) => {
        e.preventDefault();
        lightBox(this.media.video, imageFolderUrl, photographerMedias);
      });
      imgLink.appendChild(videoElement);
      mediaCard.appendChild(imgLink);
      addStatsElement(mediaCard, this.media.title, photographerPrice);
    }
  }
  
//Make media objects and display them in the DOM.
//Render is called on each media object to complete the photographer's gallery.
  async function getAndDisplayMedias() {
    const data = await getData();
    const allMedias = data.media;
    const photographerMedias = allMedias.filter(media => media.photographerId == id);
    const sortedMediaPriceName = await filterGalerie(photographerMedias); //Returns an array with the sorted mediaList, the firstName and the photographerPrice
    const mediaFactory = new MediaFactory();
    const container = document.querySelector(".media__container");
    container.innerHTML = "";
    sortedMediaPriceName[0].forEach(media => {
      const imgLink = document.createElement("a");
      imgLink.setAttribute("aria-label", "Voir le média " + media.title + " en grand");
      imgLink.classList.add("media__link");
      const mediaCard = document.createElement("li");
      mediaCard.setAttribute("role", "listitem");
      mediaCard.classList.add("media__card");
      mediaCard.dataset.date = media.date;
      mediaCard.dataset.likes = media.likes;
      mediaCard.dataset.title = media.title;
      container.appendChild(mediaCard);
      const folderName = sortedMediaPriceName[1].replace(/-/g, ' ');
      const imageFolderUrl = `FishEye_Photos/Sample Photos/${folderName}/`;
      const mediaObj = mediaFactory.createMedia(media);
      mediaObj.render(imageFolderUrl, imgLink, mediaCard, sortedMediaPriceName[1], sortedMediaPriceName[0]);
    });
}

export { getAndDisplayMedias };