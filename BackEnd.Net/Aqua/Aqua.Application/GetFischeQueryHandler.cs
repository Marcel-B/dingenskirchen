using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetFischeQueryHandler : IRequestHandler<GetFischeQuery, IEnumerable<Fisch>>
{
    private readonly IMongoRepository<Fisch> _repository;

    public GetFischeQueryHandler(IMongoRepository<Fisch> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Fisch>> Handle(
        GetFischeQuery request,
        CancellationToken cancellationToken)
    {
        return await _repository.GetAllAsync(request.UserId, cancellationToken);
    }
}