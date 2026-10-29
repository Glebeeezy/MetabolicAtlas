using System.Net;
using MetabolicAtlas.IntegrationTests.Factories;
using Xunit;

namespace MetabolicAtlas.IntegrationTests;

public class HealthCheckTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public HealthCheckTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetHealth_ReturnsOk_WithHealthyStatus()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/health");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("Healthy", content);
    }
}
