using com.marcelbenders.Aqua.Application.Dto;
using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetGroupedFeedQueryHandler : IRequestHandler<GetGroupedFeedQuery, Feed>
{
    private readonly IFeedRepository _repository;
    private readonly IDuengungRepository _duengungRepository;
    private readonly IMessungRepository _messungRepository;
    private readonly IFischRepository _fischRepository;
    private readonly INotizRepository _notizRepository;
    private readonly IAquariumRepository _aquariumRepository;

    public GetGroupedFeedQueryHandler(
        IFeedRepository repository,
        IDuengungRepository duengungRepository,
        IMessungRepository messungRepository,
        IFischRepository fischRepository,
        INotizRepository notizRepository,
        IAquariumRepository aquariumRepository)
    {
        _repository = repository;
        _duengungRepository = duengungRepository;
        _messungRepository = messungRepository;
        _fischRepository = fischRepository;
        _notizRepository = notizRepository;
        _aquariumRepository = aquariumRepository;
    }

    public async Task<Feed> Handle(GetGroupedFeedQuery request, CancellationToken cancellationToken)
    {
        var skip = (request.Page - 1) * request.Days;
        var take = request.Days;

        var aquarien = await _aquariumRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        var messungen = await _messungRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        var notizen = await _notizRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        var duengungen = await _duengungRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        var fische = await _fischRepository.GetByUserIdAsync(request.UserId, cancellationToken);

        var aquarienFeedItems = aquarien.Select(aquarium => new FeedItem
        {
            AquaType = "aquarium",
            Datum = aquarium.Datum,
            Id = aquarium.Id.ToString(),
            Item = aquarium
        });
        var messungenFeedItems = messungen.Select(messung => new FeedItem
        {
            AquaType = "messung",
            Datum = messung.Datum,
            Id = messung.Id.ToString(),
            Item = messung
        });
        var notizenFeedItems = notizen.Select(notiz => new FeedItem
        {
            AquaType = "notiz",
            Datum = notiz.Datum,
            Id = notiz.Id.ToString(),
            Item = notiz
        });

        var duengungenFeedItems = duengungen.Select(duengung => new FeedItem
        {
            AquaType = "duengung",
            Datum = duengung.Datum,
            Id = duengung.Id.ToString(),
            Item = duengung
        });

        var fischeFeedItems = fische.Select(fisch => new FeedItem
        {
            AquaType = "fisch",
            Datum = fisch.Datum,
            Id = fisch.Id.ToString(),
            Item = fisch
        });

        var feed = aquarienFeedItems
            .Concat(fischeFeedItems)
            .Concat(duengungenFeedItems)
            .Concat(notizenFeedItems)
            .Concat(messungenFeedItems)
            .OrderByDescending(p => p.Datum);

        var values = feed
            .Select(item => new FeedItem
            {
                AquaType = item.AquaType,
                Id = item.Id,
                Item = item.Item,
                Datum = new DateTimeOffset(
                    item.Datum.Year,
                    item.Datum.Month,
                    item.Datum.Day,
                    0,
                    0,
                    42,
                    item.Datum.Offset)
            })
            .GroupBy(feedItem => feedItem.Datum)
            .Select(item => new GroupedFeed(item.Key, item
                .OrderBy(x => x.AquaType)));

        var result = values
            .Skip(skip)
            .Take(take);

        return new Feed(result, values.LongCount());
    }
}