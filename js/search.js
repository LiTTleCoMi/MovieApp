const imagesBasePath = "https://media.themoviedb.org/t/p/w440_and_h660_face";

function expandSearch() {
	let element = document.getElementById("search-bar");
	element.style.width = "40vw";
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
	const searchQuery = urlParams.get("search");
	const pageQuery = Math.max(1, Math.min(parseInt(urlParams.get("page")), 500));

	window.history.pushState({}, "", `?${searchQuery ? "search=" + encodeURIComponent(searchQuery) + "&" : ""}page=${!isNaN(pageQuery) ? pageQuery : 1}`);

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ4ZmEzMjQ5MjIxOGJkMzJjM2YxNTcyMmE0ZDhlOCIsIm5iZiI6MTc0MTE4OTU3NC45NTM5OTk4LCJzdWIiOiI2N2M4NzFjNjNkZTMwNDIxYjdjMmFhYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.j_9bXqqno92PGtQlqVgJOWOaDQ0Hjn6KSK26ksn9qhI",
		},
	};

	if (searchQuery) {
		fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=${!isNaN(pageQuery) ? pageQuery : 1}`, options)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				return res;
			})
			.then((res) => displayMovies(res, { search: searchQuery }))
			.catch((err) => console.error(err));
    } else {
		fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${!isNaN(pageQuery) ? pageQuery : 1}`, options)
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
	let element = document.getElementById("search-bar");
	const query = element.value.trim();
	if (query) {
		window.history.pushState({}, "", `?search=${encodeURIComponent(query)}&page=1`);
		performSearchFunction();
	}
}

function changePage(page) {
	const urlParams = new URLSearchParams(window.location.search);
	const searchQuery = urlParams.get("search");
	window.history.pushState({}, "", `?${searchQuery ? "search=" + encodeURIComponent(searchQuery) + "&" : ""}page=${page}`);
	performSearchFunction();
}

function customPageSelection(event) {
	event.preventDefault();
	const urlParams = new URLSearchParams(window.location.search);
	const searchQuery = urlParams.get("search");
	const input = document.getElementById("page-selector").querySelector("input");
	window.history.pushState({}, "", `?${searchQuery ? "search=" + encodeURIComponent(searchQuery) + "&" : ""}page=${parseInt(input.value)}`);

	performSearchFunction();
}

function displayPages(moviesObj) {
	let form = `
        <form onsubmit="customPageSelection(event)" class="flex justify-center items-center w-9 h-9 rounded-full hover:bg-blue-900">
            <input type="number" step="1" class="w-full text-center focus:outline-none" placeholder="..." />
        </form>`;

	const urlParams = new URLSearchParams(window.location.search);
	const searchQuery = urlParams.get("search");
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
	let element = document.getElementById("movies");
	let resultsText = document.getElementById("results-text");
	resultsText.innerText = `${search.search ? 'Results for: "' + search.search + '"' : search.category}`;
	element.innerHTML = "";
	if (moviesObj.results) {
		for (let movie of moviesObj.results) {
			element.innerHTML += `
            <div class="flex sm:flex-col justify-center items-center gap-y-4 gap-x-3 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22.5%] xl:w-[18%]">
                <div id="${movie.id}" style="background-image: url('${imagesBasePath}${movie.poster_path}')" class="flex flex-col justify-end items-center bg-cover bg-center w-full aspect-[2/3] rounded-4xl overflow-hidden group">
                    <div class="flex relative justify-end items-start w-full h-full p-3 group-hover:bg-black/50 transition-all duration-300">
                        <img class="w-2/10 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_add.svg" alt="save this movie" />
                        <img class="w-2/10 absolute opacity-0 hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_add_fill.svg" alt="save this movie" />
                        <img class="w-3/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/play_arrow.svg" alt="view movie details" />
                    </div>
                </div>
                <div class="flex w-[50%] sm:w-full flex-col gap-y-2">
                    <h3 class="text-2xl sm:text-4xl font-semibold">${movie.original_title}</h3>
                    <span class="text-sm sm:text-xl w-full">${movie.release_date}</span>
                </div>
            </div>`;
		}
	} else if (moviesObj.total_pages < moviesObj.page) {
		window.history.pushState({}, "", `?${searchQuery ? "search=" + encodeURIComponent(searchQuery) + "&" : ""}page=${Math.max(1, Math.min(moviesObj.total_pages, 500))}`);
		performSearchFunction();
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
