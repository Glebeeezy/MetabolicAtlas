using Microsoft.EntityFrameworkCore;
using MetabolicAtlas.Application.Common.Interfaces;
using MetabolicAtlas.Application.DTOs;
using MetabolicAtlas.Application.Services.Interfaces;
using MetabolicAtlas.Domain.Common.Exceptions;
using MetabolicAtlas.Domain.Core.Entities;

namespace MetabolicAtlas.Application.Services.Implementations;

/// <summary>
/// Implementation of catalytic enzyme queries.
/// </summary>
public class EnzymeService : IEnzymeService
{
    private readonly IMetabolicAtlasDbContext _context;

    public EnzymeService(IMetabolicAtlasDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<EnzymeDto>> GetEnzymesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Enzymes
            .AsNoTracking()
            .OrderBy(e => e.Name)
            .Select(e => new EnzymeDto(
                e.Id,
                e.EcNumber,
                e.Name,
                e.UniprotId,
                e.Description))
            .ToListAsync(cancellationToken);
    }

    public async Task<EnzymeDto> GetEnzymeByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var enzyme = await _context.Enzymes
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

        if (enzyme == null)
            throw new NotFoundException(nameof(Enzyme), id);

        return new EnzymeDto(
            enzyme.Id,
            enzyme.EcNumber,
            enzyme.Name,
            enzyme.UniprotId,
            enzyme.Description);
    }
}
