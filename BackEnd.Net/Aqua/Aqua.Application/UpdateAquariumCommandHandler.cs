using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class UpdateAquariumCommandHandler : IRequestHandler<UpdateAquariumCommand, Aquarium>
{
    private readonly IMongoRepository<Aquarium> _repository;

    public UpdateAquariumCommandHandler(
        IMongoRepository<Aquarium> repository)
    {
        _repository = repository;
    }

    public async Task<Aquarium> Handle(
        UpdateAquariumCommand request,
        CancellationToken cancellationToken)
    {
        
        var aquarium = new Aquarium
        {
            UserId = request.UserId,
            Id = request.Id,
            Name = request.Name,
            Liter = request.Liter,
            Datum =  DateTimeOffset.Now,
        };
        await _repository.UpdateByIdAsync(request.Id, aquarium, cancellationToken);
        return aquarium;
    }
}