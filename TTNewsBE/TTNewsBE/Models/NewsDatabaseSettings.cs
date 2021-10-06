using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TTNewsBE.Models
{
    public class NewsDatabaseSettings : INewsDatabaseSettings
    {
        private string newsCollectionName;
        private string topicsCollectionName;
        private string subtopicsCollectionName;
        private string statusapprovesCollectionName;
        private string newsusersCollectionName;
        private string rolesCollectionName;
        private string connectionString;
        private string databaseName;

        public string NewsCollectionName { get => newsCollectionName; set => newsCollectionName = value; }
        public string TopicsCollectionName { get => topicsCollectionName; set => topicsCollectionName = value; }
        public string SubtopicsCollectionName { get => subtopicsCollectionName; set => subtopicsCollectionName = value; }
        public string StatusapprovesCollectionName { get => statusapprovesCollectionName; set => statusapprovesCollectionName = value; }
        public string NewsusersCollectionName { get => newsusersCollectionName; set => newsusersCollectionName = value; }
        public string RolesCollectionName { get => rolesCollectionName; set => rolesCollectionName = value; }
        public string ConnectionString { get => connectionString; set => connectionString = value; }
        public string DatabaseName { get => databaseName; set => databaseName = value; }
    }

    public interface INewsDatabaseSettings
    {
        string NewsCollectionName { get; set; }
        string TopicsCollectionName { get; set; }
        string SubtopicsCollectionName { get; set; }
        string StatusapprovesCollectionName { get; set; }
        string NewsusersCollectionName { get; set; }
        string RolesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
