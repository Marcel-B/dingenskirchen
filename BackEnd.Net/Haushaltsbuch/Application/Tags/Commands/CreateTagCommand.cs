using Domain;
using MediatR;

namespace Application.Tags.Commands
{
    public record CreateTagCommand : IRequest
    {
        public Tag Tag { get; init; }
    }
}
