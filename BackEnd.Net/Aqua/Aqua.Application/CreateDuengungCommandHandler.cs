using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateDuengungCommandHandler : IRequestHandler<CreateDuengungCommand, Duengung>
{
    private readonly IMongoRepository<Duengung> _repository;

    public CreateDuengungCommandHandler(
        IMongoRepository<Duengung> repository)
    {
        _repository = repository;
    }
    
    public async Task<Duengung> Handle(
        CreateDuengungCommand request,
        CancellationToken cancellationToken)
    {
        var duengung = new Duengung
        {
            Menge = request.Menge,
            Datum = request.Datum,
            Duenger = request.Duenger,
            Aquarium = request.Aquarium,
        };
        await _repository.CreateAsync(duengung, cancellationToken);
        return duengung;
    }
}