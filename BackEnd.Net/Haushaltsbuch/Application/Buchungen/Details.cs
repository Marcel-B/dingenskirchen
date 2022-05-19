using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Buchungen
{
    public class Details
    {
        public class Query : IRequest<Buchung>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Buchung>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Buchung> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Buchungen.FindAsync(request.Id);
            }
        }
    }
}