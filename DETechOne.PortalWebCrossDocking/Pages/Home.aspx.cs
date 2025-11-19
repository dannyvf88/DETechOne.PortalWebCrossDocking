using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DETechOne.PortalWebCrossDocking.Pages
{
    public partial class Home : SecuredPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ValidarPermisoHome();
        }
        private void ValidarPermisoHome()
        {
            /*
            if (!HasPermission("HOME_VIEW"))
            {
                // Redirigir a una página de acceso denegado (ej: AccessDenied.aspx)
                Response.Redirect("~/Pages/Login.aspx", true);
            }*/
        }
    }
}