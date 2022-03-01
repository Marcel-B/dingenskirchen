using Application.Tags.Queries;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Tags
{

    public class GetTagsQueryHandler : IRequestHandler<GetTagsQuery, List<Tag>>
    {
        private readonly DataContext context;

        public GetTagsQueryHandler(DataContext context)
        {
            this.context = context;
        }

        public async Task<List<Tag>> Handle(GetTagsQuery request, CancellationToken cancellationToken)
        {
            return await context.Tags.ToListAsync(cancellationToken);
        }
    }
}
