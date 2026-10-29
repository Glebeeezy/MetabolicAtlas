using MetabolicAtlas.Domain.Common;
using MetabolicAtlas.Domain.Pathways.Enums;

namespace MetabolicAtlas.Domain.Pathways.Entities;

/// <summary>
/// Map layout definition containing dimensions, versioning, and elements.
/// </summary>
public class MapLayout : Entity<Guid>, IAggregateRoot
{
    public Guid? PathwayId { get; private set; }
    public string Code { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string Version { get; private set; } = "1.0.0";
    public double Width { get; private set; }
    public double Height { get; private set; }
    public bool IsActive { get; private set; } = true;

    public Pathway? Pathway { get; private set; }

    private readonly List<MapElement> _elements = new();
    public IReadOnlyCollection<MapElement> Elements => _elements.AsReadOnly();

    private readonly List<MapEdge> _edges = new();
    public IReadOnlyCollection<MapEdge> Edges => _edges.AsReadOnly();

    private MapLayout() { }

    public MapLayout(
        Guid id,
        string code,
        string name,
        double width,
        double height,
        Guid? pathwayId = null,
        string version = "1.0.0",
        bool isActive = true) : base(id)
    {
        Code = code ?? throw new ArgumentNullException(nameof(code));
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Width = width;
        Height = height;
        PathwayId = pathwayId;
        Version = version;
        IsActive = isActive;
    }

    public void AddElement(MapElementType type, Guid? entityId, double x, double y, double width, double height, string label, string? color = null)
    {
        _elements.Add(new MapElement(Guid.NewGuid(), Id, type, entityId, x, y, width, height, label, color));
        TouchUpdated();
    }

    public void AddEdge(Guid sourceElementId, Guid targetElementId, MapEdgeType type, string? pathData = null)
    {
        _edges.Add(new MapEdge(Guid.NewGuid(), Id, sourceElementId, targetElementId, type, pathData));
        TouchUpdated();
    }
}

