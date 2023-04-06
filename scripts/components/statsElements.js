
//Add stats element to the media card
function addStatsElement(mediaCard, mediaTitle) {
    //Add stats container
    const statsContainer = document.createElement("div");
    statsContainer.setAttribute("class", "media__stats-container");
    mediaCard.appendChild(statsContainer);

    //Add like elements container
    const likeElementsContainer = document.createElement("div");
    likeElementsContainer.setAttribute("class", "media__like-elements-container");
    statsContainer.appendChild(likeElementsContainer);
    
    //Add like button
    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "media__like-button");
    likeButton.setAttribute("aria-label", "like");
    likeButton.innerHTML = `<i class="far fa-heart"></i>`;
    likeElementsContainer.appendChild(likeButton);

    //Add like counter
    const likeCounter = document.createElement("p");
    likeCounter.setAttribute("class", "media__like-counter");
    //Use attribute to get the number of likes
    likeCounter.textContent = mediaCard.getAttribute("data-likes");
    likeElementsContainer.appendChild(likeCounter);

    //Add event listener to like button
    likeButton.addEventListener("click", () => {
        //If the media has already been liked, remove the like
        if (mediaCard.getAttribute("data-liked") == "true") {
            likeButton.innerHTML = `<i class="far fa-heart"></i>`;
            likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
            mediaCard.setAttribute("data-liked", false);
            updateTotalLikes("remove");
            return;
        }
        likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
        // Add attribute to the media card to know if it has been liked
        mediaCard.setAttribute("data-liked", true);
        updateTotalLikes("add");
        likeButton.innerHTML = `<i class="fas fa-heart"></i>`; //If clicked, change html to display full heart icon
        
    });
    //Add title
    const title = document.createElement("p");
    title.textContent = mediaTitle;
    statsContainer.appendChild(title);
}

//Display the photographer total stats
function setTotalLikesAndPrice(photographerPrice) {
    const totalLikes = document.querySelector(".photographer__TotalStats__likes__number");
    const totalPrice = document.querySelector(".photographer__TotalStats__price__number");
    const mediaCards = document.querySelectorAll(".media__card");
    let totalLikesNumber = 0;

    mediaCards.forEach(mediaCard => {
        totalLikesNumber += parseInt(mediaCard.getAttribute("data-likes"));
    });
    totalLikes.textContent = totalLikesNumber;
    //if the photographer has a price, display it
    if (photographerPrice){
    totalPrice.textContent = photographerPrice;
    }
}

function updateTotalLikes(addOrRemove) {
   //Just add one or remove one like to the total likes
    const totalLikes = document.querySelector(".photographer__TotalStats__likes__number");
    addOrRemove == "add" ? totalLikes.textContent = parseInt(totalLikes.textContent) + 1 : totalLikes.textContent = parseInt(totalLikes.textContent) - 1;
}

export { addStatsElement, setTotalLikesAndPrice };