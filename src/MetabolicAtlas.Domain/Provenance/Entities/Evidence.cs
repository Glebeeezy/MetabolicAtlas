using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Provenance.Entities;

/// <summary>
/// Citation or evidence corroborating a scientific statement or entity.
/// </summary>
public class Evidence : Entity<Guid>
{
    public Guid SourceId { get; private set; }
    public string EntityType { get; private set; } = string.Empty;
    public Guid EntityId { get; private set; }
    public string ExternalReferenceId { get; private set; } = string.Empty;
    public string? Notes { get; private set; }

    public Source? Source { get; private set; }

    private Evidence() { }

    public Evidence(
        Guid id,
        Guid sourceId,
        string entityType,
        Guid entityId,
        string externalReferenceId,
        string? notes = null) : base(id)
    {
        SourceId = sourceId;
        EntityType = entityType ?? throw new ArgumentNullException(nameof(entityType));
        EntityId = entityId;
        ExternalReferenceId = externalReferenceId ?? throw new ArgumentNullException(nameof(externalReferenceId));
        Notes = notes;
    }
}

