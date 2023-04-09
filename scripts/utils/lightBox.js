//Construct the lightbox according to the media type (image or video)
function lightBox(mediaName, imageFolderUrl, medias) {
    const lightBoxContainer = document.querySelector(".lightbox__container");
    lightBoxContainer.setAttribute("aria-hidden", false);
   
    const media = medias.find(media => media.image === mediaName || media.video === mediaName);
    const lightBox = document.createElement("div");
    lightBox.setAttribute("class", "lightbox");
    lightBoxContainer.appendChild(lightBox);
    
    const lightBoxContent = document.createElement("div");
    lightBoxContent.setAttribute("class", "lightbox__content");
    lightBox.appendChild(lightBoxContent);

    const mediaContainer = document.createElement("div");
    mediaContainer.setAttribute("class", "lightbox__media-container");

    lightBoxContainer.setAttribute("aria-hidden", false);
    toggleBackgroundAccessibility(true);

    if (mediaName.endsWith(".mp4")) {
        const lightBoxVideo = document.createElement("video");
        lightBoxVideo.setAttribute("class", "lightbox__media");
        lightBoxVideo.setAttribute("src", `${imageFolderUrl}${mediaName}`);
        lightBoxVideo.setAttribute("controls", true);
        lightBoxVideo.setAttribute("aria-label", "Vidéo intitulée " + media.title + " - Lecture en cours");
        lightBoxVideo.setAttribute("alt", "Close-up view de la vidéo intitulée " + media.title);
        mediaContainer.appendChild(lightBoxVideo);
    } else {
        const lightBoxImg = document.createElement("img");
        lightBoxImg.setAttribute("class", "lightbox__media");
        lightBoxImg.setAttribute("src", `${imageFolderUrl}${mediaName}`);
        lightBoxImg.setAttribute("aria-label", "Photo intitulée " + media.title + " - Affichage en cours");
        lightBoxImg.setAttribute("alt", "Close-up view de la photo intitulée " + media.title);
        mediaContainer.appendChild(lightBoxImg);
    }

    lightBoxContent.appendChild(mediaContainer);

    const lightBoxCaption = document.createElement("div");
    lightBoxCaption.setAttribute("class", "lightbox__caption");
    lightBoxCaption.setAttribute("aria-label", "Titre de la photo ou de la vidéo")
    lightBoxCaption.innerText = media.title;
    mediaContainer.appendChild(lightBoxCaption);

    const lightBoxClose = document.createElement("button");
    lightBoxClose.setAttribute("class", "lightbox__close");
    lightBoxClose.setAttribute("aria-label", "Fermer la lightbox");
    lightBoxClose.setAttribute("type", "button");
    lightBoxClose.innerHTML = `<i class="fas fa-times"></i>`;
    lightBoxContent.appendChild(lightBoxClose);

    const lightBoxPrev = document.createElement("button");
    lightBoxPrev.setAttribute("class", "lightbox__prev");
    lightBoxPrev.innerHTML = "<i class='fas fa-chevron-left'></i>";
    lightBoxPrev.setAttribute("aria-label", "Previous image");
    lightBoxContent.appendChild(lightBoxPrev);

    const lightBoxNext = document.createElement("button");
    lightBoxNext.setAttribute("class", "lightbox__next");
    lightBoxNext.innerHTML = "<i class='fas fa-chevron-right'></i>";
    lightBoxNext.setAttribute("aria-label", "Next image");
    lightBoxContent.appendChild(lightBoxNext);

    lightBoxContent.setAttribute("aria-modal", true);
    lightBoxContent.setAttribute("role", "dialog");

    //Navigate between medias when clicking on the previous and next buttons
    lightBoxPrev.addEventListener("click", () => {
        navigateMedia('previous', medias, imageFolderUrl, lightBoxNext);
    });
    lightBoxNext.addEventListener("click", () => {
        navigateMedia('next', medias, imageFolderUrl, lightBoxNext);
    });
    //Focus allow the screen reader to read the content of the lightbox
    lightBoxNext.focus();
    
    //Remove the lightbox when clicking on the close button
    lightBoxClose.addEventListener("click", () => {
        toggleBackgroundAccessibility(false);
        lightBox.remove();
    });
    
    //Escape key to close the lightbox. Arrow keys to navigate between medias.
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            toggleBackgroundAccessibility(false);
            lightBox.remove();
        }
        else if (e.key === "ArrowLeft") {
            navigateMedia('previous', medias, imageFolderUrl);
        }
        else if (e.key === "ArrowRight") {
            navigateMedia('next', medias, imageFolderUrl);
        }
    });
}

