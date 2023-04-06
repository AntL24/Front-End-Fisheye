import { makeUserCard } from "../components/photographerCard.js";

//Create a photographer object with the data from the JSON file.
class Photographer {
  constructor(data) {
    this.name = data.name;
    this.picture = `assets/photographers/${data.portrait}`;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
  }

  //Static method to create a photographer card with the data from the JSON file.
  //No need to create a new instance of the class to use this method.
  static createPhotographerCard(data) {
    return makeUserCard(data);
  }
  //Static method to create a photographer object with the data from the JSON file.
  static createPhotographer(data) {
    return new Photographer(data);
  }
}

export { Photographer };
