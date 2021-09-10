using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TTNewsBE.Models
{
    public class Role
    {
        [Key]
        public int Id_role { get; set; }
        public string Rolename { get; set; }
    }
}
