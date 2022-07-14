using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteFischCommandHandler : IRequestHandler<DeleteFischCommand>
{
    private readonly IFischRepository _repository;

    public DeleteFischCommandHandler(
        IFischRepository repository)
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