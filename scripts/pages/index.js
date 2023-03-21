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


    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
