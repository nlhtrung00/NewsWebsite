using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TTNewsBE.Models;

namespace TTNewsBE.Services
{
    public class StatusapproveService
    {
        private readonly IMongoCollection<Statusapprove> _statusapprove;
        public StatusapproveService(INewsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _statusapprove = database.GetCollection<Statusapprove>(settings.StatusapprovesCollectionName);
        }
        public async Task<List<Statusapprove>> GetAllAsync()
        {
            return await _statusapprove.Find(s => true).ToListAsync();
        }
        public async Task<Statusapprove> GetByIdAsync(string id)
        {
            return await _statusapprove.Find<Statusapprove>(s => s.Id == id).FirstOrDefaultAsync();
        }
        public async Task<Statusapprove> CreateAsync(Statusapprove statusapprove)
        {
            await _statusapprove.InsertOneAsync(statusapprove);
            return statusapprove;
        }
        public async Task UpdateAsync(string id, Statusapprove statusapprove)
        {
            await _statusapprove.ReplaceOneAsync(s => s.Id == id, statusapprove);
        }
        public async Task DeleteAsync(string id)
        {
            await _statusapprove.DeleteOneAsync(s => s.Id == id);
        }
    }
}
