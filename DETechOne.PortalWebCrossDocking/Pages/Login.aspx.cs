using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

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
            try
            {
                return new
                {
                    success = false,
                    message = "Usuario o contraseña incorrecto."
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