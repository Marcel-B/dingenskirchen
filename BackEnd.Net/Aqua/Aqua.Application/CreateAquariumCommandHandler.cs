using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateAquariumCommandHandler : IRequestHandler<CreateAquariumCommand, Aquarium>
{
    private readonly IMongoRepository<Aquarium> _repository;

    public CreateAquariumCommandHandler(
        IMongoRepository<Aquarium> repository)
    {
        _repository = repository;
    }

    public async Task<Aquarium> Handle(
        CreateAquariumCommand request,
        CancellationToken cancellationToken)
    {
        var aquarium = new Aquarium
        {
            Name = request.Name,
            Liter = request.Liter,
            Datum =  DateTimeOffset.Now,
        };
        await _repository.CreateAsync(aquarium, cancellationToken);
        return aquarium;
    }
}