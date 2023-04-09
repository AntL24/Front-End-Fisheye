import { lightBox } from "../utils/lightBox.js";
import { addStatsElement } from "../components/statsElements.js";


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
      const nextButton = document.querySelector(".lightbox__next");
      const imgElement = document.createElement("img");
      imgElement.src = `${imageFolderUrl}${this.media.image}`;
      imgElement.alt = "Photographie intitulée " + this.media.title;
      imgElement.classList.add("media__img");
      imgLink.href = `${imageFolderUrl}${this.media.image}`;
      imgLink.addEventListener("click", (e) => {
        e.preventDefault();
        lightBox(this.media.image, imageFolderUrl, photographerMedias, nextButton);
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
      videoElement.alt = "Vidéo intitulée " + this.media.title;
      videoElement.controls = true;
      const videoWrapper = document.createElement("div");
      videoWrapper.classList.add("media__video-wrapper");
      videoWrapper.appendChild(videoElement);
      mediaCard.appendChild(videoWrapper);
      addStatsElement(mediaCard, this.media.title, photographerPrice);
      videoElement.addEventListener("click", () => {
        lightBox(this.media.video, imageFolderUrl, photographerMedias);
      });
    }
  }
  


export { Media };