using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using Microsoft.EntityFrameworkCore;

namespace com.marcelbenders.Aqua.SqlServer.Repository;

public class MessungRepository : IMessungRepository
{
    private readonly DataContext _context;

    public MessungRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Messung> CreateAsync(Messung entity, CancellationToken cancellationToken)
    {
        entity.Id = Guid.NewGuid();
        _context.Messungen.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task<Messung?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Messungen.FirstOrDefaultAsync(messung => messung.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Messung>> GetByUserIdAsync(string userId, CancellationToken cancellationToken)
    {
        return await _context.Messungen.Where(messung => messung.UserId == userId).ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Messung>> GetAsync(CancellationToken cancellationToken)
    {
        return await _context.Messungen.ToListAsync(cancellationToken);
    }

    public Task<Messung> UpdateAsync(Messung entity, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await _context.Messungen.FirstOrDefaultAsync(messung => messung.Id == id, cancellationToken);
        _context.Entry<Messung>(entity).State = EntityState.Deleted;
        await _context.SaveChangesAsync(cancellationToken);
    }
}