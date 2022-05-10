using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetMessungQuery(long? Number = null) : IRequest<IEnumerable<Messung>>;