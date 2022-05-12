namespace com.marcelbenders.Aqua.Domain;

public interface IFeedItem
{
    public string Id { get; set; }
    public DateTimeOffset Datum { get; set; }
    public string AquaType { get; set; }
}