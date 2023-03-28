//According to the filterMode, sort the media array and display it.
async function filterGalerie(filterMode){
    //Rearrange the mediaList array depending on the filterMode
    //filterMode can be "Popularité", "Date" or "Titre"
    const datas = await getData();
    const allMedia = datas.media;
    const photographerName = datas.photographers.find((photographer) => photographer.id == id).name;
    const firstName = photographerName.split(" ")[0];
    console.log(firstName);

    const mediaList = allMedia.filter((media) => media.photographerId == id);
    //Sort by likes
    if (filterMode == "Popularité") {
        mediaList.sort((a, b) => b.likes - a.likes);
    }
    //Sort by date
    if (filterMode == "Date") {
        mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    //Sort by title
    if (filterMode == "Titre") {
        mediaList.sort((a, b) => a.title.localeCompare(b.title));
    }
    //Empty the gallery before calling the displayMedias function.
    const gallery = document.querySelector(".media__container");
    gallery.innerHTML = "";
    displayMedias(mediaList, firstName);
}


