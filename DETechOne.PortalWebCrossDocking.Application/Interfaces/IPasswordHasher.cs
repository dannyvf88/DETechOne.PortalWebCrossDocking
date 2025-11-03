using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DETechOne.PortalWebCrossDocking.Application.Interfaces
{
    public interface IPasswordHasher
    {
        (string Hash, string Salt) HashPassword(string password);
        bool Verify(string password, string storedHash, string storedSalt);
    }
}
