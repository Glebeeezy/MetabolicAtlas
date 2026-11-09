using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MetabolicAtlas.Infrastructure.Persistence;
using MetabolicAtlas.Infrastructure.Persistence.Seed;
using Xunit;

namespace MetabolicAtlas.IntegrationTests;

/// <summary>
/// Unit tests verifying the correctness and idempotency of the scientific data seeder.
/// </summary>
public class DataSeederTests
{
    private static ServiceProvider CreateTestServiceProvider(string databaseName)
    {
        var services = new ServiceCollection();
        services.AddLogging(builder => builder.AddDebug());
        services.AddDbContext<MetabolicAtlasDbContext>(options =>
            options.UseInMemoryDatabase(databaseName));

        return services.BuildServiceProvider();
    }

    [Fact]
    public async Task SeedAsync_PopulatesTcaCycleAndPyruvateOxidation()
    {
        // Arrange
        var dbName = Guid.NewGuid().ToString();
        var serviceProvider = CreateTestServiceProvider(dbName);

        // Act
        await DataSeeder.SeedAsync(serviceProvider);

        // Assert
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<MetabolicAtlasDbContext>();

        // Compartments
        var compartments = await context.Compartments.ToListAsync();
        Assert.Equal(2, compartments.Count);
        Assert.Contains(compartments, c => c.Id == SeedIds.Compartment.MitochondrialMatrix);
        Assert.Contains(compartments, c => c.Id == SeedIds.Compartment.Cytosol);

        // Metabolites
        var metabolites = await context.Metabolites
            .Include(m => m.Names)
            .Include(m => m.Identifiers)
            .ToListAsync();
        Assert.Equal(21, metabolites.Count);

        // Verify key TCA metabolites exist with Russian and English names
        var citrate = metabolites.SingleOrDefault(m => m.Id == SeedIds.Met.Citrate);
        Assert.NotNull(citrate);
        Assert.Equal("C6H5O7", citrate.ChemicalFormula);
        Assert.Contains(citrate.Names, n => n.LanguageCode == "ru" && n.Name == "Цитрат");
        Assert.Contains(citrate.Names, n => n.LanguageCode == "en" && n.Name == "Citrate");
        Assert.Contains(citrate.Identifiers, i => i.Namespace == "CHEBI" && i.Identifier == "CHEBI:16947");

        var oxaloacetate = metabolites.SingleOrDefault(m => m.Id == SeedIds.Met.Oxaloacetate);
        Assert.NotNull(oxaloacetate);
        Assert.Contains(oxaloacetate.Names, n => n.LanguageCode == "ru" && n.Name == "Оксалоацетат");

        // Enzymes
        var enzymes = await context.Enzymes.ToListAsync();
        Assert.Equal(9, enzymes.Count);
        Assert.Contains(enzymes, e => e.EcNumber == "2.3.3.1" && e.Name == "Цитратсинтаза");
        Assert.Contains(enzymes, e => e.EcNumber == "1.3.5.1" && e.Name == "Сукцинатдегидрогеназа / Комплекс II");

        // Reactions
        var reactions = await context.Reactions
            .Include(r => r.Participants)
            .Include(r => r.Enzymes)
            .ToListAsync();
        Assert.Equal(9, reactions.Count);

        var csReaction = reactions.SingleOrDefault(r => r.Id == SeedIds.Rxn.CitrateSynthase);
        Assert.NotNull(csReaction);
        Assert.NotEmpty(csReaction.Participants);
        Assert.NotEmpty(csReaction.Enzymes);

        // Pathways
        var pathways = await context.Pathways
            .Include(p => p.Reactions)
            .ToListAsync();
        Assert.Equal(2, pathways.Count);

        var tcaPathway = pathways.SingleOrDefault(p => p.Id == SeedIds.Pathway.TcaCycle);
        Assert.NotNull(tcaPathway);
        Assert.Equal("PWY_TCA", tcaPathway.Code);
        Assert.Equal(8, tcaPathway.Reactions.Count);

        var pdhPathway = pathways.SingleOrDefault(p => p.Id == SeedIds.Pathway.PyruvateOxidation);
        Assert.NotNull(pdhPathway);
        Assert.Single(pdhPathway.Reactions);

        // Map Layouts
        var layouts = await context.MapLayouts
            .Include(l => l.Elements)
            .Include(l => l.Edges)
            .ToListAsync();
        Assert.Single(layouts);

        var tcaLayout = layouts.First();
        Assert.Equal(SeedIds.Layout.TcaLayout, tcaLayout.Id);
        Assert.Equal(17, tcaLayout.Elements.Count); // 9 metabolites + 8 reactions
        Assert.Equal(17, tcaLayout.Edges.Count);    // 17 directed flux edges

        // Articles
        var articles = await context.Articles
            .Include(a => a.Translations)
            .ToListAsync();
        Assert.Equal(2, articles.Count);

        var tcaArticle = articles.SingleOrDefault(a => a.Slug == "tca-cycle");
        Assert.NotNull(tcaArticle);
        Assert.Equal(2, tcaArticle.Translations.Count);
        Assert.Contains(tcaArticle.Translations, t => t.LanguageCode == "ru" && t.Title.Contains("Цикл"));
        Assert.Contains(tcaArticle.Translations, t => t.LanguageCode == "en" && t.Title.Contains("Tricarboxylic"));
    }

    [Fact]
    public async Task SeedAsync_IsIdempotent_WhenExecutedMultipleTimes()
    {
        // Arrange
        var dbName = Guid.NewGuid().ToString();
        var serviceProvider = CreateTestServiceProvider(dbName);

        // Act — first run
        await DataSeeder.SeedAsync(serviceProvider);

        // Act — second run (should exit early without error or duplicates)
        await DataSeeder.SeedAsync(serviceProvider);

        // Assert
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<MetabolicAtlasDbContext>();

        var metaboliteCount = await context.Metabolites.CountAsync();
        var reactionCount = await context.Reactions.CountAsync();
        var pathwayCount = await context.Pathways.CountAsync();

        Assert.Equal(21, metaboliteCount);
        Assert.Equal(9, reactionCount);
        Assert.Equal(2, pathwayCount);
    }
}
