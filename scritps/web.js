const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', ()=>{
    console.log('hola');
    toggleButton.classList.toggle('ok');
    navbarLinks.classList.toggle('active');
});