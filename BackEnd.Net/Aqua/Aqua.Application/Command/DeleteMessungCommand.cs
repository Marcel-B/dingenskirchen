using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record DeleteMessungCommand : IRequest
{
    public Guid Id { get; init; }
}