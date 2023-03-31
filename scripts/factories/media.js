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
  
  
 //Get data and display medias on photographer page using MediaFactory class 
  //to create media objects which are then rendered in the DOM using the render method.
  async function getAndDisplayMedias() {
    const data = await getData();
    const allMedias = data.media;
    const photographerMedias = allMedias.filter(media => media.photographerId == id);
    const sortedMediaPriceName = await filterGalerie(photographerMedias);
    const mediaFactory = new MediaFactory();
    const container = document.querySelector(".media__container");
    container.innerHTML = "";
    photographerMedias.forEach(media => {
      const imgLink = document.createElement("a");
      imgLink.setAttribute("aria-label", "Voir le média");
      imgLink.classList.add("media__link");
      const mediaCard = document.createElement("article");
      mediaCard.classList.add("media__card");
      mediaCard.dataset.date = media.date;
      mediaCard.dataset.likes = media.likes;
      mediaCard.dataset.title = media.title;
      container.appendChild(mediaCard);
      const folderName = sortedMediaPriceName[1].replace(/-/g, ' ');
      const imageFolderUrl = `FishEye_Photos/Sample Photos/${folderName}/`;
      const mediaObj = mediaFactory.createMedia(media);
      mediaObj.render(imageFolderUrl, imgLink, mediaCard, sortedMediaPriceName[1], photographerMedias);
    });
}