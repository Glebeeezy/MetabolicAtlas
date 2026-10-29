using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Pathways.Entities;

/// <summary>
/// Metabolic pathway (e.g., Citric Acid Cycle, Glycolysis, Gluconeogenesis).
/// </summary>
public class Pathway : Entity<Guid>, IAggregateRoot
{
    public string Code { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public string? Category { get; private set; }

    private readonly List<PathwayReaction> _reactions = new();
    public IReadOnlyCollection<PathwayReaction> Reactions => _reactions.AsReadOnly();

    private readonly List<MapLayout> _layouts = new();
    public IReadOnlyCollection<MapLayout> Layouts => _layouts.AsReadOnly();

    private Pathway() { }

    public Pathway(Guid id, string code, string name, string? description = null, string? category = null) : base(id)
    {
        Code = code ?? throw new ArgumentNullException(nameof(code));
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Description = description;
        Category = category;
    }

    public void AddReaction(Guid reactionId, int? ordinal = null)
    {
        _reactions.Add(new PathwayReaction(Guid.NewGuid(), Id, reactionId, ordinal));
        TouchUpdated();
    }
}

