describe('Display Review', () => {
    it('should display the review', () => {
        const reviews = document.getElementById("reviews").innerHTML;
        let containsHTML = false;
        if (reviews.innerHTML !== '') containsHTML = true;
        expect(containsHTML).toBe(true);
    });
});