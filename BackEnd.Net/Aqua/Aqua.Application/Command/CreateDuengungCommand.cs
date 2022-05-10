using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record CreateDuengungCommand : IRequest<Duengung>
{
    public double Menge { get; init; }
    public DateTimeOffset Datum { get; init; }
    public string Duenger { get; init; }
    public Aquarium Aquarium { get; init; }
}