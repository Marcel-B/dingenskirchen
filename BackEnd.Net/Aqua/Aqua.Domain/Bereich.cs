using MongoDB.Bson.Serialization.Attributes;

namespace com.marcelbenders.Aqua.Domain;

public class Bereich
{
    [BsonElement("von")] public double Von { get; set; }
    [BsonElement("bis")] public double Bis { get; set; }
    [BsonElement("einheit")] public string Einheit { get; set; }
}