using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MetabolicAtlas.Application.Common.Interfaces;
using MetabolicAtlas.Infrastructure.Persistence;

namespace MetabolicAtlas.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? "Host=localhost;Port=5432;Database=metabolic_atlas;Username=postgres;Password=postgres";

        services.AddDbContext<MetabolicAtlasDbContext>(options =>
        {
            options.UseNpgsql(connectionString, npgsqlOptions =>
            {
                npgsqlOptions.MigrationsHistoryTable("__EFMigrationsHistory", "core");
            });
        });

        services.AddScoped<IMetabolicAtlasDbContext>(provider =>
            provider.GetRequiredService<MetabolicAtlasDbContext>());

        return services;
    }
}
