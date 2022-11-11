
const hamburger = document.querySelector('#hamburger-icon')
const navMenu = document.querySelector('.nav-menu')
const closeBtn = document.querySelector('.fa-xmark')
console.log('nav', navMenu)
console.log('close', closeBtn)


hamburger.addEventListener('click', openMenu)
closeBtn.addEventListener('click', closeMenu)

function openMenu() {
    // hamburger.classList.toggle('open')
    navMenu.classList.add('nav-menu')
    // closeBtn.style.display = 'block'

}

function closeMenu() {
    // hamburger.classList.toggle('open')
    navMenu.classList.remove('nav-menu')
    closeBtn.style.display = 'none'

}

