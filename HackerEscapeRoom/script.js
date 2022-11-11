
const hamburger = document.querySelector('#hamburger-icon')
const navMenu = document.querySelector('.navbarNav')


hamburger.addEventListener('click', toggleMenu)

function toggleMenu() {
    hamburger.classList.toggle('open')
    navMenu.classList.toggle('navbarNav')


}

