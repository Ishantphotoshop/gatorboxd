const STORAGE_KEY = "gameboxd-state-v1";

const seedGames = [
  {
    id: "hollow-knight",
    title: "Hollow Knight",
    studio: "Team Cherry",
    year: 2017,
    genres: ["Metroidvania", "Action"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox"],
    blurb: "A melancholy underground kingdom packed with elegant combat and secrets.",
    cover: "linear-gradient(135deg, #111827 0%, #3b82f6 48%, #f8fafc 100%)"
  },
  {
    id: "hades",
    title: "Hades",
    studio: "Supergiant Games",
    year: 2020,
    genres: ["Roguelike", "Action"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox"],
    blurb: "A stylish escape from the underworld where every failed run still moves the story.",
    cover: "linear-gradient(135deg, #1f1308 0%, #dc2626 48%, #f59e0b 100%)"
  },
  {
    id: "disco-elysium",
    title: "Disco Elysium",
    studio: "ZA/UM",
    year: 2019,
    genres: ["RPG", "Mystery"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox"],
    blurb: "A detective RPG about memory, politics, failure, and a very loud inner life.",
    cover: "linear-gradient(135deg, #27272a 0%, #ef4444 48%, #fde68a 100%)"
  },
  {
    id: "outer-wilds",
    title: "Outer Wilds",
    studio: "Mobius Digital",
    year: 2019,
    genres: ["Adventure", "Puzzle"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox"],
    blurb: "A clockwork solar system mystery where knowledge is the only progression.",
    cover: "linear-gradient(135deg, #020617 0%, #0ea5e9 42%, #fb923c 100%)"
  },
  {
    id: "zelda-tears",
    title: "Tears of the Kingdom",
    studio: "Nintendo",
    year: 2023,
    genres: ["Adventure", "Open World"],
    platforms: ["Switch"],
    blurb: "A huge toybox of sky islands, strange machines, and open-ended problem solving.",
    cover: "linear-gradient(135deg, #064e3b 0%, #22c55e 48%, #a7f3d0 100%)"
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    studio: "FromSoftware",
    year: 2022,
    genres: ["RPG", "Open World"],
    platforms: ["PC", "PlayStation", "Xbox"],
    blurb: "A grand, hostile fantasy world built for discovery, stubbornness, and awe.",
    cover: "linear-gradient(135deg, #18181b 0%, #a16207 48%, #facc15 100%)"
  },
  {
    id: "celeste",
    title: "Celeste",
    studio: "Maddy Makes Games",
    year: 2018,
    genres: ["Platformer", "Indie"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox"],
    blurb: "Precision platforming with a tender story about climbing through yourself.",
    cover: "linear-gradient(135deg, #1e1b4b 0%, #ec4899 46%, #bae6fd 100%)"
  },
  {
    id: "balatro",
    title: "Balatro",
    studio: "LocalThunk",
    year: 2024,
    genres: ["Deckbuilder", "Roguelike"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox", "Mobile"],
    blurb: "Poker hands mutate into strange engines of multiplying numbers and risk.",
    cover: "linear-gradient(135deg, #164e63 0%, #7c3aed 48%, #f43f5e 100%)"
  },
  {
    id: "minecraft",
    title: "Minecraft",
    studio: "Mojang Studios",
    year: 2011,
    genres: ["Sandbox", "Survival"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox", "Mobile"],
    blurb: "A blocky survival sandbox that turns wandering, building, and tinkering into ritual.",
    cover: "linear-gradient(135deg, #14532d 0%, #84cc16 48%, #a3e635 100%)"
  },
  {
    id: "stardew-valley",
    title: "Stardew Valley",
    studio: "ConcernedApe",
    year: 2016,
    genres: ["Simulation", "RPG"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox", "Mobile"],
    blurb: "A cozy farming life sim about routine, neighbors, caves, and one more day.",
    cover: "linear-gradient(135deg, #365314 0%, #eab308 45%, #38bdf8 100%)"
  }
];

const defaultState = {
  games: seedGames,
  logs: {
    "hades": {
      status: "played",
      rating: 4.5,
      hours: 62,
      favorite: true,
      review: "Fast, generous, and somehow still full of story after dozens of runs.",
      loggedAt: "2026-06-20"
    },
    "outer-wilds": {
      status: "played",
      rating: 5,
      hours: 24,
      favorite: true,
      review: "The rare game I wish I could forget just to play fresh again.",
      loggedAt: "2026-06-14"
    },
    "balatro": {
      status: "playing",
      rating: 4,
      hours: 18,
      favorite: false,
      review: "Dangerously clean. Every run says one more and means it.",
      loggedAt: "2026-06-21"
    },
    "elden-ring": {
      status: "backlog",
      rating: 0,
      hours: 0,
      favorite: false,
      review: "",
      loggedAt: "2026-06-12"
    }
  },
  view: "discover",
  filter: "all",
  genre: "All",
  search: "",
  sort: "recent",
  theme: "dark",
  apiKey: "",
  apiResults: [],
  apiError: "",
  apiMode: "popular",
  apiPage: 1,
  apiHasMore: false
};

let state = loadState();

const els = {
  navTabs: document.querySelectorAll(".nav-tab"),
  views: document.querySelectorAll(".view"),
  searchInput: document.querySelector("#searchInput"),
  gameGrid: document.querySelector("#gameGrid"),
  genreFilters: document.querySelector("#genreFilters"),
  segments: document.querySelectorAll(".segment"),
  libraryTable: document.querySelector("#libraryTable"),
  diaryList: document.querySelector("#diaryList"),
  listBoard: document.querySelector("#listBoard"),
  activityFeed: document.querySelector("#activityFeed"),
  apiResults: document.querySelector("#apiResults"),
  apiStatus: document.querySelector("#apiStatus"),
  apiSearchButton: document.querySelector("#apiSearchButton"),
  apiLoadMoreButton: document.querySelector("#apiLoadMoreButton"),
  apiModeSelect: document.querySelector("#apiModeSelect"),
  apiButton: document.querySelector("#apiButton"),
  apiDialog: document.querySelector("#apiDialog"),
  apiForm: document.querySelector("#apiForm"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
  sortSelect: document.querySelector("#sortSelect"),
  statPlayed: document.querySelector("#statPlayed"),
  statAvg: document.querySelector("#statAvg"),
  statBacklog: document.querySelector("#statBacklog"),
  profileSummary: document.querySelector("#profileSummary"),
  gameDialog: document.querySelector("#gameDialog"),
  gameForm: document.querySelector("#gameForm"),
  gameId: document.querySelector("#gameId"),
  modalTitle: document.querySelector("#modalTitle"),
  modalEyebrow: document.querySelector("#modalEyebrow"),
  statusInput: document.querySelector("#statusInput"),
  ratingInput: document.querySelector("#ratingInput"),
  ratingReadout: document.querySelector("#ratingReadout"),
  hoursInput: document.querySelector("#hoursInput"),
  favoriteInput: document.querySelector("#favoriteInput"),
  reviewInput: document.querySelector("#reviewInput"),
  deleteLogButton: document.querySelector("#deleteLogButton"),
  addGameButton: document.querySelector("#addGameButton"),
  customDialog: document.querySelector("#customDialog"),
  customForm: document.querySelector("#customForm"),
  customTitle: document.querySelector("#customTitle"),
  customStudio: document.querySelector("#customStudio"),
  customYear: document.querySelector("#customYear"),
  customGenres: document.querySelector("#customGenres"),
  customPlatforms: document.querySelector("#customPlatforms"),
  customBlurb: document.querySelector("#customBlurb"),
  themeToggle: document.querySelector("#themeToggle")
};

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultState);
  try {
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      games: mergeGames(parsed.games || []),
      logs: parsed.logs || {}
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function mergeGames(savedGames) {
  const byId = new Map(seedGames.map((game) => [game.id, game]));
  savedGames.forEach((game) => byId.set(game.id, game));
  return [...byId.values()];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setTheme() {
  document.documentElement.classList.toggle("light", state.theme === "light");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function getLog(gameId) {
  return state.logs[gameId];
}

function getGame(gameId) {
  return state.games.find((game) => game.id === gameId);
}

function ratingText(rating) {
  if (!rating) return "Unrated";
  return `${"★".repeat(Math.floor(rating))}${rating % 1 ? "½" : ""} ${rating.toFixed(1)}`;
}

function matchesActiveFilter(game) {
  const log = getLog(game.id);
  const haystack = [game.title, game.studio, game.year, ...game.genres, ...game.platforms].join(" ").toLowerCase();
  const searchMatch = haystack.includes(state.search.toLowerCase());
  const genreMatch = state.genre === "All" || game.genres.includes(state.genre);
  const filterMatch =
    state.filter === "all" ||
    (state.filter === "played" && log && ["played", "playing", "dropped"].includes(log.status)) ||
    (state.filter === "backlog" && log?.status === "backlog") ||
    (state.filter === "favorites" && log?.favorite);
  return searchMatch && genreMatch && filterMatch;
}

function render() {
  setTheme();
  renderNav();
  renderGenreFilters();
  renderGames();
  renderLibrary();
  renderDiary();
  renderLists();
  renderActivity();
  renderApiPanel();
  renderStats();
  saveState();
}

function renderNav() {
  els.navTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === state.view));
  els.views.forEach((view) => view.classList.toggle("active-view", view.id === `${state.view}View`));
  els.searchInput.value = state.search;
  els.sortSelect.value = state.sort;
  els.segments.forEach((segment) => segment.classList.toggle("active", segment.dataset.filter === state.filter));
  els.apiModeSelect.value = state.apiMode;
}

function renderGenreFilters() {
  const genres = ["All", ...new Set(state.games.flatMap((game) => game.genres))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return a.localeCompare(b);
  });
  els.genreFilters.innerHTML = genres
    .map((genre) => `<button class="chip ${genre === state.genre ? "active" : ""}" data-genre="${genre}" type="button">${genre}</button>`)
    .join("");
}

function renderGames() {
  const games = state.games.filter(matchesActiveFilter);
  if (!games.length) {
    els.gameGrid.innerHTML = `<div class="empty-state">No games match that search yet.</div>`;
    return;
  }

  els.gameGrid.innerHTML = games
    .map((game) => {
      const log = getLog(game.id);
      return `
        <article class="game-card">
          <div class="cover" style="--cover: ${game.cover}; --cover-image: ${game.image ? `url('${game.image}')` : "none"}">
            <span class="cover-studio">${game.studio}</span>
            <span class="cover-title">${game.title}</span>
          </div>
          <div class="game-body">
            <h3>${game.title}</h3>
            <div class="meta">${game.year} · ${game.genres.join(", ")}</div>
            <div class="rating-row">${ratingText(log?.rating || 0)}</div>
            <div class="card-actions">
              <button class="primary-button" data-log="${game.id}" type="button">${log ? "Edit log" : "Log"}</button>
              <button class="icon-button favorite-dot" data-fav="${game.id}" type="button" title="Favorite" aria-label="Favorite">${log?.favorite ? "★" : "☆"}</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderApiPanel() {
  const hasKey = Boolean(state.apiKey);
  els.apiStatus.textContent = state.apiError || (hasKey ? "Connected. Browse popular games, new releases, top rated, or search." : "Add a RAWG API key to browse popular games.");
  els.apiResults.innerHTML = state.apiResults
    .map((game) => `
      <article class="api-result">
        <div class="api-thumb" style="--cover: ${game.cover}; background-image: ${game.image ? `url('${game.image}')` : "var(--cover)"}"></div>
        <div>
          <h3>${game.title}</h3>
          <p>${game.year || "Unknown year"} · ${game.genres.join(", ") || "Unsorted"}${game.rawgRating ? ` · RAWG ${game.rawgRating}` : ""}</p>
          <button class="primary-button" data-import="${game.id}" type="button">Import</button>
        </div>
      </article>
    `)
    .join("");
  els.apiLoadMoreButton.hidden = !state.apiHasMore || !state.apiResults.length;
}

function loggedGames() {
  return Object.entries(state.logs)
    .map(([id, log]) => ({ game: getGame(id), log }))
    .filter((entry) => entry.game);
}

function renderLibrary() {
  const rows = loggedGames().sort((a, b) => {
    if (state.sort === "rating") return (b.log.rating || 0) - (a.log.rating || 0);
    if (state.sort === "title") return a.game.title.localeCompare(b.game.title);
    if (state.sort === "hours") return (b.log.hours || 0) - (a.log.hours || 0);
    return (b.log.loggedAt || "").localeCompare(a.log.loggedAt || "");
  });

  if (!rows.length) {
    els.libraryTable.innerHTML = `<div class="empty-state">Your library is empty. Log a game from Discover to start it.</div>`;
    return;
  }

  els.libraryTable.innerHTML = rows
    .map(({ game, log }) => `
      <article class="library-row">
        <div class="library-title">
          <strong>${game.title}</strong>
          <span class="muted">${game.studio} · ${game.platforms.join(", ")}</span>
        </div>
        <span class="status-pill">${log.status}</span>
        <strong>${ratingText(log.rating)}</strong>
        <span>${log.hours || 0}h</span>
        <button class="ghost-button" data-log="${game.id}" type="button">Edit</button>
      </article>
    `)
    .join("");
}

function renderDiary() {
  const entries = loggedGames()
    .filter(({ log }) => log.review || log.rating || log.hours)
    .sort((a, b) => (b.log.loggedAt || "").localeCompare(a.log.loggedAt || ""));

  if (!entries.length) {
    els.diaryList.innerHTML = `<div class="empty-state">Reviews and ratings will appear here as a diary.</div>`;
    return;
  }

  els.diaryList.innerHTML = entries
    .map(({ game, log }) => `
      <article class="timeline-item">
        <time>${formatDate(log.loggedAt)}</time>
        <div>
          <h3>${game.title}</h3>
          <div class="rating-row">${ratingText(log.rating)}</div>
          <p>${log.review || "No written review yet."}</p>
        </div>
        <button class="ghost-button" data-log="${game.id}" type="button">Edit</button>
      </article>
    `)
    .join("");
}

function renderLists() {
  const favorites = loggedGames().filter(({ log }) => log.favorite);
  const highRated = loggedGames().filter(({ log }) => log.rating >= 4).sort((a, b) => b.log.rating - a.log.rating);
  const backlog = loggedGames().filter(({ log }) => log.status === "backlog");
  const lists = [
    ["Favorites", favorites],
    ["Four stars and up", highRated],
    ["Backlog queue", backlog]
  ];

  els.listBoard.innerHTML = lists
    .map(([title, entries]) => `
      <article class="list-card">
        <h3>${title}</h3>
        <p class="muted">${entries.length ? `${entries.length} games` : "Nothing here yet"}</p>
        <ol>
          ${entries.slice(0, 6).map(({ game }) => `<li>${game.title}</li>`).join("") || "<li>Add games to build this list.</li>"}
        </ol>
      </article>
    `)
    .join("");
}

function renderActivity() {
  const entries = loggedGames()
    .filter(({ log }) => log.review || log.rating || log.favorite)
    .sort((a, b) => (b.log.loggedAt || "").localeCompare(a.log.loggedAt || ""))
    .slice(0, 8);

  if (!entries.length) {
    els.activityFeed.innerHTML = `<div class="empty-state">Your rating, review, and favorite activity will show up here.</div>`;
    return;
  }

  els.activityFeed.innerHTML = entries
    .map(({ game, log }) => {
      const action = log.favorite ? "favorited" : log.review ? "reviewed" : "rated";
      return `
        <article class="activity-item">
          <div class="activity-avatar">IK</div>
          <div>
            <h3>You ${action} ${game.title}</h3>
            <p class="muted">${ratingText(log.rating)}${log.review ? ` · ${log.review}` : ""}</p>
          </div>
          <time class="muted">${formatDate(log.loggedAt)}</time>
        </article>
      `;
    })
    .join("");
}

function renderStats() {
  const entries = loggedGames();
  const played = entries.filter(({ log }) => ["played", "playing", "dropped"].includes(log.status));
  const rated = entries.filter(({ log }) => log.rating > 0);
  const avg = rated.length ? rated.reduce((sum, { log }) => sum + log.rating, 0) / rated.length : 0;
  const backlog = entries.filter(({ log }) => log.status === "backlog");

  els.statPlayed.textContent = played.length;
  els.statAvg.textContent = avg ? avg.toFixed(1) : "-";
  els.statBacklog.textContent = backlog.length;
  els.profileSummary.textContent = entries.length ? `${entries.length} logged · ${totalHours(entries)} hours` : "No games logged yet";
}

function totalHours(entries) {
  return entries.reduce((sum, { log }) => sum + Number(log.hours || 0), 0);
}

function formatDate(value) {
  if (!value) return "Undated";
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function openLogDialog(gameId) {
  const game = getGame(gameId);
  const log = getLog(gameId) || {
    status: "played",
    rating: 0,
    hours: 0,
    favorite: false,
    review: "",
    loggedAt: today()
  };
  els.gameId.value = gameId;
  els.modalTitle.textContent = game.title;
  els.modalEyebrow.textContent = getLog(gameId) ? "Edit log" : "Log game";
  els.statusInput.value = log.status;
  els.ratingInput.value = log.rating || 0;
  els.hoursInput.value = log.hours || 0;
  els.favoriteInput.checked = Boolean(log.favorite);
  els.reviewInput.value = log.review || "";
  els.deleteLogButton.hidden = !getLog(gameId);
  updateRatingReadout();
  els.gameDialog.showModal();
}

function updateRatingReadout() {
  els.ratingReadout.textContent = ratingText(Number(els.ratingInput.value));
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitList(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function bindEvents() {
  els.navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.view = tab.dataset.view;
      render();
    });
  });

  els.segments.forEach((segment) => {
    segment.addEventListener("click", () => {
      state.filter = segment.dataset.filter;
      render();
    });
  });

  els.genreFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-genre]");
    if (!button) return;
    state.genre = button.dataset.genre;
    render();
  });

  document.body.addEventListener("click", (event) => {
    const logButton = event.target.closest("[data-log]");
    const favButton = event.target.closest("[data-fav]");
    const importButton = event.target.closest("[data-import]");
    if (logButton) openLogDialog(logButton.dataset.log);
    if (favButton) toggleFavorite(favButton.dataset.fav);
    if (importButton) importApiGame(importButton.dataset.import);
  });

  els.searchInput.addEventListener("input", () => {
    state.search = els.searchInput.value;
    render();
  });

  els.sortSelect.addEventListener("change", () => {
    state.sort = els.sortSelect.value;
    render();
  });

  els.ratingInput.addEventListener("input", updateRatingReadout);

  els.gameForm.addEventListener("submit", (event) => {
    if (event.submitter?.value === "cancel") return;
    const id = els.gameId.value;
    state.logs[id] = {
      status: els.statusInput.value,
      rating: Number(els.ratingInput.value),
      hours: Number(els.hoursInput.value || 0),
      favorite: els.favoriteInput.checked,
      review: els.reviewInput.value.trim(),
      loggedAt: getLog(id)?.loggedAt || today()
    };
    render();
  });

  els.deleteLogButton.addEventListener("click", () => {
    delete state.logs[els.gameId.value];
    els.gameDialog.close();
    render();
  });

  els.addGameButton.addEventListener("click", () => {
    els.customForm.reset();
    els.customYear.value = new Date().getFullYear();
    els.customDialog.showModal();
  });

  els.apiButton.addEventListener("click", () => {
    els.apiKeyInput.value = state.apiKey;
    els.apiDialog.showModal();
  });

  els.apiForm.addEventListener("submit", (event) => {
    if (event.submitter?.value === "cancel") return;
    state.apiKey = els.apiKeyInput.value.trim();
    state.apiError = "";
    state.apiResults = [];
    state.apiPage = 1;
    render();
    if (state.apiKey) searchRawg();
  });

  els.apiModeSelect.addEventListener("change", () => {
    state.apiMode = els.apiModeSelect.value;
    state.apiResults = [];
    state.apiPage = 1;
    render();
  });

  els.apiSearchButton.addEventListener("click", () => searchRawg(false));
  els.apiLoadMoreButton.addEventListener("click", () => searchRawg(true));

  els.customForm.addEventListener("submit", (event) => {
    if (event.submitter?.value === "cancel") return;
    const title = els.customTitle.value.trim();
    const idBase = slugify(title) || `game-${Date.now()}`;
    const id = state.games.some((game) => game.id === idBase) ? `${idBase}-${Date.now()}` : idBase;
    state.games.push({
      id,
      title,
      studio: els.customStudio.value.trim(),
      year: Number(els.customYear.value),
      genres: splitList(els.customGenres.value || "Unsorted"),
      platforms: splitList(els.customPlatforms.value || "Unknown"),
      blurb: els.customBlurb.value.trim(),
      cover: randomCover()
    });
    state.view = "discover";
    render();
  });

  els.themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    render();
  });
}

async function searchRawg(loadMore = false) {
  if (!state.apiKey) {
    els.apiKeyInput.value = "";
    els.apiDialog.showModal();
    return;
  }

  const query = state.search.trim();
  state.apiPage = loadMore ? state.apiPage + 1 : 1;
  state.apiError = loadMore ? "Loading more games..." : "Loading RAWG games...";
  render();

  try {
    const params = buildRawgParams(query);
    const response = await fetch(`https://api.rawg.io/api/games?${params.toString()}`);
    if (!response.ok) throw new Error("RAWG request failed");
    const data = await response.json();
    const nextResults = (data.results || []).map(mapRawgGame);
    state.apiResults = loadMore ? [...state.apiResults, ...nextResults] : nextResults;
    state.apiHasMore = Boolean(data.next);
    state.apiError = state.apiResults.length ? "" : "No RAWG results found.";
  } catch {
    state.apiError = "RAWG did not respond. Check the key or try again later.";
    if (loadMore) state.apiPage = Math.max(1, state.apiPage - 1);
  }

  render();
}

function buildRawgParams(query) {
  const params = new URLSearchParams({
    key: state.apiKey,
    page_size: "24",
    page: String(state.apiPage)
  });

  if (state.apiMode === "search") {
    params.set("search", query || "grand theft auto");
    params.set("ordering", "-added");
    return params;
  }

  if (state.apiMode === "new") {
    params.set("dates", `${new Date().getFullYear() - 1}-01-01,${new Date().getFullYear()}-12-31`);
    params.set("ordering", "-released");
    return params;
  }

  if (state.apiMode === "top") {
    params.set("ordering", "-metacritic");
    return params;
  }

  params.set("ordering", "-added");
  return params;
}

function mapRawgGame(item) {
  const genres = (item.genres || []).map((genre) => genre.name).filter(Boolean);
  const platforms = (item.platforms || []).map((entry) => entry.platform?.name).filter(Boolean);
  const year = item.released ? Number(item.released.slice(0, 4)) : "";
  return {
    id: `rawg-${item.id}`,
    title: item.name,
    studio: "RAWG",
    year,
    genres: genres.length ? genres : ["Unsorted"],
    platforms: platforms.length ? platforms.slice(0, 5) : ["Unknown"],
    blurb: `Imported from RAWG. Metacritic: ${item.metacritic || "n/a"}.`,
    cover: randomCover(),
    image: item.background_image || "",
    rawgRating: item.rating || ""
  };
}

function importApiGame(gameId) {
  const game = state.apiResults.find((entry) => entry.id === gameId);
  if (!game) return;
  if (!state.games.some((entry) => entry.id === game.id)) {
    state.games.unshift(game);
  }
  state.genre = "All";
  state.filter = "all";
  state.search = game.title;
  state.apiResults = [];
  state.apiError = `${game.title} imported.`;
  render();
}

function toggleFavorite(gameId) {
  const current = getLog(gameId) || {
    status: "played",
    rating: 0,
    hours: 0,
    review: "",
    loggedAt: today()
  };
  state.logs[gameId] = { ...current, favorite: !current.favorite };
  render();
}

function randomCover() {
  const covers = [
    "linear-gradient(135deg, #172554 0%, #06b6d4 48%, #fef08a 100%)",
    "linear-gradient(135deg, #3f1d1d 0%, #fb7185 48%, #fed7aa 100%)",
    "linear-gradient(135deg, #022c22 0%, #14b8a6 48%, #bef264 100%)",
    "linear-gradient(135deg, #312e81 0%, #8b5cf6 48%, #f0abfc 100%)",
    "linear-gradient(135deg, #1c1917 0%, #78716c 48%, #fde68a 100%)"
  ];
  return covers[Math.floor(Math.random() * covers.length)];
}

bindEvents();
render();
