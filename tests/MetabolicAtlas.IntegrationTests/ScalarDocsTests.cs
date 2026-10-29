using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace MetabolicAtlas.IntegrationTests;

public class ScalarDocsTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public ScalarDocsTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetScalarDocumentation_ReturnsSuccessStatusCode()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/scalar/v1");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("scalar", content, StringComparison.OrdinalIgnoreCase);
    }
}

