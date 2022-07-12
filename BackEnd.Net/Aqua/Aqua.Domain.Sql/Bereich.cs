using System.Text.Json;

namespace com.marcelbenders.Aqua.Domain.Sql;

public class Bereich
{
    public double Von { get; set; }
    public double Bis { get; set; }
    public string Einheit { get; set; }

    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }

    public static Bereich Instance(string json)
    {
        return JsonSerializer.Deserialize<Bereich>(json) ?? throw new JsonException("Error while deserializing obj");
    }
}