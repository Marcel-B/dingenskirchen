using com.marcelbenders.Aqua.Domain;

namespace com.marcelbenders.Aqua.MongoDb.Repository;

public interface IFeedRepository
{
    Task<IEnumerable<IFeedItem>> GetFeedAsync(CancellationToken cancellationToken);
}