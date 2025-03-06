import { displayMovies } from "./display.js";

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
	const page = urlParams.get("page");

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ4ZmEzMjQ5MjIxOGJkMzJjM2YxNTcyMmE0ZDhlOCIsIm5iZiI6MTc0MTE4OTU3NC45NTM5OTk4LCJzdWIiOiI2N2M4NzFjNjNkZTMwNDIxYjdjMmFhYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.j_9bXqqno92PGtQlqVgJOWOaDQ0Hjn6KSK26ksn9qhI",
		},
	};

	fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=${page}`, options)
		.then((res) => res.json())
		.then((res) => console.log(res))
		.then((res) => displayMovies(res))
		.catch((err) => console.error(err));
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
