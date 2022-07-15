using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record CreateDuengungCommand : IRequest<Duengung>
{
    public double Menge { get; init; }
    public string? UserId { get; set; }
    public DateTimeOffset Datum { get; init; }
    public string Duenger { get; init; }
    public Guid AquariumId { get; init; }
}