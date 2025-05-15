// Contact page specific JavaScript

// Helper function to fetch JSON data
async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch JSON:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Load contact info
  loadContactInfo();

  // Load FAQs
  loadFAQs();

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }
});

// Load contact info from JSON
function loadContactInfo() {
  const contactInfoElement = document.getElementById("contactInfo");

  if (!contactInfoElement) return;

  fetchJSON("./data/contacts.json").then((data) => {
    if (data && data.contactInfo) {
      contactInfoElement.innerHTML = `
                    <div class="contact-info-item">
                        <h3>Address</h3>
                        <p>${data.contactInfo.address}</p>
                    </div>
                    <div class="contact-info-item">
                        <h3>Email</h3>
                        <p>${data.contactInfo.email}</p>
                    </div>
                    <div class="contact-info-item">
                        <h3>Phone</h3>
                        <p>${data.contactInfo.phone}</p>
                    </div>
                    <div class="contact-info-item">
                        <h3>Working Hours</h3>
                        <p>${data.contactInfo.workingHours}</p>
                    </div>
                `;
    }
  });
}

// Load FAQs from JSON
function loadFAQs() {
  const faqContainerElement = document.getElementById("faqContainer");

  if (!faqContainerElement) return;

  fetchJSON("./data/contacts.json").then((data) => {
    if (data && data.faqs) {
      faqContainerElement.innerHTML = data.faqs
        .map(
          (faq) => `
                    <div class="faq-item">
                        <div class="faq-question">${faq.question}</div>
                        <div class="faq-answer">${faq.answer}</div>
                    </div>
                `
        )
        .join("");

      // Add event listeners to FAQ items
      const faqItems = document.querySelectorAll(".faq-item");
      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
          item.classList.toggle("active");
        });
      });
    }
  });
}

// Handle contact form submission
function handleContactFormSubmit(e) {
  e.preventDefault();

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Simulate form submission
  console.log(`Contact form submission:
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
    `);

  // Show success message
  alert("Thank you for your message! We will get back to you soon.");

  // Reset form
  e.target.reset();
}
