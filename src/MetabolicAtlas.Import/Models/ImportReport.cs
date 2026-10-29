namespace MetabolicAtlas.Import.Models;

/// <summary>
/// Execution summary report for a completed or failed import pipeline run.
/// </summary>
public record ImportReport(
    Guid RunId,
    string SourceCode,
    int TotalProcessed,
    int AddedCount,
    int UpdatedCount,
    int SkippedCount,
    IReadOnlyList<ValidationIssue> Issues
);

