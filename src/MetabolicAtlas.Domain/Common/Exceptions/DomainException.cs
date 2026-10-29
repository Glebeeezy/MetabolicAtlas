namespace MetabolicAtlas.Domain.Common.Exceptions;

/// <summary>
/// Abstract base class for all domain-level exceptions.
/// </summary>
public abstract class DomainException : Exception
{
    protected DomainException(string message) : base(message) { }

    protected DomainException(string message, Exception innerException)
        : base(message, innerException) { }
}
