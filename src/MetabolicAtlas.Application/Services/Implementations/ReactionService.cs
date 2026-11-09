using Microsoft.EntityFrameworkCore;
using MetabolicAtlas.Application.Common.Interfaces;
using MetabolicAtlas.Application.DTOs;
using MetabolicAtlas.Application.Services.Interfaces;
using MetabolicAtlas.Domain.Common.Exceptions;
using MetabolicAtlas.Domain.Core.Entities;

namespace MetabolicAtlas.Application.Services.Implementations;

/// <summary>
/// Implementation of biochemical reaction queries with participant stoichiometry and compartments.
/// </summary>
public class ReactionService : IReactionService
{
    private readonly IMetabolicAtlasDbContext _context;

    public ReactionService(IMetabolicAtlasDbContext context)
    {
        _context = context;
    }

    public async Task<ReactionDto> GetReactionByIdAsync(Guid id, string languageCode = "ru", CancellationToken cancellationToken = default)
    {
        var reaction = await _context.Reactions
            .AsNoTracking()
            .Include(r => r.Participants)
                .ThenInclude(p => p.Metabolite!)
                    .ThenInclude(m => m.Names)
            .Include(r => r.Participants)
                .ThenInclude(p => p.Compartment)
            .Include(r => r.Enzymes)
                .ThenInclude(re => re.Enzyme)
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);

        if (reaction == null)
            throw new NotFoundException(nameof(Reaction), id);

        var participants = reaction.Participants
            .Select(p =>
            {
                var names = p.Metabolite?.Names;
                var metaboliteName = names?
                    .Where(n => n.LanguageCode.Equals(languageCode, StringComparison.OrdinalIgnoreCase) && n.IsPreferred)
                    .Select(n => n.Name)
                    .FirstOrDefault()
                    ?? names?
                        .Where(n => n.LanguageCode.Equals(languageCode, StringComparison.OrdinalIgnoreCase))
                        .Select(n => n.Name)
                        .FirstOrDefault()
                    ?? names?
                        .Where(n => n.IsPreferred)
                        .Select(n => n.Name)
                        .FirstOrDefault()
                    ?? names?
                        .Select(n => n.Name)
                        .FirstOrDefault()
                    ?? "Unknown Metabolite";

                return new ReactionParticipantDto(
                    p.MetaboliteId,
                    metaboliteName,
                    p.Role.ToString(),
                    p.Stoichiometry,
                    p.Compartment?.Name);
            })
            .ToList();

        var enzymes = reaction.Enzymes
            .Where(re => re.Enzyme != null)
            .Select(re => new EnzymeDto(
                re.Enzyme!.Id,
                re.Enzyme.EcNumber,
                re.Enzyme.Name,
                re.Enzyme.UniprotId,
                re.Enzyme.Description))
            .ToList();

        return new ReactionDto(
            reaction.Id,
            reaction.Code,
            reaction.Name,
            reaction.Direction.ToString(),
            reaction.IsReversible,
            reaction.Description,
            participants,
            enzymes);
    }
}
