// Jet Escape - Content Loader with Aviation Theme

// Aviation-themed content loading functions
let missionData = {};
let pilotCommunications = [];
let airspaceZones = [];
let hangarUpgrades = [];
let systemLogs = [];
let pilotDiaries = [];
let contactInfo = {};

// Load mission data from JSON
async function loadMissionData() {
  try {
    console.log("📡 Loading mission data from command center...");
    const response = await fetch("data/mission-data.json");
    missionData = await response.json();
    return missionData;
  } catch (error) {
    console.error("❌ Failed to load mission data:", error);
    return getDefaultMissionData();
  }
}

// Load pilot communications
async function loadPilotCommunications() {
  try {
    console.log("🎤 Loading pilot communications...");
    const response = await fetch("data/pilot-voices.json");
    pilotCommunications = await response.json();
    return pilotCommunications;
  } catch (error) {
    console.error("❌ Failed to load pilot communications:", error);
    return getDefaultPilotCommunications();
  }
}

// Load airspace zones
async function loadAirspaceZones() {
  try {
    console.log("🗺️ Loading airspace zones...");
    const response = await fetch("data/sky-zones.json");
    airspaceZones = await response.json();
    return airspaceZones;
  } catch (error) {
    console.error("❌ Failed to load airspace zones:", error);
    return getDefaultAirspaceZones();
  }
}

// Load hangar upgrades
async function loadHangarUpgrades() {
  try {
    console.log("🔧 Loading hangar upgrades...");
    const response = await fetch("data/upgrades-hangar.json");
    hangarUpgrades = await response.json();
    return hangarUpgrades;
  } catch (error) {
    console.error("❌ Failed to load hangar upgrades:", error);
    return getDefaultHangarUpgrades();
  }
}

// Load system logs
async function loadSystemLogs() {
  try {
    console.log("📊 Loading system logs...");
    const response = await fetch("data/system-logs.json");
    systemLogs = await response.json();
    return systemLogs;
  } catch (error) {
    console.error("❌ Failed to load system logs:", error);
    return getDefaultSystemLogs();
  }
}

// Load pilot diaries
async function loadPilotDiaries() {
  try {
    console.log("📝 Loading pilot diaries...");
    const response = await fetch("data/pilot-diaries.json");
    pilotDiaries = await response.json();
    return pilotDiaries;
  } catch (error) {
    console.error("❌ Failed to load pilot diaries:", error);
    return getDefaultPilotDiaries();
  }
}

// Load contact information
async function loadContactInfo() {
  try {
    console.log("📞 Loading contact information...");
    const response = await fetch("data/contact-info.json");
    contactInfo = await response.json();
    return contactInfo;
  } catch (error) {
    console.error("❌ Failed to load contact information:", error);
    return getDefaultContactInfo();
  }
}

// Render features grid
function renderFeaturesGrid(containerId, features) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const getFeatureIcon = (type) => {
    const icons = {
      Combat: "⚔️",
      Gameplay: "🎮",
      Mission: "🎯",
      Environment: "🌪️",
      AI: "🤖",
      Progression: "📈",
    };
    return icons[type] || "🚀";
  };

  container.innerHTML = features
    .map(
      (feature) => `
        <div class="feature-card">
            <div class="feature-header">
                <div class="feature-icon-large">${getFeatureIcon(
                  feature.type
                )}</div>
                <h3 class="card-title">${feature.title}</h3>
            </div>
            <div class="card-content">${feature.description}</div>
            <div class="card-meta">
                <span class="feature-type">${feature.type}</span>
                <span class="feature-rating">⭐ ${feature.rating}/5</span>
            </div>
        </div>
    `
    )
    .join("");
}

