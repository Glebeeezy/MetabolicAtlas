using Microsoft.EntityFrameworkCore;
using MetabolicAtlas.Application.Common.Interfaces;
using MetabolicAtlas.Application.DTOs;
using MetabolicAtlas.Application.Services.Interfaces;
using MetabolicAtlas.Domain.Common.Exceptions;
using MetabolicAtlas.Domain.Pathways.Entities;

namespace MetabolicAtlas.Application.Services.Implementations;

/// <summary>
/// Implementation of metabolic pathway queries.
/// </summary>
public class PathwayService : IPathwayService
{
    private readonly IMetabolicAtlasDbContext _context;

    public PathwayService(IMetabolicAtlasDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<PathwaySummaryDto>> GetPathwaysAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Pathways
            .AsNoTracking()
            .OrderBy(p => p.Name)
            .Select(p => new PathwaySummaryDto(
                p.Id,
                p.Code,
                p.Name,
                p.Category,
                p.Reactions.Count))
            .ToListAsync(cancellationToken);
    }

    public async Task<PathwayDetailDto> GetPathwayByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var pathway = await _context.Pathways
            .AsNoTracking()
            .Include(p => p.Reactions)
                .ThenInclude(pr => pr.Reaction)
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

        if (pathway == null)
            throw new NotFoundException(nameof(Pathway), id);

        var reactions = pathway.Reactions
            .OrderBy(pr => pr.Ordinal ?? int.MaxValue)
            .Select(pr => new PathwayReactionDto(
                pr.ReactionId,
                pr.Reaction?.Code ?? string.Empty,
                pr.Reaction?.Name ?? string.Empty,
                pr.Ordinal))
            .ToList();

        return new PathwayDetailDto(
            pathway.Id,
            pathway.Code,
            pathway.Name,
            pathway.Description,
            pathway.Category,
            reactions);
    }
}
