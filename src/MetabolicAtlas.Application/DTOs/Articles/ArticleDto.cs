namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Data transfer object for an educational article.
/// </summary>
public record ArticleDto(
    string Slug,
    string Title,
    string Summary,
    string BodyMarkdown,
    string LanguageCode,
    int Version,
    DateTime PublishedAtUtc
);

