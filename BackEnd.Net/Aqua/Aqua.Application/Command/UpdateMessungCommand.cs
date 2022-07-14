namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateMessungCommand : CreateMessungCommand
{
    public Guid Id { get; init; }
}