
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

const filterButtons = document.querySelectorAll(".filter-button");
const certCards = document.querySelectorAll(".cert-card");
const certSearch = document.getElementById("certSearch");
const noResults = document.getElementById("noResults");

let activeFilter = "all";

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Toggle navigation"
  );
  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Close the mobile menu after choosing a section
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";

    navItems.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Filter and search certifications
function updateCertifications() {
  const query = certSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  certCards.forEach((card) => {
    const category = card.dataset.category;
    const searchableText =
      (card.dataset.search || "") + " " + card.textContent;

    const matchesCategory =
      activeFilter === "all" || category === activeFilter;

    const matchesSearch = searchableText.toLowerCase().includes(query);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    updateCertifications();
  });
});

certSearch.addEventListener("input", updateCertifications);

// Highlight the current section in the navigation
if ("IntersectionObserver" in window) {
  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isCurrent);
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -65% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
}
