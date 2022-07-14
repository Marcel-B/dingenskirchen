using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record DeleteDuengungCommand : IRequest
{
    public Guid Id { get; init; }
}