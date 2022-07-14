using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record DeleteFischCommand : IRequest
{
    public Guid Id { get; init; }
}