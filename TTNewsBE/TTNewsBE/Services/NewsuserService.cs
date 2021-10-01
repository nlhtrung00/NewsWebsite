using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TTNewsBE.Models;

namespace TTNewsBE.Services
{
    public class NewsuserService
    {
        private readonly IMongoCollection<Newsuser> _newsuser;
        public NewsuserService(INewsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _newsuser = database.GetCollection<Newsuser>(settings.NewsusersCollectionName);
        }
        public async Task<List<Newsuser>> GetAllAsync()
        {
            return await _newsuser.Find(n => true).ToListAsync();
        }
        public async Task<Newsuser> GetByIdAsync(string id)
        {
            return await _newsuser.Find<Newsuser>(n => n.Userid == id).FirstOrDefaultAsync();
        }
        public async Task<Newsuser> CreateAsync(Newsuser newsuser)
        {
            await _newsuser.InsertOneAsync(newsuser);
            return newsuser;
        }
        public async Task UpdateAsync(string id, Newsuser newsuser)
        {
            await _newsuser.ReplaceOneAsync(n => n.Userid == id, newsuser);
        }
        public async Task DeleteAsync(string id)
        {
            await _newsuser.DeleteOneAsync(c => c.Userid == id);
        }
    }
}
