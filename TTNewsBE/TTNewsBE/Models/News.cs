using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TTNewsBE.Models
{
    public class News
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Descriptions { get; set; }
        public DateTime Time_update_news { get; set; }
        public string Image { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Topic { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Subtopic { get; set; }
        [BsonRepresentation(BsonType.String)]
        public string Author { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Statusapprove { get; set; }
    }
}
