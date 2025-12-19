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

mobileToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
mobileClose.addEventListener("click", () => sidebar.classList.remove("open"));

// Close sidebar on outside click (mobile)
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
modalClose.addEventListener("click", () => modal.setAttribute("aria-hidden", "true"));
modalCloseBtn.addEventListener("click", () => modal.setAttribute("aria-hidden", "true"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.setAttribute("aria-hidden", "true"); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { modal.setAttribute("aria-hidden", "true"); sidebar.classList.remove("open"); } });

// =============== YEAR AUTO UPDATE ===============
document.getElementById("year").textContent = new Date().getFullYear();

// =============== SCROLL-SPY / ACTIVE LINK ===================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

function setActiveLink() {
    let index = sections.length;
    while(--index && window.scrollY + 150 < sections[index].offsetTop) {}
    navLinks.forEach(link => link.classList.remove("active"));
    if(navLinks[index]) navLinks[index].classList.add("active");
}
setActiveLink();
window.addEventListener("scroll", setActiveLink);

// Smooth scroll + close mobile sidebar on link click
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if(target) target.scrollIntoView({behavior: "smooth"});
        if(window.innerWidth <= 780) sidebar.classList.remove("open");
    });
});

// =============== FADE-IN SECTIONS ON SCROLL ===================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add("visible"); } });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));
