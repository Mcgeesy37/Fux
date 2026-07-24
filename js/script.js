// Jahr im Footer
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile-Nav
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => observer.observe(el));
}

// ===== ROTER NAVIGATOR-PFEIL =====
const navArrow = document.getElementById('navArrow');
const sections = Array.from(document.querySelectorAll('[data-section]'));

if (navArrow && sections.length) {
  // Springt zur nächsten Sektion unterhalb der aktuellen Scrollposition
  navArrow.addEventListener('click', () => {
    const headerH = document.querySelector('.site-header').offsetHeight;
    const y = window.scrollY + headerH + 10;
    const next = sections.find(s => s.offsetTop > y + 5);

    if (next) {
      window.scrollTo({ top: next.offsetTop - headerH, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Pfeil am Seitenende ausblenden
  const toggleArrow = () => {
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
    navArrow.classList.toggle('hidden', atBottom);
  };
  window.addEventListener('scroll', toggleArrow, { passive: true });
  toggleArrow();
}

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let galleryImages = [];
let currentIndex = 0;

if (lightbox) {
  galleryImages = Array.from(document.querySelectorAll('.img-item img'));

  const show = (i) => {
    currentIndex = (i + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
  };

  const open = (i) => {
    show(i);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  galleryImages.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => open(i));
  });

  lightboxClose.addEventListener('click', close);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => show(currentIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => show(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
}
