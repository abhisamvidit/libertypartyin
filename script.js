// script.js - National Renaissance Framework Core Interactions
document.addEventListener('DOMContentLoaded', () => {
    // ================ CORE MODULES ================
    const App = {
        // ================ SYSTEM CONFIG ================
        config: {
            mobileBreakpoint: 992,
            scrollOffset: 100,
            animationOffset: 150,
            videoVolume: 0.2
        },

        // ================ INITIALIZATION ================
        init() {
            this.setupNav();
            this.setupSmoothScroll();
            this.setupAnimations();
            this.setupVideo();
            this.setupLanguageSwitcher();
            this.setupProgressBars();
            this.setupFormValidation();
            this.setupIntersectionObservers();
            this.setupUIEventListeners();
            this.setupServiceWorker();
        },

        // ================ NAVIGATION SYSTEM ================
        setupNav() {
            // Mobile Menu Toggle
            this.navToggle = document.querySelector('.nav-toggle');
            this.navMenu = document.querySelector('.nav-menu');
            
            this.navToggle?.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Dropdown Handling
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.addEventListener('mouseenter', this.handleDropdownShow);
                dropdown.addEventListener('mouseleave', this.handleDropdownHide);
            });

            // Mobile Submenu Handling
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.addEventListener('click', e => {
                    if (window.innerWidth < this.config.mobileBreakpoint) {
                        e.preventDefault();
                        item.classList.toggle('active');
                    }
                });
            });
        },

        toggleMobileMenu() {
            this.navToggle?.classList.toggle('active');
            this.navMenu?.classList.toggle('active');
            document.body.classList.toggle('nav-active');
        },

        handleDropdownShow(e) {
            if (window.innerWidth > App.config.mobileBreakpoint) {
                e.currentTarget.classList.add('active');
            }
        },

        handleDropdownHide(e) {
            if (window.innerWidth > App.config.mobileBreakpoint) {
                e.currentTarget.classList.remove('active');
            }
        },

        // ================ SMOOTH SCROLL SYSTEM ================
        setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', e => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - this.config.scrollOffset,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        },

        // ================ ANIMATION SYSTEM ================
        setupAnimations() {
            this.animatedElements = document.querySelectorAll('[data-animate]');
            this.animateOnScroll();
        },

        animateOnScroll() {
            this.animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                if (elementTop < window.innerHeight - this.config.animationOffset &&
                    elementBottom > this.config.animationOffset) {
                    element.classList.add('active');
                }
            });
        },

        // ================ MEDIA SYSTEM ================
        setupVideo() {
            this.heroVideo = document.querySelector('.hero-video');
            if (this.heroVideo) {
                this.heroVideo.volume = this.config.videoVolume;
                this.heroVideo.muted = true; // Start muted for autoplay
            }
        },

        // ================ LANGUAGE SYSTEM ================
        setupLanguageSwitcher() {
            const engButton = document.querySelector(".lang-option.active"); // Initially ENG
            const langButton = document.querySelector(".languages-btn");
            const langOptions = document.querySelectorAll(".languages-content a");

            langOptions.forEach(option => {
                option.addEventListener("click", function (event) {
                    event.preventDefault(); // Prevents link redirection

                    // Remove 'active' class from ENG
                    engButton.classList.remove("active");

                    // Update Hindi button text dynamically
                    langButton.innerHTML = option.getAttribute("data-lang") + " ▼";
                    langButton.classList.add("active"); // Highlight selected language
                });
            });
        },

// ================ PROGRESS SYSTEM ================
setupProgressBars() {
    this.initProgressBars();
    this.initHoverEffects();
    this.initLiveUpdates();
},

initProgressBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress-width', `${progress}%`);
    });
},

initHoverEffects() {
    document.querySelectorAll('.metric-card, .timeline-content').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
},

