const imagesBasePath = "https://media.themoviedb.org/t/p/w440_and_h660_face";
var allSavedMovies = [];
const languageCodes = {
	English: "en",
	Spanish: "es",
	French: "fr",
	German: "de",
	Italian: "it",
	Portuguese: "pt",
	Dutch: "nl",
	Russian: "ru",
	Chinese: "zh",
	Japanese: "ja",
	Korean: "ko",
	Arabic: "ar",
	Hindi: "hi",
	Greek: "el",
	Hebrew: "he",
	Turkish: "tr",
	Polish: "pl",
	Swedish: "sv",
	Danish: "da",
	Finnish: "fi",
	Thai: "th",
	Vietnamese: "vi",
};

function toggleMenu() {
	const menuButtonElement = document.getElementById("menu");
	const menuElement = document.getElementById("menu-drop-down");
	if (!menuElement.innerHTML.trim()) {
		menuElement.innerHTML = `
            <div class="h-fit flex flex-col items-start bg-blue-950 rounded-b-2xl overflow-hidden text-xl">
                <a class="w-full" href="library.html">
                    <button class="hover:bg-black/20 hover:cursor-pointer w-full px-3 py-2 text-left">Favorites</button>
                </a>
                <div class="flex justify-center items-center hover:bg-black/20 w-full px-3 py-2 text-left">
                    <button onclick="toggleLangSelect()" class="cursor-pointer">Language</button>
                    <img onclick="toggleLangSelect()" class="svg" src="../svg/arrow_drop_down.svg" />
                </div>
            </div>
            <div id="menu-drop-down-x2" class="z-100 rounded-b-2xl bg-blue-950 overflow-hidden"></div>`;
	} else {
		menuElement.innerHTML = "";
	}

	function handleBlur(event) {
		const menuElementChildren = Array.from(menuElement.children);
		console.log(menuElementChildren);

		if (menuButtonElement.contains(event.target)) {
			document.removeEventListener("mousedown", handleBlur);
        } else {
            let contains = false;
            for (let child of menuElementChildren) {
                if (child.contains(event.target)) {
                    contains = true;
                    break;
                }
            }
            if (!contains) {
				menuElement.innerHTML = "";
				document.removeEventListener("mousedown", handleBlur);
			}
		}
	}
	document.addEventListener("mousedown", handleBlur);
}

function toggleLangSelect() {
	const langSelectContainer = document.getElementById("menu-drop-down-x2");
	let langSelect = langSelectContainer.querySelector("#language-selection");
	if (!langSelect) {
		langSelectContainer.innerHTML = `
            <div id="language-selection" class="h-[30vh] flex flex-col items-start overflow-x-hidden overflow-y-auto text-lg">
            </div>`;
		let langSelect = langSelectContainer.querySelector("#language-selection");
		Object.entries(languageCodes).forEach(([language, abbreviation]) => {
			langSelect.innerHTML += `<button onclick="switchLang('${abbreviation}')" class="w-full px-2 py-1 hover:bg-black/20 hover:cursor-pointer">${language}</button>`;
		});
	} else {
		langSelectContainer.innerHTML = "";
	}
}

function switchLang(lang) {
	const urlParams = new URLSearchParams(window.location.search);
	const searchQuery = urlParams.get("search");
	const pageQuery = urlParams.get("page");

	window.history.pushState({}, "", `?language=${lang}${searchQuery ? "&search=" + encodeURIComponent(searchQuery) : ""}&page=${pageQuery}`);

	performSearchFunction();
}

function expandSearch() {
	let element = document.getElementById("search-bar");
	element.style.width = "50vw";
	element.style.paddingLeft = "10px";
	element.focus();
}
function shrinkSearch() {
	let element = document.getElementById("search-bar");
	element.style.width = "0px";
	element.style.paddingLeft = "0px";
}

function performSearchFunction() {
	const urlParams = new URLSearchParams(window.location.search);

	// validate search query
	const searchQuery = urlParams.get("search");

	// validate page query
	let page = Math.max(1, Math.min(parseInt(urlParams.get("page")), 500));
	const pageQuery = !isNaN(page) ? page : 1;

	// validate language query
	let language = urlParams.get("language");
	let languageQuery = "";
	Object.values(languageCodes).forEach((languageCode) => {
		if (language === languageCode) {
			languageQuery = language;
		}
	});
	if (!languageQuery) {
		languageQuery = "en";
	}

	window.history.pushState({}, "", `?language=${languageQuery}${searchQuery ? "&search=" + encodeURIComponent(searchQuery) : ""}&page=${pageQuery}`);

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ4ZmEzMjQ5MjIxOGJkMzJjM2YxNTcyMmE0ZDhlOCIsIm5iZiI6MTc0MTE4OTU3NC45NTM5OTk4LCJzdWIiOiI2N2M4NzFjNjNkZTMwNDIxYjdjMmFhYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.j_9bXqqno92PGtQlqVgJOWOaDQ0Hjn6KSK26ksn9qhI",
		},
	};

	if (searchQuery) {
		fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=${languageQuery}&page=${pageQuery}`, options)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				return res;
			})
			.then((res) => displayMovies(res, { search: searchQuery }))
			.catch((err) => console.error(err));
	} else {
		fetch(`https://api.themoviedb.org/3/movie/popular?language=${languageQuery}&page=${pageQuery}`, options)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				return res;
			})
			.then((res) => displayMovies(res, { category: "Most Popular" }))
			.catch((err) => console.error(err));
	}
}

