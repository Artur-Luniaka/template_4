// Jet Escape - Contact Hangar

// Aviation-themed contact functions
let transmissionQueue = [];
let contactFormData = {};
let mapInitialized = false;

// Initialize contact hangar
function initializeContactHangar() {
  console.log("📞 Initializing contact hangar systems...");
  setupTransmissionForm();
  initializeMapDisplay();
  setupContactValidation();
  addFormAnimations();
}

// Setup transmission form
function setupTransmissionForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    processTransmission(this);
  });

  // Add real-time validation
  const formInputs = contactForm.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      clearFieldError(this);
    });
  });
}

// Process transmission
function processTransmission(form) {
  const formData = new FormData(form);
  const transmissionData = {
    pilotName: formData.get("pilotName"),
    pilotEmail: formData.get("pilotEmail"),
    missionMessage: formData.get("missionMessage"),
    timestamp: new Date().toISOString(),
    transmissionId: generateTransmissionId(),
  };

  // Validate transmission
  const validationErrors = validateTransmission(transmissionData);

  if (validationErrors.length > 0) {
    displayValidationErrors(validationErrors);
    return;
  }

  // Add to transmission queue
  transmissionQueue.push(transmissionData);

  // Show success message
  showTransmissionSuccess(transmissionData);

  // Clear form
  form.reset();

  // Store in localStorage
  storeTransmission(transmissionData);
}

// Validate transmission
function validateTransmission(data) {
  const errors = [];

  if (!data.pilotName.trim()) {
    errors.push("Pilot name is required");
  } else if (data.pilotName.length < 2) {
    errors.push("Pilot name must be at least 2 characters");
  }

  if (!data.pilotEmail.trim()) {
    errors.push("Email frequency is required");
  } else if (!isValidEmail(data.pilotEmail)) {
    errors.push("Invalid email frequency format");
  }

  if (!data.missionMessage.trim()) {
    errors.push("Mission report is required");
  } else if (data.missionMessage.length < 10) {
    errors.push("Mission report must be at least 10 characters");
  }

  return errors;
}

// Validate individual field
function validateField(field) {
  const fieldName = field.name;
  const fieldValue = field.value.trim();

  let isValid = true;
  let errorMessage = "";

  switch (fieldName) {
    case "pilotName":
      if (!fieldValue) {
        isValid = false;
        errorMessage = "Pilot name is required";
      } else if (fieldValue.length < 2) {
        isValid = false;
        errorMessage = "Pilot name must be at least 2 characters";
      }
      break;

    case "pilotEmail":
      if (!fieldValue) {
        isValid = false;
        errorMessage = "Email frequency is required";
      } else if (!isValidEmail(fieldValue)) {
        isValid = false;
        errorMessage = "Invalid email frequency format";
      }
      break;

    case "missionMessage":
      if (!fieldValue) {
        isValid = false;
        errorMessage = "Mission report is required";
      } else if (fieldValue.length < 10) {
        isValid = false;
        errorMessage = "Mission report must be at least 10 characters";
      }
      break;
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearFieldError(field);
  }

  return isValid;
}

// Show field error
function showFieldError(field, message) {
  clearFieldError(field);

  const errorElement = document.createElement("div");
  errorElement.className = "field-error";
  errorElement.textContent = message;
  errorElement.style.cssText = `
        color: var(--warning-red);
        font-size: 0.8rem;
        margin-top: 0.25rem;
        animation: errorShake 0.5s ease;
    `;

  field.parentNode.appendChild(errorElement);
  field.style.borderColor = "var(--warning-red)";
}

// Clear field error
function clearFieldError(field) {
  const existingError = field.parentNode.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }
  field.style.borderColor = "var(--cloud-cover)";
}

// Display validation errors
function displayValidationErrors(errors) {
  if (window.JetEscape) {
    errors.forEach((error) => {
      window.JetEscape.showMissionNotification(error, "error");
    });
  }
}

// Show transmission success
function showTransmissionSuccess(data) {
  if (window.JetEscape) {
    window.JetEscape.showMissionNotification(
      "Transmission sent successfully!",
      "success"
    );
  }

  // Add success animation to form
  const form = document.getElementById("contactForm");
  form.style.transform = "scale(1.02)";
  form.style.boxShadow = "0 0 30px rgba(56, 161, 105, 0.3)";

  setTimeout(() => {
    form.style.transform = "scale(1)";
    form.style.boxShadow = "none";
  }, 1000);
}

// Generate transmission ID
function generateTransmissionId() {
  return "TX-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}

// Store transmission
function storeTransmission(data) {
  const transmissions = JSON.parse(
    localStorage.getItem("jetEscapeTransmissions") || "[]"
  );
  transmissions.push(data);
  localStorage.setItem("jetEscapeTransmissions", JSON.stringify(transmissions));
}

// Get stored transmissions
function getStoredTransmissions() {
  return JSON.parse(localStorage.getItem("jetEscapeTransmissions") || "[]");
}

// Initialize map display
function initializeMapDisplay() {
  const mapContainer = document.querySelector(".map-container iframe");
  if (!mapContainer || mapInitialized) return;

  mapInitialized = true;

  // Add map loading animation
  mapContainer.style.opacity = "0";
  mapContainer.style.transform = "scale(0.9)";

  mapContainer.addEventListener("load", function () {
    mapContainer.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    mapContainer.style.opacity = "1";
    mapContainer.style.transform = "scale(1)";
  });
}

// Setup contact validation
function setupContactValidation() {
  const contactItems = document.querySelectorAll(".contact-item");
  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      highlightContactItem(this);
    });
  });
}

