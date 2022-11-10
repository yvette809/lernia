
const navMenu = document.querySelector('#hamburger-icon')
const navList = document.querySelector('.navbarNav')

navMenu.addEventListener('click', toggleMenu)

function toggleMenu() {
    navMenu.classList.toggle('open')
    navList.classList.toggle('navbarNav')
}

