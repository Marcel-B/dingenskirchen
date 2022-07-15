using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateMessungCommandHandler : IRequestHandler<CreateMessungCommand, Messung>
{
    private readonly IMessungRepository _repository;

    public CreateMessungCommandHandler(
        IMessungRepository repository)
    {
        _repository = repository;
    }

    public async Task<Messung> Handle(CreateMessungCommand request, CancellationToken cancellationToken)
    {
        var messung = new Messung
        {
            UserId = request.UserId,
            AquariumId = request.AquariumId,
            Datum = request.Datum,
            Menge = request.Menge,
            Wert = request.Wert
        };
        return await _repository.CreateAsync(messung, cancellationToken);
    }
}