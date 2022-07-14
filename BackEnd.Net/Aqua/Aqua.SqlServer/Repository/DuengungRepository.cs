using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using Microsoft.EntityFrameworkCore;

namespace com.marcelbenders.Aqua.SqlServer.Repository;

public class DuengungRepository : IDuengungRepository
{
    private readonly DataContext _context;

    public DuengungRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Duengung> CreateAsync(Duengung entity, CancellationToken cancellationToken)
    {
        entity.Id = Guid.NewGuid();
        _context.Duengungen.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task<Duengung?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Duengungen.FirstOrDefaultAsync(duengung => duengung.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Duengung>> GetByUserIdAsync(string userId, CancellationToken cancellationToken)
    {
        return await _context.Duengungen.Where(duengung => duengung.UserId == userId).ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Duengung>> GetAsync(CancellationToken cancellationToken)
    {
        return await _context.Duengungen.ToListAsync(cancellationToken);
    }

    public Task<Duengung> UpdateAsync(Duengung entity, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await _context.Duengungen.FirstOrDefaultAsync(duengung => duengung.Id == id, cancellationToken);
        _context.Entry<Duengung>(entity).State = EntityState.Deleted;
        await _context.SaveChangesAsync(cancellationToken);
    }
}