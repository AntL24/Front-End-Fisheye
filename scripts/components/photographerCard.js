
//Construct dom elements for the given photographer
function makeUserCard(photographer) {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const link = document.createElement('a');
    const p = document.createElement('p');
    const spanLocation  = document.createElement('span');
    const spanPrice = document.createElement('span');
    const imgContainer = document.createElement('div');

    //Prevent spaces for w3c validation in src of img by using %20 instead of space
    photographer.picture = photographer.picture.replace(/ /g, '%20');


    article.setAttribute('class', 'photographer__card');
    link.setAttribute('class', 'photographer__link');
    link.setAttribute('aria-label', `Voir la page de ${photographer.name}`);
    link.setAttribute('href', `photographer.html?id=${photographer.id}`);
    img.setAttribute('src', photographer.picture);
    img.setAttribute('alt', `Portrait de ${photographer.name}`);
    img.setAttribute('class', 'photographer__img');
    h2.textContent = photographer.name;
    h2.setAttribute('class', 'photographer__name');
    p.textContent = photographer.tagline;
    p.setAttribute('class', 'photographer__tagline');
    spanLocation.textContent = `${photographer.city}, ${photographer.country}`;
    spanLocation.setAttribute('class', 'photographer__location');
    spanPrice.textContent = `${photographer.price}€/jour`;
    spanPrice.setAttribute('class', 'photographer__price');
    imgContainer.setAttribute('class', 'photographer__img-container');
    //Force screen readers to read the name of the photographer before the location and price
    h2.setAttribute('aria-label', `${photographer.name} ${spanLocation.textContent} ${spanPrice.textContent}`);

    article.appendChild( link );
    link.appendChild( imgContainer );
    imgContainer.appendChild( img );
    link.appendChild( h2 );
    article.appendChild( spanLocation );
    article.appendChild( p );
    article.appendChild( spanPrice );

    return article;
}

export { makeUserCard };