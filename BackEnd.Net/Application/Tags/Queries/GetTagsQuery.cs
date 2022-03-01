using Domain;
using MediatR;
using System.Collections.Generic;

namespace Application.Tags.Queries
{
    public record GetTagsQuery : IRequest<List<Tag>>
    {
    }
}
