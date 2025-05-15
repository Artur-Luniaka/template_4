// Home page specific JavaScript

// Helper function to fetch JSON data
async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetching JSON failed:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Load game description
  loadGameDescription();

  // Load features
  loadFeatures();

  // Load gallery
  loadGallery();
});

// Load game description from JSON
function loadGameDescription() {
  const gameDescriptionElement = document.getElementById("gameDescription");

  if (!gameDescriptionElement) return;

  fetchJSON("./data/home.json").then((data) => {
    if (data && data.gameDescription) {
      const description = document.createElement("div");
      description.innerHTML = `
                      <p>${data.gameDescription.mainText}</p>
                      <div class="game-highlights">
                          ${data.gameDescription.highlights
                            .map(
                              (highlight) => `
                              <div class="highlight-item">
                                  <h3>${highlight.title}</h3>
                                  <p>${highlight.text}</p>
                              </div>
                          `
                            )
                            .join("")}
                      </div>
                  `;
      gameDescriptionElement.appendChild(description);
    }
  });
}

// Load features from JSON
function loadFeatures() {
  const featuresGridElement = document.getElementById("featuresGrid");

  if (!featuresGridElement) return;

  fetchJSON("./data/home.json").then((data) => {
    if (data && data.features) {
      featuresGridElement.innerHTML = data.features
        .map(
          (feature) => `
                      <div class="feature-card">
                          <div class="feature-image">
                              <img src="${feature.image}" alt="${feature.title}">
                          </div>
                          <div class="feature-content">
                              <h3>${feature.title}</h3>
                              <p>${feature.description}</p>
                          </div>
                      </div>
                  `
        )
        .join("");
    }
  });
}

// Load gallery from JSON
function loadGallery() {
  const galleryGridElement = document.getElementById("galleryGrid");

  if (!galleryGridElement) return;

  fetchJSON("./data/home.json").then((data) => {
    if (data && data.gallery) {
      galleryGridElement.innerHTML = data.gallery
        .map(
          (item) => `
                      <div class="gallery-item">
                          <img src="${item.image}" alt="${item.alt}">
                      </div>
                  `
        )
        .join("");
    }
  });
}
