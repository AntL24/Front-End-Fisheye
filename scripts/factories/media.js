
//Get all media corresponding to photographer name, and display them in the DOM
function getMedia(name) {
    const nameTextContent = name.textContent;
    const firstName = nameTextContent.split(' ')[0];
    const folderName = firstName.replace('-', ' ');

    fetch(`FishEye_Photos/Sample Photos/${folderName}`)
        .then(response => response.text())
        .then(html => {
        // Analyse de la réponse HTML pour extraire les noms de fichiers
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        //mediaElements are either jpg, jpeg, png, gif or mp4
        const imageElements = doc.querySelectorAll("a[href$='.jpg'], a[href$='.jpeg'], a[href$='.png'], a[href$='.gif'], a[href$='.mp4']");
        const imageNames = Array.from(imageElements).map(
            element => element.href.split("/").pop()
        ); // Récupère le nom de fichier à partir de l'URL du lien

    // Utilisation des noms de fichiers pour afficher les images sur la page
    const container = document.querySelector(".media__container");
    imageNames.forEach(imageName =>{

        //Create media element (img or video) with a link
        const imgLink = document.createElement("a");
        imgLink.setAttribute("aria-label", "Voir le média");
        imgLink.setAttribute("class", "media__link");
        //empty link for now
        imgLink.href = "";

        //Add media card englobing the media element and the stats container
        const mediaCard = document.createElement("article");
        mediaCard.setAttribute("class", "media__card");
        container.appendChild(mediaCard);
        mediaCard.appendChild(imgLink);

        //Add stats container
        const statsContainer = document.createElement("div");
        statsContainer.setAttribute("class", "media__stats-container");
        mediaCard.appendChild(statsContainer);

        //Add like button
        const likeButton = document.createElement("button");
        likeButton.setAttribute("class", "media__like-button");
        likeButton.setAttribute("aria-label", "Ajouter un like");
        likeButton.innerHTML = `<i class="fas fa-heart"></i>`;
        statsContainer.appendChild(likeButton);

        //Add like counter
        const likeCounter = document.createElement("p");
        likeCounter.setAttribute("class", "media__like-counter");
        likeCounter.textContent = "0";
        statsContainer.appendChild(likeCounter);

        //Add event listener to like button
        likeButton.addEventListener("click", () => {
            likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
        });
        

        const imageFolderUrl = `FishEye_Photos/Sample Photos/${folderName}/`;

        //If mp4, create video element
        if (imageName.endsWith(".mp4")) {
            const videoElement = document.createElement("video");
            videoElement.setAttribute("class", "media__video");
            videoElement.src = `${imageFolderUrl}${imageName}`;
            videoElement.alt = "description de la vidéo";
            videoElement.controls = true;
            imgLink.appendChild(videoElement);
            const videoTitle = document.createElement("p");
            videoTitle.textContent = imageName;
            statsContainer.appendChild(videoTitle);
            mediaCard.appendChild(imgLink);

            return;
        }
        const imgElement = document.createElement("img");
        imgElement.src = `${imageFolderUrl}${imageName}`;
        imgElement.alt = "description de l'image";
        imgElement.setAttribute("class", "media__img");
        const imgTitle = document.createElement("p");
        imgTitle.textContent = imageName;
       
        imgLink.appendChild(imgElement);
        statsContainer.appendChild(imgTitle);
        mediaCard.appendChild(imgLink);
        
    });
  });
}

export { getMedia };
    