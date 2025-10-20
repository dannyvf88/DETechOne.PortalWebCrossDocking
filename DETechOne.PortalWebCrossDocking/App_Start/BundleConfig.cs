using System.Web.Optimization;

namespace JEBeasAPP
{
    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();

            // CSS (se puede minificar)
            bundles.Add(new StyleBundle("~/dist/css").Include(
                "~/Content/ui/vendor/bootstrap/css/bootstrap.min.css",
                "~/Content/ui/vendor/perfect-scrollbar/perfect-scrollbar.css",
                "~/Content/ui/vendor/pace/pace.css",
                "~/Content/ui/css/main.min.css",
                "~/Content/ui/css/override.css"
            ));

            // JS: bundle SIN minificar (evita el crash del parser)
            var js = new ScriptBundle("~/dist/js");
            js.Transforms.Clear();                  // quitamos JsMinify
            js.Transforms.Add(new NoMinify());      // usamos nuestro pass-through
            js.Include(
                "~/Content/ui/vendor/jquery/jquery-3.5.1.min.js",
                "~/Content/ui/vendor/bootstrap/js/bootstrap.bundle.min.js",
                "~/Content/ui/vendor/perfect-scrollbar/perfect-scrollbar.min.js",
                "~/Content/ui/vendor/pace/pace.min.js",
                "~/Content/ui/js/main.min.js"       // este ya viene minificado del tema
                                                    // agrega aquí otros .js que uses
            );
            bundles.Add(js);

            // Puedes dejar esto en true: seguirá concatenando y poniendo ?v=hash
            BundleTable.EnableOptimizations = true;
        }
    }
}
