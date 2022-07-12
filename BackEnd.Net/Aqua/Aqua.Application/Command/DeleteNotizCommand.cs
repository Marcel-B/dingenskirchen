using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record DeleteNotizCommand : IRequest
{
    public Guid Id { get; init; }
}