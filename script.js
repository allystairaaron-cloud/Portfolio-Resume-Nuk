// Elements
const themeToggle = document.getElementById('theme-toggle');
const htmlRoot = document.documentElement;
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalTech = document.getElementById('modal-tech');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.querySelectorAll('.modal-close, #modal-close-btn');
const projectCards = document.querySelectorAll('.project-card');
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('.section');
const yearSpan = document.getElementById('year');

// ELEMENT FOR MODAL LINK 
const modalLink = document.getElementById('modal-link'); 

// Mobile Navigation Elements 
const mobileSidebar = document.getElementById('mobile-sidebar');
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const mobileCloseBtn = document.querySelector('.mobile-close-btn');

// Set current year
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// --- Theme handling (dark / light) ---
const THEME_KEY = 'portfolio-theme';
function applyTheme(theme){
  const isDark = theme === 'dark';
  if(isDark){
    htmlRoot.setAttribute('data-theme','dark');
    themeToggle.setAttribute('aria-pressed','true');
    themeToggle.querySelector('svg path').setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'); // Moon icon path
  } else {
    htmlRoot.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed','false');
    themeToggle.querySelector('svg path').setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'); // Same path, styling handles the visual change
  }
}
function loadTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if(saved) applyTheme(saved);
  else {
    // default to system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
}
loadTheme();

themeToggle.addEventListener('click', () => {
  const current = htmlRoot.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// Keyboard shortcut: "Ctrl+D" or "Cmd+D" to toggle theme (for power users)
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'd' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    themeToggle.click();
  }
});


// ---  Mobile Navigation Logic ---
function openMobileNav() {
    if(mobileSidebar) {
      mobileSidebar.classList.add('open');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

function closeMobileNav() {
    if(mobileSidebar) {
      mobileSidebar.classList.remove('open');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
}

if(mobileNavToggle) mobileNavToggle.addEventListener('click', openMobileNav);
if(mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);


// --- Smooth scrolling for nav links ---
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', (ev) => {
    ev.preventDefault();
    const targetId = a.getAttribute('href');
    const target = document.querySelector(targetId);
    if(!target) return;
    
    // Calculate the scroll position, adding a small offset for padding
    const scrollPosition = target.offsetTop - 30; 
    
    window.scrollTo({top: scrollPosition, behavior: 'smooth'});

    // Update active class immediately on click
    navLinks.forEach(link => link.classList.remove('active'));
    a.classList.add('active');

    //  Close the sidebar on link click (for mobile) 
    // Check if the sidebar is currently open (implies mobile view)
    if (mobileSidebar && mobileSidebar.classList.contains('open')) {
        closeMobileNav();
    }
  });
});

// --- Modal logic ---
function openModal(data){
  modalTitle.textContent = data.title || 'Project';
  modalTech.textContent = data.tech ? `Tech: ${data.tech}` : '';
  modalDesc.textContent = data.desc || 'No details available.';
  
  //  Handle Link Dynamically 
  if (data.link) {
      modalLink.href = data.link;
      modalLink.textContent = 'View Live Prototype';
      modalLink.setAttribute('target', '_blank'); // Open in new tab
      modalLink.style.display = 'inline';
  } else {
      modalLink.href = '#';
      modalLink.textContent = 'View Code (Unavailable)';
      modalLink.removeAttribute('target');
      // Set display to inline so the 'Unavailable' text is still shown
      modalLink.style.display = 'inline'; 
  }
  
  modal.setAttribute('aria-hidden', 'false');
  // trap focus - focus the close button
  const closeBtn = modal.querySelector('.modal-close');
  if(closeBtn) closeBtn.focus();
  // prevent background scroll
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Clicking project cards
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const raw = card.getAttribute('data-project');
    try {
      const data = JSON.parse(raw);
      openModal(data);
    } catch (err) {
      console.error('Error parsing project data:', err);
      openModal({title: 'Project', desc: 'No details available.'});
    }
  });

  // keyboard accessibility
  card.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// Close controls
modalClose.forEach(btn => btn.addEventListener('click', closeModal));
modal.addEventListener('click', (e) => {
  if(e.target === modal) closeModal();
});

// ESC to close modal
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

// --- Scroll reveal for sections (original logic) ---
const scrollRevealElements = document.querySelectorAll('.section, .timeline-item, .project-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if(ent.isIntersecting){
      ent.target.style.transform = 'none';
      ent.target.style.opacity = '1';
      revealObserver.unobserve(ent.target);
    }
  });
},{threshold: 0.12});

scrollRevealElements.forEach(s => {
  s.style.transform = 'translateY(12px)';
  s.style.opacity = '0';
  s.style.transition = 'transform .6s ease, opacity .6s ease';
  revealObserver.observe(s);
});

// --- Active Nav Link on Scroll ---
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav a[href="#${id}"]`);
        
        if (entry.isIntersecting && navLink) {
            // Un-highlight previous active links
            navLinks.forEach(link => link.classList.remove('active'));
            // Highlight the current section's link
            navLink.classList.add('active');
        }
    });
}, {
    // Highlight section when it is roughly in the middle of the viewport
    rootMargin: "-25% 0px -75% 0px", 
    threshold: 0 
});

sections.forEach(s => navObserver.observe(s));

