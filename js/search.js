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
	const pageQuery = urlParams.get("page");

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ4ZmEzMjQ5MjIxOGJkMzJjM2YxNTcyMmE0ZDhlOCIsIm5iZiI6MTc0MTE4OTU3NC45NTM5OTk4LCJzdWIiOiI2N2M4NzFjNjNkZTMwNDIxYjdjMmFhYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.j_9bXqqno92PGtQlqVgJOWOaDQ0Hjn6KSK26ksn9qhI",
		},
	};

	if (searchQuery) {
		fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=${pageQuery}`, options)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				return res;
			})
			.then((res) => displayMovies(res, { search: searchQuery }))
			.catch((err) => console.error(err));
	} else {
		fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
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
	console.log("ran");
	let element = document.getElementById("search-bar");
	const query = element.value.trim();
	if (query) {
		window.history.pushState({}, "", `?search=${encodeURIComponent(query)}&page=1`);
		performSearchFunction();
	}
}

function displayPages(moviesObj) {
	const urlParams = new URLSearchParams(window.location.search);
	const searchQuery = urlParams.get("search");
	const pageQuery = urlParams.get("page");

	const totalPages = moviesObj.total_pages;
	let currentPage = parseInt(pageQuery)
	document.getElementById("page-selector");
	if (totalPages > 5) {

	} else {

	}
}

function displayMovies(moviesObj, search = null) {
	let element = document.getElementById("movies");
	let imagesBasePath = "https://media.themoviedb.org/t/p/w440_and_h660_face";
	let resultsText = document.getElementById("results-text");
	resultsText.innerText = `${search.search ? 'Results for: "' + search.search + '"' : search.category}`;
	element.innerHTML = "";
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
	displayPages(moviesObj);
}
// adult: false;
// backdrop_path: "/bfh9Z3Ghz4FOJAfLOAhmc3ccnHU.jpg";
// genre_ids: (2)[(12, 14)];
// id: 671;
// original_language: "en";
// original_title: "Harry Potter and the Philosopher's Stone";
// overview: "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.";
// popularity: 156.762;
// poster_path: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg";
// release_date: "2001-11-16";
// title: "Harry Potter and the Philosopher's Stone";
// video: false;
// vote_average: 7.903;
// vote_count: 27962;

(() => {
	performSearchFunction();
})();
