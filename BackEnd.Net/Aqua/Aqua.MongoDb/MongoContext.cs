using MongoDB.Driver;

namespace com.marcelbenders.Aqua.MongoDb;

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