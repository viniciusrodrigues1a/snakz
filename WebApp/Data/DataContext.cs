using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }
        
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Title = "Cheese burger", Description = "burger, cheese, pickles, bacon", Price = 18 },
                new Product { Id = 2, Title = "Cheese burger", Description = "burger, cheese, pickles, bacon", Price = 18 },
                new Product { Id = 3, Title = "Cheese burger", Description = "burger, cheese, pickles, bacon", Price = 18 }
            );
        }
    }
}