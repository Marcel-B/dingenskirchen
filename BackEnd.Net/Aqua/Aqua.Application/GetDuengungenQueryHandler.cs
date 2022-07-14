using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetDuengungenQueryHandler : IRequestHandler<GetDuengungenQuery, IEnumerable<Duengung>>
{
    private readonly IDuengungRepository _repository;

    public GetDuengungenQueryHandler(IDuengungRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Duengung>> Handle(
        GetDuengungenQuery request,
        CancellationToken cancellationToken)
    {
        return await _repository.GetByUserIdAsync(request.UserId, cancellationToken);
    }
}