using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace com.marcelbenders.Aqua.Domain;

public class Aquarium
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("userId")]public string UserId { get; set; }

    [BsonElement("name")] public string Name { get; set; }

    [BsonElement("liter")] public int Liter { get; set; }

    [BsonElement("datum")] public DateTimeOffset Datum { get; set; }
    
    [BsonIgnore]
    public string AquaType { get; private set; } = nameof(Aquarium).ToLower();
}