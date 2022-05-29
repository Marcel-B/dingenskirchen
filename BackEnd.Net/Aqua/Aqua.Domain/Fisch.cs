using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace com.marcelbenders.Aqua.Domain;

public class Fisch
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")] public string Name { get; set; }
    
    [BsonElement("userId")] public string UserId { get; set; }

    [BsonElement("wissenschaftlich")] public string Wissenschaftlich { get; set; }

    [BsonElement("herkunft")] public string Herkunft { get; set; }

    [BsonElement("ph")] public Bereich Ph { get; set; }

    [BsonElement("gh")] public Bereich Gh { get; set; }

    [BsonElement("kh")] public Bereich Kh { get; set; }

    [BsonElement("temperatur")] public Bereich Temperatur { get; set; }

    [BsonElement("schwimmzone")] public string Schwimmzone { get; set; }

    [BsonElement("datum")] public DateTimeOffset Datum { get; set; }

    [BsonElement("anzahl")] public int Anzahl { get; set; }

    [BsonElement("geschlecht")] public string Geschlecht { get; set; }

    [BsonElement("aquarium")] public Aquarium Aquarium { get; set; }

    [BsonIgnore] public string AquaType { get; private set; } = nameof(Fisch).ToLower();
}