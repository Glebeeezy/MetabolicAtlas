namespace MetabolicAtlas.Domain.Common.Exceptions;

/// <summary>
/// Thrown when an operation conflicts with the current state of a resource.
/// Maps to HTTP 409 Conflict.
/// </summary>
public sealed class ConflictException : DomainException
{
    public ConflictException(string message) : base(message) { }
}
