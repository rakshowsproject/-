// ==========================================================
//  WES ANDERSON × NEO-BRUTALIST — Portfolio JavaScript
// ==========================================================

// ===== Three.js 3D Scene (warm-toned, sculptural) =====
(function initThree() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setClearColor(0x000000, 0); // fully transparent background
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Sculpted dodecahedron — feels like a Wes Anderson set piece
        const geo = new THREE.DodecahedronGeometry(2.4, 0);
        const mat = new THREE.MeshPhysicalMaterial({
            color: 0xdbb5b5, // lighter dusty rose
            metalness: 0.05,
            roughness: 0.55,
            clearcoat: 0.15,
            clearcoatRoughness: 0.4,
        });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        // Wireframe overlay — brutalist grid
        const wireGeo = new THREE.DodecahedronGeometry(2.45, 0);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x8a7a6a,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
        });
        const wireMesh = new THREE.Mesh(wireGeo, wireMat);
        scene.add(wireMesh);

        // Warm lighting — bright enough to render pastel tones
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));

        const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.2); // warm white
        keyLight.position.set(4, 5, 5);
        scene.add(keyLight);

        const fillLight = new THREE.PointLight(0xd4a0a0, 0.8, 80); // dusty rose
        fillLight.position.set(-4, 2, 3);
        scene.add(fillLight);

        const rimLight = new THREE.PointLight(0xa0b8a0, 0.5, 60); // sage
        rimLight.position.set(2, -3, -4);
        scene.add(rimLight);

        camera.position.z = 7;

        // Subtle floating particles
        const pCount = 120;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i++) {
            pPos[i] = (Math.random() - 0.5) * 18;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            size: 0.025,
            color: 0xb8a090,
            transparent: true,
            opacity: 0.35,
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        let mouseX = 0,
            mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        function animate() {
            requestAnimationFrame(animate);
            const t = Date.now() * 0.001;

            mesh.rotation.x += 0.0015;
            mesh.rotation.y += 0.002;
            mesh.position.y = Math.sin(t * 0.4) * 0.25;

            wireMesh.rotation.copy(mesh.rotation);
            wireMesh.position.copy(mesh.position);

            // Gentle mouse response
            mesh.rotation.x += mouseY * 0.005;
            mesh.rotation.y += mouseX * 0.005;
            wireMesh.rotation.copy(mesh.rotation);

            particles.rotation.y += 0.0002;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    };
    document.head.appendChild(script);
})();

// ===== Nav Active State =====
(function initNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    function update() {
        const scrollY = window.scrollY + 250;
        sections.forEach((sec) => {
            const top = sec.offsetTop;
            const h = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollY >= top && scrollY < top + h) {
                navItems.forEach((item) => {
                    item.classList.remove('active');
                    const link = item.querySelector('a');
                    if (link && link.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', update);
})();

// ===== Navbar scroll shadow =====
(function () {
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
    });
})();

// ===== Mobile Menu =====
(function () {
    const btn = document.getElementById('hamburgerMenu');
    const menu = document.getElementById('mobileMenu');
    const links = document.querySelectorAll('.mobile-links a');
    if (!btn || !menu) return;

    let open = false;

    btn.addEventListener('click', () => {
        open = !open;
        menu.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
        // Animate hamburger lines
        const lines = btn.querySelectorAll('.h-line');
        if (open) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            lines[0].style.transform = '';
            lines[1].style.opacity = '1';
            lines[2].style.transform = '';
        }
    });

    links.forEach((a) =>
        a.addEventListener('click', () => {
            open = false;
            menu.classList.remove('active');
            document.body.style.overflow = '';
            const lines = btn.querySelectorAll('.h-line');
            lines[0].style.transform = '';
            lines[1].style.opacity = '1';
            lines[2].style.transform = '';
        })
    );
})();

// ===== Text Rotation (Hero) =====
(function () {
    const topEl = document.querySelector('.title-top');
    const botEl = document.querySelector('.title-bottom');
    const subEl = document.querySelector('.subtitle-rotate');
    if (!topEl || !botEl || !subEl) return;

    const topW = JSON.parse(topEl.dataset.words);
    const botW = JSON.parse(botEl.dataset.words);
    const subW = JSON.parse(subEl.dataset.words);
    let idx = 0;

    setInterval(() => {
        idx = (idx + 1) % topW.length;

        [topEl, botEl, subEl].forEach((el) => {
            el.style.transition =
                'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease';
            el.style.transform = 'translateY(-110%)';
            el.style.opacity = '0';
        });

        setTimeout(() => {
            topEl.textContent = topW[idx];
            botEl.textContent = botW[idx];
            subEl.textContent = subW[idx];

            [topEl, botEl, subEl].forEach((el) => {
                el.style.transition = 'none';
                el.style.transform = 'translateY(110%)';
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                        el.style.transition =
                            'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease';
                        el.style.transform = 'translateY(0)';
                        el.style.opacity = '1';
                    })
                );
            });
        }, 450);
    }, 3200);
})();

// ===== Scroll Reveal =====
(function () {
    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add('active');
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document
        .querySelectorAll(
            '.about-card, .about-grid, .project, .contact-card, .section-header'
        )
        .forEach((el) => {
            el.classList.add('reveal');
            obs.observe(el);
        });

    // Intro line text
    const introObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add('visible');
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll('.intro-line span').forEach((s, i) => {
        s.style.transitionDelay = `${i * 0.14}s`;
        introObs.observe(s);
    });
})();

// ===== Stagger project reveals =====
(function () {
    document.querySelectorAll('.project.reveal').forEach((p, i) => {
        p.style.transitionDelay = `${i * 0.08}s`;
    });
})();

// ===== Scroll to Top =====
(function () {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== Copy Email =====
function copyEmail() {
    const email = 'rhshovon@uwm.edu';
    navigator.clipboard
        .writeText(email)
        .then(() => showCopied())
        .catch(() => {
            // fallback
            const ta = document.createElement('textarea');
            ta.value = email;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showCopied();
        });
}

function showCopied() {
    const label = document.querySelector('.copy-label');
    if (!label) return;
    const orig = label.textContent;
    label.textContent = 'Copied!';
    setTimeout(() => (label.textContent = orig), 2000);
}

// ===== Canvas Parallax Fade =====
(function () {
    const wrap = document.querySelector('.canvas-wrap');
    if (!wrap) return;
    window.addEventListener('scroll', () => {
        const heroH =
            document.querySelector('.hero')?.offsetHeight || window.innerHeight;
        wrap.style.opacity = Math.max(0, 1 - (window.scrollY / heroH) * 1.3);
    });
})();

// ===== Project Image Cursor Follow =====
(function () {
    const projects = document.querySelectorAll('.project');

    projects.forEach((proj) => {
        const imgWrap = proj.querySelector('.project-img-wrap');
        if (!imgWrap) return;

        proj.addEventListener('mouseenter', () => {
            imgWrap.style.opacity = '1';
        });

        proj.addEventListener('mouseleave', () => {
            imgWrap.style.opacity = '0';
        });

        proj.addEventListener('mousemove', (e) => {
            imgWrap.style.left = e.clientX + 20 + 'px';
            imgWrap.style.top = e.clientY - 100 + 'px';
        });
    });
})();

// ===== Progress Bar Hide =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const np = document.getElementById('nprogress');
        if (np) {
            np.style.transition = 'opacity 0.4s ease';
            np.style.opacity = '0';
            setTimeout(() => (np.style.display = 'none'), 400);
        }
    }, 1800);
});
