using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetAquarienQueryHandler : IRequestHandler<GetAquarienQuery, IEnumerable<Aquarium>>
{
    private readonly IAquariumRepository _repository;

    public GetAquarienQueryHandler(IAquariumRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Aquarium>> Handle(
        GetAquarienQuery request,
        CancellationToken cancellationToken)
    {
        return await _repository.GetByUserIdAsync(request.UserId, cancellationToken);
    }
}