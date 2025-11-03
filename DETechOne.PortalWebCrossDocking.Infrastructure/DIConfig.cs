using DETechOne.PortalWebCrossDocking.Application.Interfaces;
using DETechOne.PortalWebCrossDocking.Application.Services;
using DETechOne.PortalWebCrossDocking.Domain.Interfaces;
using DETechOne.PortalWebCrossDocking.Infrastructure.Data.Context;
using DETechOne.PortalWebCrossDocking.Infrastructure.Data.Repositories;
using DETechOne.PortalWebCrossDocking.Infrastructure.Security;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity;
using Unity.Lifetime;

namespace DETechOne.PortalWebCrossDocking.Infrastructure
{
    public class DIConfig
    {
        public static IUnityContainer Register()
        {
            var container = new UnityContainer();

            container.RegisterType<AppDbContext>(new HierarchicalLifetimeManager());
            container.RegisterType<IUserRepository, UserRepository>();
            container.RegisterType<IPasswordHasher, PasswordHasher>();
            container.RegisterType<IAuthService, AuthService>();

            return container;
        }
    }
    public static class UnityConfig
    {
        private static readonly Lazy<IUnityContainer> LazyContainer = new Lazy<IUnityContainer>(() =>
        {
            // Llama a tu método de registro de dependencias
            var container = DIConfig.Register();
            return container;
        });

        public static IUnityContainer Container => LazyContainer.Value;
    }
}
