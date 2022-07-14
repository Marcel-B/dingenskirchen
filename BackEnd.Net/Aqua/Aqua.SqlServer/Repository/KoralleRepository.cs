using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using Microsoft.EntityFrameworkCore;

namespace com.marcelbenders.Aqua.SqlServer.Repository;

public class KoralleRepository : IKoralleRepository
{
    private readonly DataContext _context;

    public KoralleRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Koralle> CreateAsync(Koralle entity, CancellationToken cancellationToken)
    {
        entity.Id = Guid.NewGuid();
        _context.Korallen.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task<Koralle?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Korallen.FirstOrDefaultAsync(koralle => koralle.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Koralle>> GetByUserIdAsync(string userId, CancellationToken cancellationToken)
    {
        return await _context.Korallen.Where(koralle => koralle.UserId == userId).ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Koralle>> GetAsync(CancellationToken cancellationToken)
    {
        return await _context.Korallen.ToListAsync(cancellationToken);
    }

    public Task<Koralle> UpdateAsync(Koralle entity, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await _context.Korallen.FirstOrDefaultAsync(koralle => koralle.Id == id, cancellationToken);
        _context.Entry<Koralle>(entity).State = EntityState.Deleted;
        await _context.SaveChangesAsync(cancellationToken);
    }
}