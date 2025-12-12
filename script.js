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
document.addEventListener("DOMContentLoaded", function () {

  // Correct EmailJS initialization
  emailjs.init("XPcCcDHxEky3RTEtj");


  const form = document.getElementById("quoteForm");
  const statusDiv = document.getElementById("status");

  if (!form) {
    console.error("Form not found! Ensure form ID is 'quoteForm'.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // SAFE GET FUNCTION
    const getValue = (id) => {
  const el = document.getElementById(id);

  if (!el) {
    console.error("Missing element:", id);
    return ""; // avoid error
  }

  return (el.value || "").trim();
};



    const firstName = getValue("firstName");
    const lastName  = getValue("lastName");
    const email     = getValue("email");
    const contact   = getValue("contact");
    const service   = getValue("service");
    const details   = getValue("details");

    if (!firstName || !lastName || !email || !contact || !service || !details) {
      statusDiv.innerText = "Please fill all required fields.";
      if(!service){
        statusDiv.innerText = "Please fill service required fields.";
      }
      return;
    }

    const submitBtn = form.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs
  .send("service_ll9vcpt", "template_4vtge4h", {
    firstName,
    lastName,
    email,
    contact,
    service,
    details,
    time: new Date().toLocaleString(),
  })
  .then((response) => {
    console.log("SUCCESS!", response.status, response.text);

    // Now send confirmation email to the client
    return emailjs.send("service_ll9vcpt", "template_a78kz45", {
      //to_email: email,        // client email
      firstName,
      lastName,
      email,
      contact,
      service,
      details,
      time: new Date().toLocaleString(),
    });
  })
  .then(() => {
    statusDiv.innerText = "Quotation request sent successfully!";
    submitBtn.textContent = "Submitted ✓";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      form.reset();
      statusDiv.innerText = "";
    }, 2500);
  })
  .catch((error) => {
    console.error("FAILED TO SEND EMAIL", error);
    statusDiv.innerText = "Failed to send email. Check console for details.";
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  });

  });
});


// ------------------------------
// Cookies Popup
// ------------------------------
const cookiePopup = document.getElementById('cookie-popup');
const acceptBtn = document.getElementById('accept-cookies');

if (!localStorage.getItem('cookiesAccepted')) {
  cookiePopup.style.display = 'flex';
} else {
  cookiePopup.style.display = 'none';
}

acceptBtn.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  cookiePopup.style.display = 'none';
});
