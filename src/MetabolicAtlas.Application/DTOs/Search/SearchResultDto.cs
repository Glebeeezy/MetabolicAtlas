namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Data transfer object for global full-text search results.
/// </summary>
public record SearchResultDto(
    Guid EntityId,
    string EntityType,
    string Title,
    string? Subtitle,
    string? MatchContext
);

