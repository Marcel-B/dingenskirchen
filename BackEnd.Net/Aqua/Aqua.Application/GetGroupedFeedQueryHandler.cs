using com.marcelbenders.Aqua.Application.Dto;
using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetGroupedFeedQueryHandler : IRequestHandler<GetGroupedFeedQuery, Feed>
{
    private readonly IFeedRepository _repository;

    public GetGroupedFeedQueryHandler(IFeedRepository repository)
    {
        _repository = repository;
    }

    public async Task<Feed> Handle(GetGroupedFeedQuery request, CancellationToken cancellationToken)
    {
        var feed = await _repository.GetFeedAsync(cancellationToken);
        var result = feed
            .Select(item => new FeedItem
            {
                AquaType = item.AquaType, Id = item.Id, Item = item.Item,
                Datum = new DateTimeOffset(item.Datum.Year, item.Datum.Month, item.Datum.Day, 12, 11, 42,
                    item.Datum.Offset)
            })
            .GroupBy(feedItem => feedItem.Datum)
            .Select(item => new GroupedFeed(item.Key, item
                .OrderBy(x => x.AquaType)));
        return new Feed(result, result.LongCount());
    }
}