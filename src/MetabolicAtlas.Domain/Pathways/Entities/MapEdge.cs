using MetabolicAtlas.Domain.Common;
using MetabolicAtlas.Domain.Pathways.Enums;

namespace MetabolicAtlas.Domain.Pathways.Entities;

/// <summary>
/// Visual connection or arrow between elements on a map layout.
/// </summary>
public class MapEdge : Entity<Guid>
{
    public Guid MapLayoutId { get; private set; }
    public Guid SourceElementId { get; private set; }
    public Guid TargetElementId { get; private set; }
    public MapEdgeType EdgeType { get; private set; }
    public string? PathData { get; private set; }
    public string? Arrowhead { get; private set; }
    public string? StylePropsJson { get; private set; }

    public MapLayout? MapLayout { get; private set; }
    public MapElement? SourceElement { get; private set; }
    public MapElement? TargetElement { get; private set; }

    private MapEdge() { }

    public MapEdge(
        Guid id,
        Guid mapLayoutId,
        Guid sourceElementId,
        Guid targetElementId,
        MapEdgeType edgeType,
        string? pathData = null,
        string? arrowhead = "standard",
        string? stylePropsJson = null) : base(id)
    {
        MapLayoutId = mapLayoutId;
        SourceElementId = sourceElementId;
        TargetElementId = targetElementId;
        EdgeType = edgeType;
        PathData = pathData;
        Arrowhead = arrowhead;
        StylePropsJson = stylePropsJson;
    }
}

