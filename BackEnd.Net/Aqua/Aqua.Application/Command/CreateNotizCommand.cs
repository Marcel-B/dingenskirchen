using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record CreateNotizCommand : IRequest<Notiz>
{
    public string? UserId { get; set; }
    public string Text { get; init; }
    public DateTimeOffset Datum { get; init; }
    public string Tag { get; init; }
    public Guid AquariumId { get; init; }
}