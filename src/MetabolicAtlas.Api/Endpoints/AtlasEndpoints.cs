using Microsoft.AspNetCore.Http;
using MetabolicAtlas.Application.DTOs;
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

        group.MapGet("/layouts/{id:guid}", async (Guid id, HttpContext http, IAtlasService atlasService, CancellationToken ct) =>
        {
            var layout = await atlasService.GetLayoutByIdAsync(id, ct);
            return ReturnLayoutWithCache(http, layout);
        })
        .WithName("GetMapLayoutById")
        .WithSummary("Retrieve detailed map layout by ID including nodes and edges");

        group.MapGet("/layouts/code/{code}", async (string code, HttpContext http, IAtlasService atlasService, CancellationToken ct) =>
        {
            var layout = await atlasService.GetLayoutByCodeAsync(code, ct);
            return ReturnLayoutWithCache(http, layout);
        })
        .WithName("GetMapLayoutByCode")
        .WithSummary("Retrieve detailed map layout by unique code (e.g., MAP_TCA_V1)");

        group.MapGet("/layouts/pathway/{pathwayId:guid}", async (Guid pathwayId, HttpContext http, IAtlasService atlasService, CancellationToken ct) =>
        {
            var layout = await atlasService.GetLayoutByPathwayIdAsync(pathwayId, ct);
            return ReturnLayoutWithCache(http, layout);
        })
        .WithName("GetMapLayoutByPathwayId")
        .WithSummary("Retrieve detailed map layout configured for a specific metabolic pathway");

        return endpoints;
    }

    private static IResult ReturnLayoutWithCache(HttpContext http, MapLayoutDetailDto layout)
    {
        var etagValue = $"\"{layout.Code}-{layout.Version}\"";
        http.Response.Headers.ETag = etagValue;
        http.Response.Headers.CacheControl = "public, max-age=120";

        var ifNoneMatch = http.Request.Headers.IfNoneMatch.ToString();
        if (!string.IsNullOrEmpty(ifNoneMatch) && ifNoneMatch.Contains(etagValue, StringComparison.OrdinalIgnoreCase))
        {
            return Results.StatusCode(StatusCodes.Status304NotModified);
        }

        return Results.Ok(layout);
    }
}
