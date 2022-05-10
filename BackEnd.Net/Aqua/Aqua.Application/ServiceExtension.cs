using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace com.marcelbenders.Aqua.Application;

public static class ServiceExtension
{
    public static IServiceCollection AddAquaApplication(this IServiceCollection services) =>
        services.AddMediatR(typeof(GetMessungenQueryHandler));

}