using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class UpdateFischCommandHandler : IRequestHandler<UpdateFischCommand, Fisch>
{
    private readonly IFischRepository _repository;

    public UpdateFischCommandHandler(
        IFischRepository repository)
    {
        _repository = repository;
    }

    public async Task<Fisch> Handle(
        UpdateFischCommand request,
        CancellationToken cancellationToken)
    {
        var fisch = new Fisch
        {
            UserId = request.UserId,
            Id = request.Id,
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
        return await _repository.UpdateAsync(fisch, cancellationToken);
    }
}