using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace Tests.Fakes
{
    public class FakeDataContext : DbContext
    {
        public FakeDataContext(DbContextOptions<FakeDataContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seeding categories
            modelBuilder.Entity<Category>().HasData(
                new Category {Id = 1, Title = "Test category 01"},
                new Category {Id = 2, Title = "Test category 02"},
                new Category {Id = 3, Title = "Test category 03"},
                new Category {Id = 4, Title = "Food"});
            
            // Seeding products
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1, Title = "Test product 01", Description = "Test description", Price = 100, CategoryId = 1
                },
                new Product
                {
                    Id = 2, Title = "Test product 02", Description = "Test description", Price = 100, CategoryId = 2
                },
                new Product
                {
                    Id = 3, Title = "Test product 03", Description = "Test description", Price = 100, CategoryId = 2
                },
                new Product
                {
                    Id = 4, Title = "Test product 04", Description = "Test description", Price = 100, CategoryId = 1
                });
        }
    }
}