using System.ComponentModel.DataAnnotations.Schema;

namespace com.marcelbenders.Aqua.Domain.Sql;

public class Messung : IEntity
{
    public Guid Id { get; set; }
    public DateTimeOffset Datum { get; set; }
    public double Menge { get; set; }
    public string Wert { get; set; }

    [ForeignKey(("UserId"))]
    public virtual AppUser AppUser { get; set; }
    public string UserId { get; set; }

    public Guid AquariumId { get; set; }
    [ForeignKey(("AquariumId"))]
    public virtual Aquarium Aquarium { get; set; }
}