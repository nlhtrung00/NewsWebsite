using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TTNewsBE.Models
{
    public class Subtopic
    {
        [Key]
        public int Id_subtopic { get; set; }
        public string name_subtopic { get; set; }
        public int Id_topic { get; set; }
    }
}
