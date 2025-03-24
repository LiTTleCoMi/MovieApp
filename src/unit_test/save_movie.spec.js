describe("Save a movie", () => {
	it("should save a movie to the local storage", () => {
		saveMovie(673, "test movie", "11-23-2020", "../images/movie-poster.jpg", JSON.stringify({ rating: 0 }));
		let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
		let found = false;
		for (let movie of savedMovies) if (movie.title === "test movie") found = true;
		expect(found).toBe(true);
		if (found) {
			savedMovies = savedMovies.filter((movie) => movie.title !== "test movie");
		}
	});
});
