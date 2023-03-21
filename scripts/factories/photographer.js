//Return an object containing the photographer's name, picture and the article DOM element returned by the getUserCardDOM inner function.
function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    //Construction of the photographer card with DOM elements
    function getUserCardDOM() {
        
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
        link.setAttribute('aria-label', `Voir la page de ${name}`);
        link.setAttribute('href', `photographer.html?id=${id}`);
        img.setAttribute('src', picture);
        img.setAttribute('alt', `Portrait de ${name}`);
        img.setAttribute('class', 'photographer__img');
        h2.textContent = name;
        h2.setAttribute('class', 'photographer__name');
        p.textContent = tagline;
        p.setAttribute('class', 'photographer__tagline');
        spanLocation.textContent = `${city}, ${country}`;
        spanLocation.setAttribute('class', 'photographer__location');
        spanPrice.textContent = price + '€/jour';
        spanPrice.setAttribute('class', 'photographer__price');
        imgContainer.setAttribute('class', 'photographer__img-container');
        

        article.appendChild( link );
        link.appendChild( imgContainer );
        imgContainer.appendChild( img );
        link.appendChild( h2 );
        article.appendChild( spanLocation );
        article.appendChild( p );
        article.appendChild( spanPrice );

        return (article);
    }
    return { name, picture, getUserCardDOM }
}