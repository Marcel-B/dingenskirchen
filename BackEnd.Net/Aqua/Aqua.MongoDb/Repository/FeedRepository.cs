using com.marcelbenders.Aqua.Domain;
using MongoDB.Driver;

namespace com.marcelbenders.Aqua.MongoDb.Repository;

public class FeedRepository : IFeedRepository
{
    private readonly IMongoContext _context;

    public FeedRepository(IMongoContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<IFeedItem>> GetFeedAsync(CancellationToken cancellationToken)
    {
        var result = new List<IFeedItem>();
        var database = _context.GetDatabase();
        var notizen = database.GetCollection<Notiz>(nameof(Notiz).ToLower());
        var duengungen = database.GetCollection<Duengung>(nameof(Duengung).ToLower());
        var aquariuen = database.GetCollection<Aquarium>(nameof(Aquarium).ToLower());
        var messungen = database.GetCollection<Messung>(nameof(Messung).ToLower());
        
        result.AddRange(await  notizen.Find(x => true).Sort("{datum: 1}").ToListAsync(cancellationToken));
        result.AddRange(await  duengungen.Find(x => true).SortBy(x => x.Datum).ToListAsync(cancellationToken));
        result.AddRange(await  aquariuen.Find(x => true).SortBy(x => x.Datum).ToListAsync(cancellationToken));
        result.AddRange(await  messungen.Find(x => true).SortBy(x => x.Datum).ToListAsync(cancellationToken));
        
        return result.OrderByDescending(x => x.Datum).ToArray();
    }

}