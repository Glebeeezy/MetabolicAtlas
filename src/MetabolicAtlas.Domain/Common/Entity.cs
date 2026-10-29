namespace MetabolicAtlas.Domain.Common;

/// <summary>
/// Base class for domain entities with a unique identifier.
/// </summary>
/// <typeparam name="TId">Identifier type (typically Guid).</typeparam>
public abstract class Entity<TId>
{
    public TId Id { get; protected set; } = default!;
    public DateTime CreatedAtUtc { get; protected set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; protected set; }

    protected Entity() { }

    protected Entity(TId id)
    {
        Id = id;
    }

    public void TouchUpdated()
    {
        UpdatedAtUtc = DateTime.UtcNow;
    }
}
