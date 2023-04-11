function addStatsElement(mediaFigure, mediaTitle, photographerMedias) {
    const mediaFigCaption = document.createElement("figcaption");
    mediaFigCaption.classList.add("media__stats-container");
    mediaFigure.appendChild(mediaFigCaption);

    //Iterate over medias to get the right media
    photographerMedias.forEach(media => {
        if (media.title == mediaTitle) {
            mediaFigCaption.dataset.date = media.date;
            mediaFigCaption.dataset.likes = media.likes;
            mediaFigCaption.dataset.title = media.title;
        }
    });
    
    //Select stats container element
    mediaFigCaption.innerHTML = mediaTitle;
  
    // Add like elements container
    const likeElementsContainer = document.createElement("div");
    likeElementsContainer.setAttribute("class", "media__like-elements-container");
    mediaFigCaption.appendChild(likeElementsContainer);
  
    // Add like button
    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "media__like-button");
    likeButton.setAttribute("aria-label", "like");
    likeButton.innerHTML = `<i class="far fa-heart"></i>`;
    likeElementsContainer.appendChild(likeButton);
  
    // Add like counter
    const likeCounter = document.createElement("span");
    likeCounter.setAttribute("class", "media__like-counter");
    //Aria label will indicate the number of likes : "nombre de likes : 5" for example
    likeCounter.setAttribute("aria-hidden", "true");
    likeCounter.textContent = mediaFigCaption.dataset.likes;
    const figCaptionNumber = document.createElement("span")
    figCaptionNumber.setAttribute("class", "sr-only");
    //Aria label will indicate the number of likes : "nombre de likes : 5" for example
    figCaptionNumber.textContent = "nombre de likes : " + mediaFigCaption.dataset.likes;
    likeElementsContainer.appendChild(likeCounter);
    likeElementsContainer.appendChild(figCaptionNumber);
  
    // Add event listener to like button
    likeButton.addEventListener("click", () => {
      if (mediaFigCaption.getAttribute("data-liked") == "true") {
        likeButton.innerHTML = `<i class="far fa-heart"></i>`;
        likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
        mediaFigCaption.setAttribute("data-liked", false);
        updateTotalLikes("remove");
        return;
      }
      likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
      mediaFigCaption.setAttribute("data-liked", true);
      updateTotalLikes("add");
      likeButton.innerHTML = `<i class="fas fa-heart"></i>`;
    });
  }
  
  
  function setTotalLikesAndPrice(photographerPrice) {
    const totalLikes = document.querySelector(".photographer__TotalStats__likes__number");
    const totalPrice = document.querySelector(".photographer__TotalStats__price__number");
    const mediaFigCaptions = document.querySelectorAll(".media__stats-container");
    let totalLikesNumber = 0;
  
    mediaFigCaptions.forEach(mediaFigCaption => {
      totalLikesNumber += parseInt(mediaFigCaption.getAttribute("data-likes"));
    });
    totalLikes.textContent = totalLikesNumber;
    if (photographerPrice) {
      totalPrice.textContent = photographerPrice;
    }
  }
  
  function updateTotalLikes(addOrRemove) {
    const totalLikes = document.querySelector(".photographer__TotalStats__likes__number");
    addOrRemove == "add"
      ? (totalLikes.textContent = parseInt(totalLikes.textContent) + 1)
      : (totalLikes.textContent = parseInt(totalLikes.textContent) - 1);
  }
  
  export { addStatsElement, setTotalLikesAndPrice };
  