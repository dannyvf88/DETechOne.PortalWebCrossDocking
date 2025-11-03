using DETechOne.PortalWebCrossDocking.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DETechOne.PortalWebCrossDocking.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByUsername(string username);
        Task<IList<string>> GetRolesAsync(int userId);
        Task UpdateLastLoginAsync(int userId);
    }
}
