// This script can be used for future enhancements
// console.log("Resume loaded successfully.");

// Smooth scroll to sections, excluding the Projects section
document.querySelectorAll('h2').forEach(header => {
    if (header.textContent !== "Projects") { // Exclude the Projects section
        header.addEventListener('click', function() {
            const section = this.parentElement; // This should be the section containing the header
            section.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Ensure project items are visible
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach(item => {
    item.classList.add('visible'); // Ensure they are visible
});

// Toggle dark mode
const toggleButton = document.getElementById('mode-toggle');

// Set initial state based on default mode
if (document.body.classList.contains('dark-mode')) {
    toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
    toggleButton.setAttribute('data-mode', 'dark');
} else {
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
    toggleButton.setAttribute('data-mode', 'light');
}

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update button icon and data-mode attribute
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
        toggleButton.setAttribute('data-mode', 'dark');
    } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
        toggleButton.setAttribute('data-mode', 'light');
    }

    // Optional: Add a smooth transition effect for the body background
    document.body.style.transition = 'background 0.5s, color 0.5s'; // Smooth transition for background and text color
});

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add the visible class to elements in the viewport
function handleScrollAnimations() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((el) => {
        if (isElementInViewport(el)) {
            el.classList.add('visible'); // Add visible class to trigger animation
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', handleScrollAnimations);

// Initial check to trigger animations for elements already in view
handleScrollAnimations();

// Add a link to the certifications page in the quick links section
const quickLinksContainer = document.querySelector('.quick-links-container');
const certificationsLink = document.createElement('a');
certificationsLink.href = 'certifications.html';
certificationsLink.className = 'quick-link';
certificationsLink.innerHTML = '<i class="fas fa-certificate"></i> Certifications';
quickLinksContainer.appendChild(certificationsLink);

// Remove the entire loading screen functionality section
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all project items
    document.querySelectorAll('.project-item').forEach(item => {
        observer.observe(item);
    });

    // Parallax effect for hero section
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelectorAll('.cube').forEach(cube => {
            cube.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Animate skill progress bars when they come into view
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-item');
                progressBars.forEach(bar => {
                    const progress = bar.dataset.progress;
                    const progressBar = bar.querySelector('.progress');
                    progressBar.style.width = `${progress}%`;
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skills-container').forEach(container => {
        skillObserver.observe(container);
    });

    // Keep only the existing functionality that's not related to loading screen
    // This includes dark mode toggle, smooth scroll, and other features

    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'scripts/particles.js', function() {
            console.log('particles.js loaded');
        });
    }

    // Prevent text selection and copying
    document.addEventListener('selectstart', (e) => e.preventDefault());
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Prevent keyboard shortcuts for copying
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && 
            (e.key === 'c' || e.key === 'C' || 
             e.key === 'u' || e.key === 'U' ||
             e.key === 's' || e.key === 'S')) {
            e.preventDefault();
        }
    });

    // Initialize Lottie animation
    const animation = lottie.loadAnimation({
        container: document.getElementById('lottie-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets10.lottiefiles.com/packages/lf20_yw3nyrsv.json' // Modern code loading animation
    });

    // Add this function to create a typing effect for the loading text
    function updateLoadingText() {
        const loadingTexts = [
            "Initializing Development Environment...",
            "Loading Framework Dependencies...",
            "Compiling Application...",
            "Starting Development Server..."
        ];
        let currentIndex = 0;
        
        const loadingTextElement = document.querySelector('.loading-text');
        
        const updateText = () => {
            loadingTextElement.style.opacity = '0';
            setTimeout(() => {
                loadingTextElement.textContent = loadingTexts[currentIndex];
                loadingTextElement.style.opacity = '1';
                currentIndex = (currentIndex + 1) % loadingTexts.length;
            }, 500);
        };
        
        updateText();
        const textInterval = setInterval(updateText, 1000);
        
        // Clear interval after loading screen is removed
        setTimeout(() => {
            clearInterval(textInterval);
        }, 3000);
    }

    // Call the function when the page loads
    updateLoadingText();

    // Hide loading screen after 3 seconds
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('fade-out');
        
        // Remove loading screen and add loaded class
        setTimeout(() => {
            loadingScreen.remove();
            document.body.classList.add('loaded');
        }, 500);

        // Show content wrapper
        document.querySelector('.content-wrapper').style.opacity = '1';
    }, 3000);

    // Smooth scroll functionality for CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-cta .cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add highlight effect to the target section
                targetSection.classList.add('highlight');
                
                // Smooth scroll to the section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Remove highlight effect after animation
                setTimeout(() => {
                    targetSection.classList.remove('highlight');
                }, 1000);
                
                // Add click effect to the button
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
            }
        });
        
        // Add hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Add this to ensure the contact button works
    const contactButton = document.querySelector('a[href="#contact"]');
    if (contactButton) {
        contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.scrollIntoView({ behavior: 'smooth' });
                sidebar.classList.add('highlight');
                setTimeout(() => {
                    sidebar.classList.remove('highlight');
                }, 1000);
            }
        });
    }

    // Add ripple effect to quick links
    document.querySelectorAll('.quick-link').forEach(button => {
        button.classList.add('ripple');
        
        button.addEventListener('mousedown', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', x + 'px');
            button.style.setProperty('--y', y + 'px');
        });
    });

    // Contact Form Functionality
    const contactForm = document.querySelector('.contact-form');
    const messageInput = document.querySelector('#message');
    const charCounter = document.querySelector('.char-counter');
    const formStatus = document.querySelector('.form-status');
    const submitBtn = document.querySelector('.submit-btn');
    const successCheckmark = document.querySelector('.success-checkmark');

    // Character counter for message
    if (messageInput && charCounter) {
        messageInput.addEventListener('input', () => {
            const remaining = messageInput.value.length;
            charCounter.textContent = `${remaining}/500`;
            
            if (remaining >= 450) {
                charCounter.classList.add('limit');
            } else {
                charCounter.classList.remove('limit');
            }
        });
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add loading state
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            try {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
                
                // Show success message
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'form-status success show';
                
                // Show checkmark animation
                successCheckmark.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.remove('show');
                    successCheckmark.classList.remove('show');
                }, 5000);
                
            } catch (error) {
                // Show error message
                formStatus.textContent = 'Failed to send message. Please try again.';
                formStatus.className = 'form-status error show';
            } finally {
                // Remove loading state
                submitBtn.classList.remove('loading');
            }
        });
    }

    // Add ripple effect to submit button
    if (submitBtn) {
        submitBtn.addEventListener('mousedown', (e) => {
            const rect = submitBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            submitBtn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
    }

    // Contact popup functionality
    const contactPopup = document.getElementById('contact-popup');
    const contactButtons = document.querySelectorAll('a[href="#contact"]');
    const closePopup = document.querySelector('.close-popup');

    function openContactPopup() {
        contactPopup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    }

    function closeContactPopup() {
        contactPopup.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Open popup when contact buttons are clicked
    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openContactPopup();
        });
    });

    // Close popup when close button is clicked
    if (closePopup) {
        closePopup.addEventListener('click', closeContactPopup);
    }

    // Close popup when clicking outside the form
    contactPopup.addEventListener('click', (e) => {
        if (e.target === contactPopup) {
            closeContactPopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactPopup.classList.contains('show')) {
            closeContactPopup();
        }
    });

    // After successful form submission, close the popup
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // ... existing form submission code ...

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // ... existing success handling ...
                
                // Close popup after 5 seconds
                setTimeout(() => {
                    closeContactPopup();
                }, 5000);
                
            } catch (error) {
                // ... existing error handling ...
            }
        });
    }
});

// Add typing animation for the hero text
const texts = ['Mobile App Developer', 'UI/UX Designer', 'Full Stack Developer'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    document.querySelector('.typing-text').textContent = letter;
    
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}

type();

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add particle background to hero section
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            out_mode: 'out'
        }
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/scripts/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}


