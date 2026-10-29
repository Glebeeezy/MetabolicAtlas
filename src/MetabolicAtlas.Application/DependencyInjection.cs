using Microsoft.Extensions.DependencyInjection;
using MetabolicAtlas.Application.Services.Interfaces;
using MetabolicAtlas.Application.Services.Implementations;

namespace MetabolicAtlas.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IAtlasService, AtlasService>();
        return services;
    }
}

