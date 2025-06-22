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

        // Form submission with animation
        function initContactForm() {
            const form = document.querySelector('.contact-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.style.background = 'var(--accent-color)';
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent! ✓';
                    submitBtn.style.background = '#4CAF50';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 2000);
                }, 1500);
            });
        }

        // Typing effect for hero section
        function initTypingEffect() {
            const subtitle = document.querySelector('.subtitle');
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

        // Initialize all functions
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            initSmoothScrolling();
            initToolTags();
            initContactForm();
            initTypingEffect();
            initParallaxEffect();
            
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
                particlesContainer.innerHTML = '';
                createParticles();
            });
        });

        // Add some interactive hover effects
        document.addEventListener('DOMContentLoaded', function() {
            // Project cards tilt effect
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
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
        });