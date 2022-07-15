using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using Microsoft.EntityFrameworkCore;

namespace com.marcelbenders.Aqua.SqlServer.Repository;

public class NotizRepository : INotizRepository
{
    private readonly DataContext _context;

    public NotizRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Notiz> CreateAsync(Notiz entity, CancellationToken cancellationToken)
    {
        var id = Guid.NewGuid();
        entity.Id = id;
        _context.Notizen.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return await _context.Notizen.Include(p => p.Aquarium).FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
    }

    public async Task<Notiz?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Notizen.FirstOrDefaultAsync(notiz => notiz.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Notiz>> GetByUserIdAsync(string userId, CancellationToken cancellationToken)
    {
        return await _context.Notizen.Where(notiz => notiz.UserId == userId).ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Notiz>> GetAsync(CancellationToken cancellationToken)
    {
        return await _context.Notizen.ToListAsync(cancellationToken);
    }

    public Task<Notiz> UpdateAsync(Notiz entity, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await _context.Notizen.FirstOrDefaultAsync(notiz => notiz.Id == id, cancellationToken);
        _context.Entry<Notiz>(entity).State = EntityState.Deleted;
        await _context.SaveChangesAsync(cancellationToken);
    }
}