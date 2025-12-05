const films = [
  { id: 1, titre: "Inception",    annee: 2010, type: "Film",  poster: null },
  { id: 2, titre: "Interstellar", annee: 2014, type: "Film",  poster: null },
  { id: 3, titre: "Breaking Bad", annee: 2008, type: "Série", poster: null },
  { id: 4, titre: "The Office",   annee: 2005, type: "Série", poster: null },
  { id: 5, titre: "Avatar",       annee: 2022, type: "Film",  poster: null },
];

// DOM Elements
const resultsRow = document.querySelector("#results .row");
const searchForm = document.querySelector("#search-form");
const titleInput = document.querySelector("#titleInput");
const yearInput  = document.querySelector("#yearInput");
const typeSelect = document.querySelector("#typeSelect");

// Create film card
function createFilmCard(film) {
  const col = document.createElement("div");
  col.className = "col-12 col-md-4";

  col.innerHTML = `
    <article class="card film-card h-100">
      <div class="poster-placeholder text-muted">
        ${
          film.poster
            ? `<img src="${film.poster}" alt="Affiche de ${film.titre}">` : "POSTER"
        }
      </div>
      <div class="card-body">
        <h3 class="h6 card-title mb-1">Titre : ${film.titre}</h3>
        <p class="mb-0 small text-muted">Année : ${film.annee}</p>
        <p class="mb-0 small text-muted">Type : ${film.type}</p>
      </div>
    </article>
  `;

  return col;
}

// Display films
function displayFilms(list) {
  resultsRow.innerHTML = "";
  list.forEach((film) => {
    resultsRow.appendChild(createFilmCard(film));
  });
}

// Initial display
displayFilms(films);

// Search Handler
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleValue = titleInput.value.trim().toLowerCase();
  const yearValue  = yearInput.value.trim();
  const typeValue  = typeSelect.value;

  const filtered = films.filter((film) => {
    const matchTitle = titleValue
      ? film.titre.toLowerCase().includes(titleValue)
      : true;

    const matchYear = yearValue ? String(film.annee) === yearValue : true;

    const matchType = typeValue ? film.type === typeValue : true;

    return matchTitle && matchYear && matchType;
  });

  displayFilms(filtered);
});