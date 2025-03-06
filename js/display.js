export function displayMovies(moviesObj) {
	let element = document.querySelector("main");
	let imagesBasePath = "https://media.themoviedb.org/t/p/w440_and_h660_face";
	for (let movie of moviesObj.results) {
		element.innerHTML += `
        <div class="flex flex-col justify-center items-center gap-y-4 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22.5%] xl:w-[18%]">
            <div id="${movie.id}" class="flex flex-col justify-end items-center bg-[url(${imagesBasePath}${movie.poster_path})] bg-cover bg-center w-full aspect-[2/3] rounded-4xl overflow-hidden group">
                <div class="flex relative justify-end items-start w-full h-full p-3 group-hover:bg-black/50 transition-all duration-300">
                    <img class="w-2/10 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_add.svg" alt="save this movie" />
                    <img class="w-2/10 absolute opacity-0 hover:opacity-100 transition-opacity duration-300" src="../svg/bookmark_add_fill.svg" alt="save this movie" />
                    <img class="w-3/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="../svg/play_arrow.svg" alt="view movie details" />
                </div>
            </div>
            <div class="flex flex-col gap-y-2">
                <h3 class="text-4xl font-semibold">${movie.original_title}</h3>
                <span class="text-xl w-full">${release_date}</span>
            </div>
        </div>`;
	}
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
