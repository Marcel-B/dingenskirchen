using System.ComponentModel.DataAnnotations.Schema;

namespace com.marcelbenders.Aqua.Domain.Sql;

public class Notiz : IEntity
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTimeOffset Datum { get; set; }
    public string Tag { get; set; }
    
    public Guid AquariumId { get; set; }
    [ForeignKey("AquariumId")] 
    public virtual Aquarium Aquarium { get; set; }
    
    public string UserId { get; set; }
    [ForeignKey("UserId")] 
    public virtual AppUser AppUser { get; set; }
    
}