//Update lightbox content when navigating between medias
function navigateMedia(direction, mediaList, imageFolderUrl, lightBoxNext) {
    let currentMedia = document.querySelector('.lightbox__media');
    let currentMediaName = currentMedia.getAttribute("src").split('/').pop();

    const currentMediaIndex = mediaList.findIndex(media => media.image === currentMediaName || media.video === currentMediaName);
    let nextMediaIndex = 0;

    //Update index depending on the direction
    if (direction === 'previous') {
        nextMediaIndex = currentMediaIndex - 1;
    } else if (direction === 'next') {
        nextMediaIndex = currentMediaIndex + 1;
    } else {
        return;
    }
    //Less than 0, go to the last media. More than the length of the array, go to the first media.
    if (nextMediaIndex < 0) {
        nextMediaIndex = mediaList.length - 1;
    } else if (nextMediaIndex >= mediaList.length) {
        nextMediaIndex = 0;
    }

    //Create the next media element
    let nextMediaElement;
    if (mediaList[nextMediaIndex].video) {
        nextMediaElement = document.createElement("video");
        nextMediaElement.setAttribute("class", "lightbox__media");
        nextMediaElement.setAttribute("src", `${imageFolderUrl}${mediaList[nextMediaIndex].video}`);
        nextMediaElement.setAttribute("controls", true);
        nextMediaElement.addEventListener("click", (e) => {
          e.preventDefault();
          lightBox(mediaList[nextMediaIndex].video, imageFolderUrl, mediaList);
        });
      } else {
        nextMediaElement = document.createElement("img");
        nextMediaElement.setAttribute("class", "lightbox__media");
        nextMediaElement.setAttribute("src", `${imageFolderUrl}${mediaList[nextMediaIndex].image}`);
      }

    // const lightBoxContent = document.querySelector('.lightbox__content');
    const mediaContainer = document.querySelector('.lightbox__media-container');
    mediaContainer.replaceChild(nextMediaElement, currentMedia);

    const lightBoxCaption = document.querySelector('.lightbox__caption');
    lightBoxCaption.innerText = mediaList[nextMediaIndex].title;

    if (mediaList[nextMediaIndex].video) {
        nextMediaElement.setAttribute("aria-label", "Vidéo intitulée " + mediaList[nextMediaIndex].title + " - Lecture en cours");
        nextMediaElement.setAttribute("alt", "Vidéo intitulée " + mediaList[nextMediaIndex].title);
    } else {
        nextMediaElement.setAttribute("aria-label", "Photo intitulée " + mediaList[nextMediaIndex].title + " - Affichage en cours");
        nextMediaElement.setAttribute("alt", "Photo intitulée " + mediaList[nextMediaIndex].title);
    }
    lightBoxNext.focus();
}

// Disable background elements when lightbox is open
function toggleBackgroundAccessibility(disable) {
    const backgroundElements = document.querySelectorAll('body > *:not(.lightbox__container)');
    backgroundElements.forEach((element) => {
        if (disable) {
            const ariaHidden = element.getAttribute('aria-hidden');
            if (ariaHidden === null || ariaHidden === 'false') {//Null or false because the attribute is removed when the lightbox is closed
                element.setAttribute('aria-hidden', 'true');
                element.setAttribute('data-prev-aria-hidden', 'false');
            }
        } else {
            const prevAriaHidden = element.getAttribute('data-prev-aria-hidden');
            if (prevAriaHidden === 'false') {
                element.removeAttribute('aria-hidden');
            }
            element.removeAttribute('data-prev-aria-hidden');
        }
    });
}


export { lightBox };