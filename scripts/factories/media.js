//Get data and filter it to get the page's photographer infos. Then display the medias.
async function getAndDisplayMedias() {
    const data = await getData();
    const allPhotographers = data.photographers;
    const allMedias = data.media;

    const photographerMedias = allMedias.filter(media => media.photographerId == id);
    const photographer = allPhotographers.find(photographer => photographer.id == id);

    const photographerName = photographer.name;
    const firstName = photographerName.split(' ')[0];

    const photographerPrice = photographer.price;

    displayMedias(photographerMedias, firstName, photographerPrice);
}

//Display the photographer medias in the gallery
function displayMedias(medias, firstName, photographerPrice) {
    const container = document.querySelector(".media__container");

    medias.forEach(media => {
        const mediaTitle = media.title;
        const mediaLikes = media.likes;
        const mediaDate = media.date;
        const mediaName = media.image;

        //Create media element (img or video) with a link
        const imgLink = document.createElement("a");
        imgLink.setAttribute("aria-label", "Voir le média");
        imgLink.setAttribute("class", "media__link");

        //empty link for now //COMPLETE LATER WITH LIGHTBOX
        imgLink.href = "";

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

            imgLink.appendChild(videoElement);
            mediaCard.appendChild(imgLink);

            //Add stats element
            addStatsElement(mediaCard, mediaTitle, photographerPrice);

            return;
        }
        //If not mp4, create img element
        const imgElement = document.createElement("img");
        imgElement.src = `${imageFolderUrl}${mediaName}`;
        imgElement.alt = "description de l'image";
        imgElement.setAttribute("class", "media__img");

        imgLink.appendChild(imgElement);
        mediaCard.appendChild(imgLink);

        //Add stats element
        addStatsElement(mediaCard, mediaTitle, photographerPrice);
    });
}
