using MetabolicAtlas.Application.Services.Interfaces;

namespace MetabolicAtlas.Api.Endpoints;

/// <summary>
/// Minimal API endpoints for catalytic enzymes.
/// </summary>
public static class EnzymeEndpoints
{
    public static IEndpointRouteBuilder MapEnzymeEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/v1/enzymes")
            .WithTags("Enzymes");

        group.MapGet("/", async (IEnzymeService enzymeService, CancellationToken ct) =>
        {
            var enzymes = await enzymeService.GetEnzymesAsync(ct);
            return Results.Ok(enzymes);
        })
        .WithName("GetEnzymes")
        .WithSummary("Retrieve all catalytic enzymes catalog");

        group.MapGet("/{id:guid}", async (Guid id, IEnzymeService enzymeService, CancellationToken ct) =>
        {
            var enzyme = await enzymeService.GetEnzymeByIdAsync(id, ct);
            return Results.Ok(enzyme);
        })
        .WithName("GetEnzymeById")
        .WithSummary("Retrieve catalytic enzyme details by ID");

        return endpoints;
    }
}

