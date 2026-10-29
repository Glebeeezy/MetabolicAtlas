namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Data transfer object for an enzyme entity.
/// </summary>
public record EnzymeDto(
    Guid Id,
    string? EcNumber,
    string Name,
    string? UniprotId,
    string? Description
);

