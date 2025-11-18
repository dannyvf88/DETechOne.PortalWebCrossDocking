function logout() {
    Swal.fire({
        title: 'Cerrar Sesion',
        text: "¿Estas seguro de cerrar sesion? Los datos no guardados de perderan",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
        if (result.isConfirmed) {
            $.blockUI({
                    message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>',
                    timeout: 1000, 
                    onUnblock: function () {
                        // Redirigir cuando se desbloquee
                        window.location.href = 'Logout.aspx';
                    }
                });
        }
    });
}