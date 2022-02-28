using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Buchungen;

public class Create
{
    public class Command : IRequest
    {
        public BuchungDto Buchung { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var buchung = new Buchung
            {
                Id = request.Buchung.Id,
                Name = request.Buchung.Name,
                Beschreibung = request.Buchung.Beschreibung,
                Zeitpunkt = request.Buchung.Zeitpunkt,
                Created = System.DateTime.Now,
                Kategorie = request.Buchung.Kategorie,
                Intervall = request.Buchung.Intervall,

                Betrag = request.Buchung.Intervall switch
                {
                    Intervall.Einmalig => request.Buchung.Betrag,
                    Intervall.Monat => request.Buchung.Betrag,
                    Intervall.Quartal => request.Buchung.Betrag / 3,
                    Intervall.Halbjahr => request.Buchung.Betrag / 6,
                    Intervall.Jahr => request.Buchung.Betrag / 12
                }
            };

            _context.Buchungen.Add(_mapper.Map<Buchung>(buchung));
            await _context.SaveChangesAsync();
            return Unit.Value;
        }
    }
}