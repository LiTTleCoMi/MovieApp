function posterHover(id) {
	let element = document.getElementById(id);
	element.innerHTML = `
    <div class="flex relative items-start justify-end bg-black/50 w-full h-full p-3">
        <img class="w-2/10" src="../svg/bookmark_add.svg" alt="save this movie">
        <img class="w-3/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 rounded-full" src="../svg/play_arrow.svg" alt="view movie details">
    </div>`;
}

function posterLeave(id) {
	let element = document.getElementById(id);
	element.innerHTML = "";
}
