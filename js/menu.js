// js/menu.js

// Código para mostrar/ocultar el menú desplegable
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const menuOverlay = document.getElementById('menu-overlay');

menuButton.addEventListener('click', () => {
    menu.classList.add('active');
    menuOverlay.style.display = 'block';
});

menuOverlay.addEventListener('click', () => {
    menu.classList.remove('active');
    menuOverlay.style.display = 'none';
});
