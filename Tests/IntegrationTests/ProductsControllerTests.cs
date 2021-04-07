using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http;
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
            var formData = new MultipartFormDataContent();
            var title = new StringContent("Double burger");
            var description = new StringContent("Test product description");
            var price = new StringContent("22");
            formData.Add(title, "title");
            formData.Add(description, "description");
            formData.Add(price, "price");

            var response = await _testClient.PostAsync("/products", formData);
            var body = await response.Content.ReadFromJsonAsync<Product>();
            
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.Equal("Double burger", body.Title);
        }
        
        [Fact]
        public async Task Post_ProductWithBodyWronglyFormatted_ReturnsBadRequest()
        {
            var formData = new MultipartFormDataContent();
            var description = new StringContent("Test product description");
            formData.Add(description, "description");

            var response = await _testClient.PostAsync("/products", formData);
            
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        [Fact]
        public async Task Post_ProductThatAlreadyExists_ReturnsBadRequest()
        {
            var formData = new MultipartFormDataContent();
            var title = new StringContent("Burger");
            var description = new StringContent("Burger description");
            var price = new StringContent("19");
            formData.Add(title, "title");
            formData.Add(description, "description");
            formData.Add(price, "price");

            var response = await _testClient.PostAsync("/products", formData);
            
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        // Update
        [Fact]
        public async Task Update_Product_ReturnsNoContent()
        {
            var formData = new MultipartFormDataContent();
            var title = new StringContent("Double burger");
            var description = new StringContent("Test product description");
            var price = new StringContent("22");
            var fakeFile = new StringContent("");
            formData.Add(title, "title");
            formData.Add(description, "description");
            formData.Add(price, "price");
            formData.Add(fakeFile, "file");

            var response = await _testClient.PutAsync("/products/1", formData);
            
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }
        
        [Fact]
        public async Task Update_ProductTitleToOneThatAlreadyExists_ReturnsBadRequest()
        {
            var formData = new MultipartFormDataContent();
            var title = new StringContent("Double burger");
            var description = new StringContent("Test product description");
            var price = new StringContent("22");
            var fakeFile = new StringContent("");
            formData.Add(title, "Burger");
            formData.Add(description, "description");
            formData.Add(price, "price");
            formData.Add(fakeFile, "file");

            var response = await _testClient.PutAsync("/products/2", formData);
            
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