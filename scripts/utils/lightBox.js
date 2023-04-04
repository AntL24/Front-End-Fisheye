// 

function lightBox(mediaName, imageFolderUrl, medias) {
    const lightBoxContainer = document.querySelector(".lightbox__container");
    lightBoxContainer.setAttribute("aria-hidden", false);
    // const allBodyChildren = document.body.children;
    // const allElements = Array.from(allBodyChildren);

    const media = medias.find(media => media.image === mediaName || media.video === mediaName);
    const lightBox = document.createElement("div");
    lightBox.setAttribute("class", "lightbox");
    lightBoxContainer.appendChild(lightBox);
    
    const lightBoxContent = document.createElement("div");
    lightBoxContent.setAttribute("class", "lightbox__content");
    lightBox.appendChild(lightBoxContent);

    const mediaContainer = document.createElement("div");
    mediaContainer.setAttribute("class", "lightbox__media-container");

    if (mediaName.endsWith(".mp4")) {
        const lightBoxVideo = document.createElement("video");
        lightBoxVideo.setAttribute("class", "lightbox__media");
        lightBoxVideo.setAttribute("src", `${imageFolderUrl}${mediaName}`);
        lightBoxVideo.setAttribute("controls", true);
        lightBoxVideo.setAttribute("aria-label", "Vidéo intitulée " + media.title + " - Lecture en cours");
        lightBoxVideo.setAttribute("alt", "Close-up view de la vidéo intitulée " + media.title);
        lightBoxVideo.setAttribute("tabindex", 0);
        mediaContainer.appendChild(lightBoxVideo);
        lightBoxVideo.focus();
    } else {
        const lightBoxImg = document.createElement("img");
        lightBoxImg.setAttribute("class", "lightbox__media");
        lightBoxImg.setAttribute("src", `${imageFolderUrl}${mediaName}`);
        lightBoxImg.setAttribute("aria-label", "Photo intitulée " + media.title + " - Affichage en cours");
        lightBoxImg.setAttribute("alt", "Close-up view de la photo intitulée " + media.title);
        lightBoxImg.setAttribute("tabindex", 0);
        mediaContainer.appendChild(lightBoxImg);
        lightBoxImg.focus();
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

    lightBoxClose.addEventListener("click", () => {
        lightBox.remove();
    });

    lightBox.addEventListener("click", (e) => {
        if (e.target === lightBox) {
            lightBox.remove();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightBox.remove();
        }
        else if (e.key === "ArrowLeft") {
            navigateMedia('previous', medias, imageFolderUrl);
        }
        else if (e.key === "ArrowRight") {
            navigateMedia('next', medias, imageFolderUrl);
        }
    });

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

    lightBoxPrev.addEventListener("click", () => {
        navigateMedia('previous', medias, imageFolderUrl);
    });

    lightBoxNext.addEventListener("click", () => {
        navigateMedia('next', medias, imageFolderUrl);
    });
}

function navigateMedia(direction, mediaList, imageFolderUrl) {
    let currentMedia = document.querySelector('.lightbox__media');
    let currentMediaName = currentMedia.getAttribute("src").split('/').pop();
    const currentMediaIndex = mediaList.findIndex(media => media.image === currentMediaName || media.video === currentMediaName);

    let nextMediaIndex = 0;

    if (direction === 'previous') {
        nextMediaIndex = currentMediaIndex - 1;
    } else if (direction === 'next') {
        nextMediaIndex = currentMediaIndex + 1;
    } else {
        return;
    }

    if (nextMediaIndex < 0) {
        nextMediaIndex = mediaList.length - 1;
    } else if (nextMediaIndex >= mediaList.length) {
        nextMediaIndex = 0;
    }

    let nextMediaElement;
    if (mediaList[nextMediaIndex].video) {
        nextMediaElement = document.createElement("video");
        nextMediaElement.setAttribute("class", "lightbox__media");
        nextMediaElement.setAttribute("src", `${imageFolderUrl}${mediaList[nextMediaIndex].video}`);
        nextMediaElement.setAttribute("controls", true);
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
        nextMediaElement.focus();
    } else {
        nextMediaElement.setAttribute("aria-label", "Photo intitulée " + mediaList[nextMediaIndex].title + " - Affichage en cours");
        nextMediaElement.setAttribute("alt", "Photo intitulée " + mediaList[nextMediaIndex].title);
        nextMediaElement.focus();
    }
}

export { lightBox };