using Scalar.AspNetCore;
using MetabolicAtlas.Application;
using MetabolicAtlas.Infrastructure;
using MetabolicAtlas.Import;
using MetabolicAtlas.Api.Endpoints;

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

// OpenAPI document generation
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options
            .WithTitle("Metabolic Atlas API")
            .WithTheme(ScalarTheme.Moon)
            .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
    });
}

app.UseCors("AllowFrontend");

// System health check
app.MapGet("/health", () => Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow }))
   .WithTags("System")
   .WithName("HealthCheck")
   .WithSummary("Check system health status");

// Atlas endpoints
app.MapAtlasEndpoints();

app.Run();

// Required for WebApplicationFactory integration testing
public partial class Program { }
