// Jet Escape - Core Aviation Functions

// Aviation-themed variables
let altitudeLog = [];
let missionStatus = "operational";
let thrustLevel = 0;
let escapeVelocity = 0;

// Core initialization function
function initializeFlightSystems() {
  console.log("🚀 Initializing Jet Escape flight systems...");
  loadCockpitHeader();
  loadHangarFooter();
  updateMissionStatus();
  initializeThrustControls();
}

// Load header component
async function loadCockpitHeader() {
  try {
    console.log("📡 Loading cockpit header...");
    const headerResponse = await fetch("cockpit-header.html");
    const headerContent = await headerResponse.text();
    const headerContainer = document.getElementById("cockpit-header-container");

    if (headerContainer) {
      console.log("✅ Header container found, inserting content...");
      headerContainer.innerHTML = headerContent;
      console.log("✅ Header content inserted, initializing burger menu...");
      initializeBurgerMenu();
    } else {
      console.error("❌ Header container not found!");
    }
  } catch (error) {
    console.error("❌ Failed to load cockpit header:", error);
  }
}

// Load footer component
async function loadHangarFooter() {
  try {
    const footerResponse = await fetch("hangar-footer.html");
    const footerContent = await footerResponse.text();
    const footerContainer = document.getElementById("hangar-footer-container");

    if (footerContainer) {
      footerContainer.innerHTML = footerContent;
      updateCopyrightYear();
    }
  } catch (error) {
    console.error("❌ Failed to load hangar footer:", error);
  }
}

// Initialize mobile burger menu
function initializeBurgerMenu() {
  console.log("🍔 Initializing burger menu...");

  const burgerButton = document.getElementById("burgerButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

  console.log("Burger button found:", !!burgerButton);
  console.log("Mobile menu found:", !!mobileMenu);
  console.log("Mobile menu overlay found:", !!mobileMenuOverlay);

  if (burgerButton && mobileMenu) {
    console.log("✅ All elements found, setting up event listeners...");

    burgerButton.addEventListener("click", function () {
      console.log("🍔 Burger button clicked!");
      mobileMenu.classList.toggle("active");
      burgerButton.classList.toggle("active");
      if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.toggle("active");
      }
      document.body.classList.toggle("menu-open");

      console.log("Menu active:", mobileMenu.classList.contains("active"));
      console.log(
        "Overlay active:",
        mobileMenuOverlay
          ? mobileMenuOverlay.classList.contains("active")
          : "N/A"
      );
    });

    // Close menu on link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        console.log("🔗 Menu link clicked, closing menu...");
        mobileMenu.classList.remove("active");
        burgerButton.classList.remove("active");
        if (mobileMenuOverlay) {
          mobileMenuOverlay.classList.remove("active");
        }
        document.body.classList.remove("menu-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(event.target) &&
        !burgerButton.contains(event.target)
      ) {
        console.log("🖱️ Clicked outside menu, closing...");
        mobileMenu.classList.remove("active");
        burgerButton.classList.remove("active");
        if (mobileMenuOverlay) {
          mobileMenuOverlay.classList.remove("active");
        }
        document.body.classList.remove("menu-open");
      }
    });
  } else {
    console.error("❌ Missing required elements for burger menu!");
  }
}

// Update copyright year
function updateCopyrightYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Update mission status
function updateMissionStatus() {
  const statusElements = document.querySelectorAll(".status-label");
  statusElements.forEach((element) => {
    element.textContent =
      missionStatus.charAt(0).toUpperCase() + missionStatus.slice(1);
  });
}

// Initialize thrust controls
function initializeThrustControls() {
  const playButton = document.getElementById("playButton");
  if (playButton) {
    playButton.addEventListener("click", function () {
      igniteAfterburners();
    });
  }
}

// Ignite afterburners function
function igniteAfterburners() {
  console.log("🔥 Igniting afterburners...");
  thrustLevel = 100;
  escapeVelocity = 2500;

  // Add visual feedback
  const button = document.getElementById("playButton");
  if (button) {
    button.textContent = "MISSION LAUNCHED!";
    button.style.background =
      "linear-gradient(45deg, var(--radar-green), var(--thrust-blue))";

    setTimeout(() => {
      button.textContent = "Launch Mission";
      button.style.background =
        "linear-gradient(45deg, var(--afterburner-orange), var(--thrust-blue))";
    }, 2000);
  }

  // Log altitude data
  altitudeLog.push({
    timestamp: new Date(),
    altitude: 0,
    velocity: escapeVelocity,
    thrust: thrustLevel,
  });
}

// Smooth scroll function
function smoothScrollToTarget(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Add scroll effects
function addScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(
    ".feature-card, .voice-card, .zone-card, .upgrade-card, .log-card, .diary-card"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}

// Form validation function
function validateTransmissionForm(formData) {
  const errors = [];

  if (!formData.get("pilotName").trim()) {
    errors.push("Pilot name is required");
  }

  if (!formData.get("pilotEmail").trim()) {
    errors.push("Email frequency is required");
  } else if (!isValidEmail(formData.get("pilotEmail"))) {
    errors.push("Invalid email frequency format");
  }

  if (!formData.get("missionMessage").trim()) {
    errors.push("Mission report is required");
  }

  return errors;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show notification function
function showMissionNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `mission-notification ${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: var(--cockpit-radius);
        color: var(--pure-sky);
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  // Set background based on type
  switch (type) {
    case "success":
      notification.style.background = "var(--radar-green)";
      break;
    case "error":
      notification.style.background = "var(--warning-red)";
      break;
    case "warning":
      notification.style.background = "var(--golden-wing)";
      break;
    default:
      notification.style.background = "var(--thrust-blue)";
  }

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Debounce function for performance
function debounceFunction(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttleFunction(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeFlightSystems();
  addScrollEffects();

  // Add smooth scrolling to all internal links
  document.addEventListener("click", function (e) {
    if (
      e.target.tagName === "A" &&
      e.target.getAttribute("href").startsWith("#")
    ) {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").substring(1);
      smoothScrollToTarget(targetId);
    }
  });
});

// Export functions for use in other modules
window.JetEscape = {
  initializeFlightSystems,
  loadCockpitHeader,
  loadHangarFooter,
  igniteAfterburners,
  smoothScrollToTarget,
  showMissionNotification,
  validateTransmissionForm,
  debounceFunction,
  throttleFunction,
};
