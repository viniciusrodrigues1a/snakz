using System;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using WebApp;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using WebApp.Data;
using WebApp.Models;

namespace Tests.IntegrationTests
{
    public class Setup
    {
        public HttpClient TestClient;
        private DataContext _context;
        private readonly string _guid = Guid.NewGuid().ToString();

        public Setup()
        {
            SetupTestServer();
            SetupDatabaseForTesting();
        }

        private void SetupTestServer()
        {
            var webHostBuilder = new WebHostBuilder()
                .UseStartup<Startup>()
                .ConfigureServices(services =>
                {
                    services.RemoveAll(typeof(DataContext));
                    services.AddDbContext<DataContext>(options => { options.UseInMemoryDatabase(_guid ); });
                });
            var server = new TestServer(webHostBuilder);
            TestClient = server.CreateClient();
            _context = server.Host.Services.GetService<DataContext>();
        }

        private void SetupDatabaseForTesting()
        {
            RemoveEntries();
            SeedProducts();
            SaveChanges();
        }

        private void RemoveEntries()
        {
            _context.Products.RemoveRange(_context.Products);
        }                                  

        private void SeedProducts()
        {
            _context.Products.Add(new Product() { Id = 1, Title = "Burger", Description = "hamburger, cheddar, bacon", Price = 18 });
            _context.Products.Add(new Product() { Id = 2, Title = "Test product 01", Description = "Test description", Price = 16 });
            _context.Products.Add(new Product() { Id = 3, Title = "Test product 02", Description = "Test description", Price = 22 });
            _context.Products.Add(new Product() { Id = 4, Title = "Test product 03", Description = "Test description", Price = 19 });
        }
        
        private void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}