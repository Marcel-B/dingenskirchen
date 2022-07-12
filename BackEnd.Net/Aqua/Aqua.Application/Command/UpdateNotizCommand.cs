using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateNotizCommand : CreateNotizCommand, IRequest<Notiz> 
{
    public Guid Id { get; init; }
}