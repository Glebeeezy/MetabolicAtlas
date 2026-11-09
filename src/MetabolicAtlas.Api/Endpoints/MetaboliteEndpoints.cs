using Microsoft.AspNetCore.Mvc;
using MetabolicAtlas.Application.Services.Interfaces;

namespace MetabolicAtlas.Api.Endpoints;

/// <summary>
/// Minimal API endpoints for chemical entities (metabolites).
/// </summary>
public static class MetaboliteEndpoints
{
    public static IEndpointRouteBuilder MapMetaboliteEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/v1/metabolites")
            .WithTags("Metabolites");

        group.MapGet("/{id:guid}", async (
            Guid id,
            [FromQuery(Name = "lang")] string? lang,
            IMetaboliteService metaboliteService,
            CancellationToken ct) =>
        {
            var language = string.IsNullOrWhiteSpace(lang) ? "ru" : lang;
            var metabolite = await metaboliteService.GetMetaboliteByIdAsync(id, language, ct);
            return Results.Ok(metabolite);
        })
        .WithName("GetMetaboliteById")
        .WithSummary("Retrieve metabolite details with synonyms, external IDs, and localized names");

        return endpoints;
    }
}

