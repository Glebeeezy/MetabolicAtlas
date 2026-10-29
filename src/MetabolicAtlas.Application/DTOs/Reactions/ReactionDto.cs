namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Data transfer object for a biochemical reaction.
/// </summary>
public record ReactionDto(
    Guid Id,
    string Code,
    string Name,
    string Direction,
    bool IsReversible,
    string? Description,
    IReadOnlyList<ReactionParticipantDto> Participants
);

