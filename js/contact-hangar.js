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
    pilotPhone: formData.get("pilotPhone"),
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

  // Show processing overlay
  showProcessingOverlay();

  // Simulate processing delay
  setTimeout(() => {
    // Hide processing overlay
    hideProcessingOverlay();

    // Add to transmission queue
    transmissionQueue.push(transmissionData);

    // Show success modal
    showSuccessModal(transmissionData);

    // Clear form
    form.reset();

    // Store in localStorage
    storeTransmission(transmissionData);

    // Scroll to top
    scrollToTop();
  }, 2000); // 2 seconds processing time
}

// Validate transmission - simple validation for field completion only
function validateTransmission(data) {
  const errors = [];

  if (!data.pilotName.trim()) {
    errors.push("Pilot name field is required");
  }

  if (!data.pilotPhone.trim()) {
    errors.push("Phone field is required");
  }

  if (!data.missionMessage.trim()) {
    errors.push("Message field is required");
  }

  return errors;
}

// Validate individual field - simple validation for field completion only
function validateField(field) {
  const fieldValue = field.value.trim();
  const isValid = fieldValue.length > 0;

  if (!isValid) {
    showFieldError(field, "This field is required");
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

// Show processing overlay with 3 dots animation
function showProcessingOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "processingOverlay";
  overlay.innerHTML = `
    <div class="processing-container">
      <div class="processing-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <p class="processing-text">Processing transmission...</p>
    </div>
  `;

  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
  `;

  document.body.appendChild(overlay);

  // Add CSS for processing animation
  const processingStyles = document.createElement("style");
  processingStyles.textContent = `
    .processing-container {
      text-align: center;
      color: white;
    }
    
    .processing-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 20px;
    }
    
    .dot {
      width: 12px;
      height: 12px;
      background: var(--radar-green);
      border-radius: 50%;
      animation: processingPulse 1.4s ease-in-out infinite both;
    }
    
    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }
    .dot:nth-child(3) { animation-delay: 0s; }
    
    @keyframes processingPulse {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .processing-text {
      font-size: 1.2rem;
      font-weight: 500;
      margin: 0;
      color: var(--radar-green);
    }
  `;
  document.head.appendChild(processingStyles);
}

// Hide processing overlay
function hideProcessingOverlay() {
  const overlay = document.getElementById("processingOverlay");
  if (overlay) {
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.3s ease";
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
}

// Show success modal
function showSuccessModal(data) {
  const modal = document.createElement("div");
  modal.id = "successModal";
  modal.innerHTML = `
    <div class="success-modal-content">
      <div class="success-icon">✓</div>
      <h3>Transmission Successful!</h3>
      <p>Your message has been sent to mission control.</p>
      <p class="transmission-id">ID: ${data.transmissionId}</p>
      <button class="close-modal-btn">Continue</button>
    </div>
  `;

  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    backdrop-filter: blur(5px);
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  document.body.appendChild(modal);

  // Add CSS for success modal
  const modalStyles = document.createElement("style");
  modalStyles.textContent = `
    .success-modal-content {
      background: var(--mission-mood);
      border: 2px solid var(--radar-green);
      border-radius: var(--cockpit-radius);
      padding: 2rem;
      text-align: center;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      transform: scale(0.8);
      transition: transform 0.3s ease;
    }
    
    .success-icon {
      width: 60px;
      height: 60px;
      background: var(--radar-green);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: white;
      margin: 0 auto 1rem;
      animation: successPulse 0.6s ease;
    }
    
    @keyframes successPulse {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    .success-modal-content h3 {
      color: var(--radar-green);
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }
    
    .success-modal-content p {
      color: var(--jet-stream);
      margin: 0 0 0.5rem;
    }
    
    .transmission-id {
      font-family: var(--font-family-mono);
      font-size: 0.9rem;
      color: var(--altitude-light);
      margin-bottom: 1.5rem;
    }
    
    .close-modal-btn {
      background: var(--radar-green);
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: var(--cockpit-radius);
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .close-modal-btn:hover {
      background: var(--thrust-blue);
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(modalStyles);

  // Show modal with animation
  setTimeout(() => {
    modal.style.opacity = "1";
    modal.querySelector(".success-modal-content").style.transform = "scale(1)";
  }, 100);

  // Close modal on button click
  modal.querySelector(".close-modal-btn").addEventListener("click", () => {
    modal.style.opacity = "0";
    modal.querySelector(".success-modal-content").style.transform =
      "scale(0.8)";
    setTimeout(() => {
      modal.remove();
    }, 300);
  });

  // Close modal on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.opacity = "0";
      modal.querySelector(".success-modal-content").style.transform =
        "scale(0.8)";
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  });
}

// Scroll to top of page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
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
