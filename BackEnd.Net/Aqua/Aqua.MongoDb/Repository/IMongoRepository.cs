namespace com.marcelbenders.Aqua.MongoDb.Repository;

public interface IMongoRepository<T>
{
    Task<IEnumerable<T>> GetAllAsync(string userId, CancellationToken cancellationToken = default);
    Task<T> UpdateByIdAsync(string id, T value, CancellationToken cancellationToken = default);
    Task<T> CreateAsync(T entity, CancellationToken cancellationToken = default);
    Task DeleteAsync(string id, CancellationToken cancellationToken = default);
}