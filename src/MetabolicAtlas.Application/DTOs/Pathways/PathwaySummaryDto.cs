namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Summary representation of a metabolic pathway.
/// </summary>
public record PathwaySummaryDto(
    Guid Id,
    string Code,
    string Name,
    string? Category,
    int ReactionsCount
);

