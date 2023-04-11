import { lightBox } from "../utils/lightBox.js";
import { addStatsElement } from "../components/statsElements.js";

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

  render(imageFolderUrl, imgLink, mediaFigure, photographerPrice, photographerMedias) {
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
    // mediaFigure.appendChild(imgLink);
    addStatsElement(mediaFigure, this.media.title, photographerMedias);
  }
  
}

class Video {
  constructor(media) {
    this.media = media;
  }

  render(imageFolderUrl, imgLink, mediaFigure, photographerPrice, photographerMedias) {
    const videoElement = document.createElement("video");
    videoElement.classList.add("media__video");
    videoElement.src = `${imageFolderUrl}${this.media.video}`;
    videoElement.alt = "Vidéo intitulée " + this.media.title;
    videoElement.controls = false; //Controls are added in lightBox.js
    //Add accessibility attributes
    videoElement.setAttribute("aria-label", "Voir vidéo intitulée " + this.media.title + " en grand format ");
    
    const videoWrapper = document.createElement("div");
    videoWrapper.classList.add("media__video-wrapper");
    videoWrapper.appendChild(videoElement); 
    mediaFigure.appendChild(videoWrapper);    
    addStatsElement(mediaFigure, this.media.title, photographerMedias);
    videoElement.addEventListener("click", () => {
      lightBox(this.media.video, imageFolderUrl, photographerMedias);
    });
  }  
}

export { Media };
