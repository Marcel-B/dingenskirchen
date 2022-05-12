using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetFeedQueryHandler : IRequestHandler<GetFeedQuery, IEnumerable<IFeedItem>>
{
    private readonly IFeedRepository _repository;

    public GetFeedQueryHandler(IFeedRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<IEnumerable<IFeedItem>> Handle(GetFeedQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetFeedAsync(cancellationToken);
    }
}