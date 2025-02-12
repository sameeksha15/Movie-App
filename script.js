const API_KEY = ''; // API key
const API_LINK = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=${API_KEY}&query=`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(API_LINK);

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            main.innerHTML = '';
            data.results.forEach(result => {
                const div_col = document.createElement("div");
                div_col.setAttribute("class", "col");

                const div_card = document.createElement("div");
                div_card.setAttribute("class", "card");
                div_card.setAttribute("class", "h-100");

                const image = document.createElement("img");
                image.setAttribute("class", "card-img-top");
                image.src = IMG_PATH + result.poster_path;

                const div_card_body = document.createElement("div");
                div_card_body.setAttribute("class", "card-body");

                title = document.createElement("h3");
                title.setAttribute("class", "card-title");
                title.innerHTML = `${result.title}`;

                desc = document.createElement("p");
                desc.setAttribute("class", "card-text");
                desc.innerHTML = `${result.overview}`;

                div_card_body.appendChild(title);
                div_card_body.appendChild(desc);

                div_card.appendChild(image);
                div_card.appendChild(div_card_body);

                div_col.appendChild(div_card);
                main.append(div_col);

            });
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = search.value;
    if(searchItem) {
        returnMovies(SEARCH_API + searchItem);
        search.value = "";
    }
});
