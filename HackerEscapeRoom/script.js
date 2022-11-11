
const hamburger = document.querySelector('#hamburger-icon')
const navMenu = document.querySelector('.nav-menu')
const closeBtn = document.querySelector('.fa-xmark')
mainNav = document.querySelector('.navbar-main')

hamburger.addEventListener('click', openMenu)
closeBtn.addEventListener('click', closeMenu)

function openMenu() {   
    navMenu.style.display= 'block'
    mainNav.style.background='#b6bdb5'
}

function closeMenu() {
    navMenu.style.display= 'none'
    mainNav.style.background='#011827'
}

