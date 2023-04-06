import { lightBox } from "../utils/lightBox.js";
import { addStatsElement } from "../factories/statsElements.js";


//Factory class to create media objects. Contains Image and Video classes.
class Media {
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


export { Media };