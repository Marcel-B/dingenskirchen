using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace com.marcelbenders.Aqua.Domain;

public class Duengung
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    
    [BsonElement("menge")]
    public string Menge { get; set; }
    
    [BsonElement("datum")]
    public DateTimeOffset Datum { get; set; }
    
    [BsonElement("duenger")]
    public string Duenger { get; set; }
    
    [BsonElement("aquarium")]
    public Aquarium Aquarium { get; set; }
}