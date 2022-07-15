using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateNotizCommandHandler : IRequestHandler<CreateNotizCommand, Notiz>
{
    private readonly INotizRepository _repository;

    public CreateNotizCommandHandler(
        INotizRepository repository)
    {
        _repository = repository;
    }

    public async Task<Notiz> Handle(
        CreateNotizCommand request,
        CancellationToken cancellationToken)
    {
        var notiz = new Notiz
        {
            UserId = request.UserId,
            Text = request.Text,
            AquariumId = request.AquariumId,
            Tag = request.Tag,
            Datum = request.Datum,
        };
        await _repository.CreateAsync(notiz, cancellationToken);
        return notiz;
    }
}