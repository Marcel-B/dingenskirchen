using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateFischCommand : CreateFischCommand, IRequest<Fisch>
{
    public string Id { get; init; }
}