using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Tests.Utils;
using WebApp.Models;
using Xunit;

namespace Tests.IntegrationTests
{
    public class ProductsControllerTests
    {
        private readonly HttpClient _testClient;
        
        public ProductsControllerTests()
        {
            _testClient = new Setup().TestClient;
        }
        
        // Index
        [Fact]
        public async Task Get_Products_ReturnsList()
        {
            var response = await _testClient.GetAsync("/products");
            var body = await response.Content.ReadFromJsonAsync<List<Product>>();
            
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal(4, body.Count);
        }
        
        // Show
        [Fact]
        public async Task GetById_Product_ReturnsJSON()
        {
            var response = await _testClient.GetAsync("/products/1");
            var body = await response.Content.ReadFromJsonAsync<Product>();
            
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Burger", body.Title);
        }
        
        [Fact]
        public async Task GetById_ProductThatDoesntExist_ReturnsNotFound()
        {
            var response = await _testClient.GetAsync("/products/1813813");
            
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
        
        // Create
        [Fact]
        public async Task Post_Product_ReturnsCreated()
        {
            var response = await _testClient.PostAsync("/products", new Utils.JsonContent(new
            {
                Title = "Double burger",
                Description = "dois hamburgueres, cheddar, bacon",
                Price = 22
            }));
            var body = await response.Content.ReadFromJsonAsync<Product>();
            
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.Equal("Double burger", body.Title);
        }
        
        [Fact]
        public async Task Post_ProductWithBodyWronglyFormatted_ReturnsBadRequest()
        {
            var response = await _testClient.PostAsync("/products", new Utils.JsonContent(new
            {
                Description = "dois hamburgueres, cheddar, bacon"
            }));
            
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        [Fact]
        public async Task Post_ProductThatAlreadyExists_ReturnsBadRequest()
        {
            var response = await _testClient.PostAsync("/products", new Utils.JsonContent(new
            {
                Title = "Burger",
                Description = "hamburger, cheddar, bacon",
                Price = 18
            }));
            
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        // Update
        [Fact]
        public async Task Update_Product_ReturnsNoContent()
        {
            var response = await _testClient.PutAsync("/products/1", new Utils.JsonContent(new
            {
                Title = "New title",
                Description = "New description",
                Price = 30
            }));
            
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }
        
        [Fact]
        public async Task Update_ProductTitleToOneThatAlreadyExists_ReturnsBadRequest()
        {
            var response = await _testClient.PutAsync("/products/2", new Utils.JsonContent(new
            {
                Title = "Burger",
                Description = "New description",
                Price = 30
            }));
            
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        [Fact]
        public async Task Update_ProductWithBodyWronglyFormatted_ReturnsBadRequest()
        {
            var response = await _testClient.PatchAsync("/products/1", new Utils.JsonContent(new
            {
                Title = "New title"
            }));
            
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        // Patch
        [Fact]
        public async Task Patch_Product_ReturnsNoContent()
        {
            var requestBody = new List<PatchOperation>
            {
                new PatchOperation {Op = "replace", Path = "/title", Value = "Changing the title"},
                new PatchOperation {Op = "replace", Path = "/price", Value = 30},
            };
            var response = await _testClient.PatchAsync("/products/1", new Utils.JsonContent(requestBody));
            
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }
        
        [Fact]
        public async Task Patch_ProductWithBodyWronglyFormatted_ReturnsBadRequest()
        {
            var requestBody = new List<PatchOperation>
            {
                new PatchOperation {Op = "", Path = "/title", Value = "Changing the title"},
                new PatchOperation {Op = "replace", Path = "", Value = 30},
            };
            var response = await _testClient.PatchAsync("/products/3", new Utils.JsonContent(requestBody));
            
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        [Fact]
        public async Task Patch_ProductRemovingRequiredField_ReturnsBadRequest()
        {
            var requestBody = new List<PatchOperation>
            {
                new PatchOperation {Op = "remove", Path = "/title", Value = "Changing the title"},
                new PatchOperation {Op = "replace", Path = "/price", Value = 30},
            };
            var response = await _testClient.PatchAsync("/products/1", new Utils.JsonContent(requestBody));
            
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        [Fact]
        public async Task Patch_ProductTitleToOneThatAlreadyExists_ReturnsBadRequest()
        {
            var requestBody = new List<PatchOperation>
            {
                new PatchOperation {Op = "replace", Path = "/title", Value = "Burger"},
                new PatchOperation {Op = "replace", Path = "/price", Value = 30},
            };
            var response = await _testClient.PatchAsync("/products/2", new Utils.JsonContent(requestBody));
            
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        // Delete
        // should be able to delete a product
        [Fact]
        public async Task Delete_Product_ReturnsOK()
        {
            var response = await _testClient.DeleteAsync("/products/2");
            
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        
        // should NOT be able to delete a product that doesn't exist
        [Fact]
        public async Task Delete_ProductThatDoesntExist_ReturnsNotFound()
        {
            var response = await _testClient.DeleteAsync("/products/917391");
            
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}