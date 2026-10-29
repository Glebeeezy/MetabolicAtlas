using Microsoft.Extensions.DependencyInjection;
using MetabolicAtlas.Import.Interfaces;
using MetabolicAtlas.Import.Services;

namespace MetabolicAtlas.Import;

public static class DependencyInjection
{
    public static IServiceCollection AddImportServices(this IServiceCollection services)
    {
        services.AddScoped<IImportPipeline, ImportPipeline>();
        return services;
    }
}

