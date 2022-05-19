using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Buchungen
{
    public class List
    {
        public class Query : IRequest<List<BuchungDto>> { }

        public class Handler : IRequestHandler<Query, List<BuchungDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<List<BuchungDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Buchungen.Include(t => t.Tags).ToListAsync(cancellationToken);
                return this.mapper.Map<List<BuchungDto>>(result);
            }
        }
    }
}