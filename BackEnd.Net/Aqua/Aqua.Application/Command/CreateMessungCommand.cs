using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record CreateMessungCommand : IRequest<Messung>
{
    public string? UserId { get; set; }
    public Guid AquariumId { get; init; }
    public DateTimeOffset Datum { get; init; }
    public double Menge { get; init; }
    public string Wert { get; init; }
}