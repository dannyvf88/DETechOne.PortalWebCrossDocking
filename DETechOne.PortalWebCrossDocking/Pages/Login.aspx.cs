using DETechOne.PortalWebCrossDocking.Application.DTOs;
using DETechOne.PortalWebCrossDocking.Application.Interfaces;
using DETechOne.PortalWebCrossDocking.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Unity;

namespace DETechOne.PortalWebCrossDocking.Pages
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

		[WebMethod(EnableSession = true)]
		public static object Login(string usuario, string password)
		{
            IAuthService authService;
            try
            {
                authService = UnityConfig.Container.Resolve<IAuthService>();

                var result = authService.LoginAsync(new LoginRequest
                {
                    Username = usuario,
                    Password = password
                }).GetAwaiter().GetResult();

                if (result.Success)
                {
                    var context = HttpContext.Current;

                    System.Web.Security.FormsAuthentication.SetAuthCookie(
                        result.Username, // Usar el nombre de usuario como identificador
                        false            // Sesión no persistente (se cierra al cerrar el navegador)
                    );

                    context.Session["IsAuthenticated"] = true;
                    context.Session["UserId"] = result.UserId;
                    context.Session["Username"] = result.Username;
                    context.Session["Roles"] = result.Roles;
                    context.Session["Permissions"] = result.Permissions;

                    return new
                    {
                        success = result.Success,
                        message = "Login exitoso",
                        redirectUrl = "Home.aspx",
                        roles = result.Roles
                    };
                }
                else {

                    return new
                    {
                        success = false,
                        message = result.ErrorMessage
                    };

                }

                
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.StatusCode = 500;
                return new
                {
                    success = false,
                    message = ex.Message
                };
            }
        }
	}
}