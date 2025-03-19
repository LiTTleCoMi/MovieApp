// {
//   "adult": false,
//   "backdrop_path": "/bfh9Z3Ghz4FOJAfLOAhmc3ccnHU.jpg",
//   "belongs_to_collection": {
//     "id": 1241,
//     "name": "Harry Potter Collection",
//     "poster_path": "/s4hXqX1VyWMc2ctJRuNBDB7YNJ3.jpg",
//     "backdrop_path": "/kmEsQL2vOTA0jnM28fXS45Ky8kX.jpg"
//   },
//   "budget": 125000000,
//   "genres": [
//     {
//       "id": 12,
//       "name": "Adventure"
//     },
//     {
//       "id": 14,
//       "name": "Fantasy"
//     }
//   ],
//   "homepage": "https://www.warnerbros.com/movies/harry-potter-and-sorcerers-stone/",
//   "id": 671,
//   "imdb_id": "tt0241527",
//   "origin_country": [
//     "GB"
//   ],
//   "original_language": "en",
//   "original_title": "Harry Potter and the Philosopher's Stone",
//   "overview": "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.",
//   "popularity": 4.047,
//   "poster_path": "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
//   "production_companies": [
//     {
//       "id": 174,
//       "logo_path": "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
//       "name": "Warner Bros. Pictures",
//       "origin_country": "US"
//     },
//     {
//       "id": 437,
//       "logo_path": "/nu20mtwbEIhUNnQ5NXVhHsNknZj.png",
//       "name": "Heyday Films",
//       "origin_country": "GB"
//     },
//     {
//       "id": 436,
//       "logo_path": "/A7WCkG3F0NFvjGCwUnclpGdIu9E.png",
//       "name": "1492 Pictures",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "GB",
//       "name": "United Kingdom"
//     },
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "2001-11-16",
//   "revenue": 976475550,
//   "runtime": 152,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "Let the magic begin.",
//   "title": "Harry Potter and the Philosopher's Stone",
//   "video": false,
//   "vote_average": 7.902,
//   "vote_count": 28013
// }

async function getMovieInfo(idQuery = null) {
	const urlParams = new URLSearchParams(window.location.search);
	const languageQuery = urlParams.get("language") || "en";

	if (idQuery) {
        window.history.pushState({}, "", `movie.html?language=${languageQuery}&id=${idQuery}`);
        window.location.reload();
	} else {
		idQuery = urlParams.get("id");
	}

	const [details, credits] = await Promise.all([getMovieDetails(idQuery, languageQuery), getMovieCredits(idQuery, languageQuery)]);

	displayMovieDetails(details, credits);
}

async function getMovieDetails(idQuery, languageQuery) {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ4ZmEzMjQ5MjIxOGJkMzJjM2YxNTcyMmE0ZDhlOCIsIm5iZiI6MTc0MTE4OTU3NC45NTM5OTk4LCJzdWIiOiI2N2M4NzFjNjNkZTMwNDIxYjdjMmFhYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.j_9bXqqno92PGtQlqVgJOWOaDQ0Hjn6KSK26ksn9qhI",
		},
	};

	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${idQuery}?language=${languageQuery}`, options);
		const data = res.json();
		return data;
	} catch (err) {
		console.error(err);
		return;
	}
}

async function getMovieCredits(idQuery, languageQuery) {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ4ZmEzMjQ5MjIxOGJkMzJjM2YxNTcyMmE0ZDhlOCIsIm5iZiI6MTc0MTE4OTU3NC45NTM5OTk4LCJzdWIiOiI2N2M4NzFjNjNkZTMwNDIxYjdjMmFhYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.j_9bXqqno92PGtQlqVgJOWOaDQ0Hjn6KSK26ksn9qhI",
		},
	};

	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${idQuery}/credits?language=${languageQuery}`, options);
		const data = await res.json();
		return data;
	} catch (err) {
		console.error(err);
		return { cast: [] };
	}
}

