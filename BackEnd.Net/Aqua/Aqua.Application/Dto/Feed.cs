namespace com.marcelbenders.Aqua.Application.Dto;
public record Feed(IEnumerable<GroupedFeed> GroupedFeeds, long Total);