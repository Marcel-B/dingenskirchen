using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace com.marcelbenders.Aqua.Domain;

public class Messung
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    
    [BsonElement("menge")]
    public double Menge { get; set; }
    
    [BsonElement("datum")]
    public DateTimeOffset Datum { get; set; }
    
    [BsonElement("wert")]
    public string Wert { get; set; }
    
    [BsonElement("aquarium")]
    public Aquarium Aquarium { get; set; }
}