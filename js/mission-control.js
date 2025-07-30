// Jet Escape - Mission Control (Homepage)

// Aviation-themed homepage functions
let missionProgress = 0;
let combatScore = 0;
let escapeAttempts = 0;

// Initialize mission control
function initializeMissionControl() {
  console.log("🎯 Initializing mission control systems...");
  setupCombatSimulation();
  initializeEscapeTracking();
  setupPerformanceMonitoring();
}

// Setup combat simulation
function setupCombatSimulation() {
  const combatElements = document.querySelectorAll(".feature-card");
  combatElements.forEach((element, index) => {
    element.addEventListener("click", function () {
      triggerCombatSequence(index);
    });

    // Add hover effects
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(255, 107, 53, 0.3)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    });
  });
}

// Trigger combat sequence
function triggerCombatSequence(index) {
  console.log(`⚔️ Engaging combat sequence ${index + 1}...`);
  combatScore += 100;

  // Visual feedback
  const element = document.querySelectorAll(".feature-card")[index];
  element.style.background =
    "linear-gradient(45deg, var(--afterburner-orange), var(--thrust-blue))";
  element.style.color = "var(--pure-sky)";

  setTimeout(() => {
    element.style.background = "var(--mission-mood)";
    element.style.color = "var(--sky-glow)";
  }, 1000);

  // Show notification
  if (window.JetEscape) {
    window.JetEscape.showMissionNotification(
      "Combat sequence engaged!",
      "success"
    );
  }
}

// Initialize escape tracking
function initializeEscapeTracking() {
  const escapeElements = document.querySelectorAll(".zone-card");
  escapeElements.forEach((element, index) => {
    element.addEventListener("click", function () {
      initiateEscapeProtocol(index);
    });
  });
}

// Initiate escape protocol
function initiateEscapeProtocol(index) {
  console.log(`🏃‍♂️ Initiating escape protocol ${index + 1}...`);
  escapeAttempts++;

  const element = document.querySelectorAll(".zone-card")[index];
  element.style.borderColor = "var(--radar-green)";
  element.style.boxShadow = "0 0 20px rgba(56, 161, 105, 0.5)";

  setTimeout(() => {
    element.style.borderColor = "var(--cloud-cover)";
    element.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
  }, 2000);

  if (window.JetEscape) {
    window.JetEscape.showMissionNotification(
      "Escape protocol activated!",
      "info"
    );
  }
}

// Setup performance monitoring
function setupPerformanceMonitoring() {
  const upgradeElements = document.querySelectorAll(".upgrade-card");
  upgradeElements.forEach((element, index) => {
    element.addEventListener("click", function () {
      activateUpgrade(index);
    });
  });
}

// Activate upgrade
function activateUpgrade(index) {
  console.log(`🔧 Activating upgrade ${index + 1}...`);

  const element = document.querySelectorAll(".upgrade-card")[index];
  element.style.borderColor = "var(--golden-wing)";
  element.style.boxShadow = "0 0 20px rgba(214, 158, 46, 0.5)";

  setTimeout(() => {
    element.style.borderColor = "var(--cloud-cover)";
    element.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
  }, 2000);

  if (window.JetEscape) {
    window.JetEscape.showMissionNotification(
      "Upgrade activated successfully!",
      "success"
    );
  }
}

// Add typing effect to slogan
function addTypingEffect() {
  const sloganElement = document.querySelector(".escape-slogan");
  if (!sloganElement) return;

  const originalText = sloganElement.textContent;
  sloganElement.textContent = "";

  let index = 0;
  const typeInterval = setInterval(() => {
    sloganElement.textContent += originalText[index];
    index++;

    if (index >= originalText.length) {
      clearInterval(typeInterval);
    }
  }, 100);
}

// Add particle effects
function addParticleEffects() {
  const heroSection = document.querySelector(".afterburner-zone");
  if (!heroSection) return;

  // Create particles
  for (let i = 0; i < 50; i++) {
    createParticle(heroSection);
  }
}

// Create individual particle
function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--afterburner-orange);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat 10s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.1};
    `;

  container.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 10000);
}

// Add CSS for particle animation
function addParticleCSS() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${
                  Math.random() * 200 - 100
                }px);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize mission statistics
function initializeMissionStats() {
  const stats = {
    missionsCompleted: 0,
    totalFlightTime: 0,
    enemiesDestroyed: 0,
    escapeSuccessRate: 0,
  };

  // Store in localStorage
  localStorage.setItem("jetEscapeStats", JSON.stringify(stats));
}

// Update mission statistics
function updateMissionStats(newStats) {
  const currentStats = JSON.parse(
    localStorage.getItem("jetEscapeStats") || "{}"
  );
  const updatedStats = { ...currentStats, ...newStats };
  localStorage.setItem("jetEscapeStats", JSON.stringify(updatedStats));
}

// Get mission statistics
function getMissionStats() {
  return JSON.parse(localStorage.getItem("jetEscapeStats") || "{}");
}

// Add smooth scrolling to sections
function addSmoothScrolling() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Add intersection observer for animations
function addIntersectionAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeMissionControl();
  addTypingEffect();
  initializeMissionStats();
  addSmoothScrolling();
  addIntersectionAnimations();

  // Add CSS for animations
  const animationStyle = document.createElement("style");
  animationStyle.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card,
        .voice-card,
        .zone-card,
        .upgrade-card {
            transition: all 0.3s ease;
        }
    `;
  document.head.appendChild(animationStyle);
});

// Export functions for use in other modules
window.MissionControl = {
  initializeMissionControl,
  triggerCombatSequence,
  initiateEscapeProtocol,
  activateUpgrade,
  updateMissionStats,
  getMissionStats,
};
