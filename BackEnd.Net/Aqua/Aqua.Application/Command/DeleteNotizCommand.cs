using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record DeleteNotizCommand : IRequest
{
    public string Id { get; init; }
}