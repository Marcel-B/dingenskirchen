using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateDuengungCommand : CreateDuengungCommand, IRequest<Duengung>
{
    public string Id { get; init; }
}