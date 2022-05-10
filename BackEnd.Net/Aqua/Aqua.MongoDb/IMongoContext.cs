using MongoDB.Driver;

namespace com.marcelbenders.Aqua.MongoDb;

public interface IMongoContext
{
    IMongoDatabase GetDatabase();
}