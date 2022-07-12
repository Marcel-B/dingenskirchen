using System.ComponentModel.DataAnnotations.Schema;

namespace com.marcelbenders.Aqua.Domain.Sql;

public class Aquarium : IEntity
{
    public Guid Id { get; set; }

    public string UserId { get; set; }

    [ForeignKey("UserId")] 
    public virtual AppUser AppUser { get; set; }

    public string Name { get; set; }

    public int Liter { get; set; }

    public DateTimeOffset Datum { get; set; }
}