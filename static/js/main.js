// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Tool tags interaction
function initToolTags() {
    const toolTags = document.querySelectorAll('.tool-tag');
    toolTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.animationDelay = '0s';
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        tag.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

// Form submission with Formspree
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'var(--accent-color)';
            submitBtn.style.cursor = 'not-allowed';
            
            try {
                // Submit to Formspree
                const formData = new FormData(this);
                
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    submitBtn.textContent = 'Message Sent! ✓';
                    submitBtn.style.background = '#4CAF50';
                    this.reset();
                    
                    // Show success message
                    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        submitBtn.style.cursor = 'pointer';
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error handling
                submitBtn.textContent = 'Error - Try Again';
                submitBtn.style.background = '#f44336';
                showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    submitBtn.style.cursor = 'pointer';
                }, 3000);
                
                console.error('Form submission error:', error);
            }
        });
    }
}

// Helper function to show form messages
function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        margin-top: 15px;
        padding: 12px 16px;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;
    
    if (type === 'success') {
        messageDiv.style.background = 'rgba(76, 175, 80, 0.1)';
        messageDiv.style.color = '#4CAF50';
        messageDiv.style.border = '1px solid #4CAF50';
    } else {
        messageDiv.style.background = 'rgba(244, 67, 54, 0.1)';
        messageDiv.style.color = '#f44336';
        messageDiv.style.border = '1px solid #f44336';
    }
    
    const form = document.querySelector('.contact-form');
    form.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Typing effect for hero section
function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for hero section
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Function to load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('./static/data/projects.json');
        const data = await response.json();
        
        // Check if we're on the projects page or main page
        if (window.location.pathname.includes('projects.html')) {
            displayAllProjects(data.projects);
        } else {
            displayProjectsCarousel(data.projects);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to default projects if JSON fails to load
        const fallbackProjects = [
            {
                title: "AiVana SaaS App",
                description: "An intelligent SaaS application that streamlines HR processes and employee monitoring with advanced AI capabilities.",
                image: "./static/img/aivana.png",
                link: "https://aivanawebsite.vercel.app/"
            },
            {
                title: "Lit Calculator App",
                description: "A modern, feature-rich calculator application with advanced mathematical functions and intuitive design.",
                image: "./static/img/calculator.png",
                link: "#"
            },
            {
                title: "Shake-Up Kitchen App",
                description: "A comprehensive restaurant management system that boosted business operations and customer engagement.",
                image: "./static/img/shakeup-kitchen.png",
                link: "https://shakeup-kitchen.vercel.app"
            },
            // {
            //     title: "Portfolio Website",
            //     description: "A sleek and inexpensive personal portfolio to showcase projects and skills with a modern UI.",
            //     image: "./static/img/portfolio.png",
            //     link: "#"
            // },
            // {
            //     title: "E-Commerce Store",
            //     description: "A fully functional online store with cart, checkout, and payment integrations.",
            //     image: "./static/img/ecommerce.png",
            //     link: "#"
            // },
            // {
            //     title: "Task Manager App",
            //     description: "A productivity tool that helps users manage tasks, deadlines, and priorities efficiently.",
            //     image: "./static/img/taskmanager.png",
            //     link: "#"
            // }
        ];
        
        if (window.location.pathname.includes('projects.html')) {
            displayAllProjects(fallbackProjects);
        } else {
            displayProjectsCarousel(fallbackProjects);
        }
    }
}

// Function to display projects in the carousel
function displayProjectsCarousel(projects) {
    const carouselContainer = document.getElementById('carousel-container');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!carouselContainer) return;
    
    // Clear any existing content
    carouselContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Calculate how many slides we need
    const projectsPerSlide = window.innerWidth < 768 ? 1 : 3;
    const totalSlides = Math.ceil(projects.length / projectsPerSlide);
    
    // Create slides
    for (let slideIndex = 0; slideIndex < totalSlides; slideIndex++) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.display = 'flex';
        slide.style.justifyContent = 'center';
        slide.style.gap = '2rem';
        slide.style.width = '100%';
        slide.style.flexShrink = '0';
        
        // Add projects to this slide
        for (let i = 0; i < projectsPerSlide; i++) {
            const projectIndex = slideIndex * projectsPerSlide + i;
            if (projectIndex >= projects.length) break;
            
            const project = projects[projectIndex];
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <div class="project-image" 
                     style="background: url('${project.image}') no-repeat center center;
                            background-size: cover;"></div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" class="project-link" target="_blank">View Project</a>
                </div>
            `;
            
            slide.appendChild(projectCard);
        }
        
        carouselContainer.appendChild(slide);
        
        // Create dot for this slide
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (slideIndex === 0) dot.classList.add('active');
        dot.dataset.slide = slideIndex;
        dot.addEventListener('click', () => goToSlide(slideIndex));
        dotsContainer.appendChild(dot);
    }
    
    // Initialize carousel
    initCarousel(totalSlides);
}

// Function to display all projects on the projects page
function displayAllProjects(projects) {
    const projectsContainer = document.getElementById('all-projects-container');
    
    if (!projectsContainer) return;
    
    // Clear any existing content
    projectsContainer.innerHTML = '';
    
    // Create HTML for each project
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image" 
                 style="background: url('${project.image}') no-repeat center center;
                        background-size: cover;"></div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="project-link" target="_blank">View Project</a>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Carousel functionality
function initCarousel(totalSlides) {
    const carouselContainer = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (!carouselContainer || totalSlides <= 1) return;
    
    let currentSlide = 0;
    
    // Function to update carousel position
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance carousel (optional)
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Reinitialize carousel on resize
        loadProjects();
    });
}

// Add some interactive hover effects
function initHoverEffects() {
    // Project cards tilt effect
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.project-card')) {
            const card = e.target.closest('.project-card');
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        }
    });
    
    // Skill categories hover effect
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) scale(1)';
        });
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initSmoothScrolling();
    initToolTags();
    initContactForm();
    initTypingEffect();
    initCarousel();
    initParallaxEffect();
    initHoverEffects();
    
    // Load projects (either carousel or full grid)
    loadProjects();
    
    // Initial check for scroll animations
    handleScrollAnimations();
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleScrollAnimations();
    });
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', () => {
        // Recreate particles on resize
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            createParticles();
        }
    });
});