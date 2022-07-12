using System.ComponentModel.DataAnnotations.Schema;

namespace com.marcelbenders.Aqua.Domain.Sql;

public class Duengung : IEntity
{
    public Guid Id { get; set; }

    public string UserId { get; set; }

    [ForeignKey("UserId")] 
    public virtual AppUser AppUser { get; set; }

    public double Menge { get; set; }

    public DateTimeOffset Datum { get; set; }

    public string Duenger { get; set; }

    public Guid AquariumId { get; set; }
    [ForeignKey("AquariumId")]
    public virtual Aquarium Aquarium { get; set; }
}