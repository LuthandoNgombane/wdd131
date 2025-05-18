//LN - Footer: Dynamic Year and Last Modified
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

//LN - Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.textContent = nav.classList.contains('open') ? '✖' : '☰';
});

