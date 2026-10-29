using MetabolicAtlas.Domain.Common;
using MetabolicAtlas.Domain.Core.Enums;

namespace MetabolicAtlas.Domain.Core.Entities;

/// <summary>
/// Chemical entity (metabolite).
/// </summary>
public class Metabolite : Entity<Guid>, IAggregateRoot
{
    public string? ChemicalFormula { get; private set; }
    public int? NetCharge { get; private set; }
    public string? InChIKey { get; private set; }
    public string? InChI { get; private set; }
    public string? Smiles { get; private set; }
    public decimal? MonoisotopicMass { get; private set; }

    private readonly List<MetaboliteName> _names = new();
    public IReadOnlyCollection<MetaboliteName> Names => _names.AsReadOnly();

    private readonly List<MetaboliteIdentifier> _identifiers = new();
    public IReadOnlyCollection<MetaboliteIdentifier> Identifiers => _identifiers.AsReadOnly();

    private Metabolite() { }

    public Metabolite(
        Guid id,
        string? chemicalFormula = null,
        int? netCharge = null,
        string? inChIKey = null,
        string? inChI = null,
        string? smiles = null,
        decimal? monoisotopicMass = null) : base(id)
    {
        ChemicalFormula = chemicalFormula;
        NetCharge = netCharge;
        InChIKey = inChIKey;
        InChI = inChI;
        Smiles = smiles;
        MonoisotopicMass = monoisotopicMass;
    }

    public void AddName(string name, string languageCode, bool isPreferred, NameType nameType)
    {
        _names.Add(new MetaboliteName(Guid.NewGuid(), Id, name, languageCode, isPreferred, nameType));
        TouchUpdated();
    }

    public void AddIdentifier(string sourceNamespace, string identifier, bool isPrimary = false)
    {
        _identifiers.Add(new MetaboliteIdentifier(Guid.NewGuid(), Id, sourceNamespace, identifier, isPrimary));
        TouchUpdated();
    }
}

