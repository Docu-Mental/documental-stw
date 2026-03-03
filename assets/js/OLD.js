// Use an object to store the slide index for *each* gallery
const slideIndex = {};

// Initialize all galleries when the page loads
initializeGalleries();

function initializeGalleries() {
    // Get all elements with the class 'container' and an ID
    const galleryContainers = document.querySelectorAll('.container[id]');
    galleryContainers.forEach(container => {
        const galleryId = container.id;
        // Start each gallery at the first slide (index 1)
        slideIndex[galleryId] = 1;
        // Display the first slide for this specific gallery
        showSlides(1, galleryId);
    });
}

function plusSlides(n, galleryId) {
    // Increment/decrement the index for the specified gallery and show the slide
    slideIndex[galleryId] += n;
    showSlides(slideIndex[galleryId], galleryId);
}

function currentSlide(n, galleryId) {
    // Set the index for the specified gallery and show the slide
    slideIndex[galleryId] = n;
    showSlides(n, galleryId);
}

function showSlides(n, galleryId) {
    let i;
    // Get the specific gallery container
    const container = document.getElementById(galleryId);
    
    // Select elements ONLY within this container
    let slides = container.getElementsByClassName("mySlides");
    let dots = container.getElementsByClassName("demo");
    let captionText = container.querySelector("#caption");

    // 1. Wrap around logic (using the specific gallery's slide index)
    if (n > slides.length) {slideIndex[galleryId] = 1}
    if (n < 1) {slideIndex[galleryId] = slides.length}
    let currentSlideIndex = slideIndex[galleryId];

    // 2. Hide all main slides in this gallery
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // 3. Remove 'active' class from all thumbnails in this gallery
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // 4. Show the selected slide (index-1)
    slides[currentSlideIndex-1].style.display = "block";
    
    // 5. Set the active class on the corresponding thumbnail
    dots[currentSlideIndex-1].className += " active";
    
    // 6. Update the caption text
    captionText.innerHTML = dots[currentSlideIndex-1].alt;
}
