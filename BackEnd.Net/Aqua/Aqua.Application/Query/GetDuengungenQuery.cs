using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetDuengungenQuery(long? Number = null) : IRequest<IEnumerable<Duengung>>;