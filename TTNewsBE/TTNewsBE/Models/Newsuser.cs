using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TTNewsBE.Models
{
    public class Newsuser
    {
        [Key]
        public string Userid { get; set; }
        public string User_password { get; set; }
        public string Fullname { get; set; }
        public DateTime Dateofbirth { get; set; }
        public int Role { get; set; }

    }
}
