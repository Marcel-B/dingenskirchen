using com.marcelbenders.Aqua.Domain.Sql;

namespace com.marcelbenders.Aqua.Persistence;

public interface IRepository<T> where T : IEntity
{
    Task<T> CreateAsync(T entity, CancellationToken cancellationToken);
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<IEnumerable<T>> GetByUserIdAsync(string userId, CancellationToken cancellationToken);
    Task<IEnumerable<T>> GetAsync(CancellationToken cancellationToken);
    Task<T> UpdateAsync(T entity, CancellationToken cancellationToken);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken);
}