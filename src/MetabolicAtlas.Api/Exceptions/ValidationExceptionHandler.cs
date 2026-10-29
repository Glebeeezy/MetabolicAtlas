using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MetabolicAtlas.Domain.Common.Exceptions;

namespace MetabolicAtlas.Api.Exceptions;

/// <summary>
/// Handles <see cref="ValidationException"/> and returns HTTP 422 ValidationProblemDetails.
/// </summary>
internal sealed class ValidationExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (exception is not ValidationException validationException)
            return false;

        var errors = validationException.Errors
            .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

        var problemDetails = new ValidationProblemDetails(errors)
        {
            Status = StatusCodes.Status422UnprocessableEntity,
            Title = "Validation Failed",
            Detail = validationException.Message,
            Type = "https://tools.ietf.org/html/rfc4918#section-11.2"
        };

        httpContext.Response.StatusCode = StatusCodes.Status422UnprocessableEntity;
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;
    }
}
