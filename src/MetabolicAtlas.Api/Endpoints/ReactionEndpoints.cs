using Microsoft.AspNetCore.Mvc;
using MetabolicAtlas.Application.Services.Interfaces;

namespace MetabolicAtlas.Api.Endpoints;

/// <summary>
/// Minimal API endpoints for biochemical reactions.
/// </summary>
public static class ReactionEndpoints
{
    public static IEndpointRouteBuilder MapReactionEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/v1/reactions")
            .WithTags("Reactions");

        group.MapGet("/{id:guid}", async (
            Guid id,
            [FromQuery(Name = "lang")] string? lang,
            IReactionService reactionService,
            CancellationToken ct) =>
        {
            var language = string.IsNullOrWhiteSpace(lang) ? "ru" : lang;
            var reaction = await reactionService.GetReactionByIdAsync(id, language, ct);
            return Results.Ok(reaction);
        })
        .WithName("GetReactionById")
        .WithSummary("Retrieve biochemical reaction details with explicit stoichiometry and participants");

        return endpoints;
    }
}
