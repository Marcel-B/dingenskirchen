using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteAquariumCommandHandler : IRequestHandler<DeleteAquariumCommand>
{
    private readonly IMongoRepository<Aquarium> _repository;

    public DeleteAquariumCommandHandler(
        IMongoRepository<Aquarium> repository)
    {
        _repository = repository;
    }

    public async Task<Unit> Handle(
        DeleteAquariumCommand request,
        CancellationToken cancellationToken)
    {
        await _repository.DeleteAsync(request.Id, cancellationToken);
        return Unit.Value;
    }
}