function performSearch(event) {
	event.preventDefault();
	const urlParams = new URLSearchParams(window.location.search);
	const languageQuery = urlParams.get("language");
	const searchQuery = document.getElementById("search-bar").value.trim();
	if (searchQuery) {
		window.history.pushState({}, "", `?language=${languageQuery}&search=${encodeURIComponent(searchQuery)}&page=1`);
		performSearchFunction();
	}
}

function changePage(page) {
	const urlParams = new URLSearchParams(window.location.search);
	const searchQuery = urlParams.get("search");
	const languageQuery = urlParams.get("language");
	window.history.pushState({}, "", `?language=${languageQuery}${searchQuery ? "&search=" + encodeURIComponent(searchQuery) : ""}&page=${page}`);
	performSearchFunction();
}

function customPageSelection(event) {
	event.preventDefault();
	const urlParams = new URLSearchParams(window.location.search);
	const languageQuery = urlParams.get("language");
	const searchQuery = urlParams.get("search");
	const page = parseInt(document.getElementById("page-selector").querySelector("input").value);
	window.history.pushState({}, "", `?language=${languageQuery}${searchQuery ? "&search=" + encodeURIComponent(searchQuery) : ""}&page=${page}`);

	performSearchFunction();
}

function displayPages(moviesObj) {
	let form = `
        <form onsubmit="customPageSelection(event)" class="flex justify-center items-center w-9 h-9 rounded-full hover:bg-blue-900">
            <input type="number" step="1" class="w-full text-center focus:outline-none" placeholder="..." />
        </form>`;

	const totalPages = Math.max(1, Math.min(moviesObj.total_pages, 500));
	const currentPage = moviesObj.page;

	let pageElement = document.getElementById("page-selector");
	pageElement.innerHTML = "";
	if (totalPages > 6) {
		pageElement.innerHTML += `
			<button onclick="changePage(${1})" class="${1 === currentPage ? "" : "hover:"}bg-blue-900 w-9 h-9 rounded-full flex justify-center items-center transition-colors duration-300">
				${1}
			</button>`;
		if (currentPage < totalPages - 2) {
			if (currentPage !== 1) {
				pageElement.innerHTML += `
					<button onclick="changePage(${currentPage})" class="bg-blue-900 w-9 h-9 rounded-full flex justify-center items-center transition-colors duration-300">
						${currentPage}
					</button>`;
			}
			pageElement.innerHTML += `
				<button onclick="changePage(${currentPage + 1})" class="hover:bg-blue-900 w-9 h-9 rounded-full flex justify-center items-center transition-colors duration-300">
					${currentPage + 1}
				</button>`;
			if (currentPage === 1) {
				pageElement.innerHTML += `
				<button onclick="changePage(${currentPage + 2})" class="hover:bg-blue-900 w-9 h-9 rounded-full flex justify-center items-center transition-colors duration-300">
					${currentPage + 2}
				</button>`;
			}
			pageElement.innerHTML += form;
		} else {
			pageElement.innerHTML += form;
			for (let i = totalPages - 2; i < totalPages; i++) {
				pageElement.innerHTML += `
					<button onclick="changePage(${i})" class="${i === currentPage ? "" : "hover:"}bg-blue-900 w-9 h-9 rounded-full flex justify-center items-center transition-colors duration-300">
						${i}
					</button>`;
			}
		}
		pageElement.innerHTML += `
			<button onclick="changePage(${totalPages})" class="${totalPages === currentPage ? "" : "hover:"}bg-blue-900 w-9 h-9 rounded-full flex justify-center items-center transition-colors duration-300">
				${totalPages}
			</button>`;
	} else {
		for (let i = 1; i <= totalPages; i++)
			pageElement.innerHTML += `
		<button onclick="changePage(${i})" class="${i === currentPage ? "" : "hover:"}bg-blue-900 w-9 h-9 rounded-full flex justify-center items-center transition-colors duration-300">
			${i}
		</button>`;
	}
}

