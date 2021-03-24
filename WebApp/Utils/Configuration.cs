using Microsoft.Extensions.Configuration;

namespace WebApp.Utils
{
    public static class Configuration
    {
        public static IConfiguration GetConfiguration()
        {
            return new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .AddUserSecrets<Startup>()
                .AddEnvironmentVariables()
                .Build();
        }
    }
}