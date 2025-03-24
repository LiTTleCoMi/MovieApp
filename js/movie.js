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

let details;
let credits;
let saved = false;

async function getMovieInfo(idQuery = null) {
	const urlParams = new URLSearchParams(window.location.search);
	const languageQuery = urlParams.get("language") || "en";

	if (idQuery) {
		window.history.pushState({}, "", `movie.html?language=${languageQuery}&id=${idQuery}`);
		window.location.reload();
	} else {
		idQuery = urlParams.get("id");
	}

    [details, credits] = await Promise.all([getMovieDetails(idQuery, languageQuery), getMovieCredits(idQuery, languageQuery)]);
    
    let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    if (savedMovies) {
        for (movie of savedMovies) {
            if (movie.id === details.id) {
                saved = true;
            }
        }
	}

	displayMovieDetails();
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

function displayMovieDetails() {
	console.log(details);
    const main = document.querySelector("main");
	main.innerHTML = `
        <div id="menu-drop-down" class="absolute top-0 right-0 flex"></div>
        <div style="background-image: url('${imagesBasePath}${details.backdrop_path ? details.backdrop_path : details.poster_path}')" class="bg-center bg-cover w-full h-full">
            <div class="flex flex-col justify-center items-center h-full w-full gap-y-10 p-10 bg-radial from-black/70 from-50% to-black/40">
                <h2 class="text-4xl font-semibold text-center">${details.title}</h2>
                <div class="flex flex-col md:flex-row justify-center items-center gap-x-15 gap-y-10 w-full max-w-5xl">
                    <div style="background-image: url('${imagesBasePath}${details.poster_path}')" class="flex justify-start items-start bg-cover bg-center shrink-0 w-[17rem] sm:w-[18rem] lg:w-[19rem] xl:w-[20rem] aspect-[2/3] rounded-2xl overflow-hidden border border-zinc-500">
                        <div class="svg relative -translate-x-[1px] -translate-y-[1px] rounded-br-full bg-gray-800/50">
                            <img id="save-icon" onclick='saveMovie(${details.id}, "${encodeURIComponent(details.original_title).replace(/'/g, "%27")}", "${details.release_date}", "${details.poster_path}", JSON.stringify({ "rating": 0 }))' class="svg w-15 pt-1 pl-1 pr-3 pb-3" src="../svg/bookmark_add.svg" alt="save this movie" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-4 text-lg">
                        <h5 class="text-xl font-semibold text-center md:text-left">${details.tagline}</h5>
                        <p id="overview">${details.overview ? details.overview : "No description given in the selected language"}</p>
                        <div class="flex flex-col min-w-fit w-full">
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Released:</span>
                                <span class="w-full">${details.release_date}</span>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Genres:</span>
                                <span class="w-full">${details.genres.map((genre) => genre.name).join(", ")}</span>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Runtime:</span>
                                <div class="w-full flex items-center gap-x-1">
                                    <img class="w-[20px]" src="../svg/clock.svg" alt="clock" />
                                    <span>${details?.runtime ? details.runtime + "m" : "Unknown"}</span>
                                </div>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Rated:</span>
                                <span class="w-full">${details.vote_count > 0 ? (details.vote_average.toString().length > 1 ? details.vote_average.toString().substring(0, 3) + " / 10" : details.vote_average.toString() + " / 10") : "No ratings"}</span>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Cast:</span>
                                <span class="w-full">${
									credits.cast.length > 0
										? credits.cast
												.slice(0, 5)
												.map((member) => member.name)
												.join(", ")
										: "None"
								}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center gap-y-4 p-3 w-full xl:w-80 h-full max-h-[calc(100vh-6rem)] xl:overflow-y-auto xl:shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.3)] shadow-[0_-15px_20px_-5px_rgba(0,0,0,0.5)]">
            <h2 class="text-3xl font-semibold">Leave a Review</h2>
            <form onsubmit="Review.submitReview(event)" class="flex flex-col items-center gap-y-5 w-full max-w-2xl">
                <div id="star-rating" class="flex text-gray-400 text-3xl cursor-pointer">
                    <span onclick="Review.updateRating(1)" class="star">★</span>
                    <span onclick="Review.updateRating(2)" class="star">★</span>
                    <span onclick="Review.updateRating(3)" class="star">★</span>
                    <span onclick="Review.updateRating(4)" class="star">★</span>
                    <span onclick="Review.updateRating(5)" class="star">★</span>
                </div>
                <span id="rating-warning" class="text-red-400 hidden">Must select a rating!</span>
                <textarea class="w-full h-40 p-2 bg-black/20 border-2 border-black/30 rounded-xl leading-normal resize-none" placeholder="Write your comment here..."></textarea>
                <button class="bg-blue-900 rounded-lg px-3 py-1" type="submit">Submit</button>
            </form>
            
            <div class="w-full flex flex-col gap-y-3 justify-center">
                <h2 class="text-3xl text-center font-semibold">Reviews</h2>
                <div id="reviews" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-4">
                </div>
            </div>
        </div>
        `;
    
    let saveIcon = document.getElementById("save-icon");
    if (saved) {
		saveIcon.src = "../svg/bookmark_remove_fill.svg";
		saveIcon.onclick = () => unsaveMovie(details.id, encodeURIComponent(details.original_title).replace(/'/g, "%27"), details.release_date, details.poster_path);
    } else {
        saveIcon.src = "../svg/bookmark_add.svg";
		saveIcon.onclick = () => saveMovie(details.id, encodeURIComponent(details.original_title).replace(/'/g, "%27"), details.release_date, details.poster_path, '{ "rating": 0 }');
    }

	function displayMovieReviews(id) {
		let savedMovies = localStorage.getItem("savedMovies");
		savedMovies = savedMovies ? JSON.parse(savedMovies) : [];
		for (let movie of savedMovies) {
			if (movie.id === id) {
				let reviews = movie.reviews;
				for (let review of reviews) {
					if (review.rating) {
						Review.displayReview(review);
					}
				}
				break;
			}
		}
	}
	displayMovieReviews(details.id);
}

class Review {
	static comment = "";
	static rating = 0;

	static updateRating(value) {
		const stars = document.querySelectorAll("#star-rating .star");
		Review.rating = value;
		stars.forEach((star, i) => {
			star.classList.toggle("text-yellow-400", i < Review.rating);
		});
	}
	static submitReview(event) {
		const ratingWarning = document.getElementById("rating-warning");
		event.preventDefault();
		if (Review.rating) {
			let stars = [];
			for (let i = 0; i < 5; i++) stars.push(`<span class="star${i < Review.rating ? " text-yellow-400" : ""}">★</span>`);
			const userComment = document.querySelector("textarea");

			// save the review + movie
			saveMovie(details.id, details.original_title, details.release_date, details.poster_path, JSON.stringify({ comment: userComment.value, rating: Review.rating }));

			// reset the review
			Review.displayReview({ comment: userComment.value, rating: Review.rating });
			userComment.value = "";
			Review.rating = 0;
			Review.updateRating();
			if (!ratingWarning.classList.contains("hidden")) ratingWarning.classList.add("hidden");
		} else {
			ratingWarning.classList.remove("hidden");
		}
	}

	static displayReview(review) {
		const reviewsSection = document.getElementById("reviews");
		let stars = [];
		for (let i = 0; i < 5; i++) stars.push(`<span class="star${i < review.rating ? " text-yellow-400" : ""}">★</span>`);
		const reviewHTML = `
            <div class="review w-full flex flex-col gap-y-1 py-2 px-3 bg-black/20 rounded-lg">
                <div class="rating flex text-gray-400 text-2xl cursor-pointer">
                    ${stars.join("")}
                </div>
                <p>
                    ${review.comment}
                </p>
            </div>
        `;
		reviewsSection.innerHTML = reviewHTML + reviewsSection.innerHTML;
	}
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
				main.className = "relative flex-1 flex flex-col md:flex justify-center items-center";
				main.innerHTML = `
                    <h2 id="results-text" class="text-4xl w-full text-center px-5">Favorites</h2>
                    <div id="menu-drop-down" class="absolute top-0 right-0 flex"></div>

                    <div id="movies" class="flex flex-wrap py-6 gap-x-3 gap-y-10 justify-evenly items-start w-full"></div>`;
				getMovieInfo();
			}
		});
	}
})();
