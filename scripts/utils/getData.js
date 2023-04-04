//Get all data from the json file
async function getData() {
    try {
        const response = await fetch("data/photographers.json");
        if (!response.ok) {
            throw new Error('Erreur de chargement des données');
        }
        const photographersData = await response.json();
        return photographersData;
    } catch (error) {
        console.log(error);
        return { photographersData: [] };
    }
}

export { getData };