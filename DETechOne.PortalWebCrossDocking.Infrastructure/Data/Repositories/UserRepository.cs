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
            return await _db.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Username == username || x.Email == username);
        }

        public async Task<IList<string>> GetPermissionsAsync(int userId)
        {
            throw new NotImplementedException();
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
