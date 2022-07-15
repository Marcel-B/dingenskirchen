using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class UpdateNotizCommandHandler : IRequestHandler<UpdateNotizCommand, Notiz>
{
    private readonly INotizRepository _repository;

    public UpdateNotizCommandHandler(
        INotizRepository repository)
    {
        _repository = repository;
    }

    public async Task<Notiz> Handle(
        UpdateNotizCommand request,
        CancellationToken cancellationToken)
    {
        var notiz = new Notiz
        {
            Id = request.Id,
            UserId = request.UserId,
            Text = request.Text,
            AquariumId = request.AquariumId,
            Tag = request.Tag,
            Datum = request.Datum,
        };
        return await _repository.UpdateAsync(notiz, cancellationToken);
    }
}