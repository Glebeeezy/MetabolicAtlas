using MetabolicAtlas.Domain.Common;

namespace MetabolicAtlas.Domain.Core.Entities;

/// <summary>
/// Cellular compartment (e.g., cytosol, mitochondrial matrix, endoplasmic reticulum).
/// </summary>
public class Compartment : Entity<Guid>
{
    public string Code { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string? Description { get; private set; }

    private Compartment() { }

    public Compartment(Guid id, string code, string name, string? description = null) : base(id)
    {
        Code = code ?? throw new ArgumentNullException(nameof(code));
        Name = name ?? throw new ArgumentNullException(nameof(name));
        Description = description;
    }
}

