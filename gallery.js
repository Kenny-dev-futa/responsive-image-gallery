const gallery = document.querySelector("#gallery");
const photos = document.querySelectorAll(".photo");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const closeBtn = document.querySelector("#closeBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;
let visiblePhotos = [];

// Get currently visible images
function updateVisiblePhotos() {
    visiblePhotos = Array.from(photos).filter(photo => {
        return photo.style.display !== "none";
    });
}

// Open Lightbox
function openLightbox(index) {
    updateVisiblePhotos();
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
}

// Display selected image
function showImage(index) {
    const selectedPhoto = visiblePhotos[index];
    const image = selectedPhoto.querySelector("img");
    const caption = selectedPhoto.querySelector("figcaption");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption.textContent;
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImage.src = "";
}

// Next Image
function showNextImage() {
    currentIndex++;
    if (currentIndex >= visiblePhotos.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

// Previous Image
function showPreviousImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = visiblePhotos.length - 1;
    }
    showImage(currentIndex);
}

// Open image when clicked
photos.forEach(photo => {
    photo.addEventListener("click", () => {
        updateVisiblePhotos();
        const index = visiblePhotos.indexOf(photo);
        openLightbox(index);
    });
});

// Close button
closeBtn.addEventListener("click", closeLightbox);

// Navigation buttons
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPreviousImage);

// Close when clicking outside the image
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }
});

// Image Category Filters
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter;

        // Update active filter button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Filter images
        photos.forEach(photo => {
            const photoCategory = photo.dataset.category;

            if (category === "all" || photoCategory === category) {
                photo.style.display = "";
            } else {
                photo.style.display = "none";
            }
        });

        updateVisiblePhotos();
    });
});

// Initial setup
updateVisiblePhotos();