

function usrUpdate() {

    $.blockUI({
        message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
    });

    var usuario = {
        idEmpleado: document.getElementById('txtEmpleado').value,
        nombre_empleado: document.getElementById('txtNombre').value,
        email: document.getElementById('txtMail').value,
        password: document.getElementById('txtpassword').value,
        titulo: document.getElementById('txtTitulo').value,
        perfil: document.getElementById('cmbPerfil').value,
        estatus: document.getElementById('chkActivo').checked
    };

    var UsuarioJSON = JSON.stringify(usuario);

    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ UsusarioAct: UsuarioJSON }),
        url: "WfUsuarios.aspx/usrUpdate",
        success: function (msg) {
            console.log("AJAX request successful", msg);
            if (msg.d.success) {
                window.location.href = 'WfUsuarios.aspx';                
            }
            $.unblockUI();

        },
        error: function (request, message, error) {
            $.unblockUI();
            //handleException(request, message, error);
            //debugger;
            //alert(request.responseJSON.Message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: request.responseJSON.d.message
            }).then((result) => {
                // Solo si el usuario da clic en "OK" en el SweetAlert
                if (result.isConfirmed) {
                    // Cerrar el modal después de confirmar el error
                    $('#ModalUsuario').modal('hide');
                }
            });
            
        }
    });
}