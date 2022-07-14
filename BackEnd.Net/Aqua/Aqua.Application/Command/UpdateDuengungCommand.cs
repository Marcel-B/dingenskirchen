using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateDuengungCommand : CreateDuengungCommand, IRequest<Duengung>
{
    public Guid Id { get; init; }
}