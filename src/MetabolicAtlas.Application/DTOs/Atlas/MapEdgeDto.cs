namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Data transfer object for a visual connection (edge/arrow) on the map.
/// </summary>
public record MapEdgeDto(
    Guid Id,
    Guid SourceElementId,
    Guid TargetElementId,
    int EdgeType,
    string EdgeTypeName,
    string? PathData,
    string? Arrowhead
);

