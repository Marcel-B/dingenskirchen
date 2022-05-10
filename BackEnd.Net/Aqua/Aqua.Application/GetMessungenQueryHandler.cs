using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetMessungenQueryHandler : IRequestHandler<GetMessungenQuery, IEnumerable<Messung>>
{
    private readonly IMongoRepository<Messung> _repository;

    public GetMessungenQueryHandler(IMongoRepository<Messung> repository)
    {
        _repository = repository;
    }
    
    public async Task<IEnumerable<Messung>> Handle(GetMessungenQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetAllAsync(cancellationToken);
    }
}