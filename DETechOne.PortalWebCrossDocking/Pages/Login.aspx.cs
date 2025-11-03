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

                return new
                {
                    success = result.Success,
                    message = result.Success ? "Login exitoso" : result.ErrorMessage
                };
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