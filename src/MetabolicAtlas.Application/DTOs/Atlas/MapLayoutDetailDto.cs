namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Detailed map layout data containing all elements and edges for rendering.
/// </summary>
public record MapLayoutDetailDto(
    Guid Id,
    string Code,
    string Name,
    string Version,
    double Width,
    double Height,
    Guid? PathwayId,
    IReadOnlyList<MapElementDto> Elements,
    IReadOnlyList<MapEdgeDto> Edges
);

