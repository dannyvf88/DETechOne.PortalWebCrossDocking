using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DETechOne.PortalWebCrossDocking.Domain.Entities
{
    public class Permission
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public virtual ICollection<RolePermission> RolePermissions { get; set; }
    }
}
