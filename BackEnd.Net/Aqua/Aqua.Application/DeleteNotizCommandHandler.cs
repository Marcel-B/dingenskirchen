using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteNotizCommandHandler : IRequestHandler<DeleteNotizCommand>
{
    private readonly INotizRepository _repository;

    public DeleteNotizCommandHandler(
        INotizRepository repository)
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