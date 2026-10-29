using MetabolicAtlas.Application.DTOs;

namespace MetabolicAtlas.Application.Services.Interfaces;

/// <summary>
/// Service abstraction for global full-text search across biochemical entities.
/// </summary>
public interface ISearchService
{
    Task<IReadOnlyList<SearchResultDto>> SearchAsync(string query, string languageCode = "ru", CancellationToken cancellationToken = default);
}

