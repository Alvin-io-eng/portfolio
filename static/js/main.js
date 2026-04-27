/* ============================================
   ALVIN IMMANUEL PORTFOLIO — UPGRADED JS
   ============================================ */

// ─── Custom Cursor ───────────────────────────
function initCustomCursor() {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
    });

    // Smooth ring follow
    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover expand effect
    const hoverTargets = 'a, button, .project-card, .tool-tag, .social-link, .filter-btn';
    document.addEventListener('mouseover', e => {
        if (e.target.closest(hoverTargets)) ring.classList.add('hovering');
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(hoverTargets)) ring.classList.remove('hovering');
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = ''; });
}

// ─── Scroll Progress Bar ─────────────────────
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = (window.scrollY / max) * 100;
        bar.style.width = pct + '%';
    }, { passive: true });
}

// ─── Particles ───────────────────────────────
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    container.innerHTML = '';

    const count = window.innerWidth < 600 ? 20 : 40;
    const colors = ['#80c3fd', '#d4c628', '#4facfe', '#667eea'];

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
}

// ─── Navbar ──────────────────────────────────
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 80);
}

// ─── Active Nav Link ─────────────────────────
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href*="#"]');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').includes(id));
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
}

// ─── Hamburger Menu ──────────────────────────
function initHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        links.classList.toggle('mobile-open');
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('open');
            links.classList.remove('mobile-open');
        });
    });
}

// ─── Scroll Animations ────────────────────────
function initScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
}

// ─── Smooth Scrolling ─────────────────────────
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
}

// ─── Counter Animation ────────────────────────
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = +el.dataset.target;
            const suffix = el.dataset.suffix || '';
            const duration = 1800;
            const start = performance.now();

            const update = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
                el.textContent = Math.round(ease * target) + suffix;
                if (progress < 1) requestAnimationFrame(update);
            };

            requestAnimationFrame(update);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ─── Typing Effect ────────────────────────────
function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    const phrases = [
        'Telecommunication Engineer',
        'Fullstack Developer',
        'SaaS Entrepreneur',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor-blink';
    subtitle.textContent = '';
    subtitle.appendChild(cursorSpan);

    function type() {
        const current = phrases[phraseIndex];

        if (!deleting) {
            charIndex++;
        } else {
            charIndex--;
        }

        subtitle.childNodes[0]
            ? subtitle.insertBefore(document.createTextNode(current.slice(0, charIndex)), cursorSpan)
            : null;

        // Rebuild text node
        subtitle.innerHTML = '';
        const textNode = document.createTextNode(current.slice(0, charIndex));
        subtitle.appendChild(textNode);
        subtitle.appendChild(cursorSpan);

        if (!deleting && charIndex === current.length) {
            setTimeout(() => { deleting = true; requestAnimationFrame(tick); }, 2000);
            return;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        requestAnimationFrame(tick);
    }

    let lastTime = 0;
    function tick(timestamp) {
        const speed = deleting ? 40 : 80;
        if (!lastTime || timestamp - lastTime >= speed) {
            lastTime = timestamp;
            type();
        } else {
            requestAnimationFrame(tick);
        }
    }

    setTimeout(() => requestAnimationFrame(tick), 600);
}

// ─── Tool Tags ────────────────────────────────
function initToolTags() {
    document.querySelectorAll('.tool-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.2s ease';
        });
    });
}

// ─── Project Card 3D Tilt ─────────────────────
function initHoverEffects() {
    document.addEventListener('mouseover', e => {
        const card = e.target.closest('.project-card');
        if (!card) return;

        card.addEventListener('mousemove', function(ev) {
            const rect = this.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * 5;
            const rotY = ((cx - x) / cx) * 5;
            this.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-12px) scale(1.01)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ─── Contact Form ─────────────────────────────
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        const original = btn.textContent;

        btn.textContent = 'Sending…';
        btn.disabled = true;

        try {
            const res = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                btn.textContent = 'Sent ✓';
                btn.style.background = '#4CAF50';
                this.reset();
                showFormMessage('Thank you! Message sent successfully.', 'success');
                setTimeout(() => { btn.textContent = original; btn.style.background = ''; btn.disabled = false; }, 3500);
            } else {
                throw new Error('Failed');
            }
        } catch {
            btn.textContent = 'Error — Try Again';
            btn.style.background = '#f44336';
            showFormMessage('Something went wrong. Please try again.', 'error');
            setTimeout(() => { btn.textContent = original; btn.style.background = ''; btn.disabled = false; }, 3500);
        }
    });
}

function showFormMessage(msg, type) {
    document.querySelector('.form-message')?.remove();
    const div = document.createElement('div');
    div.className = `form-message ${type}`;
    div.textContent = msg;
    document.querySelector('.contact-form')?.appendChild(div);
    setTimeout(() => div.remove(), 5000);
}

// ─── Load Projects ────────────────────────────
async function loadProjects() {
    let projects;
    try {
        const res = await fetch('./static/data/projects.json');
        const data = await res.json();
        projects = data.projects;
    } catch {
        projects = [
            { title: "AiVana SaaS App", description: "An intelligent SaaS application that streamlines HR processes and employee monitoring with advanced AI capabilities.", image: "./static/img/aivana.png", link: "https://aivanawebsite.vercel.app/" },
            { title: "Lit Calculator App", description: "A modern, feature-rich calculator application with advanced mathematical functions and intuitive design.", image: "./static/img/calculator.png", link: "#" },
            { title: "Shake-Up Kitchen App", description: "A comprehensive restaurant management system that boosted business operations and customer engagement.", image: "./static/img/shakeup-kitchen.png", link: "https://shakeup-kitchen.vercel.app" },
            { title: "Three JS Portfolio", description: "A visually stunning portfolio website built with Three.js to showcase 3D graphics and interactive elements.", image: "./static/img/threejs-portfolio.png", link: "https://threejs-techwebsite.vercel.app/" },
            { title: "Premier Motors", description: "A basic car dealership website demonstrating vehicle listings and customer inquiries.", image: "./static/img/premier-motors.png", link: "https://car-dealership-demo-zxkp.bolt.host/" }
        ];
    }

    if (window.location.pathname.includes('projects.html')) {
        displayAllProjects(projects);
        initProjectFilters(projects);
    } else {
        displayProjectsCarousel(projects);
    }
}

// ─── Build Project Card HTML ──────────────────
function buildProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const linkHref = project.link && project.link !== '#' ? project.link : null;
    const linkTarget = linkHref ? 'target="_blank" rel="noopener"' : '';

    card.innerHTML = `
        <div class="project-image" style="background: url('${project.image}') center/cover no-repeat, var(--gradient-1);">
            <div class="project-image-overlay">
                ${linkHref
                    ? `<a href="${project.link}" ${linkTarget} class="overlay-view-btn"><i class="fas fa-external-link-alt"></i> View Live</a>`
                    : `<span class="overlay-view-btn" style="opacity:0.5;cursor:default;">Coming Soon</span>`
                }
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${linkHref
                ? `<a href="${project.link}" ${linkTarget} class="project-link"><i class="fas fa-arrow-right"></i> View Project</a>`
                : `<span class="project-link" style="opacity:0.5;cursor:default;">Coming Soon</span>`
            }
        </div>
    `;
    return card;
}

// ─── Carousel ─────────────────────────────────
function displayProjectsCarousel(projects) {
    const container = document.getElementById('carousel-container');
    const dots      = document.getElementById('carousel-dots');
    if (!container || !dots) return;

    container.innerHTML = '';
    dots.innerHTML = '';

    // Show one card at a time for continuous scroll
    const perSlide = 1;
    const totalSlides = projects.length;

    for (let s = 0; s < totalSlides; s++) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.appendChild(buildProjectCard(projects[s]));
        container.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = s === 0 ? 'dot active' : 'dot';
        dot.dataset.slide = s;
        dot.addEventListener('click', () => goToSlide(s));
        dots.appendChild(dot);
    }

    initCarousel(totalSlides);
}

let currentSlide = 0;
let autoSlide;

function goToSlide(index) {
    const container = document.getElementById('carousel-container');
    const dots = document.querySelectorAll('.dot');
    currentSlide = index;
    container.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function initCarousel(total) {
    const container = document.getElementById('carousel-container');
    const prevBtn   = document.getElementById('prev-btn');
    const nextBtn   = document.getElementById('next-btn');
    if (!container || total <= 1) return;

    if (prevBtn) prevBtn.addEventListener('click', () => {
        goToSlide((currentSlide - 1 + total) % total);
        resetAuto(total);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
        goToSlide((currentSlide + 1) % total);
        resetAuto(total);
    });

    // Touch swipe support
    let startX = 0;
    container.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
    container.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0
                ? goToSlide((currentSlide + 1) % total)
                : goToSlide((currentSlide - 1 + total) % total);
            resetAuto(total);
        }
    });

    // Auto advance
    autoSlide = setInterval(() => goToSlide((currentSlide + 1) % total), 5000);
    container.addEventListener('mouseenter', () => clearInterval(autoSlide));
    container.addEventListener('mouseleave', () => { autoSlide = setInterval(() => goToSlide((currentSlide + 1) % total), 5000); });
}

function resetAuto(total) {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => goToSlide((currentSlide + 1) % total), 5000);
}

// ─── All Projects Grid ────────────────────────
function displayAllProjects(projects) {
    const grid = document.getElementById('all-projects-container');
    if (!grid) return;
    grid.innerHTML = '';
    projects.forEach((p, i) => {
        const card = buildProjectCard(p);
        card.style.animationDelay = `${i * 0.08}s`;
        grid.appendChild(card);
    });
}

// ─── Project Filters ──────────────────────────
function initProjectFilters(projects) {
    const bar = document.querySelector('.project-filters');
    if (!bar) return;

    bar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // For now all projects show — extend with categories from JSON later
            displayAllProjects(projects);
        });
    });
}

// ─── Magnetic Social Links ────────────────────
function initMagneticLinks() {
    document.querySelectorAll('.social-link').forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const dx = e.clientX - rect.left - rect.width / 2;
            const dy = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translateX(${dx * 0.25}px) translateY(${dy * 0.25 - 5}px) scale(1.05)`;
        });
        el.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ─── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrollProgress();
    createParticles();
    initSmoothScrolling();
    initHamburger();
    initScrollAnimations();
    initActiveNav();
    initCounters();
    initTypingEffect();
    initToolTags();
    initHoverEffects();
    initContactForm();
    initMagneticLinks();
    loadProjects();

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    window.addEventListener('resize', () => {
        createParticles();
        if (!window.location.pathname.includes('projects.html')) {
            currentSlide = 0;
            loadProjects();
        }
    });
});
