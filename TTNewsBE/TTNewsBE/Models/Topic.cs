using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TTNewsBE.Models
{
    public class Topic
    {
        [Key]
        public int Id_topic { get; set; }
        public string Name_topic { get; set; }
    }
}
