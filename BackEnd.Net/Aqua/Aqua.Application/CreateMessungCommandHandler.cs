using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateMessungCommandHandler : IRequestHandler<CreateMessungCommand, Messung>
{
    private readonly IMongoRepository<Messung> _repository;

    public CreateMessungCommandHandler(
        IMongoRepository<Messung> repository)
    {
        _repository = repository;
    }

    public async Task<Messung> Handle(CreateMessungCommand request, CancellationToken cancellationToken)
    {
        var messung = new Messung
        {
            UserId = request.UserId,
            Aquarium = request.Aquarium,
            Datum = request.Datum,
            Menge = request.Menge,
            Wert = request.Wert
        };
        return await _repository.CreateAsync(messung, cancellationToken);
    }
}