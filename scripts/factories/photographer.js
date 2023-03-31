class PhotographerFactory {
  constructor(data) {
    this.name = data.name;
    this.picture = `assets/photographers/${data.portrait}`;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
  }

  makeUserCard() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const link = document.createElement('a');
    const p = document.createElement('p');
    const spanLocation  = document.createElement('span');
    const spanPrice = document.createElement('span');
    const imgContainer = document.createElement('div');

    article.setAttribute('class', 'photographer__card');
    link.setAttribute('class', 'photographer__link');
    link.setAttribute('aria-label', `Voir la page de ${this.name}`);
    link.setAttribute('href', `photographer.html?id=${this.id}`);
    img.setAttribute('src', this.picture);
    img.setAttribute('alt', `Portrait de ${this.name}`);
    img.setAttribute('class', 'photographer__img');
    h2.textContent = this.name;
    h2.setAttribute('class', 'photographer__name');
    p.textContent = this.tagline;
    p.setAttribute('class', 'photographer__tagline');
    spanLocation.textContent = `${this.city}, ${this.country}`;
    spanLocation.setAttribute('class', 'photographer__location');
    spanPrice.textContent = `${this.price}€/jour`;
    spanPrice.setAttribute('class', 'photographer__price');
    imgContainer.setAttribute('class', 'photographer__img-container');

    article.appendChild( link );
    link.appendChild( imgContainer );
    imgContainer.appendChild( img );
    link.appendChild( h2 );
    article.appendChild( spanLocation );
    article.appendChild( p );
    article.appendChild( spanPrice );

    return article;
  }
}

function createPhotographer(data) {
  return new PhotographerFactory(data).makeUserCard();
}

