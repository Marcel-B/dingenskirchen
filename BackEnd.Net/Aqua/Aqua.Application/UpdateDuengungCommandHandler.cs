using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class UpdateDuengungCommandHandler : IRequestHandler<UpdateDuengungCommand, Duengung>
{
    private readonly IMongoRepository<Duengung> _repository;

    public UpdateDuengungCommandHandler(
        IMongoRepository<Duengung> repository)
    {
        _repository = repository;
    }
    
    public async Task<Duengung> Handle(
        UpdateDuengungCommand request,
        CancellationToken cancellationToken)
    {
        var duengung = new Duengung
        {
            UserId = request.UserId,
            Id = request.Id,
            Menge = request.Menge,
            Datum = request.Datum,
            Duenger = request.Duenger,
            Aquarium = request.Aquarium,
        };
        return await _repository.UpdateByIdAsync(request.Id, duengung, cancellationToken);
    }
}