using System;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Domain;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Xunit;

namespace API.IntegrationTests.Controllers;

[Collection("ApiTestFixtureCollection")]
public class TagControllerTests : IClassFixture<ApiTestsFixture>
{
    private readonly HttpClient _client;
    private readonly IServiceProvider _serviceProvider;

    public TagControllerTests(ApiTestsFixture apiTestsFixture)
    {
        _serviceProvider = apiTestsFixture.Services;
        _client = apiTestsFixture
            .ConfigureAuth()
            .CreateClient(new WebApplicationFactoryClientOptions {AllowAutoRedirect = false});
    }

    [Fact]
    public async Task TagController_get_liefer_alle_tags()
    {
        // Arrange
        var tags = new[]
        {
            CreateTag("Wohmobil"),
            CreateTag("KFZ"),
            CreateTag("Hobby")
        };

        await DataSeedingTagsAsync(_serviceProvider, tags);

        // Act
        var response =
            await _client.GetAsync($"api/tag");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var jsonString = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<Tag[]>(jsonString,
            new JsonSerializerOptions {PropertyNameCaseInsensitive = true});
        result.Should().NotBeNull();
        result.Should().HaveCount(7);
    }

    private static Tag CreateTag(
        string name)
    {
        var tag = new Tag
        {
            Id = Guid.NewGuid(),
            Name = name,
            Created = DateTimeOffset.Now
        };

        return tag;
    }

    private static async Task DataSeedingTagsAsync(
        IServiceProvider serviceProvider,
        params Tag[] tags)
    {
        using var scope = serviceProvider.CreateScope();
        var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
        dataContext.Tags.AddRange(tags);
        await dataContext.SaveChangesAsync();
    }
}