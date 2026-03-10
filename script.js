// ===== Three.js 3D Background Scene =====
(function initThree() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create abstract geometric shape (icosahedron as sculptural element)
        const geometry = new THREE.IcosahedronGeometry(2.5, 1);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x1a1a2e,
            metalness: 0.9,
            roughness: 0.15,
            envMapIntensity: 1.0,
            clearcoat: 0.3,
            clearcoatRoughness: 0.25,
            wireframe: false,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Wireframe overlay
        const wireGeo = new THREE.IcosahedronGeometry(2.55, 1);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0xa680ff,
            wireframe: true,
            transparent: true,
            opacity: 0.08,
        });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        scene.add(wireMesh);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xa680ff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x6040ff, 1, 100);
        pointLight.position.set(-3, 3, 4);
        scene.add(pointLight);

        const rimLight = new THREE.PointLight(0xff80a0, 0.5, 100);
        rimLight.position.set(3, -2, -3);
        scene.add(rimLight);

        camera.position.z = 7;

        // Floating particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 200;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: 0xa680ff,
            transparent: true,
            opacity: 0.6,
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        function animate() {
            requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            mesh.rotation.x += 0.002;
            mesh.rotation.y += 0.003;
            wireMesh.rotation.x = mesh.rotation.x;
            wireMesh.rotation.y = mesh.rotation.y;

            mesh.position.y = Math.sin(time * 0.5) * 0.3;
            wireMesh.position.y = mesh.position.y;

            // Mouse follow
            mesh.rotation.x += mouseY * 0.01;
            mesh.rotation.y += mouseX * 0.01;
            wireMesh.rotation.x = mesh.rotation.x;
            wireMesh.rotation.y = mesh.rotation.y;

            particlesMesh.rotation.y += 0.0003;
            particlesMesh.rotation.x += 0.0001;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
    };
    document.head.appendChild(script);
})();

// ===== Navigation Active State =====
(function initNav() {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.linkMenuList li a');

    function updateNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.closest('li').classList.remove('linkActive');
                    if (link.getAttribute('href') === '#' + id) {
                        link.closest('li').classList.add('linkActive');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateNav);
})();

// ===== Navbar Background on Scroll =====
(function initNavbarScroll() {
    const nav = document.querySelector('.navbarWrap');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
})();

// ===== Mobile Menu =====
(function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('menuMobile');
    const mobileLinks = document.querySelectorAll('.ulMobile li a');
    let isOpen = false;

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Animate lines
            hamburger.querySelector('.line1').style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburger.querySelector('.line2').style.opacity = '0';
            hamburger.querySelector('.line3').style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            closeMobileMenu();
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    function closeMobileMenu() {
        isOpen = false;
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.querySelector('.line1').style.transform = '';
        hamburger.querySelector('.line2').style.opacity = '1';
        hamburger.querySelector('.line3').style.transform = '';
    }
})();

// ===== Text Rotation (Hero) =====
(function initTextRotation() {
    const topWord = document.querySelector('.titleWord');
    const bottomWord = document.querySelector('.titleWord2');
    const jobInner = document.querySelector('.jobInner');

    if (!topWord || !bottomWord || !jobInner) return;

    const topWords = JSON.parse(topWord.dataset.words);
    const bottomWords = JSON.parse(bottomWord.dataset.words);
    const jobWords = JSON.parse(jobInner.dataset.words);
    let index = 0;

    setInterval(() => {
        index = (index + 1) % topWords.length;

        // Animate out
        topWord.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease';
        bottomWord.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease';
        jobInner.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease';

        topWord.style.transform = 'translateY(-100%)';
        topWord.style.opacity = '0';
        bottomWord.style.transform = 'translateY(-100%)';
        bottomWord.style.opacity = '0';
        jobInner.style.transform = 'translateY(-100%)';
        jobInner.style.opacity = '0';

        setTimeout(() => {
            topWord.textContent = topWords[index];
            bottomWord.textContent = bottomWords[index];
            jobInner.textContent = jobWords[index];

            topWord.style.transition = 'none';
            bottomWord.style.transition = 'none';
            jobInner.style.transition = 'none';
            topWord.style.transform = 'translateY(100%)';
            bottomWord.style.transform = 'translateY(100%)';
            jobInner.style.transform = 'translateY(100%)';

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    topWord.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease';
                    bottomWord.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease';
                    jobInner.style.transition = 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease';
                    topWord.style.transform = 'translateY(0)';
                    topWord.style.opacity = '1';
                    bottomWord.style.transform = 'translateY(0)';
                    bottomWord.style.opacity = '1';
                    jobInner.style.transform = 'translateY(0)';
                    jobInner.style.opacity = '1';
                });
            });
        }, 500);
    }, 3000);
})();

// ===== Scroll Reveal Animations =====
(function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add reveal class to elements
    document.querySelectorAll('.aboutBio, .aboutContent, .workSectionTitle, .oneProjectWrap, .contactContainer > div, .introWrapper .intro span').forEach(el => {
        if (!el.classList.contains('intro')) {
            el.classList.add('reveal');
            observer.observe(el);
        }
    });

    // Intro text reveal
    const introSpans = document.querySelectorAll('.intro span');
    const introObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    introSpans.forEach((span, i) => {
        span.style.transitionDelay = `${i * 0.15}s`;
        introObserver.observe(span);
    });
})();

// ===== Scroll to Top Button =====
(function initScrollTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ===== Smooth Scroll for Nav Links =====
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();

// ===== Copy Email Function =====
function copyEmail() {
    navigator.clipboard.writeText('mailto@uwm.edu').then(() => {
        const btn = document.querySelector('.clipboardButton p');
        if (btn) {
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = original; }, 2000);
        }
    }).catch(() => {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = 'mailto@uwm.edu';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        const btn = document.querySelector('.clipboardButton p');
        if (btn) {
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = original; }, 2000);
        }
    });
}

// ===== Parallax Effect on Scroll =====
(function initParallax() {
    const canvasWrapper = document.querySelector('.canvasWrapper');
    if (!canvasWrapper) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = document.querySelector('.heroWrap')?.offsetHeight || window.innerHeight;

        // Fade out canvas as we scroll past hero
        const opacity = Math.max(0, 1 - (scrolled / heroHeight) * 1.2);
        canvasWrapper.style.opacity = opacity;
    });
})();

// ===== Project Image Follow Cursor =====
(function initProjectImageFollow() {
    const projects = document.querySelectorAll('.oneProjectWrap');

    projects.forEach(project => {
        const imgWrap = project.querySelector('.projectImageWrap');
        if (!imgWrap) return;

        project.addEventListener('mousemove', (e) => {
            const rect = project.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Position image near cursor
            imgWrap.style.left = `${Math.min(x + 20, rect.width - 300)}px`;
            imgWrap.style.top = `${y - 90}px`;
            imgWrap.style.transform = 'scale(1)';
        });
    });
})();

// ===== Page Load Animation =====
(function initPageLoad() {
    window.addEventListener('load', () => {
        // Hide progress bar after load
        setTimeout(() => {
            const nprogress = document.getElementById('nprogress');
            if (nprogress) {
                nprogress.style.transition = 'opacity 0.3s ease';
                nprogress.style.opacity = '0';
                setTimeout(() => { nprogress.style.display = 'none'; }, 300);
            }
        }, 1500);
    });
})();
