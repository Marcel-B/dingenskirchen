using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.Persistence;
using MediatR;

namespace com.marcelbenders.Aqua.Application;

public class GetFischeQueryHandler : IRequestHandler<GetFischeQuery, IEnumerable<Fisch>>
{
    private readonly IFischRepository _repository;

    public GetFischeQueryHandler(IFischRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Fisch>> Handle(
        GetFischeQuery request,
        CancellationToken cancellationToken)
    {
        return await _repository.GetByUserIdAsync(request.UserId, cancellationToken);
    }
}