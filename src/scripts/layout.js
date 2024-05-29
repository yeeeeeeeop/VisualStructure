const header = document.getElementById('layout-header');
const menu = header.querySelector('.menu-icon');

function toggleMenu() {
  const navBar = document.getElementById('nav-bar');

  navBar.classList.toggle('open');
}

menu.addEventListener('click', toggleMenu);
