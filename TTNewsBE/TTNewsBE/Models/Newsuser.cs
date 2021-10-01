using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TTNewsBE.Models
{
    public class Newsuser
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        [BsonRepresentation(BsonType.String)]
        public string Userid { get; set; }
        public string Userpassword { get; set; }
        public string Fullname { get; set; }
        public DateTime Dateofbirth { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Role { get; set; }
    }
}
