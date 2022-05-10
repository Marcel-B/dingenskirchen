using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace com.marcelbenders.Aqua.Domain;

public class Aquarium
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }
    
    [BsonElement("liter")]
    public int Liter { get; set; }
}