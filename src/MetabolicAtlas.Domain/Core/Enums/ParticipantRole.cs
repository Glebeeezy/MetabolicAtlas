namespace MetabolicAtlas.Domain.Core.Enums;

/// <summary>
/// Role of a metabolite in a biochemical reaction.
/// </summary>
public enum ParticipantRole
{
    Substrate = 1,
    Product = 2,
    Cofactor = 3,
    Inhibitor = 4,
    Activator = 5,
    Modifier = 6
}

