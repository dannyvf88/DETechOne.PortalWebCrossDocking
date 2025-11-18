document.addEventListener('DOMContentLoaded', function () {
    var mnuAcceso = document.getElementById('mnuAcceso').value; // Obteniendo el valor desde un elemento input oculto

    // desactiva el menu de administracion si no es administrador
    if (mnuAcceso === '2' || mnuAcceso === "3") {
        //var userMenuItem = document.getElementById('idAdmin'); // Selecciona el <li> por su id
        //if (userMenuItem) {
        //    userMenuItem.style.display = 'none'; // Oculta el <li>
        //}

        //userMenuItem = document.getElementById('idHome');
        //if (userMenuItem) {
        //    userMenuItem.style.display = 'none'; // Oculta el <li>
        //}

        userMenuItem = document.getElementById('idNotificaciones');
        if (userMenuItem) {
            userMenuItem.style.display = 'none'; // Oculta el <li>
        }

        userMenuItem = document.getElementById('idUsuarios');
        if (userMenuItem) {
            userMenuItem.style.display = 'none'; // Oculta el <li>
        }

        userMenuItem = document.getElementById('idPerfiles');
        if (userMenuItem) {
            userMenuItem.style.display = 'none'; // Oculta el <li>
        }

        userMenuItem = document.getElementById('idAsignaciones');
        if (userMenuItem) {
            userMenuItem.style.display = 'none'; // Oculta el <li>
        }

        userMenuItem = document.getElementById('idParams');
        if (userMenuItem) {
            userMenuItem.style.display = 'none'; // Oculta el <li>
        }

        userMenuItem = document.getElementById('idLiberacion');
        if (userMenuItem) {
            userMenuItem.style.display = 'none'; // Oculta el <li>
        }

    }

    if (mnuAcceso === '2') {
        var userMenuItem = document.getElementById('idPicking'); // Selecciona el <li> por su id
        if (userMenuItem) {
            userMenuItem.style.display = 'none'; // Oculta el <li>
        }

        userMenuItem = document.getElementById('idLstempaque');
        if (userMenuItem) {
            userMenuItem.style.display = 'none'; // Oculta el <li>
        }

        userMenuItem = document.getElementById('idLstsurtido');
        if (userMenuItem) {
            userMenuItem.style.display = 'none'; // Oculta el <li>
        }

    }
});