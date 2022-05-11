using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.MongoDb.Repository;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetTagsQueryHandler : IRequestHandler<GetTagsQuery, IEnumerable<string>>
{
    private readonly ITagRepository _repository;

    public GetTagsQueryHandler(
        ITagRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<IEnumerable<string>> Handle(GetTagsQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetTagsAsync(cancellationToken);
    }
}