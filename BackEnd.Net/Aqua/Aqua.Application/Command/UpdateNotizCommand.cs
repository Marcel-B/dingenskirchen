using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateNotizCommand : CreateNotizCommand, IRequest<Notiz> 
{
    public string Id { get; init; }
}