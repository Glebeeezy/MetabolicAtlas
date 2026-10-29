using MetabolicAtlas.Domain.Common;
using MetabolicAtlas.Domain.Pathways.Enums;

namespace MetabolicAtlas.Domain.Pathways.Entities;

/// <summary>
/// Visual element (node) positioned on an interactive map.
/// </summary>
public class MapElement : Entity<Guid>
{
    public Guid MapLayoutId { get; private set; }
    public MapElementType ElementType { get; private set; }
    public Guid? EntityId { get; private set; }
    public double X { get; private set; }
    public double Y { get; private set; }
    public double Width { get; private set; }
    public double Height { get; private set; }
    public string Label { get; private set; } = string.Empty;
    public string? ColorHex { get; private set; }
    public string? StylePropsJson { get; private set; }

    public MapLayout? MapLayout { get; private set; }

    private MapElement() { }

    public MapElement(
        Guid id,
        Guid mapLayoutId,
        MapElementType elementType,
        Guid? entityId,
        double x,
        double y,
        double width,
        double height,
        string label,
        string? colorHex = null,
        string? stylePropsJson = null) : base(id)
    {
        MapLayoutId = mapLayoutId;
        ElementType = elementType;
        EntityId = entityId;
        X = x;
        Y = y;
        Width = width;
        Height = height;
        Label = label ?? throw new ArgumentNullException(nameof(label));
        ColorHex = colorHex;
        StylePropsJson = stylePropsJson;
    }
}

