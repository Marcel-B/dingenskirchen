using System.ComponentModel.DataAnnotations.Schema;

namespace com.marcelbenders.Aqua.Domain.Sql;

public class Fisch : IEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Wissenschaftlich { get; set; }
    public string Herkunft { get; set; }
    public Bereich Ph { get; set; }
    public Bereich Gh { get; set; }
    public Bereich Kh { get; set; }
    public Bereich Temperatur { get; set; }
    public string Schwimmzone { get; set; }

    public DateTimeOffset Datum { get; set; }
    public int Anzahl { get; set; }
    public string Geschlecht { get; set; }

    [ForeignKey(("UserId"))]
    public virtual AppUser AppUser { get; set; }
    public string UserId { get; set; }

    public Guid AquariumId { get; set; }
    [ForeignKey("AquariumId")]
    public virtual Aquarium Aquarium { get; set; }
}