using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record DeleteAquariumCommand : IRequest
{
    public Guid Id { get; init; }
}