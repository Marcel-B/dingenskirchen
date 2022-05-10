using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteNotizCommandHandler : IRequestHandler<DeleteNotizCommand>
{
    private readonly IMongoRepository<Notiz> _repository;

    public DeleteNotizCommandHandler(
        IMongoRepository<Notiz> repository)
    {
        _repository = repository;
    }

    public async Task<Unit> Handle(
        DeleteNotizCommand request,
        CancellationToken cancellationToken)
    {
        await _repository.DeleteAsync(request.Id, cancellationToken);
        return Unit.Value;
    }
}