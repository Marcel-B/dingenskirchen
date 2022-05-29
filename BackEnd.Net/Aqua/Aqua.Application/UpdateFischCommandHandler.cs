using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class UpdateFischCommandHandler : IRequestHandler<UpdateFischCommand, Fisch>
{
    private readonly IMongoRepository<Fisch> _repository;

    public UpdateFischCommandHandler(
        IMongoRepository<Fisch> repository)
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
            Aquarium = request.Aquarium
        };
        return await _repository.UpdateByIdAsync(request.Id, fisch, cancellationToken);
    }
}