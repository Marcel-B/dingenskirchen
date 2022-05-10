using com.marcelbenders.Aqua.Domain;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MongoDB.Driver;

namespace com.marcelbenders.Aqua.MongoDb;

public interface IMessungRepository
{
    Task<IEnumerable<Messung>> GetMessungenAsync();
}

public class MessungRepository : IMessungRepository
{
    private readonly IMongoContext _context;

    public MessungRepository(IMongoContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Messung>> GetMessungenAsync()
    {
        var database = _context.GetDatabase();
        var messungen = database.GetCollection<Messung>("messung");
        var all = await messungen.FindAsync(messung => true);
        var liste = await all.ToListAsync();
        return liste;
    }
}

public interface IMongoContext
{
    IMongoDatabase GetDatabase();
}

public class MongoContext : IMongoContext
{
    private MongoClient? _client;

    private MongoClient Client
    {
        get { return _client ??= new MongoClient("mongodb://marcel:h00terNullOne0ne@192.168.2.103:8099"); }
    }

    private const string dbName = "aqua";

    public IMongoDatabase GetDatabase()
    {
        return Client.GetDatabase(dbName);
    }
}