namespace com.marcelbenders.Aqua.MongoDb.Repository;

public interface ITagRepository
{
    Task<IEnumerable<string>> GetTagsAsync(CancellationToken cancellationToken = default);
}