using MetabolicAtlas.Domain.Common;
using MetabolicAtlas.Domain.Core.Enums;

namespace MetabolicAtlas.Domain.Core.Entities;

/// <summary>
/// Name or synonym of a metabolite with multi-language support.
/// </summary>
public class MetaboliteName : Entity<Guid>
{
    public Guid MetaboliteId { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string LanguageCode { get; private set; } = "ru";
    public bool IsPreferred { get; private set; }
    public NameType NameType { get; private set; }

    public Metabolite? Metabolite { get; private set; }

    private MetaboliteName() { }

    public MetaboliteName(Guid id, Guid metaboliteId, string name, string languageCode, bool isPreferred, NameType nameType)
        : base(id)
    {
        MetaboliteId = metaboliteId;
        Name = name ?? throw new ArgumentNullException(nameof(name));
        LanguageCode = languageCode ?? "ru";
        IsPreferred = isPreferred;
        NameType = nameType;
    }
}

