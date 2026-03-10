/* ============================================
   Rakibul Hasan Shovon — Portfolio Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------
     NAVBAR ACTIVE LINK ON SCROLL
     ------------------------------------------ */
  const sections = document.querySelectorAll('article[id], section[id]');
  const navLinks = document.querySelectorAll('.linkMenuList a, .ulMobile a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.parentElement.classList.remove('linkActive');
          if (link.getAttribute('href') === '#' + id) {
            link.parentElement.classList.add('linkActive');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  /* ------------------------------------------
     SMOOTH SCROLL FOR NAV LINKS
     ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.menuMobile');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  /* ------------------------------------------
     MOBILE MENU TOGGLE
     ------------------------------------------ */
  const hamburger = document.querySelector('.hamburgerMenu');
  const mobileMenu = document.querySelector('.menuMobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  /* ------------------------------------------
     SCROLL TO TOP BUTTON
     ------------------------------------------ */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------
     SCROLL ANIMATIONS (Intersection Observer)
     ------------------------------------------ */
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  animateElements.forEach(el => observer.observe(el));

  /* ------------------------------------------
     ABOUT NAME REVEAL ON SCROLL
     ------------------------------------------ */
  const nameSpans = document.querySelectorAll('.name');
  const nameObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.filter = 'blur(0)';
      }
    });
  }, { threshold: 0.3 });

  nameSpans.forEach(span => nameObserver.observe(span));

  /* ------------------------------------------
     CLIPBOARD COPY
     ------------------------------------------ */
  const clipboardBtn = document.querySelector('.clipboardButton');
  if (clipboardBtn) {
    clipboardBtn.addEventListener('click', () => {
      const emailText = 'rhshovon@uwm.edu';
      navigator.clipboard.writeText(emailText).then(() => {
        const p = clipboardBtn.querySelector('p');
        const originalText = p.textContent;
        p.textContent = 'Email copied!';
        setTimeout(() => { p.textContent = originalText; }, 2000);
      }).catch(() => {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = emailText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      });
    });
  }

  /* ------------------------------------------
     PARTICLE BACKGROUND (Simple Canvas)
     ------------------------------------------ */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(166, 128, 255, ${p.alpha})`;
        ctx.fill();
      });

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(166, 128, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
  }

  /* ------------------------------------------
     INTRO TEXT REVEAL ANIMATION
     ------------------------------------------ */
  const introTexts = document.querySelectorAll('.intro');
  const introObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          const overlay = entry.target.querySelector('span');
          if (overlay) {
            overlay.style.width = '100%';
            setTimeout(() => {
              overlay.style.width = '0%';
            }, 400);
          }
        }, index * 150);
        introObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  introTexts.forEach(el => introObserver.observe(el));

  /* ------------------------------------------
     NAVBAR BACKGROUND ON SCROLL
     ------------------------------------------ */
  const navbar = document.querySelector('.navbarWrap');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(10, 10, 15, 0.85)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.6)';
    }
  });
});
