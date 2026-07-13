// Jahr im Footer
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile-Nav
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  // Schließen beim Klick auf einen Nav-Link
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

// Lightbox mit Pfeiltasten-Navigation
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let galleryImages = [];
let currentIndex = 0;

if (lightbox) {
  const items = document.querySelectorAll('.img-item img');
  galleryImages = Array.from(items);

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
  }

  galleryImages.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}
