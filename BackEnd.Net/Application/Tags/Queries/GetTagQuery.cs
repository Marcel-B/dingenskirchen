using Domain;
using MediatR;
using System;

namespace Application.Tags.Queries
{
    public record GetTagQuery : IRequest<Tag>
    {
        public Guid Id { get; init; }
    }
}
