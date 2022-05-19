using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Xunit;


namespace API.IntegrationTests
{
    // [CollectionDefinition("ApiTestFixtureCollection")]
    // public class ApiTestsCollection : ICollectionFixture<ApiTestsFixture>
    // {
    //     // Diese Klasse ist gut so :-)
    //     // https://xunit.net/docs/shared-context
    //
    //     // This class has no code, and is never created. Its purpose is simply
    //     // to be the place to apply [CollectionDefinition] and all the
    //     // ICollectionFixture<> interfaces.
    // }

    public class ApiTestsFixture : WebApplicationFactory<Startup>
    {
        public const string Environment = "IntegrationTests";
        public const string ConnectionStringName = "DefaultConnection";

        private readonly string _connectionString;

        public ApiTestsFixture()
        {
            var configuration = CreateConfigurationBuilder(Environment).Build();
            _connectionString = configuration.GetConnectionString(ConnectionStringName);
            GetConnectionStringAndInitializeDb(_connectionString);
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            base.ConfigureWebHost(
                builder.UseEnvironment(Environment));
        }

        // protected override void ConfigureClient(HttpClient client)
        // {
        //     base.ConfigureClient(client);
        // }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            var dbName = _connectionString.Split("=");
            // if (File.Exists(dbName.Last()))
            //     File.Delete(dbName.Last());
            // _connectionString?.DropDbIfExists();
        }

        private string GetConnectionStringAndInitializeDb(string connectionString)
        {
            var dbName = _connectionString.Split("=");
            if (File.Exists(dbName.Last()))
            {
                var fi = new FileInfo(dbName.Last());
                fi.Delete();
            }
            using var scope = Services.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<DataContext>();
            context.Database.EnsureCreated();
            context.Dispose();
            return connectionString;
            // .DropDbIfExists()
            // .EnsureDbCreated();
        }

        private static IConfigurationBuilder CreateConfigurationBuilder(string environment) =>
            new ConfigurationBuilder()
                .AddJsonFile($"appsettings.json", false, true)
                .AddJsonFile($"appsettings.{environment}.json", true, true);
    }
}