// Seleccionamos todos los elementos <li> dentro del menú
const menuItems = document.querySelectorAll('.accordion-menu li');

// Iteramos sobre cada elemento <li>
menuItems.forEach(item => {
    item.addEventListener('click', function () {
        // Removemos la clase 'active-page' de cualquier <li> que la tenga
        menuItems.forEach(li => li.classList.remove('active-page'));

        // Agregamos la clase 'active-page' al <li> que fue clickeado
        this.classList.add('active-page');
    });
});