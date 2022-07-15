using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class CreateDuengungCommandHandler : IRequestHandler<CreateDuengungCommand, Duengung>
{
    private readonly IDuengungRepository _repository;

    public CreateDuengungCommandHandler(
        IDuengungRepository repository)
    {
        _repository = repository;
    }

    public async Task<Duengung> Handle(
        CreateDuengungCommand request,
        CancellationToken cancellationToken)
    {
        var duengung = new Duengung
        {
            UserId = request.UserId,
            Menge = request.Menge,
            Datum = request.Datum,
            Duenger = request.Duenger,
            AquariumId = request.AquariumId,
        };
        await _repository.CreateAsync(duengung, cancellationToken);
        return duengung;
    }
}