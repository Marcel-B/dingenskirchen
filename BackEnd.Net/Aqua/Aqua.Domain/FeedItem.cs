namespace com.marcelbenders.Aqua.Domain;

public class FeedItem : IFeedItem
{
    public string Id { get; set; }
    public DateTimeOffset Datum { get; set; }
    public string AquaType { get; set; }
    public object Item { get; set; }
}