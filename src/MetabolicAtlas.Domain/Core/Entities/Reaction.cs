using MetabolicAtlas.Domain.Common;
using MetabolicAtlas.Domain.Common.Exceptions;
using MetabolicAtlas.Domain.Core.Enums;

namespace MetabolicAtlas.Domain.Core.Entities;

/// <summary>
/// Biochemical reaction entity with direction, participants, and associated enzymes.
/// </summary>
public class Reaction : Entity<Guid>, IAggregateRoot
{
    public string Code { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public ReactionDirection Direction { get; private set; }
    public bool IsReversible => Direction == ReactionDirection.Reversible;
    public string? Description { get; private set; }

    private readonly List<ReactionParticipant> _participants = new();
    public IReadOnlyCollection<ReactionParticipant> Participants => _participants.AsReadOnly();

    private readonly List<ReactionEnzyme> _enzymes = new();
    public IReadOnlyCollection<ReactionEnzyme> Enzymes => _enzymes.AsReadOnly();

    private Reaction() { }

    public Reaction(Guid id, string code, string name, ReactionDirection direction, string? description = null)
        : base(id)
    {
        Code = code ?? throw new ArgumentNullException(nameof(code));
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Direction = direction;
        Description = description;
    }

    public void AddParticipant(Guid metaboliteId, ParticipantRole role, decimal stoichiometry, Guid? compartmentId = null)
    {
        if (stoichiometry <= 0)
            throw new ValidationException($"Stoichiometric coefficient must be a positive number. Provided value: {stoichiometry}.");

        _participants.Add(new ReactionParticipant(Guid.NewGuid(), Id, metaboliteId, role, stoichiometry, compartmentId));
        TouchUpdated();
    }

    public void AddEnzyme(Guid enzymeId, string? role = null)
    {
        _enzymes.Add(new ReactionEnzyme(Guid.NewGuid(), Id, enzymeId, role));
        TouchUpdated();
    }
}

