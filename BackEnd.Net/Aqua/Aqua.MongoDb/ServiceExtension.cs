using Microsoft.Extensions.DependencyInjection;

namespace com.marcelbenders.Aqua.MongoDb;

public static class ServiceExtension
{
    public static IServiceCollection AddMongoDb(this IServiceCollection services) =>
        services
            .AddSingleton<IMessungRepository, MessungRepository>()
            .AddSingleton<IMongoContext, MongoContext>();
}