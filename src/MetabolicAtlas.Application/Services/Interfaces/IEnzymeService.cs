using MetabolicAtlas.Application.DTOs;

namespace MetabolicAtlas.Application.Services.Interfaces;

/// <summary>
/// Service abstraction for catalytic enzyme queries.
/// </summary>
public interface IEnzymeService
{
    Task<IReadOnlyList<EnzymeDto>> GetEnzymesAsync(CancellationToken cancellationToken = default);
    Task<EnzymeDto> GetEnzymeByIdAsync(Guid id, CancellationToken cancellationToken = default);
}