// Render pilot voices
function renderPilotVoices(containerId, voices) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Pilot background images array
  const pilotBackgrounds = [
    "linear-gradient(135deg, rgba(0, 123, 255, 0.8), rgba(0, 86, 179, 0.8)), url('../img/jetpack-hero.jpg')",
    "linear-gradient(135deg, rgba(220, 53, 69, 0.8), rgba(173, 42, 54, 0.8)), url('../img/jetpack-hero.jpg')",
    "linear-gradient(135deg, rgba(40, 167, 69, 0.8), rgba(28, 117, 48, 0.8)), url('../img/jetpack-hero.jpg')",
    "linear-gradient(135deg, rgba(255, 193, 7, 0.8), rgba(198, 149, 5, 0.8)), url('../img/jetpack-hero.jpg')",
  ];

  container.innerHTML = voices
    .map(
      (voice, index) => `
        <div class="voice-card" style="background: ${
          pilotBackgrounds[index % pilotBackgrounds.length]
        }; background-size: cover; background-position: center;">
            <div class="voice-card-overlay">
                <h3 class="card-title">${voice.pilotName}</h3>
                <div class="card-content">"${voice.comment}"</div>
                <div class="card-meta">
                    <span class="pilot-rank">${voice.rank}</span>
                    <span class="mission-count">Missions: ${
                      voice.missionsCompleted
                    }</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Render sky zones
function renderSkyZones(containerId, zones) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = zones
    .map(
      (zone) => `
        <div class="zone-card">
            <h3 class="card-title">${zone.name}</h3>
            <div class="card-content">${zone.description}</div>
            <div class="card-meta">
                <span class="zone-difficulty">Difficulty: ${zone.difficulty}</span>
                <span class="zone-altitude">Altitude: ${zone.altitude}</span>
            </div>
        </div>
    `
    )
    .join("");
}

// Render upgrades
function renderUpgrades(containerId, upgrades) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Upgrade background images array - using the same image as Sky Zones section
  const upgradeBackgrounds = [
    "linear-gradient(135deg, rgba(0, 123, 255, 0.8), rgba(0, 86, 179, 0.8)), url('../img/jetpack-section.jpg')",
    "linear-gradient(135deg, rgba(220, 53, 69, 0.8), rgba(173, 42, 54, 0.8)), url('../img/jetpack-section.jpg')",
    "linear-gradient(135deg, rgba(40, 167, 69, 0.8), rgba(28, 117, 48, 0.8)), url('../img/jetpack-section.jpg')",
    "linear-gradient(135deg, rgba(255, 193, 7, 0.8), rgba(198, 149, 5, 0.8)), url('../img/jetpack-section.jpg')",
    "linear-gradient(135deg, rgba(111, 66, 193, 0.8), rgba(88, 53, 154, 0.8)), url('../img/jetpack-section.jpg')",
    "linear-gradient(135deg, rgba(253, 126, 20, 0.8), rgba(217, 108, 18, 0.8)), url('../img/jetpack-section.jpg')",
    "linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(14, 159, 110, 0.8)), url('../img/jetpack-section.jpg')",
    "linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.8)), url('../img/jetpack-section.jpg')",
  ];

  // Get upgrade type icons
  const getUpgradeIcon = (type) => {
    const icons = {
      Electronics: "⚡",
      Defense: "🛡️",
      Performance: "🚀",
      Weapons: "🎯",
    };
    return icons[type] || "🔧";
  };

  container.innerHTML = upgrades
    .map(
      (upgrade, index) => `
        <div class="upgrade-card" style="background: ${
          upgradeBackgrounds[index % upgradeBackgrounds.length]
        }; background-size: cover; background-position: center;">
            <div class="upgrade-card-overlay">
                <div class="upgrade-header">
                    <div class="upgrade-icon">${getUpgradeIcon(
                      upgrade.type
                    )}</div>
                    <h3 class="card-title">${upgrade.name}</h3>
                </div>
                <div class="card-content">${upgrade.description}</div>
                <div class="card-meta">
                    <span class="upgrade-cost">Cost: ${upgrade.cost}</span>
                    <span class="upgrade-type">${upgrade.type}</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Render system logs
