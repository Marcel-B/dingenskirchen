using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateMessungenMessungHandler : IRequestHandler<CreateMessungCommand, Messung>
{
    private readonly IMongoRepository<Messung> _repository;

    public CreateMessungenMessungHandler(
        IMongoRepository<Messung> repository)
    {
        _repository = repository;
    }

    public async Task<Messung> Handle(CreateMessungCommand request, CancellationToken cancellationToken)
    {
        var messung = new Messung
        {
            Aquarium = request.Aquarium,
            Datum = request.Datum,
            Menge = request.Menge,
            Wert = request.Wert
        };
        return await _repository.CreateAsync(messung, cancellationToken);
    }
}