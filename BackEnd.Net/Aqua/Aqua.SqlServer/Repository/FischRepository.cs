using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using Microsoft.EntityFrameworkCore;

namespace com.marcelbenders.Aqua.SqlServer.Repository;

public class FischRepository : IFischRepository
{
    private readonly DataContext _context;

    public FischRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Fisch> CreateAsync(Fisch entity, CancellationToken cancellationToken)
    {
        entity.Id = Guid.NewGuid();
        _context.Fische.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task<Fisch?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Fische.FirstOrDefaultAsync(fisch => fisch.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Fisch>> GetByUserIdAsync(string userId, CancellationToken cancellationToken)
    {
        return await _context.Fische.Where(fisch => fisch.UserId == userId).ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Fisch>> GetAsync(CancellationToken cancellationToken)
    {
        return await _context.Fische.ToListAsync(cancellationToken);
    }

    public Task<Fisch> UpdateAsync(Fisch entity, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await _context.Fische.FirstOrDefaultAsync(fisch => fisch.Id == id, cancellationToken);
        _context.Entry<Fisch>(entity).State = EntityState.Deleted;
        await _context.SaveChangesAsync(cancellationToken);
    }
}