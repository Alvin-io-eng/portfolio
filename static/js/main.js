/* ===================================
   CYBERPUNK PORTFOLIO - JAVASCRIPT
   =================================== */

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    initNavbar();
    loadProjects();
    setupIntersectionObserver();
    setupMobileNav();
    handleFormSubmission();
    setupCarousel();
}

/* ===================================
   NAVBAR FUNCTIONALITY
   =================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navToggle = document.getElementById('navToggle');
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

/* ===================================
   MOBILE NAVIGATION
   =================================== */
function setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
        }
    });
}

/* ===================================
   LOAD PROJECTS FROM JSON
   =================================== */
function loadProjects() {
    fetch('./static/data/projects.json')
        .then(response => response.json())
        .then(data => {
            displayProjects(data.projects);
        })
        .catch(error => console.error('Error loading projects:', error));
}

function displayProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-image"></div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="project-link">View Project</a>
        </div>
    `;
    
    // Set background image if available
    const projectImage = card.querySelector('.project-image');
    if (project.image) {
        projectImage.style.backgroundImage = `url('${project.image}')`;
        projectImage.style.backgroundSize = 'cover';
        projectImage.style.backgroundPosition = 'center';
    }
    
    return card;
}

/* ===================================
   CAROUSEL FUNCTIONALITY
   =================================== */
let carouselState = {
    currentSlide: 0,
    totalSlides: 0,
    itemsPerView: 3,
    projectCards: []
};

function setupCarousel() {
    const projectsGrid = document.getElementById('projectsGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    if (!projectsGrid || !prevBtn || !nextBtn || !indicatorsContainer) return;

    // Wait a bit for projects to load
    setTimeout(() => {
        carouselState.projectCards = Array.from(projectsGrid.querySelectorAll('.project-card'));
        
        if (carouselState.projectCards.length === 0) return;

        // Calculate carousel dimensions
        updateCarouselDimensions();

        // Create indicators
        createCarouselIndicators(carouselState.totalSlides, indicatorsContainer);

        // Add event listeners
        prevBtn.addEventListener('click', () => {
            carouselState.currentSlide = Math.max(0, carouselState.currentSlide - 1);
            updateCarouselPosition();
            updateCarouselIndicators();
        });

        nextBtn.addEventListener('click', () => {
            carouselState.currentSlide = Math.min(carouselState.totalSlides - 1, carouselState.currentSlide + 1);
            updateCarouselPosition();
            updateCarouselIndicators();
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        });

        // Update carousel position
        updateCarouselPosition();
        updateCarouselIndicators();

        // Responsive behavior
        window.addEventListener('resize', debounce(() => {
            updateCarouselDimensions();
            updateCarouselPosition();
            updateCarouselIndicators();
        }, 250));
    }, 100);
}

function getItemsPerView() {
    const width = window.innerWidth;
    if (width < 768) return 1;        // Mobile: 1 item
    if (width < 1200) return 2;       // Tablet: 2 items
    return 3;                          // Desktop: 3 items
}

function updateCarouselDimensions() {
    carouselState.itemsPerView = getItemsPerView();
    const totalItems = carouselState.projectCards.length;
    carouselState.totalSlides = Math.max(1, totalItems - carouselState.itemsPerView + 1);
    
    // Reset current slide if out of bounds
    if (carouselState.currentSlide >= carouselState.totalSlides) {
        carouselState.currentSlide = Math.max(0, carouselState.totalSlides - 1);
    }
}

function createCarouselIndicators(count, container) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            carouselState.currentSlide = i;
            updateCarouselPosition();
            updateCarouselIndicators();
        });
        container.appendChild(dot);
    }
}

function updateCarouselPosition() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid || carouselState.projectCards.length === 0) return;

    const firstCard = carouselState.projectCards[0];
    const cardWidth = firstCard?.offsetWidth || 300;
    const gap = 40; // Match the gap from CSS (2.5rem = 40px)
    const offset = carouselState.currentSlide * (cardWidth + gap) * -1;

    projectsGrid.style.transform = `translateX(${offset}px)`;
}

function updateCarouselIndicators() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        if (index === carouselState.currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/* ===================================
   INTERSECTION OBSERVER - SCROLL ANIMATIONS
   =================================== */
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe skill tags for staggered animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

/* ===================================
   PARALLAX EFFECT
   =================================== */
function setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollValue = window.scrollY;
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrollValue * speed}px)`;
        });
    });
}

