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
    
}

(() => {
	if (window.location.pathname.endsWith("movie.html")) {
		getMovieDetails();
		window.addEventListener("popstate", () => {
			getMovieDetails();
		});
	}
})();
