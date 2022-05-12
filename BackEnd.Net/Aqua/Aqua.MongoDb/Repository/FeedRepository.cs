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
        
        var notizenList = await notizen.Find(x => true).Sort("{datum: 1}").ToListAsync(cancellationToken);
        var duengungenList = await duengungen.Find(x => true).SortBy(x => x.Datum).ToListAsync(cancellationToken);
        var aquarienList = await aquariuen.Find(x => true).SortBy(x => x.Datum).ToListAsync(cancellationToken);
        var messungenList = await messungen.Find(x => true).SortBy(x => x.Datum).ToListAsync(cancellationToken);
        
        result.AddRange(notizenList.Select(n => new FeedItem
            {AquaType = n.AquaType, Datum = n.Datum, Id = n.Id, Item = n}));
        result.AddRange(duengungenList.Select(n => new FeedItem
            {Id = n.Id, AquaType = n.AquaType, Datum = n.Datum, Item = n}));
        result.AddRange(aquarienList.Select(x => new FeedItem
            {Id = x.Id, Datum = x.Datum, AquaType = x.AquaType, Item = x}));
        result.AddRange(messungenList.Select(x => new FeedItem
            {Id = x.Id, Datum = x.Datum, AquaType = x.AquaType, Item = x}));

        return result.OrderByDescending(x => x.Datum).ToArray();
    }
}