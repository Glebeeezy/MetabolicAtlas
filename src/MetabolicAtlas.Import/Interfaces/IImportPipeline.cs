using MetabolicAtlas.Import.Models;

namespace MetabolicAtlas.Import.Interfaces;

/// <summary>
/// Pipeline contract for ingesting and validating records from external sources.
/// </summary>
public interface IImportPipeline
{
    Task<ImportReport> ExecuteImportAsync(string sourceCode, IEnumerable<StagingRecord> records, CancellationToken cancellationToken = default);
}