initLiveUpdates() {
    const updateTime = document.getElementById('update-time');
    
    function updateTimestamp() {
        updateTime.textContent = new Date().toLocaleString();
    }
    
    if(updateTime) {
        setInterval(updateTimestamp, 1000);
        updateTimestamp();
    }
},

        // ================ FORM SYSTEM ================
        setupFormValidation() {
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', e => {
                    if (!this.validateForm(form)) {
                        e.preventDefault();
                    }
                });
            });
        },

        validateForm(form) {
            let isValid = true;
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.checkValidity()) {
                    isValid = false;
                    this.showFormError(input);
                }
            });
            return isValid;
        },

        showFormError(input) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'form-error';
            errorMessage.textContent = input.validationMessage;
            input.parentNode.appendChild(errorMessage);
            
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        },

        // ================ OBSERVER SYSTEM ================
        setupIntersectionObservers() {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const elementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('[data-observe]').forEach(element => {
                elementObserver.observe(element);
            });

            // Counter logic for "Libertarians Joined"
            function startCounter(element) {
                const target = parseInt(element.getAttribute('data-target'));
                let count = 0;
                const increment = Math.ceil(target / 500); // Adjust speed

                function updateCounter() {
                    count += increment;
                    if (count >= target) {
                        element.innerText = target;
                    } else {
                        element.innerText = count;
                        requestAnimationFrame(updateCounter);
                    }
                }

                updateCounter();
            }

            const counterElement = document.querySelector('.stat-number.counter');

            if (counterElement) {
                const counterObserver = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            startCounter(entry.target);
                            counterObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });

                counterObserver.observe(counterElement);
            }
        },

        // ================ UI EVENT SYSTEM ================
        setupUIEventListeners() {
            window.addEventListener('scroll', this.debounce(this.handleScroll));
            window.addEventListener('resize', this.debounce(this.handleResize));
        },

        handleScroll() {
            App.animateOnScroll();
            App.trackScrollPosition();
        },

        handleResize() {
            if (window.innerWidth >= App.config.mobileBreakpoint) {
                App.navMenu?.classList.remove('active');
                App.navToggle?.classList.remove('active');
            }
        },

        trackScrollPosition() {
            const scrollY = window.scrollY;
            document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
        },

        // ================ PWA SYSTEM ================
        setupServiceWorker() {
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then(registration => {
                            console.log('ServiceWorker registration successful');
                        })
                        .catch(err => {
                            console.log('ServiceWorker registration failed: ', err);
                        });
                });
            }
        },

        // ================ UTILITY FUNCTIONS ================
        debounce(func, timeout = 100) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
        }
    };

    // ================ INITIALIZE APPLICATION ================
    App.init();

    // Show popup after a delay (or immediately on page load)
    setTimeout(() => {
        document.getElementById("popup-form").style.opacity = "1";
        document.getElementById("popup-form").style.visibility = "visible";
    }, 2000); // Show after 2 seconds (adjust as needed)

    // Form Submission
    const form = document.getElementById('idCardForm');
    const modal = document.getElementById('cardModal');
    const closeModal = document.querySelector('.close-modal');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('userName').value,
            gender: document.getElementById('userGender').value,
            age: document.getElementById('userAge').value,
            city: document.getElementById('userCity').value
        };
        
        // Update preview
        document.getElementById('previewName').textContent = formData.name;
        document.getElementById('previewGender').textContent = formData.gender;
        document.getElementById('previewAge').textContent = formData.age;
        document.getElementById('previewCity').textContent = formData.city;
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Download Card
    document.getElementById('modalDownload').addEventListener('click', () => {
        html2canvas(document.getElementById('idCardPreview')).then(canvas => {
            const link = document.createElement('a');
            link.download = 'libertarian-card.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });
});

// Close popup when user clicks X button
function closePopup() {
    document.getElementById("popup-form").style.opacity = "0";
    document.getElementById("popup-form").style.visibility = "hidden";
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Dropdown elements
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    const languageSwitcher = document.querySelector('.language-switcher');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        const epanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('active');
        
        // Transform toggle to X when open
        if (!expanded) {
            this.classList.add('is-active');
        } else {
            this.classList.remove('is-active');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        // Check if click is outside nav and menu is open
        const isOutside = !event.target.closest('.nav-menu') && 
                          !event.target.closest('.nav-toggle');
        
        if (isOutside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('is-active');
            
            // Also close any open dropdowns
            dropdownItems.forEach(item => {
                item.classList.remove('js-dropdown-active');
            });
            
            // Close language dropdown
            if (languageSwitcher) {
                languageSwitcher.classList.remove('is-open');
            }
        }
    });
    
    // Handle dropdown toggles on mobile
    dropdownItems.forEach(item => {
        // Get the actual clickable element (usually an <a> tag)
        const dropdownToggle = item.querySelector('a');
        
        dropdownToggle.addEventListener('click', function(e) {
            // Only run on mobile screens
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                
                // Close all other open dropdowns first
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('js-dropdown-active');
                    }
                });
                
                // Toggle current dropdown
                item.classList.toggle('js-dropdown-active');
            }
        });
    });
    
    // Language switcher toggle
    if (languageSwitcher) {
        const langButton = languageSwitcher.querySelector('.languages-btn');
        const langContent = languageSwitcher.querySelector('.languages-content');
        
        langButton.addEventListener('click', function(e) {
            // Only override default behavior on mobile
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                languageSwitcher.classList.toggle('is-open');
                
                // Toggle content visibility
                if (langContent) {
                    if (languageSwitcher.classList.contains('is-open')) {
                        langContent.style.display = 'block';
                        setTimeout(() => {
                            langContent.style.opacity = '1';
                            langContent.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        langContent.style.opacity = '0';
                        langContent.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            langContent.style.display = 'none';
                        }, 300); // Match transition duration
                    }
                }
            }
        });
    }
    
    // Handle escape key to close menu and dropdowns
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('is-active');
            
            dropdownItems.forEach(item => {
                item.classList.remove('js-dropdown-active');
            });
            
            if (languageSwitcher) {
                languageSwitcher.classList.remove('is-open');
            }
        }
    });
    
    // Close dropdown when clicking a dropdown item (for better mobile UX)
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                // Close the mobile menu after selection
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
                
                // Close all dropdowns
                dropdownItems.forEach(item => {
                    item.classList.remove('js-dropdown-active');
                });
            }
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset mobile states if window is resized above breakpoint
            if (window.innerWidth > 1024) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
                
                dropdownItems.forEach(item => {
                    item.classList.remove('js-dropdown-active');
                });
                
                if (languageSwitcher) {
                    languageSwitcher.classList.remove('is-open');
                    const langContent = languageSwitcher.querySelector('.languages-content');
                    if (langContent) {
                        langContent.style.display = '';
                        langContent.style.opacity = '';
                        langContent.style.transform = '';
                    }
                }
            }
        }, 250);
    });
});