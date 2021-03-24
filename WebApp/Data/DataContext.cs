using Microsoft.EntityFrameworkCore;
using WebApp.Models;
using WebApp.Utils;

namespace WebApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var config = Configuration.GetConfiguration();
            var adminUsername = config["ADMIN_USERNAME"];
            var adminPassword = config["ADMIN_PASSWORD"];
            var salt = PasswordEncryption.GenerateSalt();
            var hash = PasswordEncryption.GenerateHash(adminPassword, salt);
            modelBuilder.Entity<User>().HasData(
                new User() { Id = 1, Username = adminUsername, Password = hash, Salt = salt }
            );
        }
        
        public DbSet<Product> Products { get; set; }

        public DbSet<User> Users { get; set; }
    }
}