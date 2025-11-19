using DETechOne.PortalWebCrossDocking.Domain.Entities;
using DETechOne.PortalWebCrossDocking.Domain.Interfaces;
using DETechOne.PortalWebCrossDocking.Infrastructure.Data.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DETechOne.PortalWebCrossDocking.Infrastructure.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _db;
        public UserRepository(AppDbContext db) { _db = db; }
        public async Task<User> GetByUsername(string username)
        {
            return await _db.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Username == username || x.Email == username).ConfigureAwait(false);
        }

        public async Task<IList<string>> GetPermissionsAsync(int userId)
        {
            var roles = await GetRolesAsync(userId).ConfigureAwait(false);

            if (roles.Contains("Administrador", StringComparer.OrdinalIgnoreCase))
            {
                // Consulta todas las claves de permiso de la tabla Permissions.
                return await _db.Permissions
                    .Select(p => p.Key)
                    .AsNoTracking()
                    .ToListAsync()
                    .ConfigureAwait(false);
            }

            var query = from ur in _db.UserRoles
                        join rp in _db.RolePermissions on ur.RoleId equals rp.RoleId
                        join p in _db.Permissions on rp.PermissionId equals p.Id
                        where ur.UserId == userId
                        select p.Key;

            var permissions = await query
                .Distinct()
                .AsNoTracking()
                .ToListAsync()
                .ConfigureAwait(false);

            return permissions;

        }

        public async Task<IList<string>> GetRolesAsync(int userId)
        {
            var q = from ur in _db.UserRoles
                    join r in _db.Roles on ur.RoleId equals r.Id
                    where ur.UserId == userId
                    select r.Name;
            return await q.AsNoTracking().ToListAsync();
        }

        public async Task UpdateLastLoginAsync(int userId)
        {
            var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user != null)
            {
                user.LastLoginAt = DateTime.UtcNow;
                await _db.SaveChangesAsync();
            }
        }
    }
}
