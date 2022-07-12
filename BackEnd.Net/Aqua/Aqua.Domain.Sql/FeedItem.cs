namespace com.marcelbenders.Aqua.Domain.Sql;

public class FeedItem : IFeedItem
{
    public string Id { get; set; }
    public DateTimeOffset Datum { get; set; }
    public string AquaType { get; set; }
    public object Item { get; set; }
}