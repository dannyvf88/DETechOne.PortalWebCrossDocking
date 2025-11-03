using DETechOne.PortalWebCrossDocking.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DETechOne.PortalWebCrossDocking.Application.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResult> LoginAsync(LoginRequest request);
    }
}
