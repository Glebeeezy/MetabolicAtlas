using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using MetabolicAtlas.Application.DTOs;
using MetabolicAtlas.Application.Services.Interfaces;
using MetabolicAtlas.Domain.Common.Exceptions;
using Moq;

namespace MetabolicAtlas.IntegrationTests.Factories;

/// <summary>
/// Custom factory that replaces real services with in-memory stubs to avoid DB dependency.
/// </summary>
public sealed class TestWebApplicationFactory : WebApplicationFactory<Program>
{
    private readonly Mock<IAtlasService> _atlasServiceMock = new();

    public TestWebApplicationFactory()
    {
        // GET /api/v1/atlas/layouts — returns an empty list
        _atlasServiceMock
            .Setup(s => s.GetLayoutsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Array.Empty<MapLayoutSummaryDto>());

        // GET /api/v1/atlas/layouts/{id} — throws NotFoundException for any guid
        _atlasServiceMock
            .Setup(s => s.GetLayoutByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new NotFoundException(nameof(MapLayoutDetailDto), Guid.Empty));
    }

    /// <summary>
    /// Configures the mock to throw <see cref="NotFoundException"/> for a specific id.
    /// </summary>
    public void SetupLayoutNotFound(Guid id)
    {
        _atlasServiceMock
            .Setup(s => s.GetLayoutByIdAsync(id, It.IsAny<CancellationToken>()))
            .ThrowsAsync(new NotFoundException("MapLayout", id));
    }

    protected override void ConfigureWebHost(Microsoft.AspNetCore.Hosting.IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Remove real IAtlasService registration
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(IAtlasService));
            if (descriptor != null)
                services.Remove(descriptor);

            // Register mock
            services.AddSingleton(_atlasServiceMock.Object);
        });
    }
}
