
function loadFavorites() {
	let savedMovies = localStorage.getItem("savedMovies");
	savedMovies = savedMovies ? JSON.parse(savedMovies) : [];
	let element = document.getElementById("movies");
	console.log(savedMovies);
	for (let movie of savedMovies) {
		element.innerHTML += `
            <div class="flex sm:flex-col justify-center items-center gap-y-4 gap-x-3 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22.5%] xl:w-[18%]">
                <div id="${movie.id}" style="background-image: url('${imagesBasePath}${movie.poster}')" class="flex flex-col justify-end items-center bg-cover bg-center w-full aspect-[2/3] rounded-4xl overflow-hidden group">
                    <div class="flex relative justify-end items-start w-full h-full p-3 group-hover:bg-black/50 transition-all duration-300">
                        <img class="w-2/10 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_remove_fill.svg" alt="save this movie" />
                        <img onclick="unsaveMovie(${movie.id}, '${encodeURIComponent(movie.title).replace(/'/g, "%27")}', '${movie.date}', '${movie.poster}')" class="w-2/10 absolute opacity-0 transition-opacity duration-300" src="../svg/bookmark_add.svg" alt="save this movie" />
                        <img class="w-3/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/play_arrow.svg" alt="view movie details" />
                    </div>
                </div>
                <div class="flex flex-col text-center w-[50%] sm:w-full gap-y-2">
                    <h3 class="text-2xl sm:text-4xl font-semibold">${movie.title}</h3>
                    <span class="text-sm sm:text-xl w-full">${movie.date}</span>
                </div>
            </div>`;
	}
}

(() => {
	loadFavorites();
})();
