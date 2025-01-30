document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');

    navbarToggler.addEventListener('click', function () {
        navbarNav.classList.toggle('show');
        openIcon.style.display = openIcon.style.display === 'none' ? 'block' : 'none';
        closeIcon.style.display = closeIcon.style.display === 'none' ? 'block' : 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const teamMembers = document.querySelectorAll('.team-member');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    if (teamMembers.length === 8) {
        seeMoreBtn.style.display = 'block';
    } else {
        seeMoreBtn.style.display = 'none';
    }
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Wrap existing project containers in a slider wrapper
    const projectSection = document.querySelector('.project');
    const projectContainers = document.querySelectorAll('.project-container');

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

    const nextButton = document.createElement('button');
    nextButton.className = 'slider-button next';
    nextButton.textContent = '→';

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);

    // Add dots
    const dots = document.createElement('div');
    dots.className = 'slider-dots';

    projectContainers.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dots.appendChild(dot);
    });

    wrapper.appendChild(controls);
    wrapper.appendChild(dots);

    // Insert everything after the title
    const title = projectSection.querySelector('.title');
    title.after(wrapper);

    // Slider functionality
    let currentSlide = 0;
    const totalSlides = projectContainers.length;

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

    // Event listeners
    nextButton.addEventListener('click', () => updateSlide('next'));
    prevButton.addEventListener('click', () => updateSlide('prev'));

    // Dot navigation
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            projectContainers[currentSlide].classList.remove('active');
            document.querySelectorAll('.dot')[currentSlide].classList.remove('active');

            currentSlide = index;

            containerWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            projectContainers[currentSlide].classList.add('active');
            document.querySelectorAll('.dot')[currentSlide].classList.add('active');
        });
    });

    // Automatic sliding
    setInterval(() => {
        updateSlide('next');
    }, 3000); // Change slide every 3 seconds
});