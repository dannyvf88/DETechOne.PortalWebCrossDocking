using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace DETechOne.PortalWebCrossDocking
{
    public class SecuredPage : System.Web.UI.Page
    {
        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);

           
            if (!Context.User.Identity.IsAuthenticated)
            {
                FormsAuthentication.RedirectToLoginPage();
                return;
            }

            if (Session["IsAuthenticated"] == null || !(bool)Session["IsAuthenticated"])
            {
                FormsAuthentication.RedirectToLoginPage();
                return;
            }

            
        }
        protected bool HasPermission(string permissionKey)
        {
            if (Session["Permissions"] is string[] permissions)
            {
                
                return permissions.Contains(permissionKey, StringComparer.OrdinalIgnoreCase);
            }

            return false;
        }
    }
}