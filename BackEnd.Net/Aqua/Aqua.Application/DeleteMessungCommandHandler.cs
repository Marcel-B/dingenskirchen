using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteMessungCommandHandler : IRequestHandler<DeleteMessungCommand, Unit>
{
    private readonly IMessungRepository _repository;

    public DeleteMessungCommandHandler(
        IMessungRepository repository)
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