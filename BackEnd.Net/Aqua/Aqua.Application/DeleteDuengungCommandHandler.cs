using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteDuengungCommandHandler : IRequestHandler<DeleteDuengungCommand>
{
    private readonly IMongoRepository<Duengung> _repository;

    public DeleteDuengungCommandHandler(
        IMongoRepository<Duengung> repository)
    {
        _repository = repository;
    }

    public async Task<Unit> Handle(
        DeleteDuengungCommand request,
        CancellationToken cancellationToken)
    {
        await _repository.DeleteAsync(request.Id, cancellationToken);
        return Unit.Value;
    }
}