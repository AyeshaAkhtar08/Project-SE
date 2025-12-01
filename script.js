// ------------------------------
// Sticky Navbar on Scroll
// ------------------------------
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
emailjs.init("XPcCcDHxEky3RTEtj"); // Replace with your EmailJS Public Key

const form = document.getElementById("quoteForm");
const statusDiv = document.getElementById("status");

if (!form) {
console.error("Form not found! Make sure the form ID is 'quoteForm'.");
return;
}

form.addEventListener("submit", function(e) {
e.preventDefault();

// Get input elements
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const companyInput = document.getElementById("company");
const detailsInput = document.getElementById("details");

// Check if elements exist
if (!fullNameInput || !emailInput || !detailsInput || !companyInput) {
  console.error("One or more form fields are missing!");
  return;
}

// Get trimmed values
// Get trimmed values safely
const fullName = fullNameInput.value.trim();
const email = emailInput.value.trim();
const company = companyInput?.value?.trim() || ""; // <-- safe now
const details = detailsInput.value.trim();


// Basic validation
if (!fullName || !email || !details) {
  statusDiv.innerText = "Please fill all required fields.";
  return;
}

// Disable submit button while sending
const submitBtn = form.querySelector("button");
submitBtn.disabled = true;
submitBtn.textContent = "Sending...";

// Send email via EmailJS
emailjs.send("service_ll9vcpt", "template_4vtge4h", {
  fullName: fullName,
  email: email,
  company: company,
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
