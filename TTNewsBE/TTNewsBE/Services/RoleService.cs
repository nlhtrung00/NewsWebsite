using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TTNewsBE.Models;

namespace TTNewsBE.Services
{
    public class RoleService
    {
        private readonly IMongoCollection<Role> _role;
        public RoleService(INewsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _role = database.GetCollection<Role>(settings.RolesCollectionName);
        }
        public async Task<List<Role>> GetAllAsync()
        {
            return await _role.Find(r => true).ToListAsync();
        }
        public async Task<Role> GetByIdAsync(string id)
        {
            return await _role.Find<Role>(r => r.Id == id).FirstOrDefaultAsync();
        }
        public async Task<Role> CreateAsync(Role role)
        {
            await _role.InsertOneAsync(role);
            return role;
        }
        public async Task UpdateAsync(string id, Role role)
        {
            await _role.ReplaceOneAsync(r => r.Id == id, role);
        }
        public async Task DeleteAsync(string id)
        {
            await _role.DeleteOneAsync(r => r.Id == id);
        }
    }
}
