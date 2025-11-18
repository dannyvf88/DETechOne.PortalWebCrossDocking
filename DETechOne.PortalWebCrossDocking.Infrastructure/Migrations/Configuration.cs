namespace DETechOne.PortalWebCrossDocking.Infrastructure.Migrations
{
    using DETechOne.PortalWebCrossDocking.Domain.Entities;
    using DETechOne.PortalWebCrossDocking.Infrastructure.Security;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DETechOne.PortalWebCrossDocking.Infrastructure.Data.Context.AppDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DETechOne.PortalWebCrossDocking.Infrastructure.Data.Context.AppDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.

            context.Roles.AddOrUpdate(
                r => r.Name,
                new Role { Id = 1, Name = "Administrador" }, // Asignamos IDs fijos para simplificar la asignación
                new Role { Id = 2, Name = "Usuario" },
                new Role { Id = 3, Name = "Auditor" }
            );
            context.SaveChanges();

            var permissions = new List<Permission>
            {
                new Permission { Key = "M01_VIEW_DASHBOARD", Description = "Visualizar el panel principal" },
                new Permission { Key = "M02_VIEW_USERS", Description = "Ver lista de usuarios" },
                new Permission { Key = "M02_EDIT_USERS", Description = "Crear/Editar usuarios" }
            };

            context.Permissions.AddOrUpdate(p => p.Key, permissions.ToArray());
            context.SaveChanges();

            //Rol: USUARIO(Acceso Configurable)
            var userRole = context.Roles.Single(r => r.Name == "Usuario");
            var userPermissionsKeys = new List<string> {
                "M01_VIEW_DASHBOARD"
            };

            var userRolePermissions = context.Permissions
                .Where(p => userPermissionsKeys.Contains(p.Key))
                .ToList()
                .Select(p => new RolePermission { RoleId = userRole.Id, PermissionId = p.Id })
                .ToArray();

            context.RolePermissions.AddOrUpdate(rp => new { rp.RoleId, rp.PermissionId }, userRolePermissions);


            // Rol: ADMINISTRADOR & AUDITOR
            // - El Administrador tiene acceso total, no necesita asignación explícita de permisos si lo manejas en código (Recomendado).
            // - El Auditor solo necesita permisos de VIEW (Visualización).

            var auditorRole = context.Roles.Single(r => r.Name == "Auditor");
            var auditorPermissions = context.Permissions
                .Where(p => p.Key.Contains("VIEW")) // Asignamos todos los permisos de VIEW (Visibilidad)
                .ToList()
                .Select(p => new RolePermission { RoleId = auditorRole.Id, PermissionId = p.Id })
                .ToArray();

            context.RolePermissions.AddOrUpdate(rp => new { rp.RoleId, rp.PermissionId }, auditorPermissions);

            context.SaveChanges();

            //CREACIÓN Y ASIGNACIÓN DE ROL AL ADMINISTRADOR (USUARIO <-> ROL)
            var adminRole = context.Roles.Single(r => r.Name == "Administrador");
            var hasher = new PasswordHasher();

            var adminPasswordDetails = hasher.HashPassword("Admin123!");
            context.Users.AddOrUpdate(
                u => u.Email,
                new User
                {
                    Email = "admin@primeflight.com",
                    Username = "admin",
                    PasswordHash = adminPasswordDetails.Hash,
                    PasswordSalt = adminPasswordDetails.Salt,
                    IsActive = true,
                }
            );
            context.SaveChanges();

            var adminUser = context.Users.Single(u => u.Email == "admin@primeflight.com");

            context.UserRoles.AddOrUpdate(
                ur => new { ur.UserId, ur.RoleId }, // Clave compuesta
                new UserRole { UserId = adminUser.Id, RoleId = adminRole.Id }
            );

            context.SaveChanges();

        }
    }
}
