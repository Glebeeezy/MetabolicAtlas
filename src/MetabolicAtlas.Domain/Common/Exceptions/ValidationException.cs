namespace MetabolicAtlas.Domain.Common.Exceptions;

/// <summary>
/// Thrown when domain validation rules are violated.
/// Maps to HTTP 422 Unprocessable Entity.
/// </summary>
public sealed class ValidationException : DomainException
{
    public IReadOnlyDictionary<string, string[]> Errors { get; }

    public ValidationException(string message)
        : base(message)
    {
        Errors = new Dictionary<string, string[]>();
    }

    public ValidationException(IDictionary<string, string[]> errors)
        : base("One or more validation errors occurred.")
    {
        Errors = new Dictionary<string, string[]>(errors);
    }
}
