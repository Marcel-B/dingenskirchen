using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record CreateFischCommand : IRequest<Fisch>
{
    public string? UserId { get; set; }
    public string Name { get; init; }
    public string Wissenschaftlich { get; init; }
    public string Herkunft { get; init; }
    public Bereich Ph { get; init; }
    public Bereich Gh { get; init; }
    public Bereich Kh { get; init; }
    public Bereich Temperatur { get; init; }
    public string Schwimmzone { get; init; }
    public DateTimeOffset Datum { get; init; }
    public int Anzahl { get; init; }
    public string Geschlecht { get; init; }
    public Guid AquariumId { get; init; }
}