// Highlight contact item
function highlightContactItem(item) {
  // Remove previous highlights
  document.querySelectorAll(".contact-item").forEach((i) => {
    i.style.background = "var(--mission-mood)";
    i.style.borderColor = "var(--cloud-cover)";
  });

  // Highlight clicked item
  item.style.background = "var(--turbo-flame)";
  item.style.borderColor = "var(--thrust-blue)";
  item.style.transform = "scale(1.02)";

  setTimeout(() => {
    item.style.transform = "scale(1)";
  }, 200);
}

// Add form animations
function addFormAnimations() {
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group, index) => {
    group.style.opacity = "0";
    group.style.transform = "translateY(20px)";

    setTimeout(() => {
      group.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      group.style.opacity = "1";
      group.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Add character counter
function addCharacterCounter() {
  const messageField = document.getElementById("missionMessage");
  if (!messageField) return;

  const counter = document.createElement("div");
  counter.className = "char-counter";
  counter.style.cssText = `
        text-align: right;
        font-size: 0.8rem;
        color: var(--jet-stream);
        margin-top: 0.25rem;
    `;

  messageField.parentNode.appendChild(counter);

  function updateCounter() {
    const length = messageField.value.length;
    const maxLength = 1000;
    counter.textContent = `${length}/${maxLength} characters`;

    if (length > maxLength * 0.9) {
      counter.style.color = "var(--warning-red)";
    } else if (length > maxLength * 0.7) {
      counter.style.color = "var(--golden-wing)";
    } else {
      counter.style.color = "var(--jet-stream)";
    }
  }

  messageField.addEventListener("input", updateCounter);
  updateCounter();
}

// Add form auto-save
function addFormAutoSave() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const formInputs = form.querySelectorAll("input, textarea");

  // Load saved data
  const savedData = JSON.parse(
    localStorage.getItem("jetEscapeFormDraft") || "{}"
  );
  Object.keys(savedData).forEach((key) => {
    const field = form.querySelector(`[name="${key}"]`);
    if (field) {
      field.value = savedData[key];
    }
  });

  // Auto-save on input
  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const formData = new FormData(form);
      const data = {};

      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      localStorage.setItem("jetEscapeFormDraft", JSON.stringify(data));
    });
  });

  // Clear draft on successful submission
  form.addEventListener("submit", function () {
    localStorage.removeItem("jetEscapeFormDraft");
  });
}

// Add contact statistics
function addContactStatistics() {
  const statsContainer = document.createElement("div");
  statsContainer.className = "contact-stats";
  statsContainer.innerHTML = `
        <div class="stat-item">
            <span class="stat-number" id="totalTransmissions">0</span>
            <span class="stat-label">Total Transmissions</span>
        </div>
        <div class="stat-item">
            <span class="stat-number" id="responseTime">24h</span>
            <span class="stat-label">Avg Response Time</span>
        </div>
        <div class="stat-item">
            <span class="stat-number" id="successRate">99%</span>
            <span class="stat-label">Success Rate</span>
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
            color: var(--radar-green);
        `;

    const statLabel = item.querySelector(".stat-label");
    statLabel.style.cssText = `
            display: block;
            font-size: 0.9rem;
            color: var(--altitude-light);
            margin-top: 0.5rem;
        `;
  });

  // Insert stats before the contact grid
  const contactGrid = document.querySelector(".contact-grid");
  if (contactGrid) {
    contactGrid.parentNode.insertBefore(statsContainer, contactGrid);
  }

  // Update statistics
  updateContactStatistics();
}

// Update contact statistics
function updateContactStatistics() {
  const transmissions = getStoredTransmissions();
  document.getElementById("totalTransmissions").textContent =
    transmissions.length;
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeContactHangar();
  addCharacterCounter();
  addFormAutoSave();
  addContactStatistics();

  // Add CSS for additional styles
  const additionalStyles = document.createElement("style");
  additionalStyles.textContent = `
        @keyframes errorShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .form-group {
            position: relative;
        }
        
        .field-error {
            position: absolute;
            bottom: -20px;
            left: 0;
            z-index: 10;
        }
        
        .contact-item {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .contact-item:hover {
            background: var(--turbo-flame);
            border-color: var(--thrust-blue);
        }
        
        .transmit-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .char-counter {
            font-family: var(--font-family-mono);
        }
    `;
  document.head.appendChild(additionalStyles);
});

// Export functions for use in other modules
window.ContactHangar = {
  initializeContactHangar,
  processTransmission,
  validateTransmission,
  storeTransmission,
  getStoredTransmissions,
  updateContactStatistics,
};
