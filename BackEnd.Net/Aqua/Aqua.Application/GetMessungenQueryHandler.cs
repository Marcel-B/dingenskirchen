using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetMessungenQueryHandler : IRequestHandler<GetMessungenQuery, IEnumerable<Messung>>
{
    private readonly IMessungRepository _repository;

    public GetMessungenQueryHandler(IMessungRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Messung>> Handle(GetMessungenQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetByUserIdAsync(request.UserId, cancellationToken);
    }
}