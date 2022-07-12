using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteAquariumCommandHandler : IRequestHandler<DeleteAquariumCommand>
{
    private readonly IAquariumRepository _repository;

    public DeleteAquariumCommandHandler(
        IAquariumRepository repository)
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