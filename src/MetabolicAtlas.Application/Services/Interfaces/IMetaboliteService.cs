using MetabolicAtlas.Application.DTOs;

namespace MetabolicAtlas.Application.Services.Interfaces;

/// <summary>
/// Service abstraction for chemical entity (metabolite) queries.
/// </summary>
public interface IMetaboliteService
{
    Task<MetaboliteDto?> GetMetaboliteByIdAsync(Guid id, string languageCode = "ru", CancellationToken cancellationToken = default);
}

