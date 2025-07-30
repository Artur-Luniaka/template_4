// Jet Escape - Mission Updates Page

// Aviation-themed update functions
let updateLogs = [];
let diaryEntries = [];
let lastUpdateTime = null;

// Initialize mission updates
function initializeMissionUpdates() {
  console.log("📊 Initializing mission updates system...");
  setupUpdateFilters();
  initializeDiaryReader();
  setupRealTimeUpdates();
}

// Setup update filters
function setupUpdateFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterType = this.getAttribute("data-filter");
      filterUpdates(filterType);
    });
  });
}

// Filter updates by type
function filterUpdates(filterType) {
  const logCards = document.querySelectorAll(".log-card");
  const diaryCards = document.querySelectorAll(".diary-card");

  if (filterType === "all") {
    logCards.forEach((card) => (card.style.display = "block"));
    diaryCards.forEach((card) => (card.style.display = "block"));
  } else if (filterType === "logs") {
    logCards.forEach((card) => (card.style.display = "block"));
    diaryCards.forEach((card) => (card.style.display = "none"));
  } else if (filterType === "diaries") {
    logCards.forEach((card) => (card.style.display = "none"));
    diaryCards.forEach((card) => (card.style.display = "block"));
  }
}

// Initialize diary reader
function initializeDiaryReader() {
  const diaryCards = document.querySelectorAll(".diary-card");
  diaryCards.forEach((card) => {
    card.addEventListener("click", function () {
      openDiaryReader(this);
    });
  });
}

// Open diary reader
function openDiaryReader(card) {
  const title = card.querySelector(".card-title").textContent;
  const content = card.querySelector(".card-content").textContent;
  const author = card
    .querySelector(".diary-author")
    .textContent.replace("By ", "");
  const date = card.querySelector(".diary-date").textContent;

  showDiaryModal(title, content, author, date);
}

