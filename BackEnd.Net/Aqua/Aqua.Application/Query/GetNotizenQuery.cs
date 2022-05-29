using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetNotizenQuery(string UserId, long? Number = null) : IRequest<IEnumerable<Notiz>>;