using MetabolicAtlas.Domain.Common;
using MetabolicAtlas.Domain.Core.Entities;

namespace MetabolicAtlas.Domain.Pathways.Entities;

/// <summary>
/// Inclusion of a biochemical reaction in a metabolic pathway with optional display order.
/// </summary>
public class PathwayReaction : Entity<Guid>
{
    public Guid PathwayId { get; private set; }
    public Guid ReactionId { get; private set; }
    public int? Ordinal { get; private set; }

    public Pathway? Pathway { get; private set; }
    public Reaction? Reaction { get; private set; }

    private PathwayReaction() { }

    public PathwayReaction(Guid id, Guid pathwayId, Guid reactionId, int? ordinal = null) : base(id)
    {
        PathwayId = pathwayId;
        ReactionId = reactionId;
        Ordinal = ordinal;
    }
}

