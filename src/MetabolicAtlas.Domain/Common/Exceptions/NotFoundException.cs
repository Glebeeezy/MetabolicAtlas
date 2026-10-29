namespace MetabolicAtlas.Domain.Common.Exceptions;

/// <summary>
/// Thrown when a requested entity does not exist in the data store.
/// Maps to HTTP 404 Not Found.
/// </summary>
public sealed class NotFoundException : DomainException
{
    public NotFoundException(string entityName, object id)
        : base($"{entityName} with id '{id}' was not found.") { }
}
