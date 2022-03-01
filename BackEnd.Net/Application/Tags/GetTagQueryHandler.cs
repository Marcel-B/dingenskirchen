using Application.Tags.Queries;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Tags
{
    public class GetTagQueryHandler : IRequestHandler<GetTagQuery, Tag>
    {
        private readonly DataContext context;

        public GetTagQueryHandler(DataContext context)
        {
            this.context = context;
        }

        public async Task<Tag> Handle(GetTagQuery request, CancellationToken cancellationToken)
        {
            return await context.Tags.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        }
    }
}
