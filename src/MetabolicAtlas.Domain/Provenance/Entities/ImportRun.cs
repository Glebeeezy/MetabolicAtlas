using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Provenance.Entities;

/// <summary>
/// Execution record of an automated dataset ingestion run.
/// </summary>
public class ImportRun : Entity<Guid>, IAggregateRoot
{
    public Guid SourceId { get; private set; }
    public DateTime StartedAtUtc { get; private set; } = DateTime.UtcNow;
    public DateTime? CompletedAtUtc { get; private set; }
    public string Status { get; private set; } = "Running";
    public int TotalRecords { get; private set; }
    public int ProcessedRecords { get; private set; }
    public int ErrorsCount { get; private set; }
    public string? SummaryJson { get; private set; }

    public Source? Source { get; private set; }

    private ImportRun() { }

    public ImportRun(Guid id, Guid sourceId) : base(id)
    {
        SourceId = sourceId;
        StartedAtUtc = DateTime.UtcNow;
        Status = "Running";
    }

    public void MarkCompleted(int total, int processed, int errors, string? summaryJson = null)
    {
        TotalRecords = total;
        ProcessedRecords = processed;
        ErrorsCount = errors;
        Status = errors > 0 ? "CompletedWithErrors" : "Completed";
        SummaryJson = summaryJson;
        CompletedAtUtc = DateTime.UtcNow;
        TouchUpdated();
    }
}

