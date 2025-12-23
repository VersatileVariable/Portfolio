/**
 * Anna Galeano Portfolio - Modern JavaScript
 * Handles navigation, terminal, gallery, and interactive features
 */

(function() {
    'use strict';

    // DOM elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    const contactForm = document.getElementById('contact-form');
    const particlesContainer = document.getElementById('particles');

    let currentGalleryIndex = 0;

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initTerminal();
        initGallery();
        initContactForm();
        initParticles();
        initScrollEffects();
        initSmoothScroll();
    });

    /**
     * Navigation functionality
     */
    function initNavigation() {
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Highlight active navigation item
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');

        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    /**
     * Terminal functionality
     */
    function initTerminal() {
        if (!terminalInput || !terminalOutput) return;

        // Focus terminal input
        terminalInput.focus();

        // Handle terminal commands
        terminalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                
                if (command) {
                    addTerminalLine(`anna@portfolio:~$ ${command}`, 'user-input');
                    processTerminalCommand(command);
                }
                
                terminalInput.value = '';
                scrollTerminalToBottom();
            }
        });

        // Terminal commands
        const terminalCommands = {
            help: () => {
                addTerminalLine('Available commands:', 'output');
                addTerminalLine('  about       - Learn about Anna', 'output');
                addTerminalLine('  skills      - View technical skills', 'output');
                addTerminalLine('  experience  - Show work experience', 'output');
                addTerminalLine('  projects    - List notable projects', 'output');
                addTerminalLine('  research    - View research publications', 'output');
                addTerminalLine('  contact     - Show contact information', 'output');
                addTerminalLine('  resume      - Download resume', 'output');
                addTerminalLine('  clear       - Clear the terminal', 'output');
                addTerminalLine('  whoami      - Display current user', 'output');
            },
            about: () => {
                addTerminalLine('━━━ ABOUT ANNA GALEANO ━━━', 'heading');
                addTerminalLine("Computer Science student at Clemson University", 'output');
                addTerminalLine("Specializing in human-centered computing & autonomous systems", 'output');
                addTerminalLine("Currently researching at TigerSec Laboratory", 'output');
                addTerminalLine("Contributing to NATO defense innovation projects", 'output');
            },
            skills: () => {
                addTerminalLine('━━━ TECHNICAL SKILLS ━━━', 'heading');
                addTerminalLine('Languages: Java, C++, C, Python, JavaScript, HTML/CSS', 'output');
                addTerminalLine('Research: Machine Learning, Computer Vision, Human Factors', 'output');
                addTerminalLine('Specialties: YOLOv8, Privacy Assessment, Data Analysis', 'output');
                addTerminalLine('Tools: Linux, Git, Fusion 360, CAD Design', 'output');
            },
            experience: () => {
                addTerminalLine('━━━ WORK EXPERIENCE ━━━', 'heading');
                addTerminalLine('• TigerSec Laboratory - Research Assistant (Sep 2025 - Present)', 'output');
                addTerminalLine('• Adobe Creative Studio - Intern (Sep 2025 - Present)', 'output');
                addTerminalLine('• Special Operations Command Europe - DIU Fellow (Jun-Aug 2025)', 'output');
                addTerminalLine('• TRACE Lab - Student Research Assistant (Feb 2024 - May 2025)', 'output');
                addTerminalLine('• Clemson Makerspace - Intern (Jan 2024 - Jun 2025)', 'output');
            },
            projects: () => {
                addTerminalLine('━━━ NOTABLE PROJECTS ━━━', 'heading');
                addTerminalLine('1. NASA FLARESat - Space Apps Challenge Winner 2025', 'output');
                addTerminalLine('2. NATO Autonomous USV - Bold Machina 2025', 'output');
                addTerminalLine('3. Automotive Privacy Assessment - TigerSec Lab', 'output');
                addTerminalLine('4. Chagas Disease Detection - ML Classification System', 'output');
                addTerminalLine('5. Security Breadcrumbs - OSINT Research Tool', 'output');
            },
            research: () => {
                addTerminalLine('━━━ RESEARCH PUBLICATIONS ━━━', 'heading');
                addTerminalLine('• Human-AI Team Training (2024) - 25% efficiency improvement', 'output');
                addTerminalLine('• COVID-19 Misinformation Analysis (2021) - 50+ citations', 'output');
                addTerminalLine('• Privacy assessments for automotive industry (ongoing)', 'output');
            },
            contact: () => {
                addTerminalLine('━━━ CONTACT INFORMATION ━━━', 'heading');
                addTerminalLine('Email: agalean@clemson.edu', 'output');
                addTerminalLine('LinkedIn: linkedin.com/in/connectedanna', 'output');
                addTerminalLine('GitHub: github.com/VersatileVariable', 'output');
                addTerminalLine('Location: Clemson, SC', 'output');
            },
            resume: () => {
                addTerminalLine('Downloading resume...', 'output');
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = 'files/anna_galeano_resume.pdf';
                    link.download = 'Anna_Galeano_Resume.pdf';
                    link.click();
                    addTerminalLine('✓ Resume downloaded successfully!', 'success');
                }, 1000);
            },
            whoami: () => {
                addTerminalLine('anna', 'output');
            },
            clear: () => {
                const lines = terminalOutput.querySelectorAll('.terminal-line:not(.system)');
                lines.forEach(line => line.remove());
            }
        };

        function processTerminalCommand(command) {
            if (terminalCommands[command]) {
                terminalCommands[command]();
            } else {
                addTerminalLine(`Command not found: ${command}`, 'error');
                addTerminalLine("Type 'help' to see available commands", 'hint');
            }
        }

        function addTerminalLine(text, className = '') {
            const line = document.createElement('div');
            line.className = `terminal-line ${className}`;
            line.textContent = text;
            
            const inputWrapper = terminalOutput.querySelector('.terminal-input-wrapper');
            terminalOutput.insertBefore(line, inputWrapper);
        }

        function scrollTerminalToBottom() {
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    }

    /**
     * Gallery functionality
     */
    function initGallery() {
        if (!galleryItems.length || !galleryModal) return;

        // Add click listeners to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                openGalleryModal(index);
            });
        });

        // Modal controls
        if (modalClose) {
            modalClose.addEventListener('click', closeGalleryModal);
        }

        if (modalPrev) {
            modalPrev.addEventListener('click', showPreviousImage);
        }

        if (modalNext) {
            modalNext.addEventListener('click', showNextImage);
        }

        // Close modal on background click
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (galleryModal.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        closeGalleryModal();
                        break;
                    case 'ArrowLeft':
                        showPreviousImage();
                        break;
                    case 'ArrowRight':
                        showNextImage();
                        break;
                }
            }
        });
    }

    function openGalleryModal(index) {
        currentGalleryIndex = index;
        updateGalleryModal();
        galleryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeGalleryModal() {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showPreviousImage() {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        updateGalleryModal();
    }

    function showNextImage() {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        updateGalleryModal();
    }

    function updateGalleryModal() {
        const currentItem = galleryItems[currentGalleryIndex];
        const img = currentItem.querySelector('img');
        const caption = img.getAttribute('data-caption') || img.getAttribute('alt');

        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = caption;
    }

    /**
     * Contact form handling
     */
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, 2000);
        });
    }

    /**
     * Floating particles animation
     */
    function initParticles() {
        if (!particlesContainer) return;

        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size and properties
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    /**
     * Scroll effects and animations
     */
    function initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.timeline-item, .project-card, .research-card, .gallery-item').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Smooth scrolling for navigation links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Utility functions
     */

    // Debounce function for performance
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Add resize handler for responsive adjustments
    window.addEventListener('resize', debounce(function() {
        // Handle responsive changes if needed
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }, 250));

})();