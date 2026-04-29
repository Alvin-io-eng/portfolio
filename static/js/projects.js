// ===== CUSTOM CURSOR =====
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

        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        const hoverTargets = 'a, button, .blog-card, .category-btn, .overlay-view-btn';
        document.addEventListener('mouseover', e => {
            if (e.target.closest(hoverTargets)) ring.classList.add('hovering');
        });
        document.addEventListener('mouseout', e => {
            if (e.target.closest(hoverTargets)) ring.classList.remove('hovering');
        });

        document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = ''; });
    }

    // ===== SCROLL PROGRESS BAR =====
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

    // ===== PARTICLES =====
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

    // ===== NAVBAR =====
    function handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    }

    // ===== HAMBURGER MENU =====
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

    // ===== SCROLL ANIMATIONS =====
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

    // ===== PROJECTS DATA =====
    let projects = [];

    // ===== BUILD PROJECT CARD =====
    function buildProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'blog-card scroll-animate';
        const projectCategory = project.category ? project.category.toLowerCase().trim() : 'other';
        card.dataset.category = projectCategory;

        const linkHref = project.link && project.link !== '#' ? project.link : null;
        const linkTarget = linkHref ? 'target="_blank" rel="noopener"' : '';

        card.innerHTML = `
            <div class="project-image" style="position: relative; height: 220px; overflow: hidden;">
                <img src="${project.image}" alt="${project.title}" class="blog-img" style="width: 100%; height: 100%; object-fit: cover;">
                <div class="project-image-overlay">
                    ${linkHref
                        ? `<a href="${project.link}" ${linkTarget} class="overlay-view-btn"><i class="fas fa-external-link-alt"></i> View Live</a>`
                        : `<span class="overlay-view-btn coming-soon"><i class="fas fa-clock"></i> Coming Soon</span>`
                    }
                </div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="fas fa-folder"></i> ${project.category || 'Project'}</span>
                    <span><i class="fas fa-calendar"></i> ${project.date || '2025'}</span>
                </div>
                <h3 class="blog-title">${project.title}</h3>
                <p class="blog-excerpt">${project.description}</p>
                ${linkHref
                    ? `<a href="${project.link}" ${linkTarget} class="read-more"><i class="fas fa-arrow-right"></i> View Project</a>`
                    : `<span class="read-more" style="opacity: 0.5; cursor: default;"><i class="fas fa-clock"></i> Coming Soon</span>`
                }
            </div>
        `;
        
        // Add scroll animation delay
        card.style.animationDelay = `${Math.random() * 0.3}s`;
        
        return card;
    }

    // ===== DISPLAY PROJECTS =====
    function displayProjects(projectList) {
        const container = document.getElementById('projectsGrid');
        if (!container) return;

        container.innerHTML = '';
        projectList.forEach(project => {
            container.appendChild(buildProjectCard(project));
        });

        // Re-init scroll animations for new cards
        initScrollAnimations();
    }

    // ===== GENERATE CATEGORY FILTERS =====
    function generateCategoryFilters() {
        const categories = ['all'];
        projects.forEach(p => {
            if (p.category) {
                const cat = p.category.toLowerCase().trim();
                if (!categories.includes(cat)) {
                    categories.push(cat);
                }
            }
        });
        
        const filtersContainer = document.getElementById('category-filters');
        if (!filtersContainer) return;
        
        filtersContainer.innerHTML = '';
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = cat === 'all' ? 'category-btn active' : 'category-btn';
            btn.dataset.category = cat;
            
            let displayName = 'All Projects';
            if (cat !== 'all') {
                if (cat === 'saas') displayName = 'SaaS';
                else displayName = cat.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }
            btn.textContent = displayName;
            
            filtersContainer.appendChild(btn);
        });
    }

    // ===== FILTER PROJECTS =====
    function initProjectFilters() {
        const buttons = document.querySelectorAll('.category-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;

                // Filter projects
                if (category === 'all') {
                    displayProjects(projects);
                } else {
                    const filtered = projects.filter(p => p.category && p.category.toLowerCase().trim() === category);
                    displayProjects(filtered);
                }
            });
        });
    }

    // ===== LOAD PROJECTS JSON =====
    async function loadProjects() {
        try {
            const response = await fetch('./static/data/projects.json');
            const data = await response.json();
            projects = data.projects;
            
            generateCategoryFilters();
            displayProjects(projects);
            initProjectFilters();
        } catch (error) {
            console.error('Error loading projects:', error);
            const container = document.getElementById('projectsGrid');
            if (container) {
                container.innerHTML = '<p style="text-align:center; width:100%; color:var(--text-muted);">Failed to load projects data.</p>';
            }
        }
    }

    // ===== INITIALIZE =====
    document.addEventListener('DOMContentLoaded', () => {
        initCustomCursor();
        initScrollProgress();
        createParticles();
        handleNavbarScroll();
        initHamburger();
        initScrollAnimations();
        
        // Load projects
        loadProjects();

        // Navbar scroll effect
        window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    });