function displayMovies(moviesObj, search = null) {
	const urlParams = new URLSearchParams(window.location.search);
	const languageQuery = urlParams.get("language");

	let element = document.getElementById("movies");
	let resultsText = document.getElementById("results-text");
	resultsText.innerText = `${search.search ? 'Results for: "' + decodeURIComponent(search.search) + '"' : search.category}`;
	element.innerHTML = "";
	if (moviesObj.results) {
		for (let movie of moviesObj.results) {
			if (movie.original_language === languageQuery || true) {
				element.innerHTML += `
				<div class="flex sm:flex-col justify-center items-center gap-y-4 gap-x-3 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22.5%] xl:w-[18%]">
					<div id="${movie.id}" style="background-image: url('${imagesBasePath}${movie.poster_path}')" class="flex flex-col justify-end items-center bg-cover bg-center w-full aspect-[2/3] rounded-4xl overflow-hidden group">
						<div class="flex relative justify-end items-start w-full h-full p-3 group-hover:bg-black/50 transition-all duration-300">
							<img class="svg w-2/10 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_add.svg" alt="save this movie" />
							<img onclick="saveMovie(${movie.id}, '${encodeURIComponent(movie.original_title).replace(/'/g, "%27")}', '${movie.release_date}', '${movie.poster_path}')" class="svg w-2/10 absolute opacity-0 hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_remove_fill.svg" alt="save this movie" />
							<img class="svg w-3/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/play_arrow.svg" alt="view movie details" />
						</div>
					</div>
					<div class="flex flex-col text-center w-[50%] sm:w-full gap-y-2">
						<h3 class="text-2xl sm:text-4xl font-semibold">${movie.original_title}</h3>
						<span class="text-sm sm:text-xl w-full">${movie.release_date}</span>
					</div>
				</div>`;
			}

			let iconsContainer = document.getElementById(`${movie.id}`)?.querySelector("div");
			const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
			if (savedMovies.some((mov) => mov.id === movie.id)) {
				iconsContainer.innerHTML = `
                        <img class="w-2/10 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_remove_fill.svg" alt="save this movie" />
                        <img onclick="unsaveMovie(${movie.id}, '${encodeURIComponent(movie.original_title).replace(/'/g, "%27")}', '${movie.release_date}', '${movie.poster_path}')" class="w-2/10 absolute opacity-0 transition-opacity duration-300" src="../svg/bookmark_add.svg" alt="save this movie" />
                        <img class="w-3/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/play_arrow.svg" alt="view movie details" />
                    `;
			}
		}
	} else {
		element.innerHTML = "<div class='font-bold text-6xl'>No Results</div>";
	}
	displayPages(moviesObj);
}

(() => {
	performSearchFunction();
	window.addEventListener("popstate", () => {
		performSearchFunction();
	});
})();

function saveMovie(id, original_title, release_date, poster_path) {
	original_title = decodeURIComponent(original_title);
	// Update the save icon
	let iconsContainer = document.getElementById(`${id}`).querySelector("div");

	iconsContainer.innerHTML = `
		<img class="w-2/10 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_remove_fill.svg" alt="save this movie" />
		<img onclick="unsaveMovie(${id}, '${encodeURIComponent(original_title).replace(/'/g, "%27")}', '${release_date}', '${poster_path}')" class="w-2/10 absolute opacity-0 transition-opacity duration-300" src="../svg/bookmark_add.svg" alt="save this movie" />
		<img class="w-3/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/play_arrow.svg" alt="view movie details" />
	`;

	const movie = {
		id: id,
		title: original_title,
		date: release_date,
		poster: poster_path,
		time_saved: Date.now(),
	};
	let savedMovies = localStorage.getItem("savedMovies");
	savedMovies = savedMovies ? JSON.parse(savedMovies) : [];
	savedMovies.push(movie);
	localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

	console.log(JSON.parse(localStorage.getItem("savedMovies")));
}

function unsaveMovie(id, original_title, release_date, poster_path) {
	original_title = decodeURIComponent(original_title);
	// Update the save icon
	let iconsContainer = document.getElementById(`${id}`).querySelector("div");

	iconsContainer.innerHTML = `
		<img class="w-2/10 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_add.svg" alt="save this movie" />
		<img onclick="saveMovie(${id}, '${encodeURIComponent(original_title).replace(/'/g, "%27")}', '${release_date}', '${poster_path}')" class="w-2/10 absolute opacity-0 hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_remove_fill.svg" alt="save this movie" />
		<img class="w-3/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/play_arrow.svg" alt="view movie details" />
	`;

	let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
	if (savedMovies) {
		savedMovies = savedMovies.filter((movie) => {
			return movie.id !== id;
		});
	}
	localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
	console.log(JSON.parse(localStorage.getItem("savedMovies")));
}
