using Microsoft.EntityFrameworkCore;
using MetabolicAtlas.Domain.Core.Entities;
using MetabolicAtlas.Domain.Pathways.Entities;
using MetabolicAtlas.Domain.Content.Entities;
using MetabolicAtlas.Domain.Provenance.Entities;

namespace MetabolicAtlas.Application.Common.Interfaces;

/// <summary>
/// Database context abstraction for Metabolic Atlas.
/// Exposes entities across all 5 schemas: core, pathways, content, provenance, and learning.
/// </summary>
public interface IMetabolicAtlasDbContext
{
    // Schema: core
    DbSet<Metabolite> Metabolites { get; }
    DbSet<MetaboliteName> MetaboliteNames { get; }
    DbSet<MetaboliteIdentifier> MetaboliteIdentifiers { get; }
    DbSet<Compartment> Compartments { get; }
    DbSet<Reaction> Reactions { get; }
    DbSet<ReactionParticipant> ReactionParticipants { get; }
    DbSet<Enzyme> Enzymes { get; }
    DbSet<ReactionEnzyme> ReactionEnzymes { get; }

    // Schema: pathways
    DbSet<Pathway> Pathways { get; }
    DbSet<PathwayReaction> PathwayReactions { get; }
    DbSet<MapLayout> MapLayouts { get; }
    DbSet<MapElement> MapElements { get; }
    DbSet<MapEdge> MapEdges { get; }

    // Schema: content
    DbSet<Article> Articles { get; }
    DbSet<ArticleTranslation> ArticleTranslations { get; }

    // Schema: provenance
    DbSet<Source> Sources { get; }
    DbSet<ImportRun> ImportRuns { get; }
    DbSet<Evidence> Evidences { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
