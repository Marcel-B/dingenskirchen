namespace com.marcelbenders.Aqua.Domain.Sql;

public interface IFeedItem
{
    public string Id { get; set; }
    public DateTimeOffset Datum { get; set; }
    public string AquaType { get; set; }
    public object Item { get; set; }
}