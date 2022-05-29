using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class UpdateMessungCommandHandler : IRequestHandler<UpdateMessungCommand, Messung>
{
    private readonly IMongoRepository<Messung> _repository;

    public UpdateMessungCommandHandler(
        IMongoRepository<Messung> repository)
    {
        _repository = repository;
    }

    public async Task<Messung> Handle(UpdateMessungCommand request, CancellationToken cancellationToken)
    {
        var messung = new Messung
        {
            UserId = request.UserId,
            Id = request.Id,
            Aquarium = request.Aquarium,
            Datum = request.Datum,
            Menge = request.Menge,
            Wert = request.Wert
        };
        return await _repository.UpdateByIdAsync(request.Id, messung, cancellationToken);
    }
}