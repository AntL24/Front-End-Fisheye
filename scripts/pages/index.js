

// Function to hide the loader after 3 seconds if the page is loaded
function hideLoader() {
    setTimeout(function() {
      if (document.readyState === "complete") {
        const loader = document.querySelector(".loader");
        loader.classList.add("hide");
      } else {
        hideLoader();
      }
    }, 3000);
}
hideLoader();

//Request to get the photographers data
async function getPhotographers() {
    try {
        const response = await fetch("data/photographers.json");
        if (!response.ok) {
            throw new Error('Erreur de chargement des données');
        }
        const photographers = await response.json();
        return photographers;
    } catch (error) {
        console.log(error);
        return { photographers: [] };
    }
}

//Display the photographers data in the DOM.
async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.makeUserCard();
            photographersSection.appendChild(userCardDOM);
        });
};

//Get the photographers data and call the displayData function.
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
    
init();
    
