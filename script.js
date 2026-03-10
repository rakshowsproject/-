/* ============================================
   PORTFOLIO — SCRIPT
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     LOADER
  ------------------------------------------ */
  const loader = document.getElementById('loader');

  function hideLoader() {
    document.body.classList.remove('loading');
    loader.classList.add('hidden');
  }

  document.body.classList.add('loading');

  window.addEventListener('load', function () {
    // Small artificial delay so the brand mark registers
    setTimeout(hideLoader, 800);
  });

  // Fallback — never leave the loader stuck
  setTimeout(hideLoader, 3000);

  /* ------------------------------------------
     SCROLL REVEAL (Intersection Observer)
  ------------------------------------------ */
  function initReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseFloat(el.dataset.delay) || 0;
            setTimeout(function () {
              el.classList.add('visible');
            }, delay * 1000);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Init reveals after loader hides
  setTimeout(initReveals, 900);

  /* ------------------------------------------
     SMOOTH ANCHOR SCROLL
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ------------------------------------------
     MOBILE MENU
  ------------------------------------------ */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open')
        ? 'hidden'
        : '';
    });

    // Close on link click
    document.querySelectorAll('[data-mobile-nav]').forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ------------------------------------------
     NAV — subtle hide / show on scroll
  ------------------------------------------ */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener(
    'scroll',
    function () {
      const current = window.scrollY;
      if (current > 100) {
        nav.style.opacity = current > lastScroll ? '0' : '1';
      } else {
        nav.style.opacity = '1';
      }
      lastScroll = current;
    },
    { passive: true }
  );

  /* ------------------------------------------
     GENTLE PARALLAX on hero portrait
  ------------------------------------------ */
  const portrait = document.querySelector('.hero__portrait-img');

  if (portrait && window.matchMedia('(min-width: 769px)').matches) {
    window.addEventListener(
      'scroll',
      function () {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          portrait.style.transform = 'translateY(' + y * 0.06 + 'px) scale(1)';
        }
      },
      { passive: true }
    );
  }
})();
