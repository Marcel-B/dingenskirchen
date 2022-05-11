using com.marcelbenders.Aqua.Domain;
using MongoDB.Driver;

namespace com.marcelbenders.Aqua.MongoDb.Repository;

public class TagRepository : ITagRepository
{
    private readonly IMongoContext _context;

    public TagRepository(IMongoContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<string>> GetTagsAsync(CancellationToken cancellationToken = default)
    {
        var database = _context.GetDatabase();
        var entities = database.GetCollection<Notiz>(nameof(Notiz).ToLower());
        var filtered = await entities.FindAsync(entities => true, cancellationToken: cancellationToken);
        var liste = await filtered.ToListAsync(cancellationToken);
        return liste.DistinctBy(notiz => notiz.Tag).Select(notiz => notiz.Tag);
    }
}