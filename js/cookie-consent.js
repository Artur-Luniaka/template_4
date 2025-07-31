// Cookie Consent Management for Jet Escape
class CookieConsent {
  constructor() {
    this.cookieBar = document.getElementById("cookieConsent");
    this.acceptBtn = document.getElementById("acceptCookies");
    this.storageKey = "jetEscapeCookieConsent";
    this.isVisible = false;
    this.init();
  }

  init() {
    // Check if user has already accepted cookies
    if (!this.hasAcceptedCookies()) {
      this.showCookieBar();
      this.bindEvents();
      this.bindMobileMenuEvents();
    }
  }

  hasAcceptedCookies() {
    return localStorage.getItem(this.storageKey) === "accepted";
  }

  showCookieBar() {
    // Check if mobile menu is open before showing
    if (this.isMobileMenuOpen()) {
      return; // Don't show if mobile menu is open
    }

    // Small delay to ensure smooth animation
    setTimeout(() => {
      this.cookieBar.classList.add("show");
      this.isVisible = true;
    }, 1000);
  }

  hideCookieBar() {
    this.cookieBar.classList.remove("show");
    this.isVisible = false;
    // Remove from DOM after animation
    setTimeout(() => {
      this.cookieBar.style.display = "none";
    }, 500);
  }

  // Hide cookie bar temporarily (for mobile menu)
  hideCookieBarTemporary() {
    if (this.isVisible) {
      this.cookieBar.classList.remove("show");
      this.isVisible = false;
    }
  }

  // Show cookie bar if it was hidden temporarily
  showCookieBarIfNeeded() {
    if (
      !this.hasAcceptedCookies() &&
      !this.isVisible &&
      !this.isMobileMenuOpen()
    ) {
      setTimeout(() => {
        this.cookieBar.classList.add("show");
        this.isVisible = true;
      }, 300); // Small delay after menu closes
    }
  }

  isMobileMenuOpen() {
    const mobileMenu = document.getElementById("mobileMenu");
    return mobileMenu && mobileMenu.classList.contains("active");
  }

  bindMobileMenuEvents() {
    // Listen for mobile menu state changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const mobileMenu = mutation.target;
          if (mobileMenu.classList.contains("active")) {
            // Mobile menu opened - hide cookie bar
            this.hideCookieBarTemporary();
          } else {
            // Mobile menu closed - show cookie bar if needed
            this.showCookieBarIfNeeded();
          }
        }
      });
    });

    // Start observing the mobile menu
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      observer.observe(mobileMenu, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    // Also listen for body class changes (menu-open)
    const bodyObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const body = mutation.target;
          if (body.classList.contains("menu-open")) {
            // Menu is open - hide cookie bar
            this.hideCookieBarTemporary();
          } else {
            // Menu is closed - show cookie bar if needed
            this.showCookieBarIfNeeded();
          }
        }
      });
    });

    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  acceptCookies() {
    // Save to localStorage
    localStorage.setItem(this.storageKey, "accepted");

    // Hide the cookie bar with animation
    this.hideCookieBar();

    // Optional: Trigger any cookie-dependent functionality
    this.onCookiesAccepted();
  }

  onCookiesAccepted() {
    // You can add any additional functionality here
    // For example, initialize analytics, etc.
    console.log("Cookies accepted - Jet Escape mission ready");
  }

  bindEvents() {
    if (this.acceptBtn) {
      this.acceptBtn.addEventListener("click", () => {
        this.acceptCookies();
      });
    }
  }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CookieConsent();
});
