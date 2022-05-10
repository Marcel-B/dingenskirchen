using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record CreateMessungCommand : IRequest<Messung>
{
    public string Aquarium { get; init; }
    public DateTimeOffset Datum { get; init; }
    public double Menge { get; init; }
    public string Wert { get; init; }
}