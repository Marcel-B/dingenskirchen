namespace com.marcelbenders.Aqua.Domain.Sql;

public interface IEntity
{
    public Guid Id { get; set; }
    public string UserId { get; set; }    
}