using System.Web.Optimization;

namespace DETechOne.PortalWebCrossDocking
{
    // Deja el contenido tal cual, solo fija el content-type
    public sealed class NoMinify : IBundleTransform
    {
        public void Process(BundleContext context, BundleResponse response)
        {
            response.ContentType = "text/javascript";
            // no tocamos response.Content (sin minificar)
        }
    }
}
