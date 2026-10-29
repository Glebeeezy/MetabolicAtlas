namespace MetabolicAtlas.Import.Models;

/// <summary>
/// Raw staging record captured from an external data source.
/// </summary>
public record StagingRecord(
    string ExternalId,
    string SourceCode,
    string RawPayloadJson,
    DateTime FetchedAtUtc
);

