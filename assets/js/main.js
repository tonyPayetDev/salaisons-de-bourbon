/* =====================================================
   Salaisons de Bourbon - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Header scroll shadow ──────────────────────────
  const header = document.querySelector('.header');
  const scrollTop = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 20);
    scrollTop?.classList.toggle('visible', y > 400);
  }, { passive: true });

  scrollTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Mobile nav toggle ─────────────────────────────
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  toggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    const isOpen = navLinks?.classList.contains('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelectorAll('span').forEach((span, i) => {
      if (isOpen) {
        if (i === 0) span.style.transform = 'translateY(7px) rotate(45deg)';
        if (i === 1) span.style.opacity = '0';
        if (i === 2) span.style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        span.style.transform = '';
        span.style.opacity = '';
      }
    });
  });

  // Close nav on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle?.querySelectorAll('span').forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
      });
    });
  });

  // ── Scroll-triggered fade-in ──────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── Lazy loading images (native + fallback) ───────
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype === false) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imgObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imgObserver.observe(img));
  }

  // ── Active nav link on scroll ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach(s => sectionObserver.observe(s));

  // ── Produits slider (nav buttons) ─────────────────
  document.querySelectorAll('.produits__slider').forEach(slider => {
    const track = slider.querySelector('.produits__track');
    const prevBtn = slider.querySelector('.produits__slider-btn--prev');
    const nextBtn = slider.querySelector('.produits__slider-btn--next');
    if (!track) return;

    const scrollByCard = (direction) => {
      const card = track.querySelector('.produit-card');
      const step = card ? card.getBoundingClientRect().width + 24 : 240;
      track.scrollBy({ left: step * direction, behavior: 'smooth' });
    };

    prevBtn?.addEventListener('click', () => scrollByCard(-1));
    nextBtn?.addEventListener('click', () => scrollByCard(1));
  });

});
