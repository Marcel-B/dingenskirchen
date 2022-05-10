using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.MongoDb;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetMessungenQueryHandler : IRequestHandler<GetMessungQuery, IEnumerable<Messung>>
{
    private readonly IMessungRepository _repository;

    public GetMessungenQueryHandler(IMessungRepository repository)
    {
        _repository = repository;
    }
    public async Task<IEnumerable<Messung>> Handle(GetMessungQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetMessungenAsync();
    }
}