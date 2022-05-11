using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record CreateNotizCommand : IRequest<Notiz>
{
    public string Text { get; init; }
    public DateTimeOffset Datum { get; init; }
    public string Tag { get; init; }
    public Aquarium Aquarium { get; init; }
}