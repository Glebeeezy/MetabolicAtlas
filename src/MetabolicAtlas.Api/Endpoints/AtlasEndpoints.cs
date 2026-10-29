using MetabolicAtlas.Application.Services.Interfaces;

namespace MetabolicAtlas.Api.Endpoints;

public static class AtlasEndpoints
{
    public static IEndpointRouteBuilder MapAtlasEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/v1/atlas")
            .WithTags("Atlas");

        group.MapGet("/layouts", async (IAtlasService atlasService, CancellationToken ct) =>
        {
            var layouts = await atlasService.GetLayoutsAsync(ct);
            return Results.Ok(layouts);
        })
        .WithName("GetMapLayouts")
        .WithSummary("Retrieve all active atlas map layouts");

        group.MapGet("/layouts/{id:guid}", async (Guid id, IAtlasService atlasService, CancellationToken ct) =>
        {
            var layout = await atlasService.GetLayoutByIdAsync(id, ct);
            return Results.Ok(layout);
        })
        .WithName("GetMapLayoutById")
        .WithSummary("Retrieve detailed map layout by ID including nodes and edges");

        return endpoints;
    }
}
