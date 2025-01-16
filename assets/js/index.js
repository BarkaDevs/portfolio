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