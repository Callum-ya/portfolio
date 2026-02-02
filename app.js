document.getElementById("year").textContent = new Date().getFullYear();

// Image slideshow
const slides = [
  {
    src: "boat.jpeg",
    alt: "Me on a boat in Khao Sok"
  },
  {
    src: "elephants.jpeg",
    alt: "Photo at an elephant sanctuary"
  },
  {
    src: "restaurant.jpeg",
    alt: "Me at a restaurant on holiday"
  }
];

const slideImageEl = document.getElementById("aboutSlide");
const prevButtonEl = document.getElementById("prevSlideBtn");
const nextButtonEl = document.getElementById("nextSlideBtn");
const dotsContainerEl = document.getElementById("slideDots");

let currentSlideIndex = 0;
let autoPlayTimerId = null;
const AUTO_PLAY_ENABLED = true;
const AUTO_PLAY_MS = 4500;

function showSlide(index) {
  currentSlideIndex = index;

  slideImageEl.src = slides[currentSlideIndex].src;
  slideImageEl.alt = slides[currentSlideIndex].alt;

  updateDots();
}

function showNextSlide() {
  const nextIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(nextIndex);
}

function showPreviousSlide() {
  const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

function createDots() {
  dotsContainerEl.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.addEventListener("click", () => {
      showSlide(index);
      restartAutoPlayIfEnabled();
    });

    dotsContainerEl.appendChild(dot);
  });
}

function updateDots() {
  const dots = Array.from(dotsContainerEl.children);
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlideIndex);
  });
}

function restartAutoPlayIfEnabled() {
  if (!AUTO_PLAY_ENABLED) return;

  stopAutoPlay();
  startAutoPlay();
}

function startAutoPlay() {
  autoPlayTimerId = window.setInterval(showNextSlide, AUTO_PLAY_MS);
}

function stopAutoPlay() {
  if (autoPlayTimerId !== null) {
    window.clearInterval(autoPlayTimerId);
    autoPlayTimerId = null;
  }
}

// Wire up buttons
if (slideImageEl && prevButtonEl && nextButtonEl && dotsContainerEl) {
  createDots();
  showSlide(0);

  prevButtonEl.addEventListener("click", () => {
    showPreviousSlide();
    restartAutoPlayIfEnabled();
  });

  nextButtonEl.addEventListener("click", () => {
    showNextSlide();
    restartAutoPlayIfEnabled();
  });

  // Pause autoplay when the user hovers over the image
  slideImageEl.addEventListener("mouseenter", stopAutoPlay);
  slideImageEl.addEventListener("mouseleave", startAutoPlay);

  if (AUTO_PLAY_ENABLED) startAutoPlay();
}
