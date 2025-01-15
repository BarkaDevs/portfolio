document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.querySelector('.navbar-toggler');
    const nav = document.querySelector('.navbar-nav');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');

    toggler.addEventListener('click', function () {
        nav.classList.toggle('show');
        openIcon.style.display = nav.classList.contains('show') ? 'none' : 'block';
        closeIcon.style.display = nav.classList.contains('show') ? 'block' : 'none';
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