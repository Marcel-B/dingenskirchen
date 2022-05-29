using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetAquarienQueryHandler : IRequestHandler<GetAquarienQuery, IEnumerable<Aquarium>>
{
    private readonly IMongoRepository<Aquarium> _repository;

    public GetAquarienQueryHandler(IMongoRepository<Aquarium> repository)
    {
        _repository = repository;
    }
    
    public async Task<IEnumerable<Aquarium>> Handle(
        GetAquarienQuery request,
        CancellationToken cancellationToken)
    {
        return await _repository.GetAllAsync(request.UserId, cancellationToken);
    }
}