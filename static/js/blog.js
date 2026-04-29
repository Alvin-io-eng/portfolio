// -------- BLOG DATA (with high-quality images & categories) --------
    const BLOG_POSTS = [
        {
            id: 1,
            title: "Building Scalable SaaS: Lessons from 3 Profitable Products",
            excerpt: "From MVP nightmares to recurring revenue — what I learned while launching three SaaS tools before turning 23.",
            content: "Full article content...",
            date: "March 15, 2025",
            readTime: "7 min read",
            category: "saas",
            image: "https://picsum.photos/id/26/800/500",   // scenic coding vibe
            featured: true
        },
        {
            id: 2,
            title: "Telecommunication Engineering meets Fullstack: The Future of Edge Networks",
            excerpt: "How 5G and modern web stacks converge to create ultra-low-latency experiences.",
            date: "February 28, 2025",
            readTime: "5 min read",
            category: "telecom",
            image: "https://picsum.photos/id/96/800/500",
            featured: false
        },
        {
            id: 3,
            title: "My AI Toolkit: Leveraging LLMs for Rapid Prototyping",
            excerpt: "How I use AI to accelerate development, from generating boilerplate to debugging complex logic.",
            date: "February 10, 2025",
            readTime: "6 min read",
            category: "ai",
            image: "https://picsum.photos/id/1/800/500",
            featured: false
        },
        {
            id: 4,
            title: "Why I Built AiVana: Automating HR with Intelligent Agents",
            excerpt: "A deep dive into my flagship SaaS product, tech stack, and user adoption stories.",
            date: "January 22, 2025",
            readTime: "8 min read",
            category: "saas",
            image: "https://picsum.photos/id/0/800/500",
            featured: false
        },
        {
            id: 5,
            title: "Mastering Three.js: Building Interactive 3D Portfolios",
            excerpt: "Exploring WebGL boundaries and creating immersive frontend experiences that wow clients.",
            date: "January 5, 2025",
            readTime: "4 min read",
            category: "dev",
            image: "https://picsum.photos/id/20/800/500",
            featured: false
        },
        {
            id: 6,
            title: "Fullstack Architecture: Monolith vs Microservices for Startups",
            excerpt: "Choosing the right backend structure when you're moving fast and scaling gradually.",
            date: "December 18, 2024",
            readTime: "6 min read",
            category: "dev",
            image: "https://picsum.photos/id/106/800/500",
            featured: false
        },
        {
            id: 7,
            title: "Generative AI in Telecommunications: Network Optimization",
            excerpt: "How predictive models are changing the way we manage signal coverage and traffic.",
            date: "December 5, 2024",
            readTime: "5 min read",
            category: "telecom",
            image: "https://picsum.photos/id/91/800/500",
            featured: false
        },
        {
            id: 8,
            title: "Design Systems for Developers: Crafting Pixel-Perfect UIs Faster",
            excerpt: "My approach to component-driven design using CSS variables and reusability patterns.",
            date: "November 20, 2024",
            readTime: "4 min read",
            category: "dev",
            image: "https://picsum.photos/id/21/800/500",
            featured: false
        },
        {
            id: 9,
            title: "From Engineering Student to SaaS Entrepreneur: The Mindset Shift",
            excerpt: "Balancing university, side projects, and building a business — my personal playbook.",
            date: "November 2, 2024",
            readTime: "9 min read",
            category: "saas",
            image: "https://picsum.photos/id/155/800/500",
            featured: false
        }
    ];

    // Filtering & Pagination state
    let activeCategory = "all";
    let currentPage = 1;
    const POSTS_PER_PAGE = 6;

    // DOM elements
    const blogGrid = document.getElementById("blogGrid");
    const paginationDiv = document.getElementById("paginationControls");
    const featuredContainer = document.getElementById("featuredPostContainer");
    const categoryBtns = document.querySelectorAll(".category-btn");

    // Filter posts by category
    function getFilteredPosts() {
        if (activeCategory === "all") return [...BLOG_POSTS];
        return BLOG_POSTS.filter(post => post.category === activeCategory);
    }

    // Get paginated posts
    function getPaginatedPosts() {
        const filtered = getFilteredPosts();
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE;
        return filtered.slice(start, end);
    }

    // Render Featured Post (only first featured = true)
    function renderFeatured() {
        if (!featuredContainer) return;
        const featuredPost = BLOG_POSTS.find(p => p.featured === true);
        if (featuredPost) {
            featuredContainer.innerHTML = `
                <img class="featured-img" src="${featuredPost.image}" alt="${featuredPost.title}">
                <div class="featured-content">
                    <span class="featured-badge"><i class="fas fa-star"></i> FEATURED ARTICLE</span>
                    <h2 class="featured-title">${featuredPost.title}</h2>
                    <div class="blog-meta" style="margin-bottom:0.5rem;">
                        <span><i class="far fa-calendar-alt"></i> ${featuredPost.date}</span>
                        <span><i class="far fa-clock"></i> ${featuredPost.readTime}</span>
                        <span><i class="fas fa-tag"></i> ${featuredPost.category.toUpperCase()}</span>
                    </div>
                    <p class="featured-desc">${featuredPost.excerpt}</p>
                    <a href="#" class="read-more" data-id="${featuredPost.id}">Read Full Story <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
        } else {
            featuredContainer.innerHTML = `<div class="featured-content"><p>🌟 Latest insights coming soon</p></div>`;
        }
        // attach click listener to featured read-more
        const featuredLink = featuredContainer.querySelector('.read-more');
        if(featuredLink) featuredLink.addEventListener('click', (e) => { e.preventDefault(); alert(`📖 "${featuredPost?.title}" – full article will be available in the complete blog version. Stay tuned!`); });
    }

    // Render blog cards
    function renderBlogCards() {
        if (!blogGrid) return;
        const postsToShow = getPaginatedPosts();
        if (postsToShow.length === 0) {
            blogGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);"><i class="fas fa-newspaper"></i> No articles in this category yet. Check back soon!</div>`;
            return;
        }
        blogGrid.innerHTML = postsToShow.map(post => `
            <div class="blog-card scroll-animate">
                <img class="blog-img" src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
                        <span><i class="far fa-clock"></i> ${post.readTime}</span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="#" class="read-more" data-id="${post.id}">Continue Reading <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
        
        // attach event listeners to all read-more buttons
        document.querySelectorAll('.read-more[data-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(btn.getAttribute('data-id'));
                const post = BLOG_POSTS.find(p => p.id === id);
                alert(` "${post?.title}"\n\nFull article experience coming soon!\nStay connected for deep-dives.`);
            });
        });
        // lazy scroll animation observer for new cards
        const animatedElements = document.querySelectorAll('.blog-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }

    // Pagination controls
    function renderPagination() {
        if (!paginationDiv) return;
        const filtered = getFilteredPosts();
        const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
        if (totalPages <= 1) {
            paginationDiv.innerHTML = '';
            return;
        }
        let paginationHtml = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<button class="page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        paginationDiv.innerHTML = paginationHtml;
        document.querySelectorAll('.page-link').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(btn.getAttribute('data-page'));
                if (!isNaN(page) && page !== currentPage) {
                    currentPage = page;
                    renderBlogCards();
                    renderPagination();
                    window.scrollTo({ top: document.querySelector('.blog-container').offsetTop - 100, behavior: 'smooth' });
                }
            });
        });
    }

    // Category filter handler
    function setupCategoryFilters() {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                currentPage = 1;
                renderBlogCards();
                renderPagination();
                // re-trigger scroll animations for visible cards
                const cards = document.querySelectorAll('.blog-card');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) entry.target.classList.add('visible');
                    });
                }, { threshold: 0.1 });
                cards.forEach(c => observer.observe(c));
            });
        });
    }

    // ---- Cursor, Particles, Progress bar (same as original) ----
    function initCustomCursor() {
        const dot = document.createElement('div'); dot.className = 'cursor-dot';
        const ring = document.createElement('div'); ring.className = 'cursor-ring';
        document.body.appendChild(dot); document.body.appendChild(ring);
        let mouseX=0,mouseY=0,ringX=0,ringY=0;
        document.addEventListener('mousemove', e => { mouseX=e.clientX; mouseY=e.clientY; dot.style.left=mouseX+'px'; dot.style.top=mouseY+'px'; });
        function animateRing() { ringX+=(mouseX-ringX)*0.12; ringY+=(mouseY-ringY)*0.12; ring.style.left=ringX+'px'; ring.style.top=ringY+'px'; requestAnimationFrame(animateRing); }
        animateRing();
        const hoverTargets = 'a, button, .blog-card, .category-btn, .page-link';
        document.addEventListener('mouseover', e => { if(e.target.closest(hoverTargets)) ring.classList.add('hovering'); });
        document.addEventListener('mouseout', e => { if(e.target.closest(hoverTargets)) ring.classList.remove('hovering'); });
        document.addEventListener('mouseleave', () => { dot.style.opacity='0'; ring.style.opacity='0'; });
        document.addEventListener('mouseenter', () => { dot.style.opacity='1'; ring.style.opacity=''; });
    }
    function initScrollProgress() {
        const bar = document.getElementById('scroll-progress-bar');
        window.addEventListener('scroll', () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const pct = (window.scrollY / max) * 100;
            bar.style.width = pct + '%';
        });
    }
    function createParticles() {
        const container = document.getElementById('particles');
        if(!container) return;
        container.innerHTML = '';
        const count = window.innerWidth<600?20:40;
        const colors = ['#80c3fd','#d4c628','#4facfe','#667eea'];
        for(let i=0;i<count;i++){
            const p=document.createElement('div'); p.className='particle';
            const size=Math.random()*3+1;
            p.style.cssText = `left:${Math.random()*100}%; top:${Math.random()*100}%; width:${size}px; height:${size}px; background:${colors[Math.floor(Math.random()*colors.length)]}; animation-duration:${Math.random()*15+10}s; animation-delay:${Math.random()*10}s;`;
            container.appendChild(p);
        }
    }
    function handleNavbarScroll() { const navbar=document.getElementById('navbar'); if(navbar) navbar.classList.toggle('scrolled', window.scrollY>80); }
    function initHamburger() {
        const btn=document.getElementById('hamburger-btn'); const links=document.querySelector('.nav-links');
        if(btn && links) btn.addEventListener('click',()=>{ btn.classList.toggle('open'); links.classList.toggle('mobile-open'); });
        links?.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{ btn?.classList.remove('open'); links.classList.remove('mobile-open'); }));
    }
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.scroll-animate');
        const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }); },{threshold:0.1});
        elements.forEach(el=>obs.observe(el));
    }

    // initialize everything
    document.addEventListener('DOMContentLoaded', () => {
        initCustomCursor();
        initScrollProgress();
        createParticles();
        handleNavbarScroll();
        initHamburger();
        initScrollAnimations();
        window.addEventListener('scroll', handleNavbarScroll);
        renderFeatured();
        renderBlogCards();
        renderPagination();
        setupCategoryFilters();
        // add blog link active state for navbar
        const blogNavLink = document.querySelector('.nav-links a[href="blog.html"]');
        if(blogNavLink) blogNavLink.classList.add('active');
    });
    window.addEventListener('resize', () => { createParticles(); renderBlogCards(); renderPagination(); });