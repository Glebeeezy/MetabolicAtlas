namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Detailed representation of a metabolic pathway including its reactions.
/// </summary>
public record PathwayDetailDto(
    Guid Id,
    string Code,
    string Name,
    string? Description,
    string? Category,
    IReadOnlyList<PathwayReactionDto> Reactions
);

