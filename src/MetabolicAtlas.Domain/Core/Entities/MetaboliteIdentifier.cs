using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Core.Entities;

/// <summary>
/// External identifier for a metabolite in scientific databases (ChEBI, HMDB, KEGG, PubChem).
/// </summary>
public class MetaboliteIdentifier : Entity<Guid>
{
    public Guid MetaboliteId { get; private set; }
    public string Namespace { get; private set; } = string.Empty;
    public string Identifier { get; private set; } = string.Empty;
    public bool IsPrimary { get; private set; }

    public Metabolite? Metabolite { get; private set; }

    private MetaboliteIdentifier() { }

    public MetaboliteIdentifier(Guid id, Guid metaboliteId, string ns, string identifier, bool isPrimary)
        : base(id)
    {
        MetaboliteId = metaboliteId;
        Namespace = ns ?? throw new ArgumentNullException(nameof(ns));
        Identifier = identifier ?? throw new ArgumentNullException(nameof(identifier));
        IsPrimary = isPrimary;
    }
}