// Show diary modal
function showDiaryModal(title, content, author, date) {
  const modal = document.createElement("div");
  modal.className = "diary-modal";
  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="diary-content">${content}</p>
                <div class="diary-meta">
                    <span class="diary-author">By ${author}</span>
                    <span class="diary-date">${date}</span>
                </div>
            </div>
        </div>
    `;

  // Add modal styles
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.cssText = `
        background: var(--mission-mood);
        border: 1px solid var(--cloud-cover);
        border-radius: var(--cockpit-radius);
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

  const modalHeader = modal.querySelector(".modal-header");
  modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--cloud-cover);
    `;

  const modalClose = modal.querySelector(".modal-close");
  modalClose.style.cssText = `
        background: none;
        border: none;
        color: var(--sky-glow);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background 0.3s ease;
    `;

  modalClose.addEventListener("mouseenter", function () {
    this.style.background = "var(--cloud-cover)";
  });

  modalClose.addEventListener("mouseleave", function () {
    this.style.background = "none";
  });

  // Close modal functionality
  modalClose.addEventListener("click", function () {
    closeModal(modal);
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  document.body.appendChild(modal);

  // Animate in
  setTimeout(() => {
    modal.style.opacity = "1";
    modalContent.style.transform = "scale(1)";
  }, 10);
}

// Close modal
function closeModal(modal) {
  const modalContent = modal.querySelector(".modal-content");
  modal.style.opacity = "0";
  modalContent.style.transform = "scale(0.8)";

  setTimeout(() => {
    document.body.removeChild(modal);
  }, 300);
}

// Setup real-time updates
function setupRealTimeUpdates() {
  // Simulate real-time updates
  setInterval(() => {
    checkForNewUpdates();
  }, 30000); // Check every 30 seconds
}

// Check for new updates
function checkForNewUpdates() {
  const currentTime = new Date();
  if (!lastUpdateTime || currentTime - lastUpdateTime > 300000) {
    // 5 minutes
    lastUpdateTime = currentTime;

    // Simulate new update
    if (Math.random() > 0.7) {
      // 30% chance
      showNewUpdateNotification();
    }
  }
}

// Show new update notification
function showNewUpdateNotification() {
  if (window.JetEscape) {
    window.JetEscape.showMissionNotification(
      "New mission update available!",
      "info"
    );
  }
}

// Add search functionality
function addSearchFunctionality() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search updates...";
  searchInput.className = "update-search";
  searchInput.style.cssText = `
        width: 100%;
        max-width: 300px;
        padding: 0.75rem;
        border: 2px solid var(--cloud-cover);
        border-radius: var(--cockpit-radius);
        background: var(--mission-mood);
        color: var(--sky-glow);
        margin-bottom: 2rem;
        font-family: var(--font-family-primary);
    `;

  // Insert search input before the first section
  const firstSection = document.querySelector(".system-terminal");
  if (firstSection) {
    firstSection.parentNode.insertBefore(searchInput, firstSection);
  }

  // Add search functionality
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const allCards = document.querySelectorAll(".log-card, .diary-card");

    allCards.forEach((card) => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      const content = card
        .querySelector(".card-content")
        .textContent.toLowerCase();

      if (title.includes(searchTerm) || content.includes(searchTerm)) {
        card.style.display = "block";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    });
  });
}

// Add update sorting
function addUpdateSorting() {
  const sortSelect = document.createElement("select");
  sortSelect.className = "update-sort";
  sortSelect.innerHTML = `
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
    `;
  sortSelect.style.cssText = `
        padding: 0.5rem;
        border: 2px solid var(--cloud-cover);
        border-radius: var(--cockpit-radius);
        background: var(--mission-mood);
        color: var(--sky-glow);
        margin-left: 1rem;
        font-family: var(--font-family-primary);
    `;

  // Insert sort select next to search
  const searchInput = document.querySelector(".update-search");
  if (searchInput) {
    searchInput.parentNode.insertBefore(sortSelect, searchInput.nextSibling);
  }

  // Add sorting functionality
  sortSelect.addEventListener("change", function () {
    const sortType = this.value;
    sortUpdates(sortType);
  });
}

// Sort updates
function sortUpdates(sortType) {
  const logsContainer = document.getElementById("logsGrid");
  const diariesContainer = document.getElementById("diariesGrid");

  if (logsContainer) {
    const logCards = Array.from(logsContainer.children);
    sortCards(logCards, sortType);
    logCards.forEach((card) => logsContainer.appendChild(card));
  }

  if (diariesContainer) {
    const diaryCards = Array.from(diariesContainer.children);
    sortCards(diaryCards, sortType);
    diaryCards.forEach((card) => diariesContainer.appendChild(card));
  }
}

// Sort cards helper function
function sortCards(cards, sortType) {
  cards.sort((a, b) => {
    const titleA = a.querySelector(".card-title").textContent;
    const titleB = b.querySelector(".card-title").textContent;
    const dateA = a.querySelector(".log-date, .diary-date")?.textContent || "";
    const dateB = b.querySelector(".log-date, .diary-date")?.textContent || "";

    switch (sortType) {
      case "date-desc":
        return new Date(dateB) - new Date(dateA);
      case "date-asc":
        return new Date(dateA) - new Date(dateB);
      case "title-asc":
        return titleA.localeCompare(titleB);
      case "title-desc":
        return titleB.localeCompare(titleA);
      default:
        return 0;
    }
  });
}

// Add update statistics
function addUpdateStatistics() {
  const statsContainer = document.createElement("div");
  statsContainer.className = "update-stats";
  statsContainer.innerHTML = `
        <div class="stat-item">
            <span class="stat-number" id="totalUpdates">0</span>
            <span class="stat-label">Total Updates</span>
        </div>
        <div class="stat-item">
            <span class="stat-number" id="systemLogs">0</span>
            <span class="stat-label">System Logs</span>
        </div>
        <div class="stat-item">
            <span class="stat-number" id="pilotDiaries">0</span>
            <span class="stat-label">Pilot Diaries</span>
        </div>
    `;

  statsContainer.style.cssText = `
        display: flex;
        justify-content: space-around;
        margin-bottom: 2rem;
        padding: 1rem;
        background: var(--mission-mood);
        border-radius: var(--cockpit-radius);
        border: 1px solid var(--cloud-cover);
    `;

  const statItems = statsContainer.querySelectorAll(".stat-item");
  statItems.forEach((item) => {
    item.style.cssText = `
            text-align: center;
            flex: 1;
        `;

    const statNumber = item.querySelector(".stat-number");
    statNumber.style.cssText = `
            display: block;
            font-size: 2rem;
            font-weight: 700;
            color: var(--afterburner-orange);
        `;

    const statLabel = item.querySelector(".stat-label");
    statLabel.style.cssText = `
            display: block;
            font-size: 0.9rem;
            color: var(--altitude-light);
            margin-top: 0.5rem;
        `;
  });

  // Insert stats before the first section
  const firstSection = document.querySelector(".system-terminal");
  if (firstSection) {
    firstSection.parentNode.insertBefore(statsContainer, firstSection);
  }

  // Update statistics
  updateStatistics();
}

// Update statistics
function updateStatistics() {
  const logCards = document.querySelectorAll(".log-card");
  const diaryCards = document.querySelectorAll(".diary-card");

  document.getElementById("totalUpdates").textContent =
    logCards.length + diaryCards.length;
  document.getElementById("systemLogs").textContent = logCards.length;
  document.getElementById("pilotDiaries").textContent = diaryCards.length;
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeMissionUpdates();
  addSearchFunctionality();
  addUpdateSorting();
  addUpdateStatistics();

  // Add CSS for additional styles
  const additionalStyles = document.createElement("style");
  additionalStyles.textContent = `
        .update-search:focus,
        .update-sort:focus {
            outline: none;
            border-color: var(--thrust-blue);
            box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
        }
        
        .diary-modal .modal-body {
            line-height: 1.8;
        }
        
        .diary-content {
            margin-bottom: 1.5rem;
            color: var(--altitude-light);
        }
        
        .diary-meta {
            display: flex;
            justify-content: space-between;
            color: var(--jet-stream);
            font-size: 0.9rem;
        }
    `;
  document.head.appendChild(additionalStyles);
});

// Export functions for use in other modules
window.MissionUpdates = {
  initializeMissionUpdates,
  filterUpdates,
  openDiaryReader,
  sortUpdates,
  updateStatistics,
};