// Initialize parallax when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupParallax);
} else {
    setupParallax();
}

/* ===================================
   FORM HANDLING
   =================================== */
function handleFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        // Allow default form submission to Formspree
        // But we can add custom handling here if needed
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        
        // Set a timeout to reset the button after submission
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
        }, 2000);
    });
}

/* ===================================
   WORD ANIMATION IN HERO TITLE
   =================================== */
function initHeroTitleAnimation() {
    const words = document.querySelectorAll('.hero-title .word');
    
    words.forEach((word, index) => {
        word.style.animation = `fade-in-up 0.8s ease forwards`;
        word.style.animationDelay = `${index * 0.2}s`;
        word.style.display = 'inline-block';
        word.style.marginRight = '0.3em';
    });
}

// Initialize hero animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroTitleAnimation);
} else {
    initHeroTitleAnimation();
}

/* ===================================
   SCROLL REVEAL ANIMATIONS
   =================================== */
function setupScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.about-text, .about-visual, .contact-text, .contact-form'
    );

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in-up 0.8s ease forwards';
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        element.style.opacity = '0';
        revealOnScroll.observe(element);
    });
}

// Initialize scroll reveal
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupScrollReveal);
} else {
    setupScrollReveal();
}

/* ===================================
   SMOOTH PAGE TRANSITIONS
   =================================== */
function handlePageTransitions() {
    const allLinks = document.querySelectorAll('a[href^="http"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // External links open in new tab
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
        });
    });
}

// Initialize transitions
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handlePageTransitions);
} else {
    handlePageTransitions();
}

/* ===================================
   KEYBOARD NAVIGATION
   =================================== */
document.addEventListener('keydown', (e) => {
    // Implement keyboard shortcuts if needed
    if (e.key === 'Escape') {
        // Close mobile menu
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
});

/* ===================================
   ACCESSIBILITY ENHANCEMENTS
   =================================== */
function improveAccessibility() {
    // Add focus styles to interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"]'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = `2px solid var(--neon-orange)`;
            element.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// Initialize accessibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', improveAccessibility);
} else {
    improveAccessibility();
}

/* ===================================
   PERFORMANCE OPTIMIZATION
   =================================== */
// Lazy loading for project images
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.style.backgroundImage) {
                        img.style.backgroundImage = img.style.backgroundImage;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('.project-image');
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

/* ===================================
   STATS COUNTER ANIMATION
   =================================== */
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItem = entry.target;
                const isFirstStat = statItem === statNumbers[0];
                
                if (isFirstStat) {
                    statNumbers.forEach((number, index) => {
                        const text = number.textContent;
                        const numValue = parseInt(text);
                        
                        if (!isNaN(numValue)) {
                            animateCounter(number, 0, numValue, 1500);
                        }
                    });
                    
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => {
        statsObserver.observe(number.closest('.stat-item'));
    });
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 16);
}

// Initialize stats animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStats);
} else {
    animateStats();
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get element position relative to viewport
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        height: rect.height,
        width: rect.width
    };
}

// Check if element is in viewport
function isElementInViewport(element) {
    const position = getElementPosition(element);
    return (
        position.top < window.innerHeight &&
        position.bottom > 0 &&
        position.left < window.innerWidth &&
        position.right > 0
    );
}

// Add active class to current section in nav
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    const id = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach(section => observer.observe(section));
}

// Initialize active nav
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateActiveNav);
} else {
    updateActiveNav();
}

console.log('🚀 Cyberpunk Portfolio initialized successfully!');
