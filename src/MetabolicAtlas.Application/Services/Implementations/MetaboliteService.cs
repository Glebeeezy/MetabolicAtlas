using Microsoft.EntityFrameworkCore;
using MetabolicAtlas.Application.Common.Interfaces;
using MetabolicAtlas.Application.DTOs;
using MetabolicAtlas.Application.Services.Interfaces;
using MetabolicAtlas.Domain.Common.Exceptions;
using MetabolicAtlas.Domain.Core.Entities;

namespace MetabolicAtlas.Application.Services.Implementations;

/// <summary>
/// Implementation of chemical entity (metabolite) queries with localization support.
/// </summary>
public class MetaboliteService : IMetaboliteService
{
    private readonly IMetabolicAtlasDbContext _context;

    public MetaboliteService(IMetabolicAtlasDbContext context)
    {
        _context = context;
    }

    public async Task<MetaboliteDto> GetMetaboliteByIdAsync(Guid id, string languageCode = "ru", CancellationToken cancellationToken = default)
    {
        var metabolite = await _context.Metabolites
            .AsNoTracking()
            .Include(m => m.Names)
            .Include(m => m.Identifiers)
            .FirstOrDefaultAsync(m => m.Id == id, cancellationToken);

        if (metabolite == null)
            throw new NotFoundException(nameof(Metabolite), id);

        // Resolve preferred name for the requested language, fallback to English or any first name
        var primaryName = metabolite.Names
            .Where(n => n.LanguageCode.Equals(languageCode, StringComparison.OrdinalIgnoreCase) && n.IsPreferred)
            .Select(n => n.Name)
            .FirstOrDefault()
            ?? metabolite.Names
                .Where(n => n.LanguageCode.Equals(languageCode, StringComparison.OrdinalIgnoreCase))
                .Select(n => n.Name)
                .FirstOrDefault()
            ?? metabolite.Names
                .Where(n => n.IsPreferred)
                .Select(n => n.Name)
                .FirstOrDefault()
            ?? metabolite.Names
                .Select(n => n.Name)
                .FirstOrDefault()
            ?? "Unknown Metabolite";

        // Collect synonyms (names distinct from the primary name)
        var synonyms = metabolite.Names
            .Where(n => n.Name != primaryName)
            .Select(n => n.Name)
            .Distinct()
            .ToList();

        // Collect external identifiers (e.g. CHEBI, HMDB, KEGG)
        var externalIdentifiers = metabolite.Identifiers
            .GroupBy(i => i.Namespace)
            .ToDictionary(
                g => g.Key,
                g => g.OrderByDescending(x => x.IsPrimary).First().Identifier);

        return new MetaboliteDto(
            metabolite.Id,
            primaryName,
            metabolite.ChemicalFormula,
            metabolite.NetCharge,
            metabolite.MonoisotopicMass,
            synonyms,
            externalIdentifiers);
    }
}
