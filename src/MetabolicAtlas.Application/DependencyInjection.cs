using Microsoft.Extensions.DependencyInjection;
using MetabolicAtlas.Application.Services.Interfaces;
using MetabolicAtlas.Application.Services.Implementations;

namespace MetabolicAtlas.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IAtlasService, AtlasService>();
        services.AddScoped<IPathwayService, PathwayService>();
        services.AddScoped<IMetaboliteService, MetaboliteService>();
        services.AddScoped<IReactionService, ReactionService>();
        services.AddScoped<IEnzymeService, EnzymeService>();
        return services;
    }
}

