using System.ComponentModel.DataAnnotations.Schema;

namespace com.marcelbenders.Aqua.Domain.Sql;

public class Pflanze : IEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Wissenschaftlich { get; set; }
    public string Herkunft { get; set; }
    public Bereich Ph { get; set; }
    public Bereich Gh { get; set; }
    public Bereich Kh { get; set; }
    public Bereich Temperatur { get; set; }
    public string Bereich { get; set; }
    public string Wachstum { get; set; }
    public bool Emers { get; set; }
    public string Schwierigkeitsgrad { get; set; }
    public DateTimeOffset Datum { get; set; }

    [ForeignKey(("UserId"))]
    public virtual AppUser AppUser { get; set; }
    public string UserId { get; set; }

    public Guid AquariumId { get; set; }
    [ForeignKey("AquariumId")]
    public virtual Aquarium Aquarium { get; set; }
}