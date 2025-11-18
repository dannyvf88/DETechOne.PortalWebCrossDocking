
function checkEnter(event) {
    if (event.key === "Enter") {
        // Simula un clic en el botón con id 'blockui-2'
        document.getElementById("blockui-2").click();
    }
}

function UserLogin() {

    $.blockUI({
        message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
    });

    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: '{ usuario: "' + document.getElementById('signInEmail').value + '", password: "' + document.getElementById('signInPassword').value + '" }',
        url: "Login.aspx/UserLogin",
        success: function (msg) {
            $.unblockUI();
            if (!msg.d.success) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Los datos de usuario y contraseña son incorrectos"
                })
            }
            else {

                window.location.href = 'Default.aspx';                
            }
            
        },
        error: function (request, message, error) {
            $.unblockUI();
            console.log(request.responseJSON);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: request.responseJSON.d.message
            })
        }
    });

}



