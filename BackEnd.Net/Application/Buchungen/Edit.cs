using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Buchungen
{
    public class Edit
    {
        public class Query : IRequest<BuchungDto>
        {
            public Buchung Buchung { get; set; }
        }

        public class Handler : IRequestHandler<Query, BuchungDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<BuchungDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var buchung = await _context.Buchungen.FindAsync(request.Buchung.Id);
                _mapper.Map(request.Buchung, buchung);

                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<BuchungDto>(buchung);
            }
        }
    }
}