using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class UpdateNotizCommandHandler : IRequestHandler<UpdateNotizCommand, Notiz>
{
    private readonly IMongoRepository<Notiz> _repository;

    public UpdateNotizCommandHandler(
        IMongoRepository<Notiz> repository)
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
            Aquarium = request.Aquarium,
            Tag = request.Tag,
            Datum = request.Datum,
        };
        return await _repository.UpdateByIdAsync(request.Id, notiz, cancellationToken);
    }
}