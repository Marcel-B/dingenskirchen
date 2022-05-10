using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetNotizenQueryHandler : IRequestHandler<GetNotizenQuery, IEnumerable<Notiz>>
{
    private readonly IMongoRepository<Notiz> _repository;

    public GetNotizenQueryHandler(IMongoRepository<Notiz> repository)
    {
        _repository = repository;
    }
    
    public async Task<IEnumerable<Notiz>> Handle(
        GetNotizenQuery request,
        CancellationToken cancellationToken)
    {
        return await _repository.GetAllAsync(cancellationToken);
    }
}