using MetabolicAtlas.Domain.Common;
using MetabolicAtlas.Domain.Core.Enums;

namespace MetabolicAtlas.Domain.Core.Entities;

/// <summary>
/// Participant of a biochemical reaction with explicit stoichiometry, role, and compartment.
/// </summary>
public class ReactionParticipant : Entity<Guid>
{
    public Guid ReactionId { get; private set; }
    public Guid MetaboliteId { get; private set; }
    public ParticipantRole Role { get; private set; }
    public decimal Stoichiometry { get; private set; }
    public Guid? CompartmentId { get; private set; }

    public Reaction? Reaction { get; private set; }
    public Metabolite? Metabolite { get; private set; }
    public Compartment? Compartment { get; private set; }

    private ReactionParticipant() { }

    public ReactionParticipant(
        Guid id,
        Guid reactionId,
        Guid metaboliteId,
        ParticipantRole role,
        decimal stoichiometry,
        Guid? compartmentId) : base(id)
    {
        ReactionId = reactionId;
        MetaboliteId = metaboliteId;
        Role = role;
        Stoichiometry = stoichiometry;
        CompartmentId = compartmentId;
    }
}

