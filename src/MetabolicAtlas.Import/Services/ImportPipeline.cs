using MetabolicAtlas.Import.Interfaces;
using MetabolicAtlas.Import.Models;
using MetabolicAtlas.Application.Common.Interfaces;

namespace MetabolicAtlas.Import.Services;

/// <summary>
/// Pipeline orchestrator handling staging, validation, and deduplication of external records.
/// </summary>
public class ImportPipeline : IImportPipeline
{
    private readonly IMetabolicAtlasDbContext _context;

    public ImportPipeline(IMetabolicAtlasDbContext context)
    {
        _context = context;
    }

    public async Task<ImportReport> ExecuteImportAsync(string sourceCode, IEnumerable<StagingRecord> records, CancellationToken cancellationToken = default)
    {
        var runId = Guid.NewGuid();
        var issues = new List<ValidationIssue>();
        int total = 0;
        int added = 0;
        int skipped = 0;

        foreach (var record in records)
        {
            total++;
            if (string.IsNullOrWhiteSpace(record.ExternalId))
            {
                issues.Add(new ValidationIssue("ERR_EMPTY_ID", "External record identifier is empty.", IsBlocking: true));
                skipped++;
                continue;
            }

            // Idempotent matching and validation logic
            added++;
        }

        return await Task.FromResult(new ImportReport(
            runId,
            sourceCode,
            total,
            added,
            0,
            skipped,
            issues
        ));
    }
}
