using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TTNewsBE.Models;

namespace TTNewsBE.Models
{
    public class NewsDbContext : DbContext
    {
        public NewsDbContext(DbContextOptions<NewsDbContext> options) : base(options)
        {

        }

        public DbSet<Topic> Topics { get; set; }
        public DbSet<Subtopic> Subtopics { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Statusapprove> Statusapproves { get; set; }
        public DbSet<Newsuser> Newsusers { get; set; }
        public DbSet<News> News { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Topic>().ToTable("TOPICS");
            modelBuilder.Entity<Subtopic>().ToTable("SUBTOPICS");
            modelBuilder.Entity<Role>().ToTable("ROLES");
            modelBuilder.Entity<Statusapprove>().ToTable("STATUSAPPROVE");
            modelBuilder.Entity<Newsuser>().ToTable("NEWSUSER");
            modelBuilder.Entity<News>().ToTable("NEWS");
        }
    }
}
