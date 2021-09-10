using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TTNewsBE.Models
{
    public class Statusapprove
    {
        [Key]
        public int Id_status { get; set; }
        public string Name_of_status { get; set; }
    }
}
