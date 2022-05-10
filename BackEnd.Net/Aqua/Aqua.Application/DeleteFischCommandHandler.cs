using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteFischCommandHandler : IRequestHandler<DeleteFischCommand>
{
    private readonly IMongoRepository<Fisch> _repository;

    public DeleteFischCommandHandler(
        IMongoRepository<Fisch> repository)
    {
        _repository = repository;
    }

    public async Task<Unit> Handle(
        DeleteFischCommand request,
        CancellationToken cancellationToken)
    {
        await _repository.DeleteAsync(request.Id, cancellationToken);
        return Unit.Value;
    }
}