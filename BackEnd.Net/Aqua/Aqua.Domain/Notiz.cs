using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace com.marcelbenders.Aqua.Domain;

public class Notiz
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("userId")] public string UserId { get; set; }

    [BsonElement("text")] public string Text { get; set; }

    [BsonElement("datum")] public DateTimeOffset Datum { get; set; }

    [BsonElement("tag")] public string Tag { get; set; }

    [BsonElement("aquarium")] public Aquarium Aquarium { get; set; }

    [BsonIgnore] public string AquaType { get; private set; } = nameof(Notiz).ToLower();
}
