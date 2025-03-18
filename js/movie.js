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

function getMovieDetails (idQuery = null) {
	const urlParams = new URLSearchParams(window.location.search);
	const languageQuery = urlParams.get("language");
	if (idQuery) {
		window.history.pushState({}, "", `?language=${languageQuery ? languageQuery : "en"}&id=${idQuery}`);
	} else {
		idQuery = urlParams.get("id");
	}

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ4ZmEzMjQ5MjIxOGJkMzJjM2YxNTcyMmE0ZDhlOCIsIm5iZiI6MTc0MTE4OTU3NC45NTM5OTk4LCJzdWIiOiI2N2M4NzFjNjNkZTMwNDIxYjdjMmFhYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.j_9bXqqno92PGtQlqVgJOWOaDQ0Hjn6KSK26ksn9qhI",
		},
	};

	fetch(`https://api.themoviedb.org/3/movie/${idQuery}?language=${languageQuery}`, options)
		.then((res) => res.json())
		.then((res) => {
            console.log(res);
            displayMovieDetails(res);
        })
		.catch((err) => console.error(err));
}

function displayMovieDetails (res) {
    console.log(`${imagesBasePath}${res.backdrop_path}`)
    const main = document.querySelector('main');
    main.innerHTML = `
        <div id="menu-drop-down" class="absolute top-0 right-0 flex"></div>
        <div style="background-image: url('${imagesBasePath}${res.backdrop_path}')" class="bg-center bg-cover w-full h-full">
            <div class="flex flex-col items-center h-full w-full gap-y-10 p-10 bg-radial from-black/70 from-50% to-black/40">
                <h2 class="text-4xl font-semibold text-center">Harry Potter and The Sorcerer's Stone with some other stones and wands</h2>
                <div class="flex flex-col md:flex-row justify-center items-center gap-x-15 gap-y-10 w-full max-w-5xl">
                    <div style="background-image: url('${imagesBasePath}${res.poster_path}')" class="flex flex-col justify-end items-center bg-cover bg-center shrink-0 w-[18rem] aspect-[2/3] rounded-2xl overflow-hidden"></div>
                    <div class="flex flex-col gap-y-5 text-lg">
                        <h5 class="text-xl font-semibold text-center md:text-left">Let the magic begin.</h5>
                        <p>Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.</p>
                        <div class="flex flex-col min-w-fit w-full">
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Released:</span>
                                <span class="w-full">2001-11-16</span>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Genres:</span>
                                <span class="w-full">Adventure, Fantasy</span>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">Runtime:</span>
                                <div class="w-full flex items-center">
                                    <img class="w-[20px]" src="../svg/clock.svg" alt="clock" />
                                    <span>152m</span>
                                </div>
                            </div>
                            <div class="flex w-full gap-x-5">
                                <span class="shrink-0 w-[30%] max-w-24">IMDb:</span>
                                <span class="w-full">7.6</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

}

(() => {
	if (window.location.pathname.endsWith("movie.html")) {
		getMovieDetails();
		window.addEventListener("popstate", () => {
			getMovieDetails();
		});
	}
})();
