namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Data transfer object for a visual map element (node).
/// </summary>
public record MapElementDto(
    Guid Id,
    int ElementType,
    string ElementTypeName,
    Guid? EntityId,
    double X,
    double Y,
    double Width,
    double Height,
    string Label,
    string? ColorHex,
    string? StylePropsJson
);

