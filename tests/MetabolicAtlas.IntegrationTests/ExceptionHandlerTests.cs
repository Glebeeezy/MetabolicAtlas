using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc;
using MetabolicAtlas.IntegrationTests.Factories;
using Xunit;

namespace MetabolicAtlas.IntegrationTests;

/// <summary>
/// Integration tests for global exception handling via IExceptionHandler + ProblemDetails.
/// Uses a stubbed IAtlasService to avoid real DB connections.
/// </summary>
public class ExceptionHandlerTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly HttpClient _client;

    public ExceptionHandlerTests(TestWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetLayoutById_WithNonExistentGuid_Returns404WithProblemDetails()
    {
        // Arrange — the factory mock throws NotFoundException for any guid
        var nonExistentId = Guid.NewGuid();

        // Act
        var response = await _client.GetAsync($"/api/v1/atlas/layouts/{nonExistentId}");

        // Assert — 404 status
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);

        // Assert — Content-Type contains JSON
        var contentType = response.Content.Headers.ContentType?.MediaType;
        Assert.NotNull(contentType);
        Assert.True(contentType.Contains("json"), $"Expected JSON content type, got: {contentType}");

        // Assert — valid ProblemDetails structure
        var problem = await response.Content.ReadFromJsonAsync<ProblemDetails>();
        Assert.NotNull(problem);
        Assert.Equal(404, problem.Status);
        Assert.False(string.IsNullOrWhiteSpace(problem.Title));
        Assert.False(string.IsNullOrWhiteSpace(problem.Detail));
    }

    [Fact]
    public async Task GetLayoutById_WithInvalidGuidFormat_Returns404()
    {
        // Minimal API route constraints return 404 when the constraint
        // ({id:guid}) does not match — not 400.
        var response = await _client.GetAsync("/api/v1/atlas/layouts/not-a-valid-guid");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
