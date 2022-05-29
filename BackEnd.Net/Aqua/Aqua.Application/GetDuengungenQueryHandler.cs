using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetDuengungenQueryHandler : IRequestHandler<GetDuengungenQuery, IEnumerable<Duengung>>
{
    private readonly IMongoRepository<Duengung> _repository;

    public GetDuengungenQueryHandler(IMongoRepository<Duengung> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Duengung>> Handle(
        GetDuengungenQuery request,
        CancellationToken cancellationToken)
    {
        return await _repository.GetAllAsync(request.UserId, cancellationToken);
    }
}