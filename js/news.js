// News page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Load news
  loadNews();

  // Filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Filter news
      const filter = button.getAttribute("data-filter");
      filterNews(filter);
    });
  });
});

// Global news data
let newsData = [];
let currentPage = 1;
const itemsPerPage = 6;

// Helper function to fetch JSON data
async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching JSON:", error);
    return null;
  }
}

// Load news from JSON
function loadNews() {
  const newsGridElement = document.getElementById("newsGrid");

  if (!newsGridElement) return;

  fetchJSON("./data/news.json").then((data) => {
    if (data && data.news) {
      newsData = data.news;

      // Display first page
      displayNews(newsData, currentPage);

      // Create pagination
      createPagination(newsData.length);
    }
  });
}

// Display news with pagination
function displayNews(news, page) {
  const newsGridElement = document.getElementById("newsGrid");

  if (!newsGridElement) return;

  // Calculate start and end index
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page items
  const currentItems = news.slice(startIndex, endIndex);

  // Display news
  newsGridElement.innerHTML = currentItems
    .map(
      (item) => `
        <div class="news-card" data-category="${item.category}">
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-content">
                <div class="news-date">${item.date}</div>
                <span class="news-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            </div>
        </div>
    `
    )
    .join("");

  // Update pagination
  updatePagination(page, Math.ceil(news.length / itemsPerPage));
}

// Create pagination
function createPagination(totalItems) {
  const paginationElement = document.getElementById("newsPagination");

  if (!paginationElement) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  let paginationHTML = "";

  // Previous button
  paginationHTML += `<button class="pagination-btn prev-btn" ${
    currentPage === 1 ? "disabled" : ""
  }>&lt;</button>`;

  // Page buttons
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button class="pagination-btn page-btn ${
      i === currentPage ? "active" : ""
    }" data-page="${i}">${i}</button>`;
  }

  // Next button
  paginationHTML += `<button class="pagination-btn next-btn" ${
    currentPage === totalPages ? "disabled" : ""
  }>&gt;</button>`;

  paginationElement.innerHTML = paginationHTML;

  // Add event listeners
  const prevBtn = paginationElement.querySelector(".prev-btn");
  const nextBtn = paginationElement.querySelector(".next-btn");
  const pageButtons = paginationElement.querySelectorAll(".page-btn");

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayNews(newsData, currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayNews(newsData, currentPage);
    }
  });

  pageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = Number.parseInt(button.getAttribute("data-page"));
      displayNews(newsData, currentPage);
    });
  });
}

// Update pagination
function updatePagination(currentPage, totalPages) {
  const paginationElement = document.getElementById("newsPagination");

  if (!paginationElement) return;

  const prevBtn = paginationElement.querySelector(".prev-btn");
  const nextBtn = paginationElement.querySelector(".next-btn");
  const pageButtons = paginationElement.querySelectorAll(".page-btn");

  // Update previous button
  prevBtn.disabled = currentPage === 1;

  // Update next button
  nextBtn.disabled = currentPage === totalPages;

  // Update page buttons
  pageButtons.forEach((button) => {
    const page = Number.parseInt(button.getAttribute("data-page"));
    if (page === currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Filter news
function filterNews(filter) {
  let filteredNews = [];

  if (filter === "all") {
    filteredNews = newsData;
  } else {
    filteredNews = newsData.filter(
      (item) => item.category.toLowerCase() === filter
    );
  }

  // Reset to first page
  currentPage = 1;

  // Display filtered news
  displayNews(filteredNews, currentPage);

  // Create pagination
  createPagination(filteredNews.length);
}
