namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Summary representation of a map layout for listing.
/// </summary>
public record MapLayoutSummaryDto(
    Guid Id,
    string Code,
    string Name,
    string Version,
    double Width,
    double Height,
    Guid? PathwayId
);

