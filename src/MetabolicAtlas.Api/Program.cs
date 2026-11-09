using MetabolicAtlas.Application;
using MetabolicAtlas.Infrastructure;
using MetabolicAtlas.Infrastructure.Persistence.Seed;
using MetabolicAtlas.Import;
using MetabolicAtlas.Api.Endpoints;
using MetabolicAtlas.Api.Exceptions;
using MetabolicAtlas.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Application layer services
builder.Services.AddApplicationServices();

// Infrastructure layer services (EF Core, Npgsql, PostgreSQL)
builder.Services.AddInfrastructure(builder.Configuration);

// Import layer services
builder.Services.AddImportServices();

// CORS configuration for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ProblemDetails + global exception handling (order matters — GlobalExceptionHandler must be last)
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<NotFoundExceptionHandler>();
builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
builder.Services.AddExceptionHandler<ConflictExceptionHandler>();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

// OpenAPI documentation configuration
builder.Services.AddMetabolicAtlasOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapMetabolicAtlasScalar();

    try
    {
        await DataSeeder.SeedAsync(app.Services);
    }
    catch (Exception ex)
    {
        var logger = app.Services.GetRequiredService<ILogger<Program>>();
        logger.LogWarning(ex, "DataSeeder skipped: unable to connect to database.");
    }
}

app.UseCors("AllowFrontend");

// Global exception handling middleware — must be early in the pipeline
app.UseExceptionHandler();

// System health check
app.MapGet("/health", () => Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow }))
   .WithTags("System")
   .WithName("HealthCheck")
   .WithSummary("Check system health status");

// Domain endpoints
app.MapAtlasEndpoints();
app.MapPathwayEndpoints();
app.MapMetaboliteEndpoints();
app.MapReactionEndpoints();
app.MapEnzymeEndpoints();

app.Run();

// Required for WebApplicationFactory integration testing
public partial class Program { }
