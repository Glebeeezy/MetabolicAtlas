using Microsoft.EntityFrameworkCore;
using MetabolicAtlas.Application.Common.Interfaces;
using MetabolicAtlas.Application.DTOs;
using MetabolicAtlas.Application.Services.Interfaces;
using MetabolicAtlas.Domain.Common.Exceptions;
using MetabolicAtlas.Domain.Pathways.Entities;

namespace MetabolicAtlas.Application.Services.Implementations;

/// <summary>
/// Implementation of atlas layout queries.
/// </summary>
public class AtlasService : IAtlasService
{
    private readonly IMetabolicAtlasDbContext _context;

    public AtlasService(IMetabolicAtlasDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<MapLayoutSummaryDto>> GetLayoutsAsync(CancellationToken cancellationToken = default)
    {
        return await _context.MapLayouts
            .AsNoTracking()
            .Where(l => l.IsActive)
            .OrderBy(l => l.Name)
            .Select(l => new MapLayoutSummaryDto(
                l.Id,
                l.Code,
                l.Name,
                l.Version,
                l.Width,
                l.Height,
                l.PathwayId))
            .ToListAsync(cancellationToken);
    }

    public async Task<MapLayoutDetailDto> GetLayoutByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var layout = await _context.MapLayouts
            .AsNoTracking()
            .Include(l => l.Elements)
            .Include(l => l.Edges)
            .FirstOrDefaultAsync(l => l.Id == id, cancellationToken);

        if (layout == null)
            throw new NotFoundException(nameof(MapLayout), id);

        return MapToDetailDto(layout);
    }

    public async Task<MapLayoutDetailDto> GetLayoutByCodeAsync(string code, CancellationToken cancellationToken = default)
    {
        var layout = await _context.MapLayouts
            .AsNoTracking()
            .Include(l => l.Elements)
            .Include(l => l.Edges)
            .FirstOrDefaultAsync(l => l.Code == code, cancellationToken);

        if (layout == null)
            throw new NotFoundException(nameof(MapLayout), code);

        return MapToDetailDto(layout);
    }

    public async Task<MapLayoutDetailDto> GetLayoutByPathwayIdAsync(Guid pathwayId, CancellationToken cancellationToken = default)
    {
        var layout = await _context.MapLayouts
            .AsNoTracking()
            .Include(l => l.Elements)
            .Include(l => l.Edges)
            .FirstOrDefaultAsync(l => l.PathwayId == pathwayId && l.IsActive, cancellationToken);

        if (layout == null)
            throw new NotFoundException(nameof(MapLayout), pathwayId);

        return MapToDetailDto(layout);
    }

    private static MapLayoutDetailDto MapToDetailDto(MapLayout layout)
    {
        var elements = layout.Elements.Select(e => new MapElementDto(
            e.Id,
            (int)e.ElementType,
            e.ElementType.ToString(),
            e.EntityId,
            e.X,
            e.Y,
            e.Width,
            e.Height,
            e.Label,
            e.ColorHex,
            e.StylePropsJson
        )).ToList();

        var edges = layout.Edges.Select(e => new MapEdgeDto(
            e.Id,
            e.SourceElementId,
            e.TargetElementId,
            (int)e.EdgeType,
            e.EdgeType.ToString(),
            e.PathData,
            e.Arrowhead
        )).ToList();

        return new MapLayoutDetailDto(
            layout.Id,
            layout.Code,
            layout.Name,
            layout.Version,
            layout.Width,
            layout.Height,
            layout.PathwayId,
            elements,
            edges
        );
    }
}