function renderSystemLogs(containerId, logs) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = logs
    .map(
      (log) => `
        <div class="log-card">
            <div class="log-card-background"></div>
            <div class="log-card-overlay">
                <h3 class="card-title">${log.title}</h3>
                <div class="card-content">${log.content}</div>
                <div class="card-meta">
                    <span class="log-date">${log.date}</span>
                    <span class="log-version">v${log.version}</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Render pilot diaries
function renderPilotDiaries(containerId, diaries) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = diaries
    .map(
      (diary) => `
        <div class="diary-card">
            <div class="diary-card-background"></div>
            <div class="diary-card-overlay">
                <h3 class="card-title">${diary.title}</h3>
                <div class="card-content">${diary.story}</div>
                <div class="card-meta">
                    <span class="diary-author">By ${diary.author}</span>
                    <span class="diary-date">${diary.date}</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Render contact information
function renderContactInfo(containerId, contactData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
        <div class="contact-item">
            <span class="contact-label">Email:</span>
            <a href="mailto:${contactData.email}" class="contact-link">${contactData.email}</a>
        </div>
        <div class="contact-item">
            <span class="contact-label">Phone:</span>
            <a href="tel:${contactData.phone}" class="contact-link">${contactData.phone}</a>
        </div>
        <div class="contact-item">
            <span class="contact-label">Base:</span>
            <span class="contact-text">${contactData.location}</span>
        </div>
    `;
}

// Render briefing content
function renderBriefingContent(containerId, briefingData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
        <div class="briefing-card">
            <div class="briefing-content">
                <div class="briefing-section">
                    <div class="section-header">
                        <h3 class="section-title">Mission Objectives</h3>
                    </div>
                    <p class="section-text">${briefingData.objectives}</p>
                </div>
                <div class="briefing-section">
                    <div class="section-header">
                        <h3 class="section-title">Controls</h3>
                    </div>
                    <p class="section-text">${briefingData.controls}</p>
                </div>
                <div class="briefing-section">
                    <div class="section-header">
                        <h3 class="section-title">Strategy</h3>
                    </div>
                    <p class="section-text">${briefingData.strategy}</p>
                </div>
            </div>
        </div>
    `;
}

// Default data fallbacks
function getDefaultMissionData() {
  return {
    features: [
      {
        title: "High-Speed Combat",
        description:
          "Experience intense dogfights at supersonic speeds with realistic physics and dynamic weather conditions.",
        type: "Combat",
        rating: 5,
      },
      {
        title: "Advanced Jet Controls",
        description:
          "Master the art of aerial combat with intuitive controls and realistic flight mechanics.",
        type: "Gameplay",
        rating: 5,
      },
      {
        title: "Epic Escape Missions",
        description:
          "Navigate through increasingly challenging scenarios as you fight to escape enemy territory.",
        type: "Mission",
        rating: 5,
      },
    ],
    briefing: {
      objectives:
        "Your mission is to escape enemy airspace while avoiding detection and engaging hostile aircraft when necessary.",
      controls:
        "Use WASD for movement, Space for afterburner, Mouse for targeting, and Shift for special maneuvers.",
      strategy:
        "Stay low to avoid radar detection, use terrain for cover, and conserve fuel for critical escape moments.",
    },
  };
}

function getDefaultPilotCommunications() {
  return [
    {
      pilotName: "Captain Maverick",
      comment:
        "The most intense aerial combat experience I've ever had. The escape missions are absolutely thrilling!",
      rank: "Ace Pilot",
      missionsCompleted: 150,
    },
    {
      pilotName: "Lieutenant Phoenix",
      comment:
        "Incredible graphics and smooth controls. The jet physics feel incredibly realistic.",
      rank: "Combat Pilot",
      missionsCompleted: 89,
    },
    {
      pilotName: "Commander Thunder",
      comment:
        "The upgrade system adds so much depth. Every mission feels unique and challenging.",
      rank: "Squadron Leader",
      missionsCompleted: 234,
    },
  ];
}

function getDefaultAirspaceZones() {
  return [
    {
      name: "Metropolitan Skies",
      description:
        "Navigate through dense urban environments with skyscrapers and complex air traffic patterns.",
      difficulty: "Medium",
      altitude: "500-2000m",
    },
    {
      name: "Canyon Corridors",
      description:
        "High-speed low-altitude flying through narrow canyon passages with tight turns and obstacles.",
      difficulty: "Hard",
      altitude: "100-500m",
    },
    {
      name: "Arctic Storm",
      description:
        "Extreme weather conditions with limited visibility and challenging ice formations.",
      difficulty: "Expert",
      altitude: "1000-5000m",
    },
  ];
}

function getDefaultHangarUpgrades() {
  return [
    {
      name: "Advanced Radar System",
      description:
        "Enhanced detection range and improved target tracking capabilities.",
      cost: "5000 Credits",
      type: "Electronics",
    },
    {
      name: "Stealth Coating",
      description: "Reduces radar signature and improves evasion capabilities.",
      cost: "8000 Credits",
      type: "Defense",
    },
    {
      name: "Enhanced Thrusters",
      description:
        "Increased speed and maneuverability for better escape potential.",
      cost: "12000 Credits",
      type: "Performance",
    },
  ];
}

function getDefaultSystemLogs() {
  return [
    {
      title: "Performance Optimization",
      content:
        "Improved frame rates and reduced loading times across all platforms.",
      date: "2024-12-15",
      version: "2.1.0",
    },
    {
      title: "New Mission Types",
      content:
        "Added stealth missions and time-based challenges to increase variety.",
      date: "2024-12-10",
      version: "2.0.5",
    },
    {
      title: "Bug Fixes",
      content:
        "Resolved collision detection issues and improved AI behavior patterns.",
      date: "2024-12-05",
      version: "2.0.3",
    },
  ];
}

function getDefaultPilotDiaries() {
  return [
    {
      title: "The Great Escape",
      story:
        "Flying through the canyon at Mach 2, I could feel the G-forces pushing me into my seat. The enemy missiles were closing in fast, but I knew the terrain like the back of my hand...",
      author: "Captain Maverick",
      date: "2024-12-12",
    },
    {
      title: "Arctic Challenge",
      story:
        "The storm was brutal, visibility was near zero, and the ice was forming on my canopy. But that's when I discovered the true potential of my upgraded radar system...",
      author: "Lieutenant Phoenix",
      date: "2024-12-08",
    },
    {
      title: "Urban Warfare",
      story:
        "Navigating between skyscrapers at high speed while avoiding civilian air traffic was the most intense experience of my career. The city became my ally...",
      author: "Commander Thunder",
      date: "2024-12-03",
    },
  ];
}

function getDefaultContactInfo() {
  return {
            email: "contact@playzentertainment.com",
        phone: "+61 3 9123 8801",
        location: "10 Smith Street, Fitzroy VIC 3065, Australia",
  };
}

// Initialize content loading based on current page
function initializeContentLoading() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  switch (currentPage) {
    case "index.html":
      loadHomepageContent();
      break;
    case "mission-updates.html":
      loadUpdatesContent();
      break;
    case "contact-hangar.html":
      loadContactContent();
      break;
  }
}

