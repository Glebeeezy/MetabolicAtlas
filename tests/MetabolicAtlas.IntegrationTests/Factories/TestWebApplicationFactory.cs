using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using MetabolicAtlas.Application.DTOs;
using MetabolicAtlas.Application.Services.Interfaces;
using MetabolicAtlas.Domain.Common.Exceptions;
using Moq;

namespace MetabolicAtlas.IntegrationTests.Factories;

/// <summary>
/// Custom factory that replaces real domain services with mock stubs to decouple tests from PostgreSQL.
/// </summary>
public sealed class TestWebApplicationFactory : WebApplicationFactory<Program>
{
    public Mock<IAtlasService> AtlasServiceMock { get; } = new();
    public Mock<IPathwayService> PathwayServiceMock { get; } = new();
    public Mock<IMetaboliteService> MetaboliteServiceMock { get; } = new();
    public Mock<IReactionService> ReactionServiceMock { get; } = new();
    public Mock<IEnzymeService> EnzymeServiceMock { get; } = new();

    public TestWebApplicationFactory()
    {
        // Default Atlas mocks
        AtlasServiceMock
            .Setup(s => s.GetLayoutsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Array.Empty<MapLayoutSummaryDto>());

        AtlasServiceMock
            .Setup(s => s.GetLayoutByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new NotFoundException("MapLayout", Guid.Empty));

        AtlasServiceMock
            .Setup(s => s.GetLayoutByCodeAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new NotFoundException("MapLayout", "not-found"));

        AtlasServiceMock
            .Setup(s => s.GetLayoutByPathwayIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new NotFoundException("MapLayout", Guid.Empty));

        // Default Pathway mocks
        PathwayServiceMock
            .Setup(s => s.GetPathwaysAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([
                new PathwaySummaryDto(Guid.NewGuid(), "PWY_TCA", "TCA Cycle", "Energy", 8)
            ]);

        // Default Enzyme mocks
        EnzymeServiceMock
            .Setup(s => s.GetEnzymesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync([
                new EnzymeDto(Guid.NewGuid(), "2.3.3.1", "Citrate synthase", "P53396", "Step 1 of TCA")
            ]);
    }

    protected override void ConfigureWebHost(Microsoft.AspNetCore.Hosting.IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            ReplaceService(services, AtlasServiceMock.Object);
            ReplaceService(services, PathwayServiceMock.Object);
            ReplaceService(services, MetaboliteServiceMock.Object);
            ReplaceService(services, ReactionServiceMock.Object);
            ReplaceService(services, EnzymeServiceMock.Object);
        });
    }

    private static void ReplaceService<TService>(IServiceCollection services, TService implementation)
        where TService : class
    {
        var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(TService));
        if (descriptor != null)
            services.Remove(descriptor);

        services.AddSingleton(implementation);
    }
}
