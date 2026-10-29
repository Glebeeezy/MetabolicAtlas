using MetabolicAtlas.Application.DTOs;

namespace MetabolicAtlas.Application.Services.Interfaces;

/// <summary>
/// Service abstraction for metabolic pathways catalog and reaction graphs.
/// </summary>
public interface IPathwayService
{
    Task<IReadOnlyList<PathwaySummaryDto>> GetPathwaysAsync(CancellationToken cancellationToken = default);
    Task<PathwayDetailDto?> GetPathwayByIdAsync(Guid id, CancellationToken cancellationToken = default);
}

