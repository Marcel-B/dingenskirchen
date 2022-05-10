using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetMessungenQuery(long? Number = null) : IRequest<IEnumerable<Messung>>;