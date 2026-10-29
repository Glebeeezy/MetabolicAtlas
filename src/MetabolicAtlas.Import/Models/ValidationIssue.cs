namespace MetabolicAtlas.Import.Models;

/// <summary>
/// Validation discrepancy or issue encountered during data ingestion.
/// </summary>
public record ValidationIssue(
    string Code,
    string Message,
    bool IsBlocking,
    string? EntityReference = null
);

