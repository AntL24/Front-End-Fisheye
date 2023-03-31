function lightBox(mediaName, imageFolderUrl, medias) {
    //Create lightbox element
    const lightBox = document.createElement("div");
    lightBox.setAttribute("class", "lightbox");
    document.body.appendChild(lightBox);
    //Create lightbox content element
    const lightBoxContent = document.createElement("div");
    lightBoxContent.setAttribute("class", "lightbox__content");
    lightBox.appendChild(lightBoxContent);
    //Create lightbox video element if media is a video
    if (mediaName.endsWith(".mp4")) {
        const lightBoxVideo = document.createElement("video");
        lightBoxVideo.setAttribute("class", "lightbox__media");
        lightBoxVideo.setAttribute("src", `${imageFolderUrl}/${mediaName}`);
        lightBoxVideo.setAttribute("controls", true);
        lightBoxContent.appendChild(lightBoxVideo);
    } else {
    //Create lightbox image element
    const lightBoxImg = document.createElement("img");
    lightBoxImg.setAttribute("class", "lightbox__media");
    lightBoxImg.setAttribute("src", `${imageFolderUrl}/${mediaName}`);
    lightBoxContent.appendChild(lightBoxImg);
    }
    //Create lightbox caption element
    const lightBoxCaption = document.createElement("div");
    lightBoxCaption.setAttribute("class", "lightbox__caption");
    lightBoxCaption.innerText = "caption";
    lightBoxContent.appendChild(lightBoxCaption);
    //Create lightbox close button
    const lightBoxClose = document.createElement("button");
    lightBoxClose.setAttribute("class", "lightbox__close");
    lightBoxClose.setAttribute("aria-label", "Fermer la lightbox");
    lightBoxClose.innerHTML = `<i class="fas fa-times"></i>`;
    lightBoxContent.appendChild(lightBoxClose);
    //Add event listener to close lightbox
    lightBoxClose.addEventListener("click", () => {
        lightBox.remove();
    });
    //Add event listener to close lightbox on click outside
    lightBox.addEventListener("click", (e) => {
        if (e.target === lightBox) {
            lightBox.remove();
        }
    });
    //Add event listener to close lightbox on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightBox.remove();
        }
    });

    // Ajouter les flèches pour naviguer dans les images
    const lightBoxPrev = document.createElement("button");
    lightBoxPrev.setAttribute("class", "lightbox__prev");
    lightBoxPrev.innerHTML = "<i class='fas fa-chevron-left'></i>";
    lightBoxContent.appendChild(lightBoxPrev);

    const lightBoxNext = document.createElement("button");
    lightBoxNext.setAttribute("class", "lightbox__next");
    lightBoxNext.innerHTML = "<i class='fas fa-chevron-right'></i>";
    lightBoxContent.appendChild(lightBoxNext);

    // Ajouter les écouteurs d'événements pour naviguer dans les images
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
    console.log("currentMediaName", currentMediaName);
    const currentMediaIndex = mediaList.findIndex(media => media.image === currentMediaName || media.video === currentMediaName);
    console.log("currentMediaIndex", currentMediaIndex);

    let nextMediaIndex = 0;

    if (direction === 'previous') {
        nextMediaIndex = currentMediaIndex - 1;
    } else if (direction === 'next') {
        nextMediaIndex = currentMediaIndex + 1;
    } else {
        return;
    }

    // Handle wraparound for previous and next media
    if (nextMediaIndex < 0) {
        nextMediaIndex = mediaList.length - 1;
    } else if (nextMediaIndex >= mediaList.length) {
        nextMediaIndex = 0;
    }

    // Create appropriate HTML element for next media
    let nextMediaElement;
    if (mediaList[nextMediaIndex].video) {
        nextMediaElement = document.createElement("video");
        nextMediaElement.setAttribute("class", "lightbox__media");
        nextMediaElement.setAttribute("src", `${imageFolderUrl}/${mediaList[nextMediaIndex].video}`);
        nextMediaElement.setAttribute("controls", true);
    } else {
        nextMediaElement = document.createElement("img");
        nextMediaElement.setAttribute("class", "lightbox__media");
        nextMediaElement.setAttribute("src", `${imageFolderUrl}/${mediaList[nextMediaIndex].image}`);
    }

    // Update lightbox with next media element
    const lightBoxContent = document.querySelector('.lightbox__content');
    lightBoxContent.replaceChild(nextMediaElement, currentMedia);

    // Update lightbox caption
    const lightBoxCaption = document.querySelector('.lightbox__caption');
    lightBoxCaption.innerText = mediaList[nextMediaIndex].caption;
}
