using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace com.marcelbenders.Aqua.MongoDb;

public static class ServiceExtension
{
    public static IServiceCollection AddMongoDb(this IServiceCollection services) =>
        services
            .AddSingleton<IMongoRepository<Aquarium>, MongoRepository<Aquarium>>()
            .AddSingleton<IMongoRepository<Duengung>, MongoRepository<Duengung>>()
            .AddSingleton<IMongoRepository<Fisch>, MongoRepository<Fisch>>()
            .AddSingleton<IMongoRepository<Messung>, MongoRepository<Messung>>()
            .AddSingleton<IMongoRepository<Notiz>, MongoRepository<Notiz>>()
            .AddSingleton<ITagRepository, TagRepository>()
            .AddSingleton<IFeedRepository, FeedRepository>()
            .AddSingleton<IMongoContext, MongoContext>();
}