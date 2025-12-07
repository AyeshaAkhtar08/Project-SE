// ------------------------------
// Sticky Navbar on Scroll
// ------------------------------
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Optional: cursor grows on click
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

// ------------------------------
// Smooth Scroll to Section
// ------------------------------
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

// ------------------------------
// Reveal Sections on Scroll
// ------------------------------
const revealElements = document.querySelectorAll(".section, .service-card, .work-box, .quote-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.classList.remove("hidden");
      }
    });
  },
  { threshold: 0.15 }
);
revealElements.forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

// ------------------------------
// Quote Form Submit with EmailJS
// ------------------------------
document.addEventListener("DOMContentLoaded", function() {

  // Initialize EmailJS
  emailjs.init("XPcCcDHxEky3RTEtj");

  const form = document.getElementById("quoteForm");
  const statusDiv = document.getElementById("status");

  if (!form) {
    console.error("Form not found! Make sure the form ID is 'quoteForm'.");
    return;
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get input elements
    const firstName = document.getElementById("firstName")?.value.trim();
    const lastName = document.getElementById("lastName")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const contact = document.getElementById("contact")?.value.trim();
    const service = document.getElementById("service")?.value.trim();
    const details = document.getElementById("details")?.value.trim();

    // Basic validation
    if (!firstName || !lastName || !email || !contact || !service || !details) {
      statusDiv.innerText = "Please fill all required fields.";
      return;
    }

    // Disable submit button while sending
    const submitBtn = form.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Send email via EmailJS
    emailjs.send("service_ll9vcpt", "template_4vtge4h", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      service: service,
      details: details,
      time: new Date().toLocaleString()
    })
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      statusDiv.innerText = "Quotation request sent successfully!";
      submitBtn.textContent = "Submitted ✓";

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
        form.reset();
        statusDiv.innerText = "";
      }, 2500);
    })
    .catch(function(error) {
      console.error("FAILED TO SEND EMAIL", error);
      statusDiv.innerText = "Failed to send email. Check console for details.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    });

  });

});
const cookiePopup = document.getElementById('cookie-popup');
const acceptBtn = document.getElementById('accept-cookies');

// Check if user already accepted cookies
if (!localStorage.getItem('cookiesAccepted')) {
  cookiePopup.style.display = 'flex';
} else {
  cookiePopup.style.display = 'none';
}

acceptBtn.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  cookiePopup.style.display = 'none';
});