function displayMovieDetails (resDetails, resCredits) {
    console.log(resDetails);
    console.log(resCredits);
	const main = document.querySelector("main");
	main.innerHTML = `
        <div id="menu-drop-down" class="absolute top-0 right-0 flex"></div>
        <div style="background-image: url('${imagesBasePath}${resDetails.backdrop_path ? resDetails.backdrop_path : resDetails.poster_path}')" class="bg-center bg-cover w-full h-full">
            <div class="flex flex-col justify-center items-center h-full w-full gap-y-10 p-10 bg-radial from-black/70 from-50% to-black/40">
                <h2 class="text-4xl font-semibold text-center">${resDetails.title}</h2>
                <div class="flex flex-col md:flex-row justify-center items-center gap-x-15 gap-y-10 w-full max-w-5xl">
                    <div style="background-image: url('${imagesBasePath}${resDetails.poster_path}')" class="flex flex-col justify-end items-center bg-cover bg-center shrink-0 w-[17rem] sm:w-[18rem] lg:w-[19rem] xl:w-[20rem] aspect-[2/3] rounded-2xl overflow-hidden border border-zinc-500"></div>
                    <div class="flex flex-col gap-y-5 text-lg">
                        <h5 class="text-xl font-semibold text-center md:text-left">${resDetails.tagline}</h5>
                        <p>${resDetails.overview}</p>
                        <div class="flex flex-col min-w-fit w-full">
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Released:</span>
                                <span class="w-full">${resDetails.release_date}</span>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Genres:</span>
                                <span class="w-full">${resDetails.genres.map((genre) => genre.name).join(", ")}</span>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Runtime:</span>
                                <div class="w-full flex items-center gap-x-1">
                                    <img class="w-[20px]" src="../svg/clock.svg" alt="clock" />
                                    <span>${resDetails?.runtime ? resDetails.runtime : "Unknown"}m</span>
                                </div>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Rated:</span>
                                <span class="w-full">${resDetails.vote_count > 0 ? (resDetails.vote_average.toString().length > 1 ? resDetails.vote_average.toString().substring(0, 3) + " / 10" : resDetails.vote_average.toString() + " / 10") : "No ratings"}</span>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Cast:</span>
                                <span class="w-full">${
									resCredits.cast.length > 0
										? resCredits.cast
												.slice(0, 5)
												.map((member) => member.name)
												.join(", ")
										: "None"
								}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

(() => {
	if (window.location.pathname.endsWith("movie.html")) {
		getMovieInfo();
        window.addEventListener("popstate", () => {
			const main = document.querySelector("main");
			if (window.location.pathname.endsWith("index.html")) {
				console.log("navigated to index.html");
				main.className = "flex flex-wrap py-6 gap-x-3 gap-y-10 justify-evenly items-start relative";
				main.innerHTML = `
                    <h2 id="results-text" class="text-4xl w-full text-center px-5">Most Popular</h2>
                    <div id="menu-drop-down" class="absolute top-0 right-0 flex"></div>

                    <div id="movies" class="flex flex-wrap py-6 gap-x-3 gap-y-10 justify-evenly items-start w-full"></div>
                    <div class="w-full flex justify-center items-center">
                        <div id="page-selector" class="bg-blue-950 flex gap-x-2 p-3 w-fit rounded-full"></div>
                    </div>`;
				performSearchFunction();
			} else if (window.location.pathname.endsWith("library.html")) {
				console.log("navigated to library.html");
				main.className = "flex flex-wrap py-6 gap-x-3 gap-y-10 justify-evenly items-start relative";
				main.innerHTML = `
                    <h2 id="results-text" class="text-4xl w-full text-center px-5">Favorites</h2>
                    <div id="menu-drop-down" class="absolute top-0 right-0 flex"></div>

                    <div id="movies" class="flex flex-wrap py-6 gap-x-3 gap-y-10 justify-evenly items-start w-full"></div>`;
				loadFavorites();
			} else if (window.location.pathname.endsWith("movie.html")) {
				console.log("navigated to movie.html");
				main.className = "relative flex-1 flex justify-center items-center";
				main.innerHTML = `
                    <h2 id="results-text" class="text-4xl w-full text-center px-5">Favorites</h2>
                    <div id="menu-drop-down" class="absolute top-0 right-0 flex"></div>

                    <div id="movies" class="flex flex-wrap py-6 gap-x-3 gap-y-10 justify-evenly items-start w-full"></div>`;
				getMovieInfo();
			}
		});
	}
})();
