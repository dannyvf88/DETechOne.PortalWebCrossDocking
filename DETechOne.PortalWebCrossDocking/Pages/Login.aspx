<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="DETechOne.PortalWebCrossDocking.Pages.WebForm1" %>



<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta name="description" content="Responsive Admin Dashboard Template">
   <meta name="keywords" content="admin,dashboard">
   <meta name="author" content="stacks">
   <!-- The above 6 meta tags *must* come first in the head; any other head content must come *after* these tags -->
   <!-- Title -->
   <title>PortalWebCrossDocking - Primeflight</title>

   <!-- Styles -->
   <link rel="preconnect" href="https://fonts.gstatic.com">
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800&display=swap" rel="stylesheet">
   <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
   <link href="../Content/ui/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />



   <link href="../Content/ui/vendor/perfectscroll/perfect-scrollbar.css" rel="stylesheet">
   <link href="../Content/ui/vendor/pace/pace.css" rel="stylesheet">


   <!-- Theme Styles -->
   <link href="../Content/ui/css/main.min.css" rel="stylesheet">
   <link href="../Content/ui/css/custom.css" rel="stylesheet">

   <link rel="icon" type="image/png" sizes="32x32" href="../Content/ui/img/cropped-LogoAltaSF_Color.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="../Content/ui/img/cropped-LogoAltaSF_Color.png" />

   <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
   <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
   <!--[if lt IE 9]>
   <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
   <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
   <![endif]-->
</head>
<body>
    <div class="app app-auth-sign-in align-content-stretch d-flex flex-wrap justify-content-end">
        <div class="app-auth-background">

        </div>
        <div class="app-auth-container">
            <div class="logo">
                <a href="index.html">CrossDocking</a>
            </div>
            <p class="auth-description">Ingresa tus credenciales.<br></p>

            <div class="auth-credentials m-b-xxl">
                <label for="signInEmail" class="form-label">Correo</label>
                <input type="email" class="form-control m-b-md" id="signInEmail" aria-describedby="signInEmail" placeholder="correo@primeflight.com">

                <label for="signInPassword" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="signInPassword" aria-describedby="signInPassword" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">
            </div>

            <div class="auth-submit">
                <a href="#" class="btn btn-primary" onclick="Login()">Ingresar</a>
                <a href="#" class="auth-forgot-password float-end">Olvidaste Contraseña?</a>
            </div>
            <div class="divider"></div>
           
        </div>
    </div>
    
    <!-- Javascripts -->
 <script src="../Content/ui/vendor/jquery/jquery-3.5.1.min.js"></script>
 <script src="../Content/ui/vendor/bootstrap/js/bootstrap.min.js"></script>
 <script src="../Content/ui/vendor/perfectscroll/perfect-scrollbar.min.js"></script>
 <script src="../Content/ui/vendor/pace/pace.min.js"></script>
 <script src="../Content/ui/vendor/apexcharts/apexcharts.min.js"></script>
 <script src="../Content/ui/js/main.min.js"></script>
 <script src="../Content/ui/js/custom.js"></script>
 <script src="../Content/ui/js/pages/dashboard.js"></script>

    <script> 
        function Login() {
            debugger;
            //$.blockUI({
            //    message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
            //});

            $.ajax({
                type: "POST",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: '{ usuario: "' + document.getElementById('signInEmail').value + '", password: "' + document.getElementById('signInPassword').value + '" }',
                url: "login.aspx/Login",
                success: function (msg) {
                    $.unblockUI();
                    if (!msg.d.success) {
                        debugger;
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
                    console.log(request.responseJSON);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: request.responseJSON.d.message
                    })
                }
            });

        }
    </script>
</body>

</html>

