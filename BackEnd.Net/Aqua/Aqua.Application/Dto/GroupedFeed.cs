using com.marcelbenders.Aqua.Domain;

namespace com.marcelbenders.Aqua.Application.Dto;

public record GroupedFeed(DateTimeOffset Datum, IEnumerable<IFeedItem> FeedItems);