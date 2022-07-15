using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class UpdateDuengungCommandHandler : IRequestHandler<UpdateDuengungCommand, Duengung>
{
    private readonly IDuengungRepository _repository;

    public UpdateDuengungCommandHandler(
        IDuengungRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<Duengung> Handle(
        UpdateDuengungCommand request,
        CancellationToken cancellationToken)
    {
        var duengung = new Duengung
        {
            UserId = request.UserId,
            Id = request.Id,
            Menge = request.Menge,
            Datum = request.Datum,
            Duenger = request.Duenger,
            AquariumId = request.AquariumId,
        };
        return await _repository.UpdateAsync(duengung, cancellationToken);
    }
}