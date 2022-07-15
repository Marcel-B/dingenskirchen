using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateFischCommandHandler : IRequestHandler<CreateFischCommand, Fisch>
{
    private readonly IFischRepository _repository;

    public CreateFischCommandHandler(
        IFischRepository repository)
    {
        _repository = repository;
    }

    public async Task<Fisch> Handle(
        CreateFischCommand request,
        CancellationToken cancellationToken)
    {
        var fisch = new Fisch
        {
            UserId = request.UserId,
            Name = request.Name,
            Wissenschaftlich = request.Wissenschaftlich,
            Herkunft = request.Herkunft,
            Ph = request.Ph,
            Gh = request.Gh,
            Kh = request.Kh,
            Temperatur = request.Temperatur,
            Schwimmzone = request.Schwimmzone,
            Datum = request.Datum,
            Anzahl = request.Anzahl,
            Geschlecht = request.Geschlecht,
            AquariumId = request.AquariumId
        };
        await _repository.CreateAsync(fisch, cancellationToken);
        return fisch;
    }
}