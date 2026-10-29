namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Data transfer object for a reaction participating in a pathway.
/// </summary>
public record PathwayReactionDto(
    Guid ReactionId,
    string ReactionCode,
    string ReactionName,
    int? Ordinal
);

