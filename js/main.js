// Main JavaScript file for all pages

// DOM Elements
const cookieBar = document.getElementById("cookieBar");
const acceptCookiesBtn = document.getElementById("acceptCookies");
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const learnMoreBtn = document.getElementById("learnMoreBtn");
const newsletterForm = document.getElementById("newsletterForm");

// Cookie Bar
function showCookieBar() {
  if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      cookieBar.classList.add("show");
    }, 1000);
  }
}

function acceptCookies() {
  localStorage.setItem("cookiesAccepted", "true");
  cookieBar.classList.remove("show");
}

// Mobile Menu
function toggleMenu() {
  navList.classList.toggle("show");

  // Toggle hamburger to X
  const spans = menuToggle.querySelectorAll("span");
  if (navList.classList.contains("show")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
}

// Modal
function showModal() {
  if (!localStorage.getItem("modalShown")) {
    setTimeout(() => {
      modal.classList.add("show");
      localStorage.setItem("modalShown", "true");
    }, 3000);
  }
}

function closeModalFunc() {
  modal.classList.remove("show");
}

// Newsletter Form
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;

  // Simulate form submission
  console.log(`Newsletter subscription for: ${email}`);

  // Show success message
  alert("Thank you for subscribing to our newsletter!");

  // Reset form
  e.target.reset();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Show cookie bar
  showCookieBar();

  // Show modal (only on home page)
  if (
    window.location.pathname === "/" ||
    window.location.pathname.includes("index.html")
  ) {
    showModal();
  }

  // Event listeners
  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener("click", acceptCookies);
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunc);
  }

  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", () => {
      document
        .querySelector(".game-info")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navList.classList.contains("show") && !e.target.closest(".main-nav")) {
      toggleMenu();
    }
  });

  // Modal form submission
  const modalForm = document.getElementById("modalForm");
  if (modalForm) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input[type="email"]').value;

      // Simulate form submission
      console.log(`Modal form submission: ${email}`);

      // Show success message
      alert("Thank you for signing up!");

      // Close modal and reset form
      closeModalFunc();
      e.target.reset();
    });
  }
});

// Helper Functions
function fetchJSON(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
      return null;
    });
}
