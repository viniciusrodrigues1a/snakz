using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace Tests.IntegrationTests
{
    public class SessionsControllerTests
    {
        private readonly HttpClient _testClient;
        
        public SessionsControllerTests()
        {
            _testClient = new Setup().TestClient;
        }

        [Fact]
        public async Task Post_User_ReturnsToken()
        {
            var formData = new MultipartFormDataContent();
            var username = new StringContent("test");
            var password = new StringContent("test");
            formData.Add(username, "username");
            formData.Add(password, "password");

            var response = await _testClient.PostAsync("/sessions", formData);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task Post_UserWithWrongPassword_ReturnsBadRequest()
        {
            var formData = new MultipartFormDataContent();
            var username = new StringContent("test");
            var password = new StringContent("wr0ngpa55");
            formData.Add(username, "username");
            formData.Add(password, "password");

            var response = await _testClient.PostAsync("/sessions", formData);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Post_UserThatDoesntExist_ReturnsBadRequest()
        {
            var formData = new MultipartFormDataContent();
            var username = new StringContent("user193719");
            var password = new StringContent("test");
            formData.Add(username, "username");
            formData.Add(password, "password");

            var response = await _testClient.PostAsync("/sessions", formData);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}