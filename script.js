// =============== THEME TOGGLE ===============
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.dataset.theme =
        document.body.dataset.theme === "dark" ? "light" : "dark";
});

// =============== MOBILE SIDEBAR ===============
const mobileToggle = document.getElementById("mobile-nav-toggle");
const sidebar = document.getElementById("mobile-sidebar");
const mobileClose = document.querySelector(".mobile-close-btn");

mobileToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

mobileClose.addEventListener("click", () => {
    sidebar.classList.remove("open");
});

// Close sidebar when clicking outside (mobile only)
document.addEventListener("click", (e) => {
    if (window.innerWidth <= 780) {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove("open");
        }
    }
});


// =============== PROJECT MODAL ===============
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalTech = document.getElementById("modal-tech");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const modalClose = document.querySelector(".modal-close");
const modalCloseBtn = document.getElementById("modal-close-btn");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const data = JSON.parse(card.dataset.project);

        modalTitle.textContent = data.title;
        modalTech.textContent = data.tech;
        modalDesc.textContent = data.desc;
        modalLink.href = data.link;

        modal.setAttribute("aria-hidden", "false");
    });
});

// Close modal button (X)
modalClose.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
});

// Close modal button (Close)
modalCloseBtn.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
});

// Close modal when clicking outside panel
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.setAttribute("aria-hidden", "true");
    }
});

// Escape key closes modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.setAttribute("aria-hidden", "true");
        sidebar.classList.remove("open");
    }
});


// =============== YEAR AUTO UPDATE ===============
document.getElementById("year").textContent = new Date().getFullYear();
