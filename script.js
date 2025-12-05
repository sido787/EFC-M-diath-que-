//  Config API OMDb

const API_KEY = "999a5793";          
const API_URL = "https://www.omdbapi.com/";

//  DOM
const resultsRow = document.querySelector("#resultsRow");
const searchForm = document.querySelector("#search-form");
const titleInput = document.querySelector("#titleInput");
const yearInput = document.querySelector("#yearInput");
const typeSelect = document.querySelector("#typeSelect");

console.log({
  resultsRow,
  searchForm,
  titleInput,
  yearInput,
  typeSelect,
});

//  Données locales (affichage par défaut)
// =======================
const localFilms = [
  {
    id: "tt1375666",
    titre: "Inception",
    annee: 2010,
    type: "movie",
    poster: "img/inception.webp",
    url: "https://www.imdb.com/title/tt1375666/",
  },
  {
    id: "tt0816692",
    titre: "Interstellar",
    annee: 2014,
    type: "movie",
    poster: "img/interstellar.webp",
    url: "https://www.imdb.com/title/tt0816692/",
  },
  {
    id: "tt0903747",
    titre: "Breaking Bad",
    annee: 2008,
    type: "series",
    poster: "img/breakingbad.webp",
    url: "https://www.imdb.com/title/tt0903747/",
  },
  {
    id: "tt0386676",
    titre: "The Office",
    annee: 2005,
    type: "series",

    poster: "img/the office.webp",
    url: "https://www.imdb.com/title/tt0386676/",
  },
  {
    id: "tt1630029",
    titre: "Avatar",
    annee: 2022,
    type: "movie",
    poster: "img/avatar.webp",
    url: "https://www.imdb.com/title/tt1630029/",
  },
];

//  Appel API OMDb
// =======================
async function searchMoviesFromAPI(title, year, type, page = 1) {
  if (!title) return []; 
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: title,
    page: page.toString(),
  });

  if (year) params.set("y", year);
  if (type) params.set("type", type);

  const url = `${API_URL}?${params.toString()}`;
  console.log("🔍 Fetch OMDb:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("✅ Réponse OMDb:", data);

    if (data.Response === "False") {
      console.warn("OMDb error:", data.Error);
      return [];
    }


    return data.Search.map((item) => ({
  id: item.imdbID,
  titre: item.Title,
  annee: item.Year,
  type: item.Type,
  poster: item.Poster && item.Poster !== "N/A" 
      ? item.Poster 
      : "img/nonposter.webp",

     url: `https://www.imdb.com/find?q=${encodeURIComponent(item.Title)}&s=tt,`
}));

  } catch (error) {
    console.error("Erreur fetch OMDb:", error);
    return [];
  }
}

//  Création d'une carte film

function createFilmCard(film) {
  const col = document.createElement("div");
  col.className = "col-12 col-md-4 col-lg-3";

  const posterHtml = film.poster
    ? `<img src="${film.poster}" alt="Affiche de ${film.titre}">`
    : "POSTER";

  col.innerHTML = `
    <article class="card film-card h-100">
      <a href="${film.url || "#"}" target="_blank" class="text-decoration-none text-dark">
        <div class="poster-placeholder">
          ${posterHtml}
        </div>
        <div class="card-body">
          <h3 class="h6 card-title mb-1">${film.titre}</h3>
          <p class="mb-0 small text-muted">Année : ${film.annee}</p>
          <p class="mb-0 small text-muted text-capitalize">Type : ${film.type}</p>
        </div>
      </a>
    </article>
  `;

  return col;
}

//  Affichage de la liste

function displayFilms(list) {
  if (!resultsRow) return;

  resultsRow.innerHTML = "";

  if (!list.length) {
    resultsRow.innerHTML = `
      <p class="text-center text-light fw-semibold mt-3">
        Aucun résultat trouvé. Essayez un autre titre.
      </p>
    `;
    return;
  }

  list.forEach((film) => {
    const card = createFilmCard(film);
    resultsRow.appendChild(card);
  });
}

displayFilms(localFilms);

// =======================
if (searchForm) {
  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const titleValue = titleInput.value.trim();
    const yearValue = yearInput.value.trim();
    const typeValue = typeSelect.value; 

    if (!titleValue) {
      displayFilms(localFilms);
      return;
    }

    const apiResults = await searchMoviesFromAPI(
      titleValue,
      yearValue,
      typeValue
    );

    displayFilms(apiResults);
  });
}

// =======================
//  Fin du script
// =======================
