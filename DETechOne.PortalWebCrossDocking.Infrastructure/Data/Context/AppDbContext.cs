using DETechOne.PortalWebCrossDocking.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DETechOne.PortalWebCrossDocking.Infrastructure.Data.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base("name=DefaultConnection") {
            Database.SetInitializer<AppDbContext>(null);
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }

        protected override void OnModelCreating(DbModelBuilder mb)
        {
            // User
            mb.Entity<User>().ToTable("Users").HasKey(x => x.Id);
            mb.Entity<User>().Property(x => x.Username).IsRequired().HasMaxLength(100);
            mb.Entity<User>().Property(x => x.Email).IsRequired().HasMaxLength(200);
            mb.Entity<User>().Property(x => x.PasswordHash).IsRequired().HasMaxLength(255);
            mb.Entity<User>().Property(x => x.PasswordSalt).IsRequired().HasMaxLength(255);

            // Role
            mb.Entity<Role>().ToTable("Roles").HasKey(x => x.Id);
            mb.Entity<Role>().Property(x => x.Name).IsRequired().HasMaxLength(100);

            // UserRole
            mb.Entity<UserRole>().ToTable("UserRoles").HasKey(x => new { x.UserId, x.RoleId });

            mb.Entity<UserRole>().HasRequired(ur => ur.User).WithMany(u => u.UserRoles).HasForeignKey(ur => ur.UserId);
            mb.Entity<UserRole>().HasRequired(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId);

            // Permission (Nueva tabla para definir las acciones: CAN_EDIT_USERS, etc.)
            mb.Entity<Permission>().ToTable("Permissions").HasKey(x => x.Id);
            mb.Entity<Permission>().Property(x => x.Key).IsRequired().HasMaxLength(50);
            mb.Entity<Permission>().Property(x => x.Description).HasMaxLength(255);

            // RolePermission (Tabla intermedia Many-to-Many entre Role y Permission)
            mb.Entity<RolePermission>().ToTable("RolePermissions").HasKey(x => new { x.RoleId, x.PermissionId });
            
            // Relación Role -> RolePermission
            mb.Entity<RolePermission>().HasRequired(rp => rp.Role).WithMany(r => r.RolePermissions).HasForeignKey(rp => rp.RoleId);

            // Relación Permission -> RolePermission
            mb.Entity<RolePermission>().HasRequired(rp => rp.Permission).WithMany(p => p.RolePermissions).HasForeignKey(rp => rp.PermissionId);

            base.OnModelCreating(mb);
        }
    }
}
