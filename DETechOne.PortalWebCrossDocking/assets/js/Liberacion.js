
function getPedidos() {
    Swal.fire({
        title: 'Proceso Liberacion Pedidos',
        text: "¿Estas seguro que deseas ejecutar la liberacion de pedidos?, Este proceso puede llevar un tiempo largo",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
        if (result.isConfirmed) {

            $.blockUI({
                message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
            });

            $.ajax({
                type: "POST",
                url: "WFLiberacion.aspx/LiberarPedidos",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {                  
                    window.location.href = "WfLiberacion.aspx";
                    $.unblockUI();
                },
                error: function (response) {
                    $.unblockUI();
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.responseText
                    });
                }
            });
        }
    });
}