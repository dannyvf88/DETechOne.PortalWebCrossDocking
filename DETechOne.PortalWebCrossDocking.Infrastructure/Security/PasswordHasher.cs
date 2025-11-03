using DETechOne.PortalWebCrossDocking.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DETechOne.PortalWebCrossDocking.Infrastructure.Security
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int Iterations = 20000, SaltSize = 16, KeySize = 32;

        public (string Hash, string Salt) HashPassword(string password)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var salt = new byte[SaltSize];
                rng.GetBytes(salt);

                using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations))
                {
                    var key = pbkdf2.GetBytes(KeySize);
                    return (Convert.ToBase64String(key), Convert.ToBase64String(salt));
                }
            }
        }

        public bool Verify(string password, string storedHash, string storedSalt)
        {
            var salt = Convert.FromBase64String(storedSalt);
            var expected = Convert.FromBase64String(storedHash);

            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations))
            {
                var calc = pbkdf2.GetBytes(expected.Length);
                return FixedTimeEquals(expected, calc);
            }
        }

        private static bool FixedTimeEquals(byte[] a, byte[] b)
        {
            if (a.Length != b.Length) return false;
            int diff = 0;
            for (int i = 0; i < a.Length; i++) diff |= a[i] ^ b[i];
            return diff == 0;
        }
    }
}
