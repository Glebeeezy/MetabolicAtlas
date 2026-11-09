using MetabolicAtlas.Application.Services.Interfaces;

namespace MetabolicAtlas.Api.Endpoints;

/// <summary>
/// Minimal API endpoints for metabolic pathways.
/// </summary>
public static class PathwayEndpoints
{
    public static IEndpointRouteBuilder MapPathwayEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/v1/pathways")
            .WithTags("Pathways");

        group.MapGet("/", async (IPathwayService pathwayService, CancellationToken ct) =>
        {
            var pathways = await pathwayService.GetPathwaysAsync(ct);
            return Results.Ok(pathways);
        })
        .WithName("GetPathways")
        .WithSummary("Retrieve all metabolic pathways summary catalog");

        group.MapGet("/{id:guid}", async (Guid id, IPathwayService pathwayService, CancellationToken ct) =>
        {
            var pathway = await pathwayService.GetPathwayByIdAsync(id, ct);
            return Results.Ok(pathway);
        })
        .WithName("GetPathwayById")
        .WithSummary("Retrieve detailed metabolic pathway including ordered reactions");

        return endpoints;
    }
}

