using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class DeleteDuengungCommandHandler : IRequestHandler<DeleteDuengungCommand>
{
    private readonly IDuengungRepository _repository;

    public DeleteDuengungCommandHandler(
        IDuengungRepository repository)
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