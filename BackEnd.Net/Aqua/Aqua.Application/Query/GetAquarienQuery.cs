using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetAquarienQuery(string UserId, long? Number = null) : IRequest<IEnumerable<Aquarium>>;
