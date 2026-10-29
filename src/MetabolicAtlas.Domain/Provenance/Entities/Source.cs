using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Provenance.Entities;

/// <summary>
/// External data source authority (Rhea, Reactome, ChEBI, HMDB).
/// </summary>
public class Source : Entity<Guid>, IAggregateRoot
{
    public string Code { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string? Version { get; private set; }
    public string? Url { get; private set; }
    public string? License { get; private set; }
    public string? LicenseUrl { get; private set; }
    public string? Description { get; private set; }

    private Source() { }

    public Source(
        Guid id,
        string code,
        string name,
        string? version = null,
        string? url = null,
        string? license = null,
        string? licenseUrl = null,
        string? description = null) : base(id)
    {
        Code = code ?? throw new ArgumentNullException(nameof(code));
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Version = version;
        Url = url;
        License = license;
        LicenseUrl = licenseUrl;
        Description = description;
    }
}

