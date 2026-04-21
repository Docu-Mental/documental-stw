// Use an object to store the slide index for *each* gallery
const slideIndex = {};

// 1. Initialize galleries but DO NOT display any slide by default.
initializeGalleries();

function initializeGalleries() {
    // Get all elements with the class 'container' and an ID
    const galleryContainers = document.querySelectorAll('.container[id]');
    galleryContainers.forEach(container => {
        const galleryId = container.id;
        // Start each gallery at index 0 (which means 'no slide shown')
        slideIndex[galleryId] = 0;
    });
}

// 2. Handles the click logic for all thumbnails/links.
function handleContentClick(n, galleryId, isLink) {
    const container = document.getElementById(galleryId);
    if (!container) return;

    const slides = container.getElementsByClassName("mySlides");
    const iframeId = galleryId.replace('gallery', 'iframe_'); 
    const iframe = document.getElementById(iframeId); 

    if (isLink) {
        // If the clicked element is a link (wrapped in <a>)
        
        // Hide all mySlides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Show iframe
        if (iframe) iframe.style.display = 'block';

        // Reset active thumbnails
        resetActiveDots(container);

        // ✅ NEW unified caption logic — always use the thumbnail's title (optional improvement)
        const captionText = container.querySelector("#caption");
        const allThumbs = container.querySelectorAll("img");
        if (captionText && allThumbs[n - 1]) {
            captionText.innerHTML = allThumbs[n - 1].title || allThumbs[n - 1].alt || "";
        }

    } else {
        // Standard image thumbnail
        if (iframe) iframe.style.display = 'none';
        currentSlide(n, galleryId); 
    }
}

// Helper function to reset all 'active' dots (used for link clicks)
function resetActiveDots(container) {
    let dots = container.getElementsByClassName("demo");
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    // Also clear the caption if the slide is hidden
    let captionText = container.querySelector("#caption"); 
    if (captionText) captionText.innerHTML = "";
}


/* ---------------------------------------------------------------------- */
/* --- Existing Slideshow Logic (with minor fixes) ---------------------- */
/* ---------------------------------------------------------------------- */

function plusSlides(n, galleryId) {
    const container = document.getElementById(galleryId);
    if (!container) return;

    const slides = container.getElementsByClassName("mySlides");

    // Compute new index with wrap-around
    let newIndex = slideIndex[galleryId] === 0 ? 1 : slideIndex[galleryId] + n;
    if (newIndex > slides.length) newIndex = 1;
    if (newIndex < 1) newIndex = slides.length;
    slideIndex[galleryId] = newIndex;

    // Check if the thumbnail at this position is a PDF link or a plain image
    const thumbImgs = container.querySelectorAll('.scroll-container img');
    const thumb = thumbImgs[newIndex - 1];
    const isLink = thumb && thumb.parentElement.tagName === 'A';

    if (isLink) {
        // Clicking the <a> handles both iframe load (via target attr) and handleContentClick
        thumb.parentElement.click();
    } else {
        const iframeId = galleryId.replace('gallery', 'iframe_');
        const iframe = document.getElementById(iframeId);
        if (iframe) iframe.style.display = 'none';
        showSlides(newIndex, galleryId);
    }
}
function currentSlide(n, galleryId) {
    const iframeId = galleryId.replace('gallery', 'iframe_');
    const iframe = document.getElementById(iframeId);
    if (iframe) iframe.style.display = 'none';

    slideIndex[galleryId] = n;
    showSlides(n, galleryId);
}

function showSlides(n, galleryId) {
    let i;
    const container = document.getElementById(galleryId);
    if (!container) return;

    let slides = container.getElementsByClassName("mySlides");
    let dots = container.getElementsByClassName("demo");
    let captionText = container.querySelector("#caption"); 
    
    if (slides.length === 0) return;

    if (n > slides.length) {slideIndex[galleryId] = 1}
    if (n < 1) {slideIndex[galleryId] = slides.length}
    let currentSlideIndex = slideIndex[galleryId];

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if (currentSlideIndex > 0) {
        slides[currentSlideIndex-1].style.display = "block";
        dots[currentSlideIndex-1].className += " active";
        if (captionText) captionText.innerHTML = dots[currentSlideIndex-1].title;
    }
}


/* -----------------------------Hale and Pace----------------------------------------- */
// Hale and Pace. If disabling this must also set disclaimer display to 'block' in CSS, otherwise set it to 'none'

/* 

const HALE = "Kermit25"; // 
const contentDiv = document.getElementById('disclaimer');

// Check if the content element exists before proceeding
if (contentDiv) {
    let enteredP = prompt("Key?", "");

    if (enteredP === HALE) {
        // Show the content if it is correct
        contentDiv.style.display = 'block';
    } else {
        // Redirect or show a message if it is wrong
        alert("Incorrect Key. Access denied.");
            }
}
*/

/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* --- Hides the currently visible slide -------------------------------- */
/* ---------------------------------------------------------------------- */

function hideCurrentSlide(galleryId) {
    const container = document.getElementById(galleryId);
    if (!container) return;

    let slides = container.getElementsByClassName("mySlides");
    let currentSlideIndex = slideIndex[galleryId];

    if (currentSlideIndex > 0) {
        slides[currentSlideIndex - 1].style.display = "none";
    }

    let dots = container.getElementsByClassName("demo");
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    let captionText = container.querySelector("#caption"); 
    if (captionText) captionText.innerHTML = "";

    slideIndex[galleryId] = 0;
    
    const iframeId = galleryId.replace('gallery', 'iframe_');
    const iframe = document.getElementById(iframeId);
    if (iframe) iframe.style.display = 'none';
}


// Collapse all expanded details element whenever a new one is expanded
document.addEventListener('DOMContentLoaded', function () {
  const detailsList = document.querySelectorAll('details');

  detailsList.forEach((details) => {
    details.addEventListener('toggle', function () {
      if (details.open) {
        detailsList.forEach((other) => {
          if (other !== details && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
});

// Add transition on opening and closing <details> elements
document.addEventListener('DOMContentLoaded', () => {
    const duration = parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue('--animation-duration')) * 1000;
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(details => {
        const summary = details.querySelector('summary');
        const content = details.querySelector('.details-content-wrapper');
        if (!summary || !content) return;

        summary.addEventListener('click', (e) => {
            e.preventDefault();

            // Clear the shared iframe whenever any accordion is opened or closed
            const iframe = document.querySelector('iframe[name="iframe_4"]');
            if (iframe) iframe.src = '';
            
            if (details.hasAttribute('open')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                void content.offsetHeight; 
                content.style.maxHeight = '0';
                content.classList.remove('is-open');
                setTimeout(() => {
                    details.removeAttribute('open');
                    content.style.maxHeight = '';
                }, duration);

            } else {
                details.setAttribute('open', '');
                content.style.transition = 'none';
                content.style.maxHeight = '0';
                void content.offsetHeight;
                content.style.transition = ''; 
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('is-open');
                setTimeout(() => {
                    content.style.maxHeight = '5000px'; 
                }, duration);
            }
        });
    });
});