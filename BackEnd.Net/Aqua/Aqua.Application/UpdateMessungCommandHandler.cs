using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class UpdateMessungCommandHandler : IRequestHandler<UpdateMessungCommand, Messung>
{
    private readonly IMessungRepository _repository;

    public UpdateMessungCommandHandler(
        IMessungRepository repository)
    {
        _repository = repository;
    }

    public async Task<Messung> Handle(UpdateMessungCommand request, CancellationToken cancellationToken)
    {
        var messung = new Messung
        {
            UserId = request.UserId,
            Id = request.Id,
            AquariumId = request.AquariumId,
            Datum = request.Datum,
            Menge = request.Menge,
            Wert = request.Wert
        };
        return await _repository.UpdateAsync(messung, cancellationToken);
    }
}