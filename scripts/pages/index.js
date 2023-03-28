//Hide the loader after 3 seconds if the page is loaded
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

//Display the photographers data in the DOM according to the photographers data.
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.makeUserCard();
        photographersSection.appendChild(userCardDOM);
    });
};

//Use two accessory functions to get the photographers data and display it.
async function init() {
    const { photographers } = await getData();
    displayData(photographers);
};
    
init();
    
