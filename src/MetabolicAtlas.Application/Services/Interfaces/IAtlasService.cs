using MetabolicAtlas.Application.DTOs;

namespace MetabolicAtlas.Application.Services.Interfaces;

/// <summary>
/// Service abstraction for retrieving map layouts and visual canvas elements.
/// </summary>
public interface IAtlasService
{
    Task<IReadOnlyList<MapLayoutSummaryDto>> GetLayoutsAsync(CancellationToken cancellationToken = default);
    Task<MapLayoutDetailDto> GetLayoutByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<MapLayoutDetailDto> GetLayoutByCodeAsync(string code, CancellationToken cancellationToken = default);
    Task<MapLayoutDetailDto> GetLayoutByPathwayIdAsync(Guid pathwayId, CancellationToken cancellationToken = default);
}

