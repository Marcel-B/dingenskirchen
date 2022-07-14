using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using Microsoft.EntityFrameworkCore;

namespace com.marcelbenders.Aqua.SqlServer.Repository;

public class PflanzeRepository : IPflanzeRepository
{
    private readonly DataContext _context;

    public PflanzeRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Pflanze> CreateAsync(Pflanze entity, CancellationToken cancellationToken)
    {
        entity.Id = Guid.NewGuid();
        _context.Pflanzen.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task<Pflanze?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Pflanzen.FirstOrDefaultAsync(pflanze => pflanze.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Pflanze>> GetByUserIdAsync(string userId, CancellationToken cancellationToken)
    {
        return await _context.Pflanzen.Where(pflanze => pflanze.UserId == userId).ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Pflanze>> GetAsync(CancellationToken cancellationToken)
    {
        return await _context.Pflanzen.ToListAsync(cancellationToken);
    }

    public Task<Pflanze> UpdateAsync(Pflanze entity, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await _context.Pflanzen.FirstOrDefaultAsync(pflanze => pflanze.Id == id, cancellationToken);
        _context.Entry<Pflanze>(entity).State = EntityState.Deleted;
        await _context.SaveChangesAsync(cancellationToken);
    }
}