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

        protected override void OnModelCreating(DbModelBuilder mb)
        {
            mb.Entity<User>().ToTable("Users").HasKey(x => x.Id);
            mb.Entity<User>().Property(x => x.Username).IsRequired().HasMaxLength(100);
            mb.Entity<User>().Property(x => x.Email).IsRequired().HasMaxLength(200);
            mb.Entity<User>().Property(x => x.PasswordHash).IsRequired().HasMaxLength(255);
            mb.Entity<User>().Property(x => x.PasswordSalt).IsRequired().HasMaxLength(255);

            mb.Entity<Role>().ToTable("Roles").HasKey(x => x.Id);
            mb.Entity<Role>().Property(x => x.Name).IsRequired().HasMaxLength(100);

            mb.Entity<UserRole>().ToTable("UserRoles").HasKey(x => new { x.UserId, x.RoleId });

            base.OnModelCreating(mb);
        }
    }
}
