using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Content.Entities;

/// <summary>
/// Localized translation of an educational article.
/// </summary>
public class ArticleTranslation : Entity<Guid>
{
    public Guid ArticleId { get; private set; }
    public string LanguageCode { get; private set; } = "ru";
    public string Title { get; private set; } = string.Empty;
    public string Summary { get; private set; } = string.Empty;
    public string BodyMarkdown { get; private set; } = string.Empty;
    public int Version { get; private set; } = 1;
    public DateTime PublishedAtUtc { get; private set; } = DateTime.UtcNow;

    public Article? Article { get; private set; }

    private ArticleTranslation() { }

    public ArticleTranslation(
        Guid id,
        Guid articleId,
        string languageCode,
        string title,
        string summary,
        string bodyMarkdown,
        int version = 1) : base(id)
    {
        ArticleId = articleId;
        LanguageCode = languageCode ?? "ru";
        Title = title ?? throw new ArgumentNullException(nameof(title));
        Summary = summary ?? string.Empty;
        BodyMarkdown = bodyMarkdown ?? throw new ArgumentNullException(nameof(bodyMarkdown));
        Version = version;
    }
}

