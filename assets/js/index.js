document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');

    // Mobile menu toggle
    navbarToggler.addEventListener('click', function () {
        navbarNav.classList.toggle('show');
        openIcon.style.display = openIcon.style.display === 'none' ? 'block' : 'none';
        closeIcon.style.display = closeIcon.style.display === 'none' ? 'block' : 'none';
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarNav.classList.remove('show');
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });

    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Team members functionality
    const teamMembers = document.querySelectorAll('.team-member');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    if (teamMembers.length === 8) {
        seeMoreBtn.style.display = 'block';
    } else {
        seeMoreBtn.style.display = 'none';
    }

    // Project slider functionality
    const projectSection = document.querySelector('.project');
    const projectContainers = document.querySelectorAll('.project-container');

    if (!projectContainers.length) return;

    // Create wrapper for sliding functionality
    const wrapper = document.createElement('div');
    wrapper.className = 'project-slider';

    const containerWrapper = document.createElement('div');
    containerWrapper.className = 'project-container-wrapper';

    // Move all project containers into the wrapper
    projectContainers.forEach(container => {
        containerWrapper.appendChild(container);
    });

    wrapper.appendChild(containerWrapper);

    // Add controls
    const controls = document.createElement('div');
    controls.className = 'slider-controls';

    const prevButton = document.createElement('button');
    prevButton.className = 'slider-button prev';
    prevButton.textContent = '←';
    prevButton.setAttribute('aria-label', 'Previous project');

    const nextButton = document.createElement('button');
    nextButton.className = 'slider-button next';
    nextButton.textContent = '→';
    nextButton.setAttribute('aria-label', 'Next project');

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);

    // Add dots
    const dots = document.createElement('div');
    dots.className = 'slider-dots';

    projectContainers.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dots.appendChild(dot);
    });

    wrapper.appendChild(controls);
    wrapper.appendChild(dots);

    // Insert everything after the title
    const title = projectSection.querySelector('h2') || projectSection.firstElementChild;
    title.after(wrapper);

    // Slider functionality
    let currentSlide = 0;
    const totalSlides = projectContainers.length;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    // Show initial slide
    projectContainers[0].classList.add('active');

    function updateSlide(direction) {
        // Remove active class from current slide
        projectContainers[currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[currentSlide].classList.remove('active');

        // Update current slide
        if (direction === 'next') {
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }

        // Add active class to new slide
        containerWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        projectContainers[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            updateSlide('next');
        }, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Touch Events
    containerWrapper.addEventListener('touchstart', (e) => {
        stopAutoSlide();
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        containerWrapper.style.transition = 'none';
    }, { passive: true });

    containerWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        touchEndX = e.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        const moveX = -(currentSlide * 100 + (diff / wrapper.offsetWidth) * 100);
        containerWrapper.style.transform = `translateX(${moveX}%)`;
    }, { passive: true });

    containerWrapper.addEventListener('touchend', () => {
        isDragging = false;
        containerWrapper.style.transition = 'transform 0.5s ease-in-out';

        const diff = touchStartX - touchEndX;
        const threshold = 50; // minimum distance for swipe

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                updateSlide('next');
            } else {
                updateSlide('prev');
            }
        } else {
            // Return to current slide if swipe wasn't long enough
            containerWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        startAutoSlide();
    });

    // Event listeners
    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        updateSlide('next');
        startAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        updateSlide('prev');
        startAutoSlide();
    });

    // Dot navigation
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();

            projectContainers[currentSlide].classList.remove('active');
            document.querySelectorAll('.dot')[currentSlide].classList.remove('active');

            currentSlide = index;

            containerWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            projectContainers[currentSlide].classList.add('active');
            document.querySelectorAll('.dot')[currentSlide].classList.add('active');

            startAutoSlide();
        });
    });

    // Pause auto-slide when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // Start auto-slide
    startAutoSlide();
});

// Typing text effect
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typing-text");
    const message = "Are you a student needing academic support?\nWe can cater that also.";
    let index = 0;

    function typeText() {
        if (index < message.length) {
            textElement.innerHTML += message.charAt(index);
            index++;
            setTimeout(typeText, 50); // Typing speed
        }
    }

    document.querySelector(".popup-container").addEventListener("mouseenter", function () {
        textElement.innerHTML = ""; // Reset text
        index = 0;
        typeText(); // Start typing effect
    });
});