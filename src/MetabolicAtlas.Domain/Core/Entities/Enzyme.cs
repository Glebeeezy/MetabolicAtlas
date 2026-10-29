using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Core.Entities;

/// <summary>
/// Catalytic enzyme entity (EC classification, UniProt mapping).
/// </summary>
public class Enzyme : Entity<Guid>, IAggregateRoot
{
    public string? EcNumber { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string? UniprotId { get; private set; }
    public string? Description { get; private set; }

    private Enzyme() { }

    public Enzyme(Guid id, string name, string? ecNumber = null, string? uniprotId = null, string? description = null)
        : base(id)
    {
        Name = name ?? throw new ArgumentNullException(nameof(name));
        EcNumber = ecNumber;
        UniprotId = uniprotId;
        Description = description;
    }
}

