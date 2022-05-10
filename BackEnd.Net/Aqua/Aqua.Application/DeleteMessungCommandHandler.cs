using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteMessungCommandHandler : IRequestHandler<DeleteMessungCommand, Unit>
{
    private readonly IMongoRepository<Messung> _repository;

    public DeleteMessungCommandHandler(
        IMongoRepository<Messung> repository)
    {
        _repository = repository;
    }

    public async Task<Unit> Handle(
        DeleteMessungCommand request,
        CancellationToken cancellationToken)
    {
        await _repository.DeleteAsync(request.Id, cancellationToken);
        return Unit.Value;
    }
}