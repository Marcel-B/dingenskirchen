using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateAquariumCommandHandler : IRequestHandler<CreateAquariumCommand, Aquarium>
{
    private readonly IAquariumRepository _repository;

    public CreateAquariumCommandHandler(
        IAquariumRepository repository)
    {
        _repository = repository;
    }

    public async Task<Aquarium> Handle(
        CreateAquariumCommand request,
        CancellationToken cancellationToken)
    {
        var aquarium = new Aquarium
        {
            Name = request.Name,
            UserId = request.UserId,
            Liter = request.Liter,
            Datum = DateTimeOffset.Now,
        };
        await _repository.CreateAsync(aquarium, cancellationToken);
        return aquarium;
    }
}