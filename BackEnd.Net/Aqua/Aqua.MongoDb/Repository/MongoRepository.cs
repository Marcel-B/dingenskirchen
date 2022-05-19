using MongoDB.Driver;

namespace com.marcelbenders.Aqua.MongoDb.Repository;

public class MongoRepository<T> : IMongoRepository<T>
{
    private readonly IMongoContext _context;

    public MongoRepository(IMongoContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var name = typeof(T).Name.ToLower();
        var database = _context.GetDatabase();
            
        var entities = database.GetCollection<T>(name);
        var all =  entities.Find(entity => true).Sort("{datum: 1}");
        var liste = await all.ToListAsync(cancellationToken: cancellationToken);
        return liste;
    }

    public async Task<T> CreateAsync(T entity, CancellationToken cancellationToken = default)
    {
        var name = typeof(T).Name.ToLower();
        var database = _context.GetDatabase();
        await database
            .GetCollection<T>(name)
            .InsertOneAsync(entity, cancellationToken: cancellationToken);
        return entity;
    }

    public async Task DeleteAsync(string id, CancellationToken cancellationToken = default)
    {
        var name = typeof(T).Name.ToLower();
        var database = _context.GetDatabase();
        var filter = Builders<T>.Filter.Eq("Id", id);
        await database
            .GetCollection<T>(name)
            .DeleteOneAsync(filter, cancellationToken);
    }
}