//Get data and filter it to get the page's photographer infos. Then display the medias.
async function getAndDisplayMedias() {
    const data = await getData();
    const allMedias = data.media;
    const photographerMedias = allMedias.filter(media => media.photographerId == id);
    const sortedMediaPriceName = await filterGalerie(photographerMedias);
    displayMedias(sortedMediaPriceName[0], sortedMediaPriceName[1], sortedMediaPriceName[2]);
}

//Display the photographer medias in the gallery
function displayMedias(medias, firstName, photographerPrice) {

    //Empty the container to avoid duplicates
    const container = document.querySelector(".media__container");
    container.innerHTML = "";

    //Loop to build the media elements
    medias.forEach(media => {
        const mediaTitle = media.title;
        const mediaLikes = media.likes;
        const mediaDate = media.date;
        const mediaName = media.image;

        //Create media element (img or video) with a link
        const imgLink = document.createElement("a");
        imgLink.setAttribute("aria-label", "Voir le média");
        imgLink.setAttribute("class", "media__link");

        

        //Add media card. It will be englobing the media element and the stats container
        const mediaCard = document.createElement("article");
        mediaCard.setAttribute("class", "media__card");
        mediaCard.setAttribute("data-date", mediaDate);
        mediaCard.setAttribute("data-likes", mediaLikes);
        mediaCard.setAttribute("data-title", mediaTitle);
        container.appendChild(mediaCard);
        mediaCard.appendChild(imgLink);

        const folderName = firstName.replace(/-/g, ' ');
        const imageFolderUrl = `FishEye_Photos/Sample Photos/${folderName}/`;
        
        //If media property video is true, create video element
        if (media.video) {
            const mediaVideoName = media.video;
            const videoElement = document.createElement("video");
            videoElement.setAttribute("class", "media__video");
            videoElement.src = `${imageFolderUrl}${mediaVideoName}`;
            videoElement.alt = "description de la vidéo";
            videoElement.controls = true;
            //empty link for now //COMPLETE LATER WITH LIGHTBOX
            imgLink.href = `${imageFolderUrl}${mediaVideoName}`;
            imgLink.appendChild(videoElement);
            mediaCard.appendChild(imgLink);
            //add lightBox function on click
            imgLink.addEventListener("click", (e) => {
                e.preventDefault();
                lightBox(mediaVideoName, imageFolderUrl, medias);
            });

            //Add stats element
            addStatsElement(mediaCard, mediaTitle, photographerPrice);

            return;
        }
        //If not mp4, create img element
        const imgElement = document.createElement("img");
        imgElement.src = `${imageFolderUrl}${mediaName}`;
        imgElement.alt = "description de l'image";
        imgElement.setAttribute("class", "media__img");
        //empty link for now //COMPLETE LATER WITH LIGHTBOX
        imgLink.href = `${imageFolderUrl}${mediaName}`;
        //add lightBox function on click
        imgLink.addEventListener("click", (e) => {
            e.preventDefault();
            lightBox(mediaName, imageFolderUrl, medias);
        });
        imgLink.appendChild(imgElement);
        mediaCard.appendChild(imgLink);

        //Add stats element
        addStatsElement(mediaCard, mediaTitle, photographerPrice);
    });
}