// Load homepage content
async function loadHomepageContent() {
  const [missionData, pilotVoices, upgrades] = await Promise.all([
    loadMissionData(),
    loadPilotCommunications(),
    loadHangarUpgrades(),
  ]);

  renderFeaturesGrid("featuresGrid", missionData.features);
  renderPilotVoices("voicesGrid", pilotVoices);
  renderUpgrades("upgradesGrid", upgrades);
  renderBriefingContent("briefingContent", missionData.briefing);
}

// Load updates content
async function loadUpdatesContent() {
  const [logs, diaries] = await Promise.all([
    loadSystemLogs(),
    loadPilotDiaries(),
  ]);

  renderSystemLogs("logsGrid", logs);
  renderPilotDiaries("diariesGrid", diaries);
}

// Load contact content
async function loadContactContent() {
  const contactData = await loadContactInfo();
  renderContactInfo("infoItems", contactData);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeContentLoading();
});

// Export functions for use in other modules
window.EscapeLoader = {
  loadMissionData,
  loadPilotCommunications,
  loadAirspaceZones,
  loadHangarUpgrades,
  loadSystemLogs,
  loadPilotDiaries,
  loadContactInfo,
  renderFeaturesGrid,
  renderPilotVoices,
  renderSkyZones,
  renderUpgrades,
  renderSystemLogs,
  renderPilotDiaries,
  renderContactInfo,
  renderBriefingContent,
};
