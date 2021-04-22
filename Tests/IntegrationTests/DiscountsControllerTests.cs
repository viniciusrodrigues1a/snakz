using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using WebApp.Models;
using Xunit;

namespace Tests.IntegrationTests
{
    public class DiscountsControllerTests
    {
        private readonly HttpClient _testClient;

        public DiscountsControllerTests()
        {
            _testClient = new Setup().TestClient;
        }
        
        // Index
        [Fact]
        public async Task GetAll_Discounts_ReturnsListOfDiscounts()
        {
            var response = await _testClient.GetAsync("/discounts");
            var body = await response.Content.ReadFromJsonAsync<List<Discount>>();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Single(body);
        }
        
        // Show
        [Fact]
        public async Task GetById_Discount_ReturnsDiscount()
        {
            var response = await _testClient.GetAsync("/discounts/1");
            var body = await response.Content.ReadFromJsonAsync<Discount>();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal(2, body.Amount);
        }
        
        [Fact]
        public async Task GetById_DiscountThatDoesntExist_ReturnsNotFound()
        {
            var response = await _testClient.GetAsync("/discounts/189381");

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
        
        // Create
        [Fact]
        public async Task Post_Discount_ReturnsDiscount()
        {
            var response = await _testClient.PostAsJsonAsync("/discounts", new { ProductId = 3, Amount = 2 });
            var body = await response.Content.ReadFromJsonAsync<Discount>();

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.Equal(2, body.Amount);
        }
        
        [Fact]
        public async Task Post_DiscountOfProductThatAlreadyHasADiscount_ReturnsBadRequest()
        {
            var response = await _testClient.PostAsJsonAsync("/discounts", new { ProductId = 1, Amount = 2 });

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        [Fact]
        public async Task Post_DiscountWithInvalidAmount_ReturnsBadRequest()
        {
            var response = await _testClient.PostAsJsonAsync("/discounts", new { ProductId = 3, Amount = -10 });

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        [Fact]
        public async Task Post_DiscountOfProductThatDoesntExist_ReturnsBadRequest()
        {
            var response = await _testClient.PostAsJsonAsync("/discounts", new { ProductId = 187681, Amount = -10 });

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}