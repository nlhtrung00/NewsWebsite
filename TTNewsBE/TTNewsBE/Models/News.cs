using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TTNewsBE.Models
{
    public class News
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Descriptions { get; set; }
        public DateTime Time_update_news { get; set; }
        public string Image { get; set; }
        public int Id_topic { get; set; }
        public int Id_subtopic { get; set; }
        public string Id_author { get; set; }
        public int Id_status { get; set; }
    }
}
