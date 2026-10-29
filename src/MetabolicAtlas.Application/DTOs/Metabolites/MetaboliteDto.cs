namespace MetabolicAtlas.Application.DTOs;

/// <summary>
/// Data transfer object for a metabolite card and detail view.
/// </summary>
public record MetaboliteDto(
    Guid Id,
    string PrimaryName,
    string? Formula,
    int? NetCharge,
    decimal? MonoisotopicMass,
    IReadOnlyList<string> Synonyms,
    IReadOnlyDictionary<string, string> ExternalIdentifiers
);

