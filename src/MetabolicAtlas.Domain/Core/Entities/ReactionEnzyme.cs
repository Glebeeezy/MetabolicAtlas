using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Core.Entities;

/// <summary>
/// Association linking a reaction to a catalyzing enzyme.
/// </summary>
public class ReactionEnzyme : Entity<Guid>
{
    public Guid ReactionId { get; private set; }
    public Guid EnzymeId { get; private set; }
    public string? Role { get; private set; }

    public Reaction? Reaction { get; private set; }
    public Enzyme? Enzyme { get; private set; }

    private ReactionEnzyme() { }

    public ReactionEnzyme(Guid id, Guid reactionId, Guid enzymeId, string? role = null) : base(id)
    {
        ReactionId = reactionId;
        EnzymeId = enzymeId;
        Role = role;
    }
}

