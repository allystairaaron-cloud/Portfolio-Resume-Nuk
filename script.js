// THEME TOGGLE
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  const isDark = document.body.dataset.theme === "dark";
  document.body.dataset.theme = isDark ? "light" : "dark";
  themeToggle.setAttribute("aria-pressed", String(!isDark));
});

// MOBILE SIDEBAR
const mobileToggle = document.getElementById("mobile-nav-toggle");
const sidebar = document.getElementById("mobile-sidebar");
const closeBtn = document.querySelector(".mobile-close-btn");

mobileToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  mobileToggle.setAttribute("aria-expanded", sidebar.classList.contains("open"));
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
  mobileToggle.setAttribute("aria-expanded", "false");
});

// MODAL
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalTech = document.getElementById("modal-tech");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");

function openModal(data){
  modalTitle.textContent = data.title;
  modalTech.textContent = data.tech;
  modalDesc.textContent = data.desc;
  modalLink.href = data.link;
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".project-card").forEach(card=>{
  card.addEventListener("click",()=>{
    openModal(JSON.parse(card.dataset.project));
  });
  card.addEventListener("keydown",(e)=>{
    if(e.key==="Enter") openModal(JSON.parse(card.dataset.project));
  });
});

document.querySelector(".modal-close").addEventListener("click",closeModal);
document.getElementById("modal-close-btn").addEventListener("click",closeModal);
modal.addEventListener("click",(e)=>{ if(e.target===modal) closeModal(); });

document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape") closeModal();
});

// YEAR
document.getElementById("year").textContent = new Date().getFullYear();
