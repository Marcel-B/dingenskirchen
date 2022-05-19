using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace API.IntegrationTests
{
    [ExcludeFromCodeCoverage]
    public static class HostBuilderExtensions
    {
        public static IWebHostBuilder ReplaceScoped<T>(this IWebHostBuilder hostBuilder, T replaceBy) where T : class
        {
            return hostBuilder.ConfigureServices(services =>
            {
                var originalStartupDescription = services.FirstOrDefault(s => s.ServiceType == typeof(T));
                services.Remove(originalStartupDescription);
                services.AddScoped(s => replaceBy);
            });
        }
    }
}