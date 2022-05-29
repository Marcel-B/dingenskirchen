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

    private FilterDefinition<T> GetFiter<T>(string userId)
    {
        return Builders<T>.Filter.Eq("userId", userId);
    }

    public async Task<IEnumerable<IFeedItem>> GetFeedAsync(string userId, CancellationToken cancellationToken)
    {
        var result = new List<IFeedItem>();
        var database = _context.GetDatabase();


        var notizen = database.GetCollection<Notiz>(nameof(Notiz).ToLower());
        var duengungen = database.GetCollection<Duengung>(nameof(Duengung).ToLower());
        var aquariuen = database.GetCollection<Aquarium>(nameof(Aquarium).ToLower());
        var messungen = database.GetCollection<Messung>(nameof(Messung).ToLower());
        var fische = database.GetCollection<Fisch>(nameof(Fisch).ToLower());

        var notizenList = await notizen.Find(GetFiter<Notiz>(userId)).Sort("{datum: 1}").ToListAsync(cancellationToken);
        var duengungenList = await duengungen.Find(GetFiter<Duengung>(userId)).SortBy(x => x.Datum)
            .ToListAsync(cancellationToken);
        var aquarienList = await aquariuen.Find(GetFiter<Aquarium>(userId)).SortBy(x => x.Datum)
            .ToListAsync(cancellationToken);
        var messungenList = await messungen.Find(GetFiter<Messung>(userId)).SortBy(x => x.Datum)
            .ToListAsync(cancellationToken);
        var fischeList = await fische.Find(GetFiter<Fisch>(userId)).SortBy(x => x.Datum).ToListAsync(cancellationToken);

        result.AddRange(notizenList.Select(n => new FeedItem
            {AquaType = n.AquaType, Datum = n.Datum, Id = n.Id, Item = n}));
        result.AddRange(duengungenList.Select(n => new FeedItem
            {Id = n.Id, AquaType = n.AquaType, Datum = n.Datum, Item = n}));
        result.AddRange(aquarienList.Select(x => new FeedItem
            {Id = x.Id, Datum = x.Datum, AquaType = x.AquaType, Item = x}));
        result.AddRange(messungenList.Select(x => new FeedItem
            {Id = x.Id, Datum = x.Datum, AquaType = x.AquaType, Item = x}));
        result.AddRange(fischeList.Select(x => new FeedItem
            {Id = x.Id, Datum = x.Datum, AquaType = x.AquaType, Item = x}));

        return result.OrderByDescending(x => x.Datum).ToArray();
    }
}