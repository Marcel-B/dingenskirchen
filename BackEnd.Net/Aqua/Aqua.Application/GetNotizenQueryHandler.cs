using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetNotizenQueryHandler : IRequestHandler<GetNotizenQuery, IEnumerable<Notiz>>
{
    private readonly INotizRepository _repository;

    public GetNotizenQueryHandler(INotizRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Notiz>> Handle(
        GetNotizenQuery request,
        CancellationToken cancellationToken)
    {
        return await _repository.GetByUserIdAsync(request.UserId, cancellationToken);
    }
}