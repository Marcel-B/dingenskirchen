using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Buchungen
{
    public class List
    {
        public class Query : IRequest<List<Buchung>> { }

        public class Handler : IRequestHandler<Query, List<Buchung>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Buchung>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Buchungen.ToListAsync(cancellationToken);
            }
        }
    }
}