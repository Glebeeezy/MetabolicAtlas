using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Content.Entities;

/// <summary>
/// Educational article or biochemical reference material.
/// </summary>
public class Article : Entity<Guid>, IAggregateRoot
{
    public string Slug { get; private set; } = string.Empty;
    public string? RelatedEntityType { get; private set; }
    public Guid? RelatedEntityId { get; private set; }

    private readonly List<ArticleTranslation> _translations = new();
    public IReadOnlyCollection<ArticleTranslation> Translations => _translations.AsReadOnly();

    private Article() { }

    public Article(Guid id, string slug, string? relatedEntityType = null, Guid? relatedEntityId = null) : base(id)
    {
        Slug = slug ?? throw new ArgumentNullException(nameof(slug));
        RelatedEntityType = relatedEntityType;
        RelatedEntityId = relatedEntityId;
    }

    public void AddTranslation(string languageCode, string title, string summary, string bodyMarkdown)
    {
        _translations.Add(new ArticleTranslation(Guid.NewGuid(), Id, languageCode, title, summary, bodyMarkdown));
        TouchUpdated();
    }
}

