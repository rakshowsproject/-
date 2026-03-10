/* ============================================
   PORTFOLIO — SCRIPT
   Minimal: scroll reveals, mobile menu, nav
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     SCROLL REVEAL (Intersection Observer)
  ------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');

  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');
          observer.unobserve(entries[i].target);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    for (var i = 0; i < reveals.length; i++) {
      observer.observe(reveals[i]);
    }
  } else {
    // Fallback: just show everything
    for (var j = 0; j < reveals.length; j++) {
      reveals[j].classList.add('visible');
    }
  }

  /* ------------------------------------------
     SMOOTH ANCHOR SCROLL
  ------------------------------------------ */
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var k = 0; k < anchors.length; k++) {
    anchors[k].addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Close mobile menu if open
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ------------------------------------------
     MOBILE MENU
  ------------------------------------------ */
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  /* ------------------------------------------
     NAV — hide on scroll down, show on scroll up
  ------------------------------------------ */
  var nav = document.getElementById('nav');
  var lastY = 0;

  window.addEventListener('scroll', function () {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (y > 100) {
      nav.style.opacity = (y > lastY) ? '0' : '1';
    } else {
      nav.style.opacity = '1';
    }
    lastY = y;
  }, { passive: true });

  /* ------------------------------------------
     GENTLE PARALLAX on hero portrait
  ------------------------------------------ */
  var portrait = document.querySelector('.hero__portrait-img');
  if (portrait && window.innerWidth > 768) {
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (y < window.innerHeight) {
        portrait.style.transform = 'translateY(' + (y * 0.06) + 'px)';
      }
    }, { passive: true });
  }

})();
