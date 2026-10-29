using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MetabolicAtlas.Domain.Common.Exceptions;

namespace MetabolicAtlas.Api.Exceptions;

/// <summary>
/// Handles <see cref="NotFoundException"/> and returns HTTP 404 ProblemDetails.
/// </summary>
internal sealed class NotFoundExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (exception is not NotFoundException notFoundException)
            return false;

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status404NotFound,
            Title = "Not Found",
            Detail = notFoundException.Message,
            Type = "https://tools.ietf.org/html/rfc9110#section-15.5.5"
        };

        httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;
    }
}
