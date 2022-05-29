using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateNotizCommandHandler : IRequestHandler<CreateNotizCommand, Notiz>
{
    private readonly IMongoRepository<Notiz> _repository;

    public CreateNotizCommandHandler(
        IMongoRepository<Notiz> repository)
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
            Aquarium = request.Aquarium,
            Tag = request.Tag,
            Datum = request.Datum,
        };
        await _repository.CreateAsync(notiz, cancellationToken);
        return notiz;
    }
}