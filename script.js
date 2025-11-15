function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

document.querySelector(".quote-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! Your quote request has been submitted.");
});
