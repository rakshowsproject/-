/* ============================================
   PORTFOLIO — SCRIPT
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     LOADER — Robust: multiple fallbacks
  ------------------------------------------ */
  var loaderDismissed = false;
  var loader = document.getElementById('loader');

  function hideLoader() {
    if (loaderDismissed) return;
    loaderDismissed = true;
    document.body.classList.remove('loading');
    if (loader) loader.classList.add('hidden');
    // Init reveals right after loader hides
    setTimeout(initReveals, 100);
  }

  document.body.classList.add('loading');

  // Method 1: on window load
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 600);
  } else {
    window.addEventListener('load', function () {
      setTimeout(hideLoader, 600);
    });
  }

  // Method 2: on DOMContentLoaded (fires earlier)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(hideLoader, 1200);
    });
  } else {
    setTimeout(hideLoader, 1200);
  }

  // Method 3: hard fallback — absolutely never stay stuck
  setTimeout(hideLoader, 2500);

  /* ------------------------------------------
     SCROLL REVEAL (Intersection Observer)
  ------------------------------------------ */
  function initReveals() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseFloat(el.dataset.delay) || 0;
            setTimeout(function () {
              el.classList.add('visible');
            }, delay * 1000);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------
     SMOOTH ANCHOR SCROLL
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ------------------------------------------
     MOBILE MENU
  ------------------------------------------ */
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open')
        ? 'hidden'
        : '';
    });

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
  var nav = document.getElementById('nav');
  var lastScroll = 0;

  window.addEventListener(
    'scroll',
    function () {
      var current = window.scrollY;
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
  var portrait = document.querySelector('.hero__portrait-img');

  if (portrait && window.matchMedia('(min-width: 769px)').matches) {
    window.addEventListener(
      'scroll',
      function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          portrait.style.transform = 'translateY(' + y * 0.06 + 'px) scale(1)';
        }
      },
      { passive: true }
    );
  }
})();
