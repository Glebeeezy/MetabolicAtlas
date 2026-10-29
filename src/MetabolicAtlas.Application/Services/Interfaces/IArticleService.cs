using MetabolicAtlas.Application.DTOs;

namespace MetabolicAtlas.Application.Services.Interfaces;

/// <summary>
/// Service abstraction for retrieving educational articles and translations.
/// </summary>
public interface IArticleService
{
    Task<ArticleDto?> GetArticleBySlugAsync(string slug, string languageCode = "ru", CancellationToken cancellationToken = default);
}

