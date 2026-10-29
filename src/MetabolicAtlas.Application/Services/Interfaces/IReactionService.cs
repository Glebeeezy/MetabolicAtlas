using MetabolicAtlas.Application.DTOs;

namespace MetabolicAtlas.Application.Services.Interfaces;

/// <summary>
/// Service abstraction for biochemical reactions and participants.
/// </summary>
public interface IReactionService
{
    Task<ReactionDto?> GetReactionByIdAsync(Guid id, string languageCode = "ru", CancellationToken cancellationToken = default);
}

