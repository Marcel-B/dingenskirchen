using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record DeleteMessungCommand : IRequest
{
    public string Id { get; init; }
}