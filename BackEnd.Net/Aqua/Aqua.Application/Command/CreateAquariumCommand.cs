using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record CreateAquariumCommand : IRequest<Aquarium>
{
    public string Name { get; init; }
    public int Liter { get; init; }
    public string? UserId { get; set; }
    public DateTimeOffset Datum { get; init; }
}