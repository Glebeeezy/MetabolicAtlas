namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Data transfer object for a reaction participant with stoichiometry and role.
/// </summary>
public record ReactionParticipantDto(
    Guid MetaboliteId,
    string MetaboliteName,
    string Role,
    decimal Stoichiometry,
    string? CompartmentName
);

