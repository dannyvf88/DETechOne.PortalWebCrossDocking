using DETechOne.PortalWebCrossDocking.Application.DTOs;
using DETechOne.PortalWebCrossDocking.Application.Interfaces;
using DETechOne.PortalWebCrossDocking.Domain.Entities;
using DETechOne.PortalWebCrossDocking.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DETechOne.PortalWebCrossDocking.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository userRepository;
        private readonly IPasswordHasher passwordHasher;
        public AuthService(IUserRepository userRepository, IPasswordHasher passwordHasher)
        {
            this.userRepository = userRepository;
            this.passwordHasher = passwordHasher;
        }

        public async Task<LoginResult> LoginAsync(LoginRequest req)
        {
            if (string.IsNullOrWhiteSpace(req?.Username) || string.IsNullOrWhiteSpace(req?.Password))
                return new LoginResult { Success = false, ErrorMessage = "Credenciales inválidas." };

            var user = await userRepository.GetByUsername(req.Username.Trim()).ConfigureAwait(false);
            if (user == null || !user.IsActive) return Fail();

            if (!passwordHasher.Verify(req.Password, user.PasswordHash, user.PasswordSalt)) return Fail();

            var roles = await userRepository.GetRolesAsync(user.Id).ConfigureAwait(false);
            await userRepository.UpdateLastLoginAsync(user.Id).ConfigureAwait(false);

            return new LoginResult { Success = true, UserId = user.Id, Username = user.Username, Roles = roles };

            LoginResult Fail() => new LoginResult { Success = false, ErrorMessage = "Usuario o contraseña incorrectos." };

        }
    }
}
