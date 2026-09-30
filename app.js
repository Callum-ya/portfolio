// Footer
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

// Typewriter effect for greeting
var i = 0;
var txt = 'Hi, I’m Callum.'; /* The text */
var speed = 150; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typed-text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.addEventListener("load", typeWriter);

// Project Section:
// ================================
// Projects
// ================================

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error(`Unable to load projects: ${response.status}`);
    }

    const projects = await response.json();

    const featuredContainer = document.getElementById("featured-projects");
    const otherContainer = document.getElementById("other-projects");

    if (!featuredContainer || !otherContainer) {
      return;
    }

    projects.forEach((project) => {
      const projectCard = createProjectCard(project);

      if (project.featured) {
        featuredContainer.appendChild(projectCard);
      } else {
        otherContainer.appendChild(projectCard);
      }
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}


function createProjectCard(project) {
  const article = document.createElement("article");
  article.classList.add("card", "project-card");

  // Category
  if (project.category) {
    const category = document.createElement("p");
    category.classList.add("project-category");
    category.textContent = project.category;
    article.appendChild(category);
  }

  // Title
  const title = document.createElement("h3");
  title.textContent = project.title;
  article.appendChild(title);

  // Description
  const description = document.createElement("p");
  description.textContent = project.description;
  article.appendChild(description);

  // Technologies
  if (project.technologies && project.technologies.length > 0) {
    const technologies = document.createElement("div");
    technologies.classList.add("project-technologies");

    project.technologies.forEach((technology) => {
      const tag = document.createElement("span");
      tag.textContent = technology;
      technologies.appendChild(tag);
    });

    article.appendChild(technologies);
  }

  // Links
  if (project.live || project.github) {
    const links = document.createElement("div");
    links.classList.add("card-links");

    if (project.live) {
      const liveLink = document.createElement("a");

      liveLink.href = project.live;
      liveLink.target = "_blank";
      liveLink.rel = "noreferrer";
      liveLink.textContent = "Live Demo ↗";

      links.appendChild(liveLink);
    }

    if (project.github) {
      const githubLink = document.createElement("a");

      githubLink.href = project.github;
      githubLink.target = "_blank";
      githubLink.rel = "noreferrer";
      githubLink.textContent = "View Code ↗";

      links.appendChild(githubLink);
    }

    article.appendChild(links);
  }

  return article;
}

loadProjects();


// ================================
// What I'm Learning
// ================================

async function loadLearning() {
  try {
    const response = await fetch("data/learning.json");

    if (!response.ok) {
      throw new Error(`Unable to load learning data: ${response.status}`);
    }

    const modules = await response.json();

    const learningContainer = document.getElementById("learning-grid");

    if (!learningContainer) {
      return;
    }

    modules.forEach((module) => {
      const card = createLearningCard(module);
      learningContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading learning data:", error);
  }
}


function createLearningCard(module) {
  const article = document.createElement("article");
  article.classList.add("card", "learning-card");

  const title = document.createElement("h3");
  title.textContent = module.module;

  const description = document.createElement("p");
  description.textContent = module.description;

  article.appendChild(title);
  article.appendChild(description);

  if (module.topics && module.topics.length > 0) {
    const topicList = document.createElement("ul");
    topicList.classList.add("learning-topics");

    module.topics.forEach((topic) => {
      const item = document.createElement("li");
      item.textContent = topic;
      topicList.appendChild(item);
    });

    article.appendChild(topicList);
  }

  return article;
}


loadLearning();