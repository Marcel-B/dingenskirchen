using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record DeleteAquariumCommand : IRequest
{
    public string Id { get; init; }
}