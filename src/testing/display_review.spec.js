describe("Display Review", () => {
	it("should display the review", () => {
		Review.displayReview({ comment: "the review", rating: 1 });
		const reviews = document.getElementById("reviews");
		let containsHTML = false;
		if (reviews.innerHTML !== "") containsHTML = true;
		expect(containsHTML).toBe(true);
	});
});
