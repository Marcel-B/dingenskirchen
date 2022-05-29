using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateMessungCommand : CreateMessungCommand, IRequest<Messung>
{
    public string Id { get; init; }
}