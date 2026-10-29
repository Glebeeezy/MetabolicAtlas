using Microsoft.EntityFrameworkCore;
using MetabolicAtlas.Application.Common.Interfaces;
using MetabolicAtlas.Domain.Core.Entities;
using MetabolicAtlas.Domain.Pathways.Entities;
using MetabolicAtlas.Domain.Content.Entities;
using MetabolicAtlas.Domain.Provenance.Entities;

namespace MetabolicAtlas.Infrastructure.Persistence;

/// <summary>
/// Entity Framework Core database context configuring schemas, table mappings, and relations.
/// </summary>
public class MetabolicAtlasDbContext : DbContext, IMetabolicAtlasDbContext
{
    public MetabolicAtlasDbContext(DbContextOptions<MetabolicAtlasDbContext> options) : base(options) { }

    // Core schema
    public DbSet<Metabolite> Metabolites => Set<Metabolite>();
    public DbSet<MetaboliteName> MetaboliteNames => Set<MetaboliteName>();
    public DbSet<MetaboliteIdentifier> MetaboliteIdentifiers => Set<MetaboliteIdentifier>();
    public DbSet<Compartment> Compartments => Set<Compartment>();
    public DbSet<Reaction> Reactions => Set<Reaction>();
    public DbSet<ReactionParticipant> ReactionParticipants => Set<ReactionParticipant>();
    public DbSet<Enzyme> Enzymes => Set<Enzyme>();
    public DbSet<ReactionEnzyme> ReactionEnzymes => Set<ReactionEnzyme>();

    // Pathways schema
    public DbSet<Pathway> Pathways => Set<Pathway>();
    public DbSet<PathwayReaction> PathwayReactions => Set<PathwayReaction>();
    public DbSet<MapLayout> MapLayouts => Set<MapLayout>();
    public DbSet<MapElement> MapElements => Set<MapElement>();
    public DbSet<MapEdge> MapEdges => Set<MapEdge>();

    // Content schema
    public DbSet<Article> Articles => Set<Article>();
    public DbSet<ArticleTranslation> ArticleTranslations => Set<ArticleTranslation>();

    // Provenance schema
    public DbSet<Source> Sources => Set<Source>();
    public DbSet<ImportRun> ImportRuns => Set<ImportRun>();
    public DbSet<Evidence> Evidences => Set<Evidence>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Core schema mappings
        modelBuilder.Entity<Metabolite>(b =>
        {
            b.ToTable("metabolites", "core");
            b.HasKey(m => m.Id);
            b.Property(m => m.MonoisotopicMass).HasPrecision(18, 6);
            b.HasMany(m => m.Names).WithOne(n => n.Metabolite).HasForeignKey(n => n.MetaboliteId).OnDelete(DeleteBehavior.Cascade);
            b.HasMany(m => m.Identifiers).WithOne(i => i.Metabolite).HasForeignKey(i => i.MetaboliteId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<MetaboliteName>(b =>
        {
            b.ToTable("metabolite_names", "core");
            b.HasKey(n => n.Id);
            b.HasIndex(n => new { n.LanguageCode, n.Name });
        });

        modelBuilder.Entity<MetaboliteIdentifier>(b =>
        {
            b.ToTable("metabolite_identifiers", "core");
            b.HasKey(i => i.Id);
            b.HasIndex(i => new { i.Namespace, i.Identifier }).IsUnique();
        });

        modelBuilder.Entity<Compartment>(b =>
        {
            b.ToTable("compartments", "core");
            b.HasKey(c => c.Id);
            b.HasIndex(c => c.Code).IsUnique();
        });

        modelBuilder.Entity<Reaction>(b =>
        {
            b.ToTable("reactions", "core");
            b.HasKey(r => r.Id);
            b.HasIndex(r => r.Code).IsUnique();
            b.HasMany(r => r.Participants).WithOne(p => p.Reaction).HasForeignKey(p => p.ReactionId).OnDelete(DeleteBehavior.Cascade);
            b.HasMany(r => r.Enzymes).WithOne(e => e.Reaction).HasForeignKey(e => e.ReactionId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ReactionParticipant>(b =>
        {
            b.ToTable("reaction_participants", "core");
            b.HasKey(p => p.Id);
            // Explicit stoichiometry stored in numeric with fixed precision
            b.Property(p => p.Stoichiometry).HasPrecision(18, 4);
            b.HasOne(p => p.Metabolite).WithMany().HasForeignKey(p => p.MetaboliteId).OnDelete(DeleteBehavior.Restrict);
            b.HasOne(p => p.Compartment).WithMany().HasForeignKey(p => p.CompartmentId).OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<Enzyme>(b =>
        {
            b.ToTable("enzymes", "core");
            b.HasKey(e => e.Id);
            b.HasIndex(e => e.EcNumber);
        });

        modelBuilder.Entity<ReactionEnzyme>(b =>
        {
            b.ToTable("reaction_enzymes", "core");
            b.HasKey(re => re.Id);
            b.HasOne(re => re.Enzyme).WithMany().HasForeignKey(re => re.EnzymeId).OnDelete(DeleteBehavior.Restrict);
        });

        // Pathways schema mappings
        modelBuilder.Entity<Pathway>(b =>
        {
            b.ToTable("pathways", "pathways");
            b.HasKey(p => p.Id);
            b.HasIndex(p => p.Code).IsUnique();
            b.HasMany(p => p.Reactions).WithOne(r => r.Pathway).HasForeignKey(r => r.PathwayId).OnDelete(DeleteBehavior.Cascade);
            b.HasMany(p => p.Layouts).WithOne(l => l.Pathway).HasForeignKey(l => l.PathwayId).OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<PathwayReaction>(b =>
        {
            b.ToTable("pathway_reactions", "pathways");
            b.HasKey(pr => pr.Id);
            b.HasOne(pr => pr.Reaction).WithMany().HasForeignKey(pr => pr.ReactionId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<MapLayout>(b =>
        {
            b.ToTable("map_layouts", "pathways");
            b.HasKey(l => l.Id);
            b.HasIndex(l => l.Code).IsUnique();
            b.HasMany(l => l.Elements).WithOne(e => e.MapLayout).HasForeignKey(e => e.MapLayoutId).OnDelete(DeleteBehavior.Cascade);
            b.HasMany(l => l.Edges).WithOne(e => e.MapLayout).HasForeignKey(e => e.MapLayoutId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<MapElement>(b =>
        {
            b.ToTable("map_elements", "pathways");
            b.HasKey(e => e.Id);
            b.HasIndex(e => new { e.MapLayoutId, e.EntityId });
        });

        modelBuilder.Entity<MapEdge>(b =>
        {
            b.ToTable("map_edges", "pathways");
            b.HasKey(e => e.Id);
            b.HasOne(e => e.SourceElement).WithMany().HasForeignKey(e => e.SourceElementId).OnDelete(DeleteBehavior.Restrict);
            b.HasOne(e => e.TargetElement).WithMany().HasForeignKey(e => e.TargetElementId).OnDelete(DeleteBehavior.Restrict);
        });

        // Content schema mappings
        modelBuilder.Entity<Article>(b =>
        {
            b.ToTable("articles", "content");
            b.HasKey(a => a.Id);
            b.HasIndex(a => a.Slug).IsUnique();
            b.HasMany(a => a.Translations).WithOne(t => t.Article).HasForeignKey(t => t.ArticleId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ArticleTranslation>(b =>
        {
            b.ToTable("article_translations", "content");
            b.HasKey(t => t.Id);
            b.HasIndex(t => new { t.ArticleId, t.LanguageCode }).IsUnique();
        });

        // Provenance schema mappings
        modelBuilder.Entity<Source>(b =>
        {
            b.ToTable("sources", "provenance");
            b.HasKey(s => s.Id);
            b.HasIndex(s => s.Code).IsUnique();
        });

        modelBuilder.Entity<ImportRun>(b =>
        {
            b.ToTable("import_runs", "provenance");
            b.HasKey(ir => ir.Id);
            b.HasOne(ir => ir.Source).WithMany().HasForeignKey(ir => ir.SourceId).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Evidence>(b =>
        {
            b.ToTable("evidences", "provenance");
            b.HasKey(e => e.Id);
            b.HasOne(e => e.Source).WithMany().HasForeignKey(e => e.SourceId).OnDelete(DeleteBehavior.Restrict);
        });
    }
}
