
function ParamUpdate() {
    
    $.blockUI({
        message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
    });


    var parametro = {
       Code: document.getElementById("txtCode").value,
       NumParam: document.getElementById("txtNumParam").value,
       DescParam: document.getElementById("txtDescParam").value,
       Valor: document.getElementById("txtValor").value
    };

    var ParametroJSON = JSON.stringify(parametro);

    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ ParamAct: ParametroJSON }),
        url: "WfParametros.aspx/paramUpdate",
        success: function (msg) {
           
            console.log("AJAX request successful", msg);
            if (msg.d.success) {
                window.location.href = 'WfParametros.aspx';
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
                
                if (result.isConfirmed) {
                    // Cerrar el modal después de confirmar el error
                    $('#ModalUsuario').modal('hide');
                }
            });

        }
    });
}