namespace MetabolicAtlas.Domain.Pathways.Enums;

/// <summary>
/// Type of visual connection or flow between map elements.
/// </summary>
public enum MapEdgeType
{
    DirectFlux = 1,
    SubstrateToReaction = 2,
    ReactionToProduct = 3,
    Catalysis = 4,
    AllostericActivation = 5,
    AllostericInhibition = 6,
    Translocation = 7
}

