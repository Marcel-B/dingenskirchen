namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateFischCommand : CreateFischCommand
{
    public Guid Id { get; init; }
}