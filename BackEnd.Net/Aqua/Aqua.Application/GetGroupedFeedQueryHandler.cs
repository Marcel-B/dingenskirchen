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
    private readonly IAquariumRepository _aquariumRepository;

    public GetGroupedFeedQueryHandler(IFeedRepository repository, IAquariumRepository aquariumRepository)
    {
        _repository = repository;
        _aquariumRepository = aquariumRepository;
    }

    public async Task<Feed> Handle(GetGroupedFeedQuery request, CancellationToken cancellationToken)
    {
        var skip = (request.Page - 1) * request.Days;
        var take = request.Days;
        var aquarien = await _aquariumRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        var aquarienFeedItems = aquarien.Select(aquarium => new FeedItem
        {
            AquaType = "aquarium",
            Datum = aquarium.Datum,
            Id = aquarium.Id.ToString(),
            Item = aquarium
        });
        var feed = aquarienFeedItems;// await _repository.GetFeedAsync(request.UserId, cancellationToken);
        var values = feed
            .Select(item => new FeedItem
            {
                AquaType = item.AquaType,
                Id = item.Id,
                Item = item.Item,
                Datum = new DateTimeOffset(item.Datum.Year, item.Datum.Month, item.Datum.Day, 12, 11, 42